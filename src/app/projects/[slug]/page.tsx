import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Briefcase, Calendar, UserRound } from "lucide-react";

import { getProject, projects } from "@/data/projects";
import { slugify } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/section";
import {
  CaseStudySectionBlock,
  LessonsBlock,
} from "@/components/case-study/section-renderer";
import { CaseStudyToc } from "@/components/case-study/toc";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };

  return {
    title: project.title,
    description: project.summary,
    openGraph: { title: project.title, description: project.summary },
  };
}

const heroWash: Record<string, string> = {
  sky: "from-sky-500/18",
  violet: "from-violet-500/18",
  emerald: "from-emerald-500/18",
  amber: "from-amber-500/18",
  rose: "from-rose-500/18",
};

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  const sectionIds = project.sections.map((s) => slugify(s.title));
  const toc = [
    ...project.sections.map((s, i) => ({ id: sectionIds[i], label: s.title })),
    { id: "lessons", label: "Lessons Learned" },
  ];

  return (
    <article>
      {/* Hero */}
      <header className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br ${
            heroWash[project.accent]
          } via-transparent to-transparent`}
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 grid-backdrop" />

        <div className="shell py-14 sm:py-20">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm text-secondary transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            All projects
          </Link>

          <Reveal className="mt-8">
            <Eyebrow>{project.tags[0]}</Eyebrow>
            <h1 className="max-w-4xl text-4xl font-semibold leading-[1.07] tracking-tight sm:text-5xl lg:text-[3.5rem]">
              {project.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-secondary sm:text-lg">
              {project.summary}
            </p>

            <dl className="mt-9 flex flex-wrap gap-x-10 gap-y-5">
              {[
                { Icon: UserRound, label: "Role", value: project.role },
                { Icon: Briefcase, label: "Organisation", value: project.org },
                { Icon: Calendar, label: "Period", value: project.period },
                {
                  Icon: ArrowRight,
                  label: "Headline outcome",
                  value: `${project.impact.value} ${project.impact.label}`,
                },
              ].map(({ Icon, label, value }) => (
                <div key={label}>
                  <dt className="flex items-center gap-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-tertiary">
                    <Icon className="size-3.5" />
                    {label}
                  </dt>
                  <dd className="mt-1.5 text-sm font-medium">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap gap-1.5">
              {project.tools.map((tool) => (
                <Badge key={tool} size="sm" variant="outline">
                  {tool}
                </Badge>
              ))}
            </div>
          </Reveal>
        </div>
      </header>

      {/* Body */}
      <div className="shell py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_15rem] lg:gap-16">
          <div className="min-w-0 space-y-16 sm:space-y-20">
            {project.sections.map((section, i) => (
              <CaseStudySectionBlock
                key={sectionIds[i]}
                id={sectionIds[i]}
                section={section}
              />
            ))}
            <LessonsBlock lessons={project.lessons} />
          </div>

          <aside className="hidden lg:block">
            <CaseStudyToc items={toc} />
          </aside>
        </div>
      </div>

      {/* Next */}
      <div className="border-t border-border bg-surface-muted/40">
        <div className="shell py-14">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-tertiary">
                Next case study
              </p>
              <p className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
                {next.title}
              </p>
            </div>
            <Button asChild>
              <Link href={`/projects/${next.slug}`}>
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
