"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

/**
 * Theme switch. The icon crossfade is a CSS transition rather than an
 * animation library — this component sits in the root layout, so anything it
 * imports is loaded on every route.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={
        mounted ? `Switch to ${isDark ? "light" : "dark"} mode` : "Toggle theme"
      }
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative grid size-10 place-items-center rounded-full border border-border bg-surface text-secondary transition-colors duration-200 hover:border-border-strong hover:text-primary"
    >
      {/* Both icons are always present; opacity and rotation pick one. Nothing
          theme-dependent renders until mounted, to avoid a hydration mismatch. */}
      <Sun
        className="absolute size-[18px] transition-[opacity,transform] duration-200 ease-out"
        style={{
          opacity: mounted && !isDark ? 1 : 0,
          transform: mounted && !isDark ? "none" : "rotate(-70deg) scale(0.6)",
        }}
      />
      <Moon
        className="absolute size-[18px] transition-[opacity,transform] duration-200 ease-out"
        style={{
          opacity: mounted && isDark ? 1 : 0,
          transform: mounted && isDark ? "none" : "rotate(70deg) scale(0.6)",
        }}
      />
    </button>
  );
}
