import { ArrowUpRight, Check, Lock } from "lucide-react";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

const washes: Record<string, string> = {
  sky: "from-sky-500/20",
  violet: "from-violet-500/20",
  emerald: "from-emerald-500/20",
  amber: "from-amber-500/20",
  rose: "from-rose-500/20",
};

/** Live, independently built products. Server component — no hydration. */
export function ProductsSection() {
  return (
    <Section id="products">
      <SectionHeader
        eyebrow="Shipped & Live"
        title="Four products, built end to end"
        description="Not prototypes. Each of these is deployed and reachable right now — I defined the problem, specified it, built it and shipped it. This is the part of the portfolio you can click rather than take my word for."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        {products.map((product, i) => (
          <Reveal key={product.name} delay={i * 0.06}>
            <article className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface shadow-[var(--shadow-sm)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-[var(--shadow-lg)]">
              <div
                aria-hidden
                className={cn(
                  "pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b to-transparent",
                  washes[product.accent]
                )}
              />

              <div className="relative flex flex-1 flex-col p-6 sm:p-7">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="accent" size="sm">
                    {product.category}
                  </Badge>
                  <span className="text-[0.7rem] text-tertiary">
                    {product.year}
                  </span>
                  <span aria-hidden className="text-tertiary">·</span>
                  <span className="text-[0.7rem] text-tertiary">
                    {product.role}
                  </span>
                </div>

                <div className="mt-4 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
                      {product.name}
                    </h3>
                    {product.deployedAs ? (
                      <p className="mt-1 text-xs text-tertiary">
                        Live as &ldquo;{product.deployedAs}&rdquo;
                      </p>
                    ) : null}
                  </div>
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${product.name} in a new tab`}
                    className="grid size-9 shrink-0 place-items-center rounded-full border border-border text-tertiary transition-colors duration-300 hover:border-accent/50 hover:text-accent-text"
                  >
                    <ArrowUpRight className="size-4" />
                  </a>
                </div>

                <p className="mt-2 text-[0.95rem] font-medium text-accent-text">
                  {product.tagline}
                </p>

                <p className="mt-3 text-sm leading-relaxed text-secondary">
                  {product.description}
                </p>

                <ul className="mt-5 space-y-2">
                  {product.highlights.map((h) => (
                    <li key={h} className="flex gap-2.5">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-positive" />
                      <span className="text-[0.82rem] leading-relaxed text-secondary">
                        {h}
                      </span>
                    </li>
                  ))}
                </ul>

                {product.gated ? (
                  <p className="mt-4 flex items-start gap-2 rounded-xl border border-border bg-surface-muted/50 px-3.5 py-2.5 text-[0.75rem] leading-relaxed text-tertiary">
                    <Lock className="mt-0.5 size-3.5 shrink-0" />
                    {product.gated}
                  </p>
                ) : null}

                <div className="mt-auto pt-6">
                  <div className="flex flex-wrap gap-1.5">
                    {product.stack.map((tech) => (
                      <Badge key={tech} size="sm" variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <a
                    href={product.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent-text hover:underline"
                  >
                    {new URL(product.url).host}
                    <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
