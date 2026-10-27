import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { headlineStats, profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { productCaseStudies } from "@/data/case-studies";
import { blogPosts } from "@/data/blog";
import { formatDate } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Hero } from "@/components/sections/hero";
import { ProductsSection } from "@/components/sections/products-section";
import { TimelineSection } from "@/components/sections/timeline-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { CertificationsSection } from "@/components/sections/certifications-section";
import { ProjectCard } from "@/components/project-card";
import { KpiGrid } from "@/components/viz/kpi-grid";
import { SqlVisualizerLazy } from "@/components/viz/sql-visualizer-lazy";

export default function HomePage() {
  const featured = projects.filter((p) => p.featured);
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <>
      <Hero />

      {/* Headline numbers */}
      <Section tight className="pt-0 sm:pt-0">
        <KpiGrid items={headlineStats} />
      </Section>

      <ProductsSection />
      <TimelineSection />
      <SkillsSection />

      {/* Featured work */}
      <Section id="work">
        <SectionHeader
          eyebrow="Selected Work"
          title="Problems, and what changed"
          description="Each case study carries the full trail — the business problem, the research that reframed it, the requirements, and the measured outcome."
          action={
            <Button asChild variant="outline">
              <Link href="/projects">
                All projects
                <ArrowRight />
              </Link>
            </Button>
          }
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.07}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* SQL visualizer */}
      <Section className="bg-surface-muted/40">
        <SectionHeader
          eyebrow="How I Think"
          title="A query is a sequence of decisions"
          description="Most people read SQL top to bottom. It doesn't execute that way, and the difference is where a surprising number of reporting bugs live. Step through it."
        />
        <Reveal>
          <SqlVisualizerLazy />
        </Reveal>
      </Section>

      {/* Product case studies */}
      <Section>
        <SectionHeader
          eyebrow="Product Teardowns"
          title="Self-directed product thinking"
          description="Unpaid, unasked-for analyses of products I use. Journey maps, competitive analysis, prioritised solutions and the metrics that would prove them."
          action={
            <Button asChild variant="outline">
              <Link href="/case-studies">
                All teardowns
                <ArrowRight />
              </Link>
            </Button>
          }
        />
        <div className="grid gap-5 md:grid-cols-3">
          {productCaseStudies.map((study, i) => (
            <Reveal key={study.slug} delay={i * 0.07}>
              <Link
                href={`/case-studies/${study.slug}`}
                className="group flex h-full flex-col rounded-[var(--radius-card)] border border-border bg-surface p-6 shadow-[var(--shadow-sm)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-[var(--shadow-md)]"
              >
                <Badge variant="accent" size="sm" className="w-fit">
                  {study.product}
                </Badge>
                <h3 className="mt-4 text-lg font-semibold leading-snug transition-colors duration-300 group-hover:text-accent-text">
                  {study.title}
                </h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-secondary">
                  {study.summary}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent-text">
                  Read the teardown
                  <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <CertificationsSection />

      {/* Writing */}
      <Section className="bg-surface-muted/40">
        <SectionHeader
          eyebrow="Writing"
          title="Notes on the craft"
          description="What I've learned doing the work, written down while it's still specific enough to be useful."
          action={
            <Button asChild variant="outline">
              <Link href="/blog">
                All articles
                <ArrowRight />
              </Link>
            </Button>
          }
        />
        <div className="grid gap-5 md:grid-cols-3">
          {latestPosts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.07}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-[var(--radius-card)] border border-border bg-surface p-6 shadow-[var(--shadow-sm)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-[var(--shadow-md)]"
              >
                <div className="flex items-center gap-2 text-[0.68rem] text-tertiary">
                  <span>{post.category}</span>
                  <span aria-hidden>·</span>
                  <span>{post.readingMinutes} min</span>
                </div>
                <h3 className="mt-3 text-lg font-semibold leading-snug transition-colors duration-300 group-hover:text-accent-text">
                  {post.title}
                </h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-secondary">
                  {post.excerpt}
                </p>
                <time
                  dateTime={post.date}
                  className="mt-5 text-xs text-tertiary"
                >
                  {formatDate(post.date)}
                </time>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Closing CTA */}
      <Section>
        <Reveal className="relative overflow-hidden rounded-[2rem] border border-border bg-surface px-6 py-16 text-center shadow-[var(--shadow-md)] sm:px-12 sm:py-20">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-0 size-80 -translate-x-1/2 rounded-full bg-accent/12 blur-[90px]" />
          </div>
          <div className="relative mx-auto max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs text-secondary">
              <Sparkles className="size-3.5 text-accent-text" />
              {profile.availability}
            </span>
            <h2 className="mt-6 text-3xl font-semibold leading-tight sm:text-4xl">
              Have a problem that needs framing before it needs building?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-secondary sm:text-lg">
              That&rsquo;s the part I enjoy most. Tell me what&rsquo;s not working
              and I&rsquo;ll tell you what I&rsquo;d look at first.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <Link href="/contact">
                  Start a conversation
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/resume">View resume</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
