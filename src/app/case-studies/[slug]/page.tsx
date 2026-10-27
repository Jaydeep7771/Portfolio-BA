import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  FlaskConical,
  LayoutTemplate,
  ListOrdered,
  Swords,
  Wrench,
} from "lucide-react";

import { getCaseStudy, productCaseStudies } from "@/data/case-studies";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/section";
import { JourneyMap } from "@/components/viz/journey-map";
import { KpiGrid } from "@/components/viz/kpi-grid";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return productCaseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "Case study not found" };
  return {
    title: study.title,
    description: study.summary,
    openGraph: { title: study.title, description: study.summary },
  };
}

function Block({
  id,
  icon: Icon,
  title,
  intro,
  children,
}: {
  id: string;
  icon: typeof Swords;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal as="section">
      <div id={id} className="scroll-mt-32">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-xl bg-accent/12 text-accent-text">
            <Icon className="size-[18px]" />
          </span>
          <h2 className="text-2xl font-semibold leading-tight tracking-tight sm:text-[1.75rem]">
            {title}
          </h2>
        </div>
        {intro ? (
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-secondary sm:text-base">
            {intro}
          </p>
        ) : null}
        <div className="mt-6">{children}</div>
      </div>
    </Reveal>
  );
}

const severityStyles = {
  High: "border-rose-400/35 bg-rose-400/[0.06] text-critical",
  Medium: "border-amber-400/35 bg-amber-400/[0.06] text-warning",
  Low: "border-border bg-surface-muted/50 text-secondary",
} as const;

const impactStyles = {
  High: "accent",
  Medium: "outline",
} as const;

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const index = productCaseStudies.findIndex((c) => c.slug === slug);
  const next = productCaseStudies[(index + 1) % productCaseStudies.length];

  return (
    <article>
      <header className="relative overflow-hidden border-b border-border">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 grid-backdrop" />
        <div className="shell py-14 sm:py-20">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-1.5 text-sm text-secondary transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            All teardowns
          </Link>

          <Reveal className="mt-8">
            <Eyebrow>{study.category}</Eyebrow>
            <h1 className="max-w-4xl text-4xl font-semibold leading-[1.07] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              {study.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-secondary sm:text-lg">
              {study.summary}
            </p>
          </Reveal>
        </div>
      </header>

      <div className="shell space-y-16 py-14 sm:space-y-20 sm:py-20">
        {/* Context */}
        <Reveal as="section">
          <div id="context" className="scroll-mt-32 max-w-3xl space-y-4">
            {study.context.map((para, i) => (
              <p
                key={i}
                className={cn(
                  "leading-[1.75] text-secondary",
                  i === 0 ? "text-[1.05rem] text-primary sm:text-lg" : "text-[0.95rem] sm:text-base"
                )}
              >
                {para}
              </p>
            ))}
          </div>
        </Reveal>

        <Block
          id="journey"
          icon={ListOrdered}
          title="Current User Journey"
          intro="The existing flow, stage by stage, with the emotional low points marked. Select a stage to see what the user is doing, thinking and running into."
        >
          <JourneyMap stages={study.journey} />
        </Block>

        <Block
          id="pain-points"
          icon={AlertTriangle}
          title="Pain Points"
          intro="Ordered by the severity I'd assign if I owned this surface — not by how easy they are to fix."
        >
          <ul className="space-y-3">
            {study.painPoints.map((point) => (
              <li
                key={point.title}
                className={cn(
                  "rounded-[var(--radius-card)] border p-5",
                  severityStyles[point.severity]
                )}
              >
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="text-[0.95rem] font-semibold text-primary">
                    {point.title}
                  </h3>
                  <Badge size="sm" variant="outline" className="shrink-0">
                    {point.severity}
                  </Badge>
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-secondary">
                  {point.body}
                </p>
              </li>
            ))}
          </ul>
        </Block>

        <Block
          id="competitive"
          icon={Swords}
          title="Competitive Analysis"
          intro="What each comparable does better, and where it leaves the same gap."
        >
          <div className="hide-scrollbar overflow-x-auto rounded-[var(--radius-card)] border border-border bg-surface">
            <table className="w-full min-w-[680px] border-collapse text-left">
              <thead>
                <tr className="border-b border-border bg-surface-muted/50">
                  {["Product", "Does better", "Still leaves"].map((col) => (
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
                {study.competitors.map((c) => (
                  <tr key={c.name} className="border-b border-border last:border-0">
                    <td className="px-5 py-4 align-top text-sm font-medium">
                      {c.name}
                    </td>
                    <td className="px-5 py-4 align-top text-sm leading-relaxed text-secondary">
                      {c.strength}
                    </td>
                    <td className="px-5 py-4 align-top text-sm leading-relaxed text-secondary">
                      {c.gap}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Block>

        <Block
          id="hypotheses"
          icon={FlaskConical}
          title="Hypotheses"
          intro="Each written so it can be wrong. A hypothesis that can't fail isn't one."
        >
          <ul className="grid gap-3 sm:grid-cols-2">
            {study.hypotheses.map((h, i) => (
              <li
                key={i}
                className="flex gap-4 rounded-[var(--radius-card)] border border-border bg-surface p-5"
              >
                <span className="font-mono text-xs font-semibold text-accent-text">
                  H{i + 1}
                </span>
                <p className="text-sm leading-relaxed text-secondary">{h}</p>
              </li>
            ))}
          </ul>
        </Block>

        <Block
          id="solutions"
          icon={Wrench}
          title="Final Solution"
          intro="Prioritised by impact against effort. The first two are where I'd start."
        >
          <ul className="space-y-3">
            {study.solutions.map((s) => (
              <li
                key={s.title}
                className="rounded-[var(--radius-card)] border border-border bg-surface p-5 shadow-[var(--shadow-xs)]"
              >
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="text-[0.95rem] font-semibold">{s.title}</h3>
                  <Badge size="sm" variant={impactStyles[s.impact]}>
                    {s.impact} impact
                  </Badge>
                  <Badge size="sm" variant="outline">
                    Effort {s.effort}
                  </Badge>
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-secondary">
                  {s.body}
                </p>
              </li>
            ))}
          </ul>
        </Block>

        <Block
          id="wireframes"
          icon={LayoutTemplate}
          title="Wireframes"
          intro="Low-fidelity on purpose. At this stage the argument is about what's on the screen and in what order, not how it looks."
        >
          <div className="grid gap-4 lg:grid-cols-3">
            {study.wireframes.map((frame) => (
              <div
                key={frame.title}
                className="overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface shadow-[var(--shadow-xs)]"
              >
                <div className="border-b border-border bg-surface-muted/50 px-5 py-3">
                  <p className="text-sm font-semibold">{frame.title}</p>
                </div>
                <div className="space-y-2 p-5">
                  {frame.blocks.map((block, i) => (
                    <div
                      key={i}
                      className={cn(
                        "rounded-lg border px-3.5 py-2.5 text-xs leading-relaxed",
                        block.startsWith("Primary:")
                          ? "border-transparent bg-primary text-background"
                          : block.startsWith("Secondary:")
                            ? "border-border-strong bg-transparent text-secondary"
                            : "border-dashed border-border bg-surface-muted/40 text-secondary"
                      )}
                    >
                      {block.replace(/^(Primary|Secondary): /, "")}
                    </div>
                  ))}
                </div>
                <p className="border-t border-border px-5 py-3.5 text-xs leading-relaxed text-tertiary">
                  {frame.caption}
                </p>
              </div>
            ))}
          </div>
        </Block>

        <Block
          id="metrics"
          icon={ArrowRight}
          title="Success Metrics"
          intro="Targets, not results — this is a proposal. The guardrail matters as much as the primary metric."
        >
          <KpiGrid items={study.metrics} />
        </Block>

        <Block
          id="rollout"
          icon={ListOrdered}
          title="Rollout Sequence"
          intro="Ordered so the cheap, low-risk change validates the measurement setup before the expensive one depends on it."
        >
          <ol className="space-y-3">
            {study.rollout.map((step, i) => (
              <li
                key={i}
                className="flex gap-4 rounded-[var(--radius-card)] border border-border bg-surface p-5"
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-surface-muted text-xs font-semibold tabular-nums">
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed text-secondary">{step}</p>
              </li>
            ))}
          </ol>
        </Block>
      </div>

      <div className="border-t border-border bg-surface-muted/40">
        <div className="shell py-14">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-tertiary">
                Next teardown
              </p>
              <p className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
                {next.title}
              </p>
            </div>
            <Button asChild>
              <Link href={`/case-studies/${next.slug}`}>
                Read it
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
