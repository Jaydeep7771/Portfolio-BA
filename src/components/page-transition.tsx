"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

/**
 * Fades route content in on navigation.
 *
 * Keyed on pathname so React remounts the subtree and the CSS animation
 * replays. In the root layout, so it stays library-free.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Keying on pathname replays the entrance animation per route, but it also
  // remounts the subtree — which destroys the element the browser had already
  // scrolled to for a `#hash` URL, leaving the visitor at the top of the page.
  // Re-apply the hash ourselves once the new content is mounted. This also
  // covers client-side navigations to a hash, which the router does not scroll
  // for at all.
  React.useEffect(() => {
    const hash = window.location.hash;
    if (!hash || hash.length < 2) return;

    let raf = 0;
    let attempts = 0;

    // The target may not be laid out on the first frame after mount.
    const tryScroll = () => {
      const target = document.getElementById(
        decodeURIComponent(hash.slice(1))
      );
      if (target) {
        target.scrollIntoView({ block: "start" });
        return;
      }
      if (attempts++ < 10) raf = requestAnimationFrame(tryScroll);
    };

    raf = requestAnimationFrame(tryScroll);
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return (
    <main key={pathname} id="main" className="route-in pt-[var(--nav-height)]">
      {children}
    </main>
  );
}

/**
 * Thin accent bar under the nav tracking reading progress.
 *
 * A passive scroll listener writing one transform, rather than a spring.
 * Reads are batched into rAF so scrolling never triggers layout thrash.
 */
export function ScrollProgress() {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      el.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed inset-x-0 top-[var(--nav-height)] z-50 h-[2px] origin-left bg-accent"
      style={{ transform: "scaleX(0)" }}
    />
  );
}
