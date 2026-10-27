import * as React from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

export function Section({
  id,
  className,
  children,
  tight = false,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
  tight?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(tight ? "py-14 sm:py-16" : "py-20 sm:py-28", className)}
    >
      <div className="shell">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  action,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  action?: React.ReactNode;
}) {
  return (
    <Reveal
      className={cn(
        "mb-10 sm:mb-14",
        align === "center" && "mx-auto max-w-2xl text-center",
        className
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-4",
          action && align === "left"
            ? "md:flex-row md:items-end md:justify-between"
            : null
        )}
      >
        <div className={cn(align === "center" && "mx-auto")}>
          {eyebrow ? <Eyebrow align={align}>{eyebrow}</Eyebrow> : null}
          <h2 className="text-3xl font-semibold leading-[1.1] sm:text-4xl lg:text-[2.75rem]">
            {title}
          </h2>
          {description ? (
            <p
              className={cn(
                "mt-4 max-w-2xl text-base leading-relaxed text-secondary sm:text-lg",
                align === "center" && "mx-auto"
              )}
            >
              {description}
            </p>
          ) : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </Reveal>
  );
}

export function Eyebrow({
  children,
  align = "left",
  className,
}: {
  children: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-4 flex items-center gap-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-accent-text",
        align === "center" && "justify-center",
        className
      )}
    >
      <span aria-hidden className="h-px w-6 bg-accent/50" />
      {children}
    </div>
  );
}
