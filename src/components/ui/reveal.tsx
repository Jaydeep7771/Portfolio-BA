"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO, staggerItem, staggerParent } from "@/lib/motion";

export { EASE_OUT_EXPO as easeOutExpo, staggerItem, staggerParent };

/**
 * Latches true once the element has been seen — and immediately if it is
 * already at or above the fold.
 *
 * The second case matters: a hash link jumps past intervening sections, so
 * they never intersect and a naive "animate when it enters the viewport"
 * would leave them invisible forever. Content being invisible is a far worse
 * failure than an animation being skipped, so this biases toward showing.
 */
export function useRevealed(ref: React.RefObject<HTMLElement | null>) {
  const [shown, setShown] = React.useState(false);

  React.useEffect(() => {
    if (shown) return;
    const el = ref.current;
    if (!el) return;

    // On screen, or already scrolled past.
    const passed = () => el.getBoundingClientRect().top < window.innerHeight;

    if (passed()) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px", threshold: 0 }
    );
    observer.observe(el);

    // Covers the hash-jump case, where the element never intersects because
    // the browser lands below it.
    const onScroll = () => {
      if (passed()) {
        setShown(true);
        observer.disconnect();
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [ref, shown]);

  return shown;
}

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds. Keep small; this should feel like settling, not choreography. */
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "article" | "span";
};

/** Scroll-triggered fade + rise, in CSS. No animation library. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 18,
  as: Tag = "div",
}: RevealProps) {
  const ref = React.useRef<HTMLElement>(null);
  const shown = useRevealed(ref);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={cn("reveal", shown && "reveal-in", className)}
      style={
        {
          "--reveal-delay": `${delay}s`,
          "--reveal-y": `${y}px`,
        } as React.CSSProperties
      }
    >
      {children}
    </Tag>
  );
}

/** Staggered variant: children fade in one after another. */
export function StaggerGroup({
  children,
  className,
  step = 0.07,
}: {
  children: React.ReactNode;
  className?: string;
  step?: number;
}) {
  return (
    <div className={cn(className)}>
      {React.Children.map(children, (child, i) => (
        <Reveal delay={i * step}>{child}</Reveal>
      ))}
    </div>
  );
}
