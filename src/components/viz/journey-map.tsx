"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Frown, Meh, Smile } from "lucide-react";
import type { JourneyStage } from "@/data/types";
import { cn } from "@/lib/utils";

const CHART_H = 112;

function emotionIcon(emotion: number) {
  if (emotion <= -1) return Frown;
  if (emotion >= 1) return Smile;
  return Meh;
}

function emotionColor(emotion: number) {
  if (emotion <= -1) return "#f43f5e";
  if (emotion >= 1) return "#10b981";
  return "#f59e0b";
}

/**
 * Interactive user-journey map: an emotion curve over the stages, with the
 * selected stage expanded below. Keyboard-navigable via the stage buttons.
 */
export function JourneyMap({
  stages,
  className,
}: {
  stages: JourneyStage[];
  className?: string;
}) {
  const [active, setActive] = React.useState(0);
  const current = stages[active];

  // Map emotion (-2…2) to a y coordinate inside the chart band.
  const yFor = (emotion: number) =>
    CHART_H / 2 - (emotion / 2) * (CHART_H / 2 - 16);
  const xFor = (i: number) =>
    stages.length === 1 ? 50 : (i / (stages.length - 1)) * 100;

  const points = stages
    .map((s, i) => `${xFor(i)},${yFor(s.emotion)}`)
    .join(" ");

  return (
    <div className={cn("space-y-5", className)}>
      <div className="rounded-[var(--radius-card)] border border-border bg-surface p-5 sm:p-6">
        {/* Emotion curve */}
        <div className="relative" style={{ height: CHART_H }}>
          <svg
            viewBox={`0 0 100 ${CHART_H}`}
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            aria-hidden
          >
            {[0.25, 0.5, 0.75].map((t) => (
              <line
                key={t}
                x1="0"
                x2="100"
                y1={CHART_H * t}
                y2={CHART_H * t}
                stroke="var(--border)"
                strokeWidth="0.5"
                strokeDasharray="2 2"
                vectorEffect="non-scaling-stroke"
              />
            ))}
            <motion.polyline
              points={points}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>

          {/* Dots sit in a separate absolutely-positioned layer so they stay
              circular regardless of the non-uniform SVG scaling above. */}
          {stages.map((stage, i) => (
            <button
              key={stage.stage}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`${stage.stage} — ${stage.action}`}
              aria-pressed={active === i}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full p-1.5 transition-transform duration-200 hover:scale-110"
              style={{ left: `${xFor(i)}%`, top: yFor(stage.emotion) }}
            >
              <span
                className={cn(
                  "block size-3 rounded-full ring-4 transition-all duration-200",
                  active === i
                    ? "ring-accent/25"
                    : "ring-transparent"
                )}
                style={{ background: emotionColor(stage.emotion) }}
              />
            </button>
          ))}
        </div>

        {/* Stage selector */}
        <div className="mt-4 grid gap-1.5 border-t border-border pt-4 sm:grid-cols-3 lg:grid-cols-5">
          {stages.map((stage, i) => {
            const Icon = emotionIcon(stage.emotion);
            return (
              <button
                key={stage.stage}
                type="button"
                onClick={() => setActive(i)}
                className={cn(
                  "flex items-center gap-2 rounded-xl px-3 py-2.5 text-left text-xs font-medium transition-colors duration-200",
                  active === i
                    ? "bg-surface-muted text-primary"
                    : "text-secondary hover:bg-surface-muted/60 hover:text-primary"
                )}
              >
                <Icon
                  className="size-4 shrink-0"
                  style={{ color: emotionColor(stage.emotion) }}
                />
                <span className="truncate">{stage.stage}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className="grid gap-4 sm:grid-cols-2"
        >
          <div className="rounded-[var(--radius-card)] border border-border bg-surface p-5">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-tertiary">
              What the user does
            </p>
            <p className="mt-2.5 text-sm leading-relaxed text-primary">
              {current.action}
            </p>
            <p className="mt-4 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-tertiary">
              What the user thinks
            </p>
            <p className="mt-2.5 text-sm italic leading-relaxed text-secondary">
              “{current.thought}”
            </p>
          </div>

          <div
            className={cn(
              "rounded-[var(--radius-card)] border p-5",
              current.painPoint
                ? "border-amber-400/35 bg-amber-400/[0.07]"
                : "border-border bg-surface"
            )}
          >
            <p className="flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-tertiary">
              {current.painPoint ? (
                <AlertTriangle className="size-3.5 text-warning" />
              ) : null}
              Friction
            </p>
            <p className="mt-2.5 text-sm leading-relaxed text-secondary">
              {current.painPoint ?? "No significant friction at this stage."}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
