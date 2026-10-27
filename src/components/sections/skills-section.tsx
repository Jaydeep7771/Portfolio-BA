"use client";

import * as React from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { skillCategories } from "@/data/skills";
import { cn } from "@/lib/utils";
import { Section, SectionHeader } from "@/components/ui/section";

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0 });

  return (
    <div ref={ref}>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm text-primary">{name}</span>
        <span className="font-mono text-[0.68rem] tabular-nums text-tertiary">
          {level}
        </span>
      </div>
      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-surface-muted">
        <motion.div
          className="h-full rounded-full bg-accent"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: level / 100 } : { scaleX: 0 }}
          style={{ originX: 0 }}
          transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

export function SkillsSection() {
  const [active, setActive] = React.useState(skillCategories[0].id);
  const category =
    skillCategories.find((c) => c.id === active) ?? skillCategories[0];

  return (
    <Section id="skills" className="bg-surface-muted/40">
      <SectionHeader
        eyebrow="Skills"
        title="What I actually use"
        description="Grouped by the kind of problem each one solves. The numbers are a self-assessment of depth, not a claim to objectivity."
      />

      <div className="grid gap-6 lg:grid-cols-[17rem_1fr]">
        {/* Category rail */}
        <div
          role="tablist"
          aria-label="Skill categories"
          className="hide-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
        >
          {skillCategories.map((cat) => {
            const Icon = cat.icon;
            const isActive = cat.id === active;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(cat.id)}
                className={cn(
                  "group relative flex shrink-0 items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-[border-color,background-color] duration-300 lg:w-full",
                  isActive
                    ? "border-border-strong bg-surface shadow-[var(--shadow-sm)]"
                    : "border-transparent bg-transparent hover:bg-surface/70"
                )}
              >
                <span
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-xl transition-colors duration-300",
                    isActive
                      ? "bg-accent/15 text-accent-text"
                      : "bg-surface-muted text-tertiary group-hover:text-secondary"
                  )}
                >
                  <Icon className="size-[18px]" />
                </span>
                <span className="min-w-0">
                  <span
                    className={cn(
                      "block whitespace-nowrap text-sm font-medium lg:whitespace-normal",
                      isActive ? "text-primary" : "text-secondary"
                    )}
                  >
                    {cat.title}
                  </span>
                  <span className="hidden text-xs text-tertiary lg:block">
                    {cat.skills.length} skills
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={category.id}
            role="tabpanel"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[var(--radius-card)] border border-border bg-surface p-6 shadow-[var(--shadow-sm)] sm:p-8"
          >
            <p className="max-w-xl text-sm leading-relaxed text-secondary">
              {category.blurb}
            </p>
            <div className="mt-7 grid gap-x-10 gap-y-5 sm:grid-cols-2">
              {category.skills.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  delay={i * 0.04}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
}
