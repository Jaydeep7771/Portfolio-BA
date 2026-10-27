import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { GitHubIcon, LinkedInIcon, MediumIcon } from "@/components/icons/brand";

const columns = [
  {
    title: "Work",
    links: [
      { href: "/#products", label: "Live Products" },
      { href: "/projects", label: "Projects" },
      { href: "/case-studies", label: "Product Case Studies" },
      { href: "/resume", label: "Resume" },
    ],
  },
  {
    title: "Writing",
    links: [
      { href: "/blog", label: "All Articles" },
      { href: "/blog/ai-transforming-business-analysis", label: "AI & Business Analysis" },
      { href: "/blog/writing-better-user-stories", label: "Better User Stories" },
    ],
  },
  {
    title: "Connect",
    links: [
      { href: "/contact", label: "Contact" },
      { href: profile.links.linkedin, label: "LinkedIn", external: true },
      { href: profile.links.github, label: "GitHub", external: true },
    ],
  },
];

const socials = [
  { href: profile.links.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  { href: profile.links.github, label: "GitHub", Icon: GitHubIcon },
  { href: profile.links.medium, label: "Medium", Icon: MediumIcon },
  { href: `mailto:${profile.email}`, label: "Email", Icon: Mail },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="shell py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <p className="text-lg font-semibold tracking-tight">
              {profile.firstName}
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-secondary">
              {profile.shortBio}
            </p>
            <p className="mt-5 flex items-center gap-2 text-sm text-tertiary">
              <MapPin className="size-4" />
              {profile.location}
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-tertiary">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-secondary transition-colors hover:text-primary"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-secondary transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-6 border-t border-border pt-7 sm:flex-row sm:items-center">
          <p className="text-xs text-tertiary">
            © {new Date().getFullYear()} {profile.fullName}. Built with Next.js,
            Tailwind CSS and Framer Motion.
          </p>
          <ul className="flex items-center gap-2">
            {socials.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={label}
                  className="grid size-9 place-items-center rounded-full border border-border text-secondary transition-colors hover:border-border-strong hover:text-primary"
                >
                  <Icon className="size-[17px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
