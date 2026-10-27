import * as React from "react";
import { cn } from "@/lib/utils";

type SurfaceProps = React.HTMLAttributes<HTMLDivElement> & {
  as?: React.ElementType;
  /** Adds the hover lift. Omit for static containers. */
  interactive?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
};

const paddings = {
  none: "",
  sm: "p-4",
  md: "p-5 sm:p-6",
  lg: "p-6 sm:p-8",
};

/**
 * The rounded card that every surface in the site is built from.
 * Hover is deliberately understated: 2px of lift, a slightly deeper shadow.
 */
export function Surface({
  as: Tag = "div",
  interactive = false,
  padding = "md",
  className,
  ...props
}: SurfaceProps) {
  return (
    <Tag
      className={cn(
        "rounded-[var(--radius-card)] border border-border bg-surface shadow-[var(--shadow-sm)]",
        paddings[padding],
        interactive &&
          "transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[var(--shadow-md)]",
        className
      )}
      {...props}
    />
  );
}
