"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import type { Kpi } from "@/data/types";
import { cn } from "@/lib/utils";
import { CountUp } from "@/components/viz/count-up";
import { staggerItem, staggerParent } from "@/components/ui/reveal";

/**
 * Interactive KPI cards. Hovering raises the card and reveals the accent
 * sweep; the number itself only animates once, on first view.
 */
export function KpiGrid({
  items,
  columns = 4,
  className,
}: {
  items: readonly Kpi[];
  columns?: 2 | 3 | 4;
  className?: string;
}) {
  const cols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <motion.ul
      variants={staggerParent}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0 }}
      className={cn("grid gap-4", cols, className)}
    >
      {items.map((kpi) => (
        <motion.li
          key={kpi.label}
          variants={staggerItem}
          className="group relative overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface p-5 shadow-[var(--shadow-sm)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-[var(--shadow-md)]"
        >
          {/* Accent wash, revealed on hover. */}
          <span
            aria-hidden
            className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full bg-accent/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
          />
          <div className="relative">
            <div className="flex items-start justify-between gap-3">
              <p className="text-[0.78rem] font-medium leading-snug text-secondary">
                {kpi.label}
              </p>
              <TrendingUp className="size-4 shrink-0 text-tertiary transition-colors duration-300 group-hover:text-accent-text" />
            </div>
            <p className="mt-4 text-3xl font-semibold tracking-tight tabular-nums sm:text-[2rem]">
              <CountUp
                value={kpi.value}
                prefix={kpi.prefix}
                suffix={kpi.suffix}
                decimals={kpi.decimals ?? 0}
              />
            </p>
            {kpi.note ? (
              <p className="mt-2 text-xs leading-relaxed text-tertiary">
                {kpi.note}
              </p>
            ) : null}
          </div>
        </motion.li>
      ))}
    </motion.ul>
  );
}
