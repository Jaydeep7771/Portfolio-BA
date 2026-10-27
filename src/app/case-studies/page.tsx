import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { productCaseStudies } from "@/data/case-studies";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Product Case Studies",
  description:
    "Self-directed product teardowns — journey maps, pain points, competitive analysis, prioritised solutions and the metrics that would prove them.",
};

export default function CaseStudiesIndex() {
  return (
    <>
      <PageHeader
        eyebrow="Product Case Studies"
        title="Teardowns nobody asked for"
        description="Products I use, analysed the way I'd analyse one I owned. Each has a journey map, the friction I'd prioritise, a competitive read, wireframes, and the metrics that would tell us whether the change worked."
      />

      <div className="shell py-12 sm:py-16">
        <div className="space-y-5">
          {productCaseStudies.map((study, i) => (
            <Reveal key={study.slug} delay={i * 0.06}>
              <Link
                href={`/case-studies/${study.slug}`}
                className="group grid gap-6 rounded-[var(--radius-card)] border border-border bg-surface p-6 shadow-[var(--shadow-sm)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-[var(--shadow-lg)] sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="accent" size="sm">
                      {study.product}
                    </Badge>
                    <span className="text-[0.7rem] text-tertiary">
                      {study.category}
                    </span>
                  </div>

                  <h2 className="mt-4 text-2xl font-semibold leading-snug tracking-tight transition-colors duration-300 group-hover:text-accent-text sm:text-[1.75rem]">
                    {study.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-secondary sm:text-base">
                    {study.summary}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                    {[
                      { label: "Journey stages", value: study.journey.length },
                      { label: "Pain points", value: study.painPoints.length },
                      { label: "Solutions", value: study.solutions.length },
                      { label: "Competitors", value: study.competitors.length },
                    ].map((stat) => (
                      <div key={stat.label}>
                        <p className="text-lg font-semibold tabular-nums">
                          {stat.value}
                        </p>
                        <p className="text-[0.68rem] uppercase tracking-[0.1em] text-tertiary">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-text">
                  Read
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
