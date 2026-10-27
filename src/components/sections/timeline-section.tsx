"use client";

import * as React from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import {
  Boxes,
  Brain,
  Briefcase,
  ChevronDown,
  Code2,
  GraduationCap,
  LineChart,
} from "lucide-react";
import type { TimelineEntry } from "@/data/types";
import { timeline } from "@/data/timeline";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Section, SectionHeader } from "@/components/ui/section";

const icons: Record<TimelineEntry["kind"], typeof Code2> = {
  education: GraduationCap,
  engineering: Code2,
  analysis: LineChart,
  consulting: Briefcase,
  ai: Brain,
  product: Boxes,
};

export function TimelineSection() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState<string | null>(timeline[0].id);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 72%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <Section id="about">
      <SectionHeader
        eyebrow="About"
        title="A career built one layer at a time"
        description="A computer science degree, then two years bridging stakeholders and engineers. The products above came out of problems first documented here — which is why the requirements work and the building sit in the same pair of hands."
      />

      <div ref={containerRef} className="relative">
        {/* Rail — fills as you scroll. */}
        <div
          aria-hidden
          className="absolute left-[1.0625rem] top-2 h-[calc(100%-1rem)] w-px bg-border sm:left-[1.3125rem]"
        >
          <motion.div
            className="h-full w-full origin-top bg-accent"
            style={{ scaleY }}
          />
        </div>

        <ol className="space-y-3">
          {timeline.map((entry, i) => {
            const Icon = icons[entry.kind];
            const isOpen = open === entry.id;

            return (
              <motion.li
                key={entry.id}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="relative pl-12 sm:pl-16"
              >
                {/* Node */}
                <span
                  className={cn(
                    "absolute left-0 top-1.5 grid size-[2.125rem] place-items-center rounded-full border bg-surface transition-colors duration-300 sm:size-[2.625rem]",
                    isOpen
                      ? "border-accent text-accent-text shadow-[var(--shadow-glow)]"
                      : "border-border text-tertiary"
                  )}
                >
                  <Icon className="size-4 sm:size-[18px]" />
                </span>

                <div
                  className={cn(
                    "rounded-[var(--radius-card)] border bg-surface transition-[border-color,box-shadow] duration-300",
                    isOpen
                      ? "border-border-strong shadow-[var(--shadow-md)]"
                      : "border-border shadow-[var(--shadow-xs)]"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : entry.id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start gap-4 p-5 text-left"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-tertiary">
                        {entry.period}
                      </p>
                      <h3 className="mt-1.5 text-lg font-semibold leading-snug">
                        {entry.title}
                      </h3>
                      <p className="mt-0.5 text-sm text-accent-text">{entry.org}</p>
                      <p className="mt-2.5 text-sm leading-relaxed text-secondary">
                        {entry.summary}
                      </p>
                    </div>
                    <ChevronDown
                      className={cn(
                        "mt-1 size-4 shrink-0 text-tertiary transition-transform duration-300",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-border px-5 pb-5 pt-4">
                          <ul className="space-y-2.5">
                            {entry.achievements.map((item) => (
                              <li
                                key={item}
                                className="flex gap-2.5 text-sm leading-relaxed text-secondary"
                              >
                                <span
                                  aria-hidden
                                  className="mt-[0.5rem] size-1 shrink-0 rounded-full bg-accent"
                                />
                                {item}
                              </li>
                            ))}
                          </ul>
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {entry.skills.map((skill) => (
                              <Badge key={skill} size="sm">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
