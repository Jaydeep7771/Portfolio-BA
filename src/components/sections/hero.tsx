import Link from "next/link";
import { ArrowRight, Download, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/button";
import { RotatingRole } from "@/components/sections/rotating-role";
import { HeroDashboard } from "@/components/viz/hero-dashboard";

/**
 * Server component. The entrance is CSS (`fade-up`) rather than Framer so the
 * hero — which contains the LCP element — paints before hydration. Only the
 * role rotator and the dashboard are client islands.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-12 sm:pb-24 sm:pt-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 grid-backdrop" />

      <div className="shell">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
          {/* Copy */}
          <div>
            <div className="fade-up inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-secondary shadow-[var(--shadow-xs)]">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full rounded-full bg-emerald-500 opacity-60 animate-pulse-ring" />
                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
              </span>
              {profile.availability}
            </div>

            <h1
              className="rise-up mt-6 text-[2.6rem] font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.1rem]"
              style={{ animationDelay: "80ms" }}
            >
              Hi, I&rsquo;m {profile.firstName}.
            </h1>

            <p
              className="rise-up mt-3 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl lg:text-[2.4rem]"
              style={{ animationDelay: "160ms" }}
            >
              <RotatingRole />
            </p>

            {/* LCP element — must paint without waiting for JS. */}
            <p
              className="rise-up mt-6 max-w-xl text-base leading-relaxed text-secondary sm:text-lg"
              style={{ animationDelay: "240ms" }}
            >
              {profile.tagline}
            </p>

            <div
              className="fade-up mt-9 flex flex-wrap items-center gap-3"
              style={{ animationDelay: "320ms" }}
            >
              <Button asChild size="lg">
                <Link href="/projects">
                  View Projects
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={profile.resumePath} download>
                  <Download />
                  Download Resume
                </a>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link href="/contact">
                  <Mail />
                  Contact Me
                </Link>
              </Button>
            </div>
          </div>

          {/* Illustration */}
          <div className="lg:pl-6">
            <HeroDashboard />
          </div>
        </div>
      </div>
    </section>
  );
}
