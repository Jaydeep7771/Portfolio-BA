"use client";

import * as React from "react";

/**
 * First-visit loading treatment.
 *
 * This used to be a full-screen curtain. It looked good and it cost roughly
 * 1.7s of perceived load on throttled mobile, because the hero is painted
 * underneath but not *visible* until the curtain leaves. An occluding loader
 * and a fast first paint cannot both exist.
 *
 * So the loading signal is a slim bar across the top. It never covers
 * content, never locks scrolling, and is plain CSS — this sits in the root
 * layout, so anything it imports loads on every route.
 */
export function Preloader() {
  const [state, setState] = React.useState<"idle" | "running" | "done">("idle");

  React.useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("preloader-seen") === "1";
    } catch {
      // Private mode or blocked storage — just skip it.
      seen = true;
    }
    if (seen) return;

    setState("running");
    const timer = window.setTimeout(() => {
      setState("done");
      try {
        sessionStorage.setItem("preloader-seen", "1");
      } catch {
        /* ignore */
      }
    }, 900);

    return () => window.clearTimeout(timer);
  }, []);

  if (state === "idle") return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[3px] overflow-hidden transition-opacity duration-500"
      style={{ opacity: state === "done" ? 0 : 1 }}
    >
      <div
        className="h-full origin-left bg-accent"
        style={{
          animation: "grow-bar-x-full 0.85s cubic-bezier(0.16,1,0.3,1) both",
        }}
      />
    </div>
  );
}
