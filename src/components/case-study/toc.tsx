"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Sticky section index. Tracks the heading nearest the top of the viewport
 * via IntersectionObserver rather than on scroll, so it costs nothing while idle.
 */
export function CaseStudyToc({
  items,
}: {
  items: { id: string; label: string }[];
}) {
  const [active, setActive] = React.useState(items[0]?.id);

  React.useEffect(() => {
    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-120px 0px -65% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="Case study sections" className="sticky top-28">
      <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-tertiary">
        Contents
      </p>
      <ul className="space-y-0.5 border-l border-border">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "-ml-px block border-l-2 py-1.5 pl-4 text-[0.82rem] leading-snug transition-colors duration-200",
                active === item.id
                  ? "border-accent font-medium text-primary"
                  : "border-transparent text-tertiary hover:text-secondary"
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
