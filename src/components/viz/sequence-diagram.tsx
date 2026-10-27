"use client";

import { motion } from "framer-motion";
import type { SequenceStep } from "@/data/types";
import { cn } from "@/lib/utils";

const COL = 190;
const ROW = 54;
const HEAD = 78;
const PAD = 28;

/**
 * UML-ish sequence diagram drawn as SVG. Scrolls horizontally on narrow
 * screens rather than shrinking the type below readability.
 */
export function SequenceDiagram({
  actors,
  steps,
  className,
}: {
  actors: string[];
  steps: SequenceStep[];
  className?: string;
}) {
  const width = actors.length * COL;
  const height = HEAD + steps.length * ROW + PAD;
  const laneX = (i: number) => COL / 2 + i * COL;
  const indexOf = (name: string) => Math.max(0, actors.indexOf(name));

  return (
    <div className={cn("hide-scrollbar -mx-1 overflow-x-auto px-1", className)}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        role="img"
        aria-label={`Sequence diagram with ${actors.length} participants and ${steps.length} messages`}
        className="max-w-none"
        style={{ minWidth: Math.min(width, 980) }}
      >
        <defs>
          <marker
            id="seq-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)" />
          </marker>
        </defs>

        {/* Participants and their lifelines */}
        {actors.map((actor, i) => (
          <g key={actor}>
            <motion.g
              initial={{ opacity: 0, y: -8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <rect
                x={laneX(i) - 76}
                y={14}
                width={152}
                height={40}
                rx={12}
                fill="var(--surface)"
                stroke="var(--border-strong)"
              />
              <text
                x={laneX(i)}
                y={39}
                textAnchor="middle"
                fontSize="12.5"
                fontWeight="550"
                fill="var(--primary)"
              >
                {actor}
              </text>
            </motion.g>

            <motion.line
              x1={laneX(i)}
              y1={58}
              x2={laneX(i)}
              y2={height - 12}
              stroke="var(--border)"
              strokeWidth="1.5"
              strokeDasharray="5 6"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.05 }}
            />
          </g>
        ))}

        {/* Messages */}
        {steps.map((step, i) => {
          const from = indexOf(step.from);
          const to = indexOf(step.to);
          const y = HEAD + i * ROW;
          const x1 = laneX(from);
          const x2 = laneX(to);
          const isReturn = step.kind === "return";
          const midX = (x1 + x2) / 2;
          const selfCall = from === to;

          return (
            <motion.g
              key={`${step.from}-${step.to}-${i}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.35, delay: 0.3 + i * 0.1 }}
            >
              <text
                x={selfCall ? x1 + 16 : midX}
                y={y - 9}
                textAnchor={selfCall ? "start" : "middle"}
                fontSize="11.5"
                fill="var(--secondary)"
              >
                {step.label}
              </text>

              {selfCall ? (
                <path
                  d={`M ${x1} ${y} h 34 v 18 h -34`}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="1.6"
                  strokeDasharray={isReturn ? "5 4" : undefined}
                  markerEnd="url(#seq-arrow)"
                />
              ) : (
                <motion.line
                  x1={x1}
                  y1={y}
                  x2={x2}
                  y2={y}
                  stroke="var(--accent)"
                  strokeWidth="1.6"
                  strokeDasharray={isReturn ? "5 4" : undefined}
                  markerEnd="url(#seq-arrow)"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.35 + i * 0.1 }}
                />
              )}
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
