import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";

import { profile } from "@/data/profile";
import { GitHubIcon, LinkedInIcon, MediumIcon } from "@/components/icons/brand";
import { PageHeader } from "@/components/page-header";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${profile.fullName} — Business Analyst and Product Analyst.`,
};

const channels = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    Icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "Connect professionally",
    href: profile.links.linkedin,
    Icon: LinkedInIcon,
  },
  {
    label: "GitHub",
    value: "Code and automation projects",
    href: profile.links.github,
    Icon: GitHubIcon,
  },
  {
    label: "Medium",
    value: "Longer-form writing",
    href: profile.links.medium,
    Icon: MediumIcon,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk about the problem"
        description="Hiring, consulting, or just a question about something on this site — all welcome. I reply to everything that isn't a template."
      />

      <div className="shell py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_20rem] lg:gap-14">
          <Reveal className="order-2 lg:order-1">
            <div className="rounded-[var(--radius-card)] border border-border bg-surface p-6 shadow-[var(--shadow-sm)] sm:p-8">
              <h2 className="text-xl font-semibold tracking-tight">
                Send a message
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-secondary">
                The more specific you are about what&rsquo;s not working, the more
                useful my reply will be.
              </p>
              <div className="mt-7">
                <ContactForm />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="order-1 lg:order-2">
            <div className="space-y-4">
              <div className="rounded-[var(--radius-card)] border border-border bg-surface p-6">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-tertiary">
                  Based in
                </p>
                <p className="mt-2.5 flex items-center gap-2 text-[0.95rem] font-medium">
                  <MapPin className="size-4 text-accent-text" />
                  {profile.location}
                </p>
                <p className="mt-4 border-t border-border pt-4 text-sm leading-relaxed text-secondary">
                  {profile.availability}. Open to remote and hybrid roles.
                </p>
              </div>

              <ul className="space-y-2.5">
                {channels.map(({ label, value, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="group flex items-center gap-4 rounded-[var(--radius-card)] border border-border bg-surface p-4 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[var(--shadow-sm)]"
                    >
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-surface-muted text-secondary transition-colors duration-300 group-hover:bg-accent/12 group-hover:text-accent-text">
                        <Icon className="size-[18px]" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-medium">{label}</span>
                        <span className="block truncate text-xs text-tertiary">
                          {value}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
