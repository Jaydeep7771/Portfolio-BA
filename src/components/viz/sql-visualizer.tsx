"use client";

import * as React from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Database, Pause, Play, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type Row = Record<string, string | number>;

type Step = {
  clause: string;
  /** Which line indices of the query this clause owns. */
  lines: number[];
  explain: string;
  columns: string[];
  rows: Row[];
  note: string;
};

const QUERY = [
  "SELECT  r.region,",
  "        COUNT(DISTINCT v.visit_id) AS visits,",
  "        ROUND(AVG(v.duration_min), 1) AS avg_min",
  "FROM    visits v",
  "JOIN    reps r ON r.rep_id = v.rep_id",
  "WHERE   v.visit_date >= '2024-01-01'",
  "GROUP BY r.region",
  "HAVING  COUNT(DISTINCT v.visit_id) > 50",
  "ORDER BY visits DESC",
  "LIMIT   4;",
];

const STEPS: Step[] = [
  {
    clause: "FROM",
    lines: [3],
    explain: "Start from the base table. Nothing is filtered or grouped yet.",
    columns: ["visit_id", "rep_id", "visit_date", "duration_min"],
    rows: [
      { visit_id: "V-1041", rep_id: "R-07", visit_date: "2024-03-02", duration_min: 42 },
      { visit_id: "V-1042", rep_id: "R-11", visit_date: "2023-11-18", duration_min: 25 },
      { visit_id: "V-1043", rep_id: "R-07", visit_date: "2024-04-21", duration_min: 61 },
      { visit_id: "V-1044", rep_id: "R-03", visit_date: "2024-02-09", duration_min: 33 },
    ],
    note: "18,420 rows scanned",
  },
  {
    clause: "JOIN",
    lines: [4],
    explain:
      "Attach the rep dimension so every visit carries a region. An inner join silently drops visits whose rep was deactivated — worth confirming with the business before shipping.",
    columns: ["visit_id", "rep_id", "region", "duration_min"],
    rows: [
      { visit_id: "V-1041", rep_id: "R-07", region: "South", duration_min: 42 },
      { visit_id: "V-1042", rep_id: "R-11", region: "West", duration_min: 25 },
      { visit_id: "V-1043", rep_id: "R-07", region: "South", duration_min: 61 },
      { visit_id: "V-1044", rep_id: "R-03", region: "North", duration_min: 33 },
    ],
    note: "18,397 rows matched",
  },
  {
    clause: "WHERE",
    lines: [5],
    explain:
      "Restrict to the current reporting year. Filtering before aggregation is what keeps the dashboard responsive.",
    columns: ["visit_id", "region", "visit_date", "duration_min"],
    rows: [
      { visit_id: "V-1041", region: "South", visit_date: "2024-03-02", duration_min: 42 },
      { visit_id: "V-1043", region: "South", visit_date: "2024-04-21", duration_min: 61 },
      { visit_id: "V-1044", region: "North", visit_date: "2024-02-09", duration_min: 33 },
    ],
    note: "9,884 rows remain",
  },
  {
    clause: "GROUP BY",
    lines: [0, 1, 2, 6],
    explain:
      "Collapse to one row per region and compute the measures the stakeholders actually asked for.",
    columns: ["region", "visits", "avg_min"],
    rows: [
      { region: "South", visits: 2140, avg_min: 48.2 },
      { region: "North", visits: 1877, avg_min: 41.6 },
      { region: "West", visits: 44, avg_min: 29.4 },
      { region: "East", visits: 1203, avg_min: 37.9 },
    ],
    note: "4 groups formed",
  },
  {
    clause: "HAVING",
    lines: [7],
    explain:
      "Drop low-volume regions so the averages are statistically meaningful. HAVING filters groups; WHERE filters rows.",
    columns: ["region", "visits", "avg_min"],
    rows: [
      { region: "South", visits: 2140, avg_min: 48.2 },
      { region: "North", visits: 1877, avg_min: 41.6 },
      { region: "East", visits: 1203, avg_min: 37.9 },
    ],
    note: "1 group excluded (West)",
  },
  {
    clause: "ORDER BY · LIMIT",
    lines: [8, 9],
    explain:
      "Sort by volume and cap the result — this is the shape the Power BI visual binds to.",
    columns: ["region", "visits", "avg_min"],
    rows: [
      { region: "South", visits: 2140, avg_min: 48.2 },
      { region: "North", visits: 1877, avg_min: 41.6 },
      { region: "East", visits: 1203, avg_min: 37.9 },
    ],
    note: "Final result set",
  },
];

const KEYWORD_LIST =
  "SELECT|FROM|JOIN|ON|WHERE|GROUP BY|HAVING|ORDER BY|LIMIT|COUNT|DISTINCT|AVG|ROUND|AS|DESC";

/** Split keeps the capture group, so odd indices are the matched keywords. */
const SPLIT_RE = new RegExp(`\\b(${KEYWORD_LIST})\\b`, "g");
const IS_KEYWORD = new RegExp(`^(${KEYWORD_LIST})$`);

function highlight(line: string) {
  return line.split(SPLIT_RE).map((part, i) =>
    IS_KEYWORD.test(part) ? (
      <span key={i} className="font-semibold text-accent-text">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

/**
 * Walks a SQL query clause by clause, showing how the result set changes at
 * each stage. Autoplays once visible; clicking any clause takes manual control.
 */
export function SqlVisualizer({ className }: { className?: string }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const visible = useInView(containerRef, { once: true, amount: 0.25 });
  const [step, setStep] = React.useState(0);
  const [playing, setPlaying] = React.useState(true);
  const current = STEPS[step];
  const activeLines = new Set(current.lines);

  React.useEffect(() => {
    // Don't run the walkthrough until it is actually on screen. It sits well
    // below the fold, and the timer plus table re-renders were competing with
    // page load for the main thread.
    if (!playing || !visible) return;
    const id = window.setTimeout(() => {
      setStep((s) => {
        if (s >= STEPS.length - 1) {
          setPlaying(false);
          return s;
        }
        return s + 1;
      });
    }, 2800);
    return () => window.clearTimeout(id);
  }, [step, playing, visible]);

  const select = (i: number) => {
    setPlaying(false);
    setStep(i);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface shadow-[var(--shadow-sm)]",
        className
      )}
    >
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2.5">
          <Database className="size-4 text-accent-text" />
          <p className="text-sm font-medium">Query execution order</p>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause walkthrough" : "Play walkthrough"}
            className="grid size-8 place-items-center rounded-full border border-border text-secondary transition-colors hover:text-primary"
          >
            {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
          </button>
          <button
            type="button"
            onClick={() => {
              setStep(0);
              setPlaying(true);
            }}
            aria-label="Restart walkthrough"
            className="grid size-8 place-items-center rounded-full border border-border text-secondary transition-colors hover:text-primary"
          >
            <RotateCcw className="size-3.5" />
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2">
        {/* Query */}
        <div className="border-b border-border bg-surface-muted/40 p-4 sm:p-5 lg:border-b-0 lg:border-r">
          <pre className="hide-scrollbar overflow-x-auto font-mono text-[0.72rem] leading-[1.85] sm:text-xs">
            <code>
              {QUERY.map((line, i) => (
                <div
                  key={i}
                  className={cn(
                    "-mx-2 rounded px-2 transition-colors duration-500",
                    activeLines.has(i)
                      ? "bg-accent/10 text-primary"
                      : "text-tertiary"
                  )}
                >
                  {highlight(line)}
                </div>
              ))}
            </code>
          </pre>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {STEPS.map((s, i) => (
              <button key={s.clause} type="button" onClick={() => select(i)}>
                <Badge
                  size="sm"
                  variant={i === step ? "accent" : "outline"}
                  className="cursor-pointer font-mono"
                >
                  {s.clause}
                </Badge>
              </button>
            ))}
          </div>
        </div>

        {/* Result */}
        <div className="p-4 sm:p-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
            >
              <p className="min-h-[3.5rem] text-xs leading-relaxed text-secondary">
                {current.explain}
              </p>

              <div className="hide-scrollbar mt-3 overflow-x-auto">
                <table className="w-full min-w-[320px] border-collapse text-left font-mono text-[0.68rem]">
                  <thead>
                    <tr className="border-b border-border">
                      {current.columns.map((col) => (
                        <th
                          key={col}
                          className="whitespace-nowrap px-2 py-2 font-semibold text-tertiary"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {current.rows.map((row, i) => (
                      <motion.tr
                        key={i}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="border-b border-border/60 last:border-0"
                      >
                        {current.columns.map((col) => (
                          <td
                            key={col}
                            className="whitespace-nowrap px-2 py-2 tabular-nums text-secondary"
                          >
                            {row[col] ?? "—"}
                          </td>
                        ))}
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-3 text-[0.68rem] font-medium uppercase tracking-[0.12em] text-tertiary">
                {current.note}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
