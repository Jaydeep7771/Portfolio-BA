"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  CircleDot,
  Diamond,
  Flag,
  Server,
  Square,
} from "lucide-react";
import type { FlowEdge, FlowNode } from "@/data/types";
import { cn } from "@/lib/utils";

const kindStyles: Record<
  NonNullable<FlowNode["kind"]>,
  { ring: string; chip: string; Icon: typeof Square; label: string }
> = {
  start: {
    ring: "border-accent/45 bg-accent-soft",
    chip: "text-accent-text",
    Icon: CircleDot,
    label: "Start",
  },
  step: {
    ring: "border-border bg-surface",
    chip: "text-tertiary",
    Icon: Square,
    label: "Step",
  },
  decision: {
    ring: "border-amber-400/45 bg-amber-400/10",
    chip: "text-warning",
    Icon: Diamond,
    label: "Decision",
  },
  system: {
    ring: "border-violet-400/45 bg-violet-400/10",
    chip: "text-violet",
    Icon: Server,
    label: "System",
  },
  end: {
    ring: "border-emerald-400/45 bg-emerald-400/10",
    chip: "text-positive",
    Icon: Flag,
    label: "End",
  },
};

/**
 * Groups nodes into ranks by longest-path depth, so a branching flow still
 * reads top-to-bottom. Cheap and deterministic; no layout engine needed.
 */
function rankNodes(nodes: FlowNode[], edges: FlowEdge[]) {
  const depth = new Map<string, number>(nodes.map((n) => [n.id, 0]));

  // Relax edges |nodes| times — enough to settle any acyclic graph, and
  // bounded so a cycle in the data can't hang the render.
  for (let pass = 0; pass < nodes.length; pass++) {
    let changed = false;
    for (const edge of edges) {
      const from = depth.get(edge.from);
      const to = depth.get(edge.to);
      if (from === undefined || to === undefined) continue;
      if (to < from + 1) {
        depth.set(edge.to, from + 1);
        changed = true;
      }
    }
    if (!changed) break;
  }

  const ranks: FlowNode[][] = [];
  for (const node of nodes) {
    const d = depth.get(node.id) ?? 0;
    (ranks[d] ??= []).push(node);
  }
  return ranks.filter(Boolean);
}

export function ProcessFlow({
  nodes,
  edges,
  className,
}: {
  nodes: FlowNode[];
  edges: FlowEdge[];
  className?: string;
}) {
  const ranks = React.useMemo(() => rankNodes(nodes, edges), [nodes, edges]);

  /** The label on the edge joining two consecutive ranks, if there is one. */
  const connectorLabel = (rankIndex: number) => {
    const fromIds = new Set(ranks[rankIndex].map((n) => n.id));
    const toIds = new Set(ranks[rankIndex + 1]?.map((n) => n.id) ?? []);
    return edges.find((e) => fromIds.has(e.from) && toIds.has(e.to))?.label;
  };

  return (
    <div className={cn("flex flex-col items-stretch", className)}>
      {ranks.map((rank, i) => (
        <React.Fragment key={i}>
          <div
            className={cn(
              "grid gap-3",
              rank.length === 1 && "grid-cols-1",
              rank.length === 2 && "sm:grid-cols-2",
              rank.length >= 3 && "sm:grid-cols-2 lg:grid-cols-3"
            )}
          >
            {rank.map((node, j) => {
              const style = kindStyles[node.kind ?? "step"];
              const { Icon } = style;
              return (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, y: 14, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: i * 0.12 + j * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={cn(
                    "rounded-2xl border p-4 shadow-[var(--shadow-xs)] transition-shadow duration-300 hover:shadow-[var(--shadow-sm)]",
                    style.ring
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Icon className={cn("size-3.5", style.chip)} />
                    <span
                      className={cn(
                        "text-[0.62rem] font-semibold uppercase tracking-[0.14em]",
                        style.chip
                      )}
                    >
                      {style.label}
                    </span>
                  </div>
                  <p className="mt-2.5 text-sm font-medium leading-snug text-primary">
                    {node.label}
                  </p>
                  {node.meta ? (
                    <p className="mt-1 text-xs text-secondary">{node.meta}</p>
                  ) : null}
                </motion.div>
              );
            })}
          </div>

          {i < ranks.length - 1 ? (
            <Connector label={connectorLabel(i)} delay={i * 0.12 + 0.18} />
          ) : null}
        </React.Fragment>
      ))}
    </div>
  );
}

function Connector({ label, delay }: { label?: string; delay: number }) {
  return (
    <div className="relative flex h-14 items-center justify-center">
      <svg
        aria-hidden
        viewBox="0 0 2 56"
        preserveAspectRatio="none"
        className="absolute inset-y-0 h-full w-[2px] overflow-visible"
      >
        <motion.line
          x1="1"
          y1="0"
          x2="1"
          y2="48"
          stroke="var(--border-strong)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.5, delay, ease: "easeOut" }}
        />
        <motion.path
          d="M -4 44 L 1 52 L 6 44"
          fill="none"
          stroke="var(--border-strong)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: delay + 0.4 }}
        />
      </svg>
      {label ? (
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: delay + 0.3 }}
          className="relative rounded-full border border-border bg-background px-2.5 py-1 text-[0.68rem] font-medium text-secondary"
        >
          {label}
        </motion.span>
      ) : null}
    </div>
  );
}
