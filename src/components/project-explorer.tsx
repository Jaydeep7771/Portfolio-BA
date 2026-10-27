"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { TAGS, type Project, type Tag } from "@/data/types";
import { cn } from "@/lib/utils";
import { ProjectCard } from "@/components/project-card";

/** Search across the fields a recruiter would actually type into. */
function matchesQuery(project: Project, query: string) {
  if (!query) return true;
  const haystack = [
    project.title,
    project.summary,
    project.org,
    project.role,
    ...project.tags,
    ...project.tools,
  ]
    .join(" ")
    .toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

export function ProjectExplorer({ projects }: { projects: Project[] }) {
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState<Tag[]>([]);

  const toggleTag = (tag: Tag) =>
    setActive((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );

  const results = React.useMemo(
    () =>
      projects.filter(
        (p) =>
          matchesQuery(p, query) &&
          (active.length === 0 || active.every((t) => p.tags.includes(t)))
      ),
    [projects, query, active]
  );

  const filtered = query !== "" || active.length > 0;

  /** Tag counts against the current text query, so counts stay honest. */
  const counts = React.useMemo(() => {
    const base = projects.filter((p) => matchesQuery(p, query));
    return Object.fromEntries(
      TAGS.map((tag) => [tag, base.filter((p) => p.tags.includes(tag)).length])
    ) as Record<Tag, number>;
  }, [projects, query]);

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col gap-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-tertiary" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, tools or outcomes…"
            aria-label="Search projects"
            className="h-12 w-full rounded-full border border-border bg-surface pl-11 pr-11 text-sm text-primary shadow-[var(--shadow-xs)] outline-none transition-colors duration-200 placeholder:text-tertiary focus:border-accent/50"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3.5 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-tertiary transition-colors hover:text-primary"
            >
              <X className="size-4" />
            </button>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 flex items-center gap-1.5 text-xs text-tertiary">
            <SlidersHorizontal className="size-3.5" />
            Filter
          </span>
          {TAGS.map((tag) => {
            const isActive = active.includes(tag);
            const count = counts[tag];
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                aria-pressed={isActive}
                disabled={count === 0 && !isActive}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.97]",
                  isActive
                    ? "border-transparent bg-primary text-background"
                    : "border-border bg-surface text-secondary hover:border-border-strong hover:text-primary",
                  count === 0 && !isActive && "opacity-35 hover:border-border"
                )}
              >
                {tag}
                <span className="ml-1.5 tabular-nums opacity-60">{count}</span>
              </button>
            );
          })}

          {filtered ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActive([]);
              }}
              className="rounded-full px-3 py-1.5 text-xs font-medium text-accent-text transition-colors hover:underline"
            >
              Reset
            </button>
          ) : null}
        </div>

        <p aria-live="polite" className="text-xs text-tertiary">
          {results.length} {results.length === 1 ? "project" : "projects"}
          {filtered ? " matching" : ""}
        </p>
      </div>

      {/* Results */}
      <div className="mt-8">
        {results.length > 0 ? (
          <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {results.map((project) => (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProjectCard project={project} headingLevel={2} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="rounded-[var(--radius-card)] border border-dashed border-border-strong px-6 py-16 text-center">
            <p className="text-sm font-medium">No projects match that.</p>
            <p className="mt-1.5 text-sm text-secondary">
              Try a broader term, or reset the filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
