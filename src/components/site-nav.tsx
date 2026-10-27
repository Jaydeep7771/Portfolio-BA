"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/#products", label: "Products" },
  { href: "/projects", label: "Projects" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/blog", label: "Blog" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

/**
 * Library-free by design: this renders on every route, so an animation
 * library imported here is an animation library downloaded for the resume
 * page. The active-link pill and the mobile sheet are CSS transitions.
 */
export function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 12);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Close the mobile sheet whenever the route changes.
  React.useEffect(() => setOpen(false), [pathname]);

  // Lock body scroll while the sheet is open.
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape closes the sheet.
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300",
          scrolled
            ? "glass border-b border-border shadow-[var(--shadow-xs)]"
            : "border-b border-transparent"
        )}
      >
        <nav
          aria-label="Primary"
          className="shell flex h-[var(--nav-height)] items-center justify-between gap-4"
        >
          <Link
            href="/"
            className="group flex items-center gap-2.5 text-[0.95rem] font-semibold tracking-tight"
          >
            <span className="grid size-8 place-items-center rounded-lg bg-primary text-[0.8rem] font-bold text-background">
              {profile.firstName.charAt(0)}
            </span>
            <span className="hidden sm:inline">{profile.firstName}</span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative rounded-full px-3.5 py-2 text-sm transition-colors duration-200",
                      active
                        ? "bg-surface-muted text-primary"
                        : "text-secondary hover:bg-surface-muted/60 hover:text-primary"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <a href={profile.resumePath} download>
                Resume
                <ArrowUpRight />
              </a>
            </Button>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid size-10 place-items-center rounded-full border border-border bg-surface text-primary md:hidden"
            >
              {open ? <X className="size-[18px]" /> : <Menu className="size-[18px]" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile sheet — kept mounted so it can transition both ways. */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/95 backdrop-blur-xl transition-opacity duration-200 md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        aria-hidden={!open}
      >
        <ul className="shell flex flex-col gap-1 pt-[calc(var(--nav-height)+1.5rem)]">
          {links.map((link, i) => (
            <li
              key={link.href}
              className={open ? "fade-up" : undefined}
              style={open ? { animationDelay: `${i * 40}ms` } : undefined}
            >
              <Link
                href={link.href}
                tabIndex={open ? undefined : -1}
                className="flex items-center justify-between border-b border-border py-4 text-xl font-medium"
              >
                {link.label}
                <ArrowUpRight className="size-5 text-tertiary" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
