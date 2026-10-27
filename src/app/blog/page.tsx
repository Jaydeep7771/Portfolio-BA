import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on business analysis, product thinking, analytics and applied AI — written from the work rather than about it.",
};

const washes: Record<string, string> = {
  sky: "from-sky-500/20",
  violet: "from-violet-500/20",
  emerald: "from-emerald-500/20",
  amber: "from-amber-500/20",
  rose: "from-rose-500/20",
};

export default function BlogIndex() {
  const [lead, ...rest] = blogPosts;

  return (
    <>
      <PageHeader
        eyebrow="Writing"
        title="Notes on the craft"
        description="What I've learned doing the work, written down while it's still specific enough to be useful. Mostly about where I got it wrong first."
      />

      <div className="shell py-12 sm:py-16">
        {/* Lead article */}
        <Reveal>
          <Link
            href={`/blog/${lead.slug}`}
            className="group relative block overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface p-7 shadow-[var(--shadow-sm)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-[var(--shadow-lg)] sm:p-10"
          >
            <div
              aria-hidden
              className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${
                washes[lead.accent]
              } via-transparent to-transparent`}
            />
            <div className="relative max-w-3xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <Badge variant="accent" size="sm">
                  Latest
                </Badge>
                <span className="text-[0.7rem] text-tertiary">{lead.category}</span>
                <span aria-hidden className="text-tertiary">·</span>
                <span className="flex items-center gap-1 text-[0.7rem] text-tertiary">
                  <Clock className="size-3" />
                  {lead.readingMinutes} min read
                </span>
              </div>

              <h2 className="mt-5 text-3xl font-semibold leading-[1.12] tracking-tight transition-colors duration-300 group-hover:text-accent-text sm:text-[2.5rem]">
                {lead.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-secondary sm:text-lg">
                {lead.excerpt}
              </p>

              <div className="mt-7 flex items-center gap-4">
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-text">
                  Read the article
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <time dateTime={lead.date} className="text-xs text-tertiary">
                  {formatDate(lead.date)}
                </time>
              </div>
            </div>
          </Link>
        </Reveal>

        {/* Rest */}
        <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.05}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-[var(--radius-card)] border border-border bg-surface p-6 shadow-[var(--shadow-sm)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-[var(--shadow-md)]"
              >
                <div className="flex items-center gap-2 text-[0.68rem] text-tertiary">
                  <span>{post.category}</span>
                  <span aria-hidden>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-3" />
                    {post.readingMinutes} min
                  </span>
                </div>

                <h3 className="mt-3 text-lg font-semibold leading-snug transition-colors duration-300 group-hover:text-accent-text">
                  {post.title}
                </h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-secondary">
                  {post.excerpt}
                </p>

                <time dateTime={post.date} className="mt-5 text-xs text-tertiary">
                  {formatDate(post.date)}
                </time>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
