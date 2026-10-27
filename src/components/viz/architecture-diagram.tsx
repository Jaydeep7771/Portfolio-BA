"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { ArchLayer } from "@/data/types";
import { cn } from "@/lib/utils";

/**
 * Layered architecture view. Each layer is a labelled band of nodes;
 * bands animate in top-down so the data path reads in the right order.
 */
export function ArchitectureDiagram({
  layers,
  className,
}: {
  layers: ArchLayer[];
  className?: string;
}) {
  return (
    <div className={cn("space-y-3", className)}>
      {layers.map((layer, i) => (
        <div key={layer.title}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[var(--radius-card)] border border-border bg-surface-muted/60 p-4 sm:p-5"
          >
            <div className="mb-3.5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              {/* h3, not h4: these sit directly under the section's h2. */}
              <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-accent-text">
                {layer.title}
              </h3>
              {layer.subtitle ? (
                <span className="text-xs text-tertiary">{layer.subtitle}</span>
              ) : null}
            </div>

            <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {layer.nodes.map((node, j) => (
                <motion.div
                  key={node.label}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.35,
                    delay: i * 0.1 + j * 0.04 + 0.1,
                  }}
                  className="rounded-xl border border-border bg-surface px-3.5 py-3 shadow-[var(--shadow-xs)] transition-colors duration-300 hover:border-accent/40"
                >
                  <p className="text-sm font-medium leading-snug">{node.label}</p>
                  {node.meta ? (
                    <p className="mt-1 font-mono text-[0.68rem] text-tertiary">
                      {node.meta}
                    </p>
                  ) : null}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {i < layers.length - 1 ? (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 + 0.25 }}
              className="flex justify-center py-1.5"
              aria-hidden
            >
              <ChevronDown className="size-4 text-tertiary" />
            </motion.div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
