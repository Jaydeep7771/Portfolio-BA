import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-[transform,background-color,color,border-color,box-shadow] duration-200 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-background shadow-[var(--shadow-sm)] hover:-translate-y-px hover:shadow-[var(--shadow-md)]",
        accent:
          "bg-accent text-[var(--accent-contrast)] shadow-[var(--shadow-sm)] hover:-translate-y-px hover:shadow-[var(--shadow-glow)]",
        outline:
          "border border-border-strong bg-surface text-primary hover:-translate-y-px hover:border-primary hover:shadow-[var(--shadow-sm)]",
        ghost: "text-secondary hover:bg-surface-muted hover:text-primary",
        soft: "bg-surface-muted text-primary hover:bg-border",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-5",
        lg: "h-12 px-6 text-[0.95rem]",
        icon: "size-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { buttonVariants };
