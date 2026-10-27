import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border font-medium transition-colors duration-200",
  {
    variants: {
      variant: {
        default: "border-border bg-surface-muted text-secondary",
        accent: "border-transparent bg-accent-soft text-accent-text",
        outline: "border-border-strong bg-transparent text-secondary",
        solid: "border-transparent bg-primary text-background",
      },
      size: {
        sm: "px-2.5 py-0.5 text-[0.7rem]",
        md: "px-3 py-1 text-xs",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
);

export function Badge({
  className,
  variant,
  size,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}
