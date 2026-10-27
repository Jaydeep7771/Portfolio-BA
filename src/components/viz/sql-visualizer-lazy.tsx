"use client";

import * as React from "react";
import dynamic from "next/dynamic";

const SqlVisualizer = dynamic(
  () => import("@/components/viz/sql-visualizer").then((m) => m.SqlVisualizer),
  { ssr: false, loading: () => <Placeholder /> }
);

function Placeholder() {
  return (
    <div
      className="h-[26rem] animate-pulse rounded-[var(--radius-card)] border border-border bg-surface-muted/50"
      aria-hidden
    />
  );
}

/**
 * Loads the SQL walkthrough only once it is near the viewport.
 *
 * It is the heaviest interactive component on the homepage, sits well below
 * the fold, and is a demonstration rather than content — nothing in it needs
 * to be in the initial HTML or the initial bundle.
 */
export function SqlVisualizerLazy() {
  const ref = React.useRef<HTMLDivElement>(null);
  const [near, setNear] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || near) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      // Start fetching a screen early so it is ready by the time it is read.
      { rootMargin: "600px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [near]);

  return <div ref={ref}>{near ? <SqlVisualizer /> : <Placeholder />}</div>;
}
