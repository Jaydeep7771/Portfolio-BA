import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";

import { blogPosts, getPost } from "@/data/blog";
import { profile } from "@/data/profile";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Article } from "@/components/article";
import { Reveal } from "@/components/ui/reveal";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article not found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const index = blogPosts.findIndex((p) => p.slug === slug);
  const next = blogPosts[(index + 1) % blogPosts.length];

  return (
    <article>
      <header className="border-b border-border">
        <div className="shell py-14 sm:py-18">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-secondary transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            All articles
          </Link>

          <Reveal className="mt-8 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="accent" size="sm">
                {post.category}
              </Badge>
              <span className="flex items-center gap-1 text-[0.7rem] text-tertiary">
                <Clock className="size-3" />
                {post.readingMinutes} min read
              </span>
              <span aria-hidden className="text-tertiary">·</span>
              <time dateTime={post.date} className="text-[0.7rem] text-tertiary">
                {formatDate(post.date)}
              </time>
            </div>

            <h1 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-[3rem]">
              {post.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-secondary">
              {post.excerpt}
            </p>

            <div className="mt-8 flex items-center gap-3 border-t border-border pt-6">
              <span className="grid size-9 place-items-center rounded-full bg-primary text-sm font-bold text-background">
                {profile.firstName.charAt(0)}
              </span>
              <div>
                <p className="text-sm font-medium">{profile.fullName}</p>
                <p className="text-xs text-tertiary">
                  Business Analyst · Product Analyst
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </header>

      <div className="shell py-12 sm:py-16">
        <Article blocks={post.body} />
      </div>

      <div className="border-t border-border bg-surface-muted/40">
        <div className="shell py-14">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div className="max-w-xl">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-tertiary">
                Read next
              </p>
              <p className="mt-2 text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
                {next.title}
              </p>
            </div>
            <Button asChild>
              <Link href={`/blog/${next.slug}`}>
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
