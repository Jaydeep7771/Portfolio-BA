import * as React from "react";
import { CheckCircle2, Lightbulb } from "lucide-react";
import type { CaseStudySection } from "@/data/types";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { KpiGrid } from "@/components/viz/kpi-grid";
import { ProcessFlow } from "@/components/viz/process-flow";
import { ArchitectureDiagram } from "@/components/viz/architecture-diagram";
import { SequenceDiagram } from "@/components/viz/sequence-diagram";

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-semibold leading-tight tracking-tight sm:text-[1.75rem]">
      {children}
    </h2>
  );
}

function Intro({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 max-w-3xl text-sm leading-relaxed text-secondary sm:text-base">
      {children}
    </p>
  );
}

export function CaseStudySectionBlock({
  section,
  id,
}: {
  section: CaseStudySection;
  id: string;
}) {
  return (
    <Reveal as="section" className="scroll-mt-32">
      <div id={id} className="scroll-mt-32">
        <Body section={section} />
      </div>
    </Reveal>
  );
}

function Body({ section }: { section: CaseStudySection }) {
  switch (section.kind) {
    case "prose":
      return (
        <>
          <Heading>{section.title}</Heading>
          <div className="mt-5 max-w-3xl space-y-4">
            {section.body.map((para, i) => (
              <p
                key={i}
                className="text-[0.95rem] leading-[1.75] text-secondary sm:text-base"
              >
                {para}
              </p>
            ))}
          </div>
        </>
      );

    case "list":
      return (
        <>
          <Heading>{section.title}</Heading>
          {section.intro ? <Intro>{section.intro}</Intro> : null}
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {section.items.map((item) => (
              <li
                key={item.title}
                className="rounded-[var(--radius-card)] border border-border bg-surface p-5 shadow-[var(--shadow-xs)]"
              >
                <h3 className="text-[0.95rem] font-semibold leading-snug">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-secondary">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </>
      );

    case "kpis":
      return (
        <>
          <Heading>{section.title}</Heading>
          {section.intro ? <Intro>{section.intro}</Intro> : null}
          <KpiGrid items={section.items} className="mt-6" />
        </>
      );

    case "flow":
      return (
        <>
          <Heading>{section.title}</Heading>
          {section.intro ? <Intro>{section.intro}</Intro> : null}
          <div className="mt-6 rounded-[var(--radius-card)] border border-border bg-surface-muted/40 p-5 sm:p-8">
            <ProcessFlow nodes={section.nodes} edges={section.edges} />
          </div>
        </>
      );

    case "architecture":
      return (
        <>
          <Heading>{section.title}</Heading>
          {section.intro ? <Intro>{section.intro}</Intro> : null}
          <div className="mt-6">
            <ArchitectureDiagram layers={section.layers} />
          </div>
        </>
      );

    case "sequence":
      return (
        <>
          <Heading>{section.title}</Heading>
          {section.intro ? <Intro>{section.intro}</Intro> : null}
          <div className="mt-6 rounded-[var(--radius-card)] border border-border bg-surface p-4 shadow-[var(--shadow-xs)] sm:p-6">
            <SequenceDiagram actors={section.actors} steps={section.steps} />
          </div>
        </>
      );

    case "stories":
      return (
        <>
          <Heading>{section.title}</Heading>
          {section.intro ? <Intro>{section.intro}</Intro> : null}
          <ul className="mt-6 space-y-4">
            {section.items.map((story) => (
              <li
                key={story.id}
                className="overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface shadow-[var(--shadow-xs)]"
              >
                <div className="flex flex-wrap items-center gap-2 border-b border-border bg-surface-muted/50 px-5 py-3">
                  <span className="font-mono text-xs font-semibold text-accent-text">
                    {story.id}
                  </span>
                  {story.priority ? (
                    <Badge size="sm" variant="outline">
                      {story.priority}
                    </Badge>
                  ) : null}
                  {story.points ? (
                    <Badge size="sm" variant="outline">
                      {story.points} pts
                    </Badge>
                  ) : null}
                </div>

                <div className="p-5">
                  <p className="text-[0.95rem] leading-relaxed">
                    <span className="text-tertiary">As a</span>{" "}
                    <strong className="font-medium">{story.as}</strong>,{" "}
                    <span className="text-tertiary">I want</span>{" "}
                    <strong className="font-medium">{story.want}</strong>,{" "}
                    <span className="text-tertiary">so that</span>{" "}
                    <strong className="font-medium">{story.so}</strong>.
                  </p>

                  {story.criteria?.length ? (
                    <div className="mt-4 border-t border-border pt-4">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-tertiary">
                        Acceptance Criteria
                      </p>
                      <ul className="mt-3 space-y-2">
                        {story.criteria.map((c, i) => (
                          <li key={i} className="flex gap-2.5">
                            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-positive" />
                            <span className="text-sm leading-relaxed text-secondary">
                              {c}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </>
      );

    case "criteria":
      return (
        <>
          <Heading>{section.title}</Heading>
          {section.intro ? <Intro>{section.intro}</Intro> : null}
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {section.groups.map((group) => (
              <div
                key={group.title}
                className="rounded-[var(--radius-card)] border border-border bg-surface p-5 shadow-[var(--shadow-xs)]"
              >
                <h3 className="text-[0.95rem] font-semibold">{group.title}</h3>
                <ul className="mt-3.5 space-y-2.5">
                  {group.items.map((item, i) => (
                    <li key={i} className="flex gap-2.5">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent-text" />
                      <span className="text-sm leading-relaxed text-secondary">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      );

    case "stack":
      return (
        <>
          <Heading>{section.title}</Heading>
          {section.intro ? <Intro>{section.intro}</Intro> : null}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {section.groups.map((group) => (
              <div
                key={group.title}
                className="rounded-[var(--radius-card)] border border-border bg-surface p-5"
              >
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-tertiary">
                  {group.title}
                </p>
                <ul className="mt-3 space-y-1.5">
                  {group.items.map((item) => (
                    <li key={item} className="text-sm text-secondary">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      );

    case "table":
      return (
        <>
          <Heading>{section.title}</Heading>
          {section.intro ? <Intro>{section.intro}</Intro> : null}
          <div className="hide-scrollbar mt-6 overflow-x-auto rounded-[var(--radius-card)] border border-border bg-surface">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-border bg-surface-muted/50">
                  {section.columns.map((col) => (
                    <th
                      key={col}
                      scope="col"
                      className="px-5 py-3.5 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-tertiary"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.rows.map((row, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className={
                          j === 0
                            ? "px-5 py-3.5 text-sm font-medium text-primary"
                            : "px-5 py-3.5 text-sm text-secondary"
                        }
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      );
  }
}

export function LessonsBlock({ lessons }: { lessons: string[] }) {
  return (
    <Reveal as="section" className="scroll-mt-32">
      <div id="lessons" className="scroll-mt-32">
        <Heading>Lessons Learned</Heading>
        <Intro>
          The parts worth writing down — mostly the places where I was wrong
          first.
        </Intro>
        <ul className="mt-6 space-y-3">
          {lessons.map((lesson, i) => (
            <li
              key={i}
              className="flex gap-4 rounded-[var(--radius-card)] border border-border bg-surface p-5 shadow-[var(--shadow-xs)]"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-amber-400/12 text-warning">
                <Lightbulb className="size-4" />
              </span>
              <p className="text-sm leading-relaxed text-secondary">{lesson}</p>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
