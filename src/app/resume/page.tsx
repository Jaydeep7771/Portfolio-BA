import type { Metadata } from "next";
import {
  Download,
  GraduationCap,
  Mail,
  MapPin,
  Printer,
} from "lucide-react";

import { profile } from "@/data/profile";
import { resume } from "@/data/resume";
import { certifications } from "@/data/skills";
import { products } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${profile.fullName} — Business Analyst, Product Analyst and AI automation engineer.`,
};

function SheetSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border pt-7 first:border-0 first:pt-0">
      <h2 className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-accent-text">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default function ResumePage() {
  return (
    <>
      <PageHeader
        eyebrow="Resume"
        title="The one-page version"
        description="The full document is below and downloadable as a PDF. The case studies carry the detail this format has to leave out."
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <a href={profile.resumePath} download>
              <Download />
              Download PDF
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href={`mailto:${profile.email}`}>
              <Mail />
              Email me
            </a>
          </Button>
        </div>
      </PageHeader>

      <div className="shell py-12 sm:py-16">
        <Reveal>
          {/* The sheet */}
          <div className="mx-auto max-w-4xl rounded-[var(--radius-card)] border border-border bg-surface p-7 shadow-[var(--shadow-md)] sm:p-12">
            {/* Masthead */}
            <div className="flex flex-col gap-5 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  {profile.fullName}
                </h2>
                <p className="mt-2 text-sm text-accent-text sm:text-base">
                  {profile.roles.join("  ·  ")}
                </p>
              </div>
              <ul className="space-y-1.5 text-sm text-secondary sm:text-right">
                <li className="flex items-center gap-2 sm:justify-end">
                  <Mail className="size-3.5 text-tertiary" />
                  {profile.email}
                </li>
                <li className="flex items-center gap-2 sm:justify-end">
                  <MapPin className="size-3.5 text-tertiary" />
                  {profile.location}
                </li>
              </ul>
            </div>

            <div className="mt-8 space-y-7">
              <SheetSection title="Summary">
                <p className="text-[0.95rem] leading-[1.75] text-secondary">
                  {resume.summary}
                </p>
              </SheetSection>

              <SheetSection title="Selected Outcomes">
                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {resume.highlights.map((h) => (
                    <li
                      key={h.label}
                      className="rounded-xl border border-border bg-surface-muted/40 p-4"
                    >
                      <p className="text-2xl font-semibold tracking-tight tabular-nums">
                        {h.value}
                      </p>
                      <p className="mt-1 text-xs leading-snug text-secondary">
                        {h.label}
                      </p>
                    </li>
                  ))}
                </ul>
              </SheetSection>

              <SheetSection title="Experience">
                <ol className="space-y-8">
                  {resume.experience.map((job) => (
                    <li key={`${job.title}-${job.period}`}>
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                        <div>
                          <h3 className="text-[1.0625rem] font-semibold leading-snug">
                            {job.title}
                          </h3>
                          <p className="text-sm text-accent-text">{job.org}</p>
                        </div>
                        <p className="shrink-0 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-tertiary">
                          {job.period} · {job.location}
                        </p>
                      </div>
                      <ul className="mt-3.5 space-y-2">
                        {job.points.map((point) => (
                          <li key={point} className="flex gap-2.5">
                            <span
                              aria-hidden
                              className="mt-[0.55rem] size-1 shrink-0 rounded-full bg-accent"
                            />
                            <span className="text-sm leading-relaxed text-secondary">
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ol>
              </SheetSection>

              <SheetSection title="Live Products">
                <ul className="space-y-4">
                  {products.map((product) => (
                    <li key={product.name}>
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                        <h3 className="text-[1.0625rem] font-semibold leading-snug">
                          {product.name}
                          <span className="font-normal text-secondary">
                            {" "}
                            — {product.category}
                          </span>
                        </h3>
                        <a
                          href={product.url}
                          target="_blank"
                          rel="noreferrer"
                          className="shrink-0 font-mono text-[0.7rem] text-accent-text hover:underline"
                        >
                          {new URL(product.url).host}
                        </a>
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-secondary">
                        {product.tagline} {product.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </SheetSection>

              <SheetSection title="Business & Technology Projects">
                <ul className="space-y-6">
                  {resume.projects.map((project) => (
                    <li key={project.title}>
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                        <h3 className="text-[1.0625rem] font-semibold leading-snug">
                          {project.title}
                        </h3>
                        <p className="shrink-0 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-tertiary">
                          {project.meta}
                        </p>
                      </div>
                      <ul className="mt-3 space-y-2">
                        {project.points.map((point) => (
                          <li key={point} className="flex gap-2.5">
                            <span
                              aria-hidden
                              className="mt-[0.55rem] size-1 shrink-0 rounded-full bg-accent"
                            />
                            <span className="text-sm leading-relaxed text-secondary">
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </SheetSection>

              <SheetSection title="Skills">
                <div className="grid gap-5 sm:grid-cols-2">
                  {resume.skillGroups.map((group) => (
                    <div key={group.title}>
                      <p className="text-sm font-semibold">{group.title}</p>
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {group.items.map((item) => (
                          <Badge key={item} size="sm" variant="outline">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </SheetSection>

              <SheetSection title="Education">
                {resume.education.map((edu) => (
                  <div key={edu.degree} className="flex gap-4">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent/12 text-accent-text">
                      <GraduationCap className="size-[18px]" />
                    </span>
                    <div>
                      <h3 className="text-[1.0625rem] font-semibold leading-snug">
                        {edu.degree}
                      </h3>
                      <p className="text-sm text-secondary">
                        {edu.org} · {edu.period}
                      </p>
                      <ul className="mt-2 space-y-1.5">
                        {edu.points.map((p) => (
                          <li key={p} className="text-sm leading-relaxed text-secondary">
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </SheetSection>

              {certifications.length > 0 ? (
              <SheetSection title="Certifications">
                <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {certifications.map((cert) => (
                    <li
                      key={cert.name}
                      className="flex items-baseline justify-between gap-4"
                    >
                      <span className="text-sm">
                        <span className="font-medium">{cert.name}</span>
                        <span className="text-secondary"> — {cert.issuer}</span>
                      </span>
                      <span className="shrink-0 font-mono text-[0.7rem] text-tertiary">
                        {cert.year}
                      </span>
                    </li>
                  ))}
                </ul>
              </SheetSection>
              ) : null}
            </div>
          </div>
        </Reveal>

        <p className="mx-auto mt-6 flex max-w-4xl items-center justify-center gap-2 text-xs text-tertiary">
          <Printer className="size-3.5" />
          Prints cleanly from the browser, or download the PDF above.
        </p>
      </div>
    </>
  );
}
