"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/data/profile";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Cycles the role titles.
 *
 * The first role is rendered opaque on the server, so this line is readable
 * before hydration — nothing above the fold may depend on JS to become
 * visible. Only the transition between roles needs the client.
 */
export function RotatingRole() {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const roles = profile.roles;

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    if (reduced || !mounted) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % roles.length),
      2600
    );
    return () => window.clearInterval(id);
  }, [reduced, mounted, roles.length]);

  if (reduced) {
    return <span className="text-accent-text">{roles.join(" · ")}</span>;
  }

  return (
    <span className="relative inline-grid overflow-hidden align-bottom">
      {/* Invisible sizer holds the height so the line doesn't reflow as the
          role changes. It must wrap exactly as the visible items do, so none
          of them may be nowrap — at phone width the longest role is two lines. */}
      <span aria-hidden className="col-start-1 row-start-1 invisible">
        {roles.reduce((a, b) => (a.length > b.length ? a : b))}
      </span>
      {roles.map((role, i) => (
        <motion.span
          key={role}
          aria-hidden={i !== index}
          className="col-start-1 row-start-1 text-accent-text"
          initial={false}
          animate={
            i === index
              ? { y: "0%", opacity: 1 }
              : { y: i < index ? "-110%" : "110%", opacity: 0 }
          }
          transition={{ duration: 0.55, ease: EASE }}
        >
          {role}
        </motion.span>
      ))}
    </span>
  );
}
