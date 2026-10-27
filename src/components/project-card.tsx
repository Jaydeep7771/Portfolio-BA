import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

/** Generated cover art, keyed to the project's accent. No image assets. */
const covers: Record<Project["accent"], string> = {
  sky: "from-sky-500/22 via-sky-500/8 to-transparent",
  violet: "from-violet-500/22 via-violet-500/8 to-transparent",
  emerald: "from-emerald-500/22 via-emerald-500/8 to-transparent",
  amber: "from-amber-500/22 via-amber-500/8 to-transparent",
  rose: "from-rose-500/22 via-rose-500/8 to-transparent",
};

export function ProjectCard({
  project,
  className,
  /**
   * The card title's heading level. On the projects index the cards sit
   * directly under the page h1, so they are h2; on the homepage they sit
   * inside a section that already has an h2, so they are h3. Hardcoding
   * either one breaks heading order on the other page.
   */
  headingLevel = 3,
}: {
  project: Project;
  className?: string;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface shadow-[var(--shadow-sm)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-[var(--shadow-lg)]",
        className
      )}
    >
      {/* Cover */}
      <div className="relative h-36 overflow-hidden border-b border-border">
        <div
          aria-hidden
          className={cn("absolute inset-0 bg-gradient-to-br", covers[project.accent])}
        />
        <div aria-hidden className="absolute inset-0 grid-backdrop opacity-50" />

        <div className="relative flex h-full flex-col justify-between p-5">
          <div className="flex items-start justify-between gap-3">
            <Badge variant="outline" size="sm" className="bg-surface/70 backdrop-blur">
              {project.role}
            </Badge>
            <span className="grid size-8 place-items-center rounded-full border border-border bg-surface/70 text-tertiary backdrop-blur transition-colors duration-300 group-hover:border-accent/50 group-hover:text-accent-text">
              <ArrowUpRight className="size-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold tracking-tight">
              {project.impact.value}
            </span>
            <span className="text-xs text-secondary">{project.impact.label}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-[0.68rem] text-tertiary">
          <span>{project.org}</span>
          <span aria-hidden>·</span>
          <span>{project.period}</span>
        </div>

        <Heading className="mt-2 text-lg font-semibold leading-snug transition-colors duration-300 group-hover:text-accent-text">
          {project.title}
        </Heading>

        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-secondary">
          {project.summary}
        </p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Badge key={tag} size="sm">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </Link>
  );
}
