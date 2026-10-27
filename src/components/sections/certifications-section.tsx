"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { certifications } from "@/data/skills";
import { Badge } from "@/components/ui/badge";
import { Section, SectionHeader } from "@/components/ui/section";
import { staggerItem, staggerParent } from "@/components/ui/reveal";

export function CertificationsSection() {
  // Nothing to show is better than a section with an empty grid under it.
  if (certifications.length === 0) return null;

  return (
    <Section id="certifications">
      <SectionHeader
        eyebrow="Certifications"
        title="Formal grounding"
        description="Credentials across business analysis, Agile delivery, analytics and applied AI."
      />

      <motion.ul
        variants={staggerParent}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0 }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {certifications.map((cert) => (
          <motion.li
            key={cert.name}
            variants={staggerItem}
            className="group relative overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface p-5 shadow-[var(--shadow-sm)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-[var(--shadow-md)]"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 size-28 rounded-full bg-accent/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
            />
            <div className="relative">
              <div className="flex items-start justify-between gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-accent/12 text-accent-text">
                  <Award className="size-5" />
                </span>
                <span className="font-mono text-[0.68rem] text-tertiary">
                  {cert.year}
                </span>
              </div>

              <h3 className="mt-4 text-[0.95rem] font-semibold leading-snug">
                {cert.name}
              </h3>
              <p className="mt-1 text-sm text-secondary">{cert.issuer}</p>

              {cert.credentialId ? (
                <p className="mt-2 font-mono text-[0.65rem] text-tertiary">
                  ID {cert.credentialId}
                </p>
              ) : null}

              <div className="mt-4 flex flex-wrap gap-1.5">
                {cert.skills.map((skill) => (
                  <Badge key={skill} size="sm" variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
}
