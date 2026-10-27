import * as React from "react";
import { Info } from "lucide-react";
import type { ArticleBlock } from "@/data/types";

/**
 * Renders the structured article format. Deliberately not markdown — the
 * blocks are typed, so a malformed article is a compile error.
 */
export function Article({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="max-w-2xl">
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  );
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.kind) {
    case "p":
      return (
        <p className="mt-5 text-[1.0625rem] leading-[1.78] text-secondary first:mt-0">
          {block.text}
        </p>
      );

    case "h2":
      return (
        <h2 className="mt-12 text-2xl font-semibold leading-tight tracking-tight sm:text-[1.65rem]">
          {block.text}
        </h2>
      );

    case "h3":
      return (
        <h3 className="mt-9 text-lg font-semibold leading-snug sm:text-xl">
          {block.text}
        </h3>
      );

    case "ul":
      return (
        <ul className="mt-5 space-y-2.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3">
              <span
                aria-hidden
                className="mt-[0.7rem] size-1 shrink-0 rounded-full bg-accent"
              />
              <span className="text-[1.0625rem] leading-[1.75] text-secondary">
                {item}
              </span>
            </li>
          ))}
        </ul>
      );

    case "ol":
      return (
        <ol className="mt-5 space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3.5">
              <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-surface-muted text-xs font-semibold tabular-nums">
                {i + 1}
              </span>
              <span className="text-[1.0625rem] leading-[1.75] text-secondary">
                {item}
              </span>
            </li>
          ))}
        </ol>
      );

    case "quote":
      return (
        <blockquote className="mt-8 border-l-2 border-accent pl-5">
          <p className="text-lg font-medium leading-relaxed text-primary sm:text-xl">
            {block.text}
          </p>
          {block.cite ? (
            <footer className="mt-2.5 text-sm text-tertiary">
              — {block.cite}
            </footer>
          ) : null}
        </blockquote>
      );

    case "callout":
      return (
        <aside className="mt-8 rounded-[var(--radius-card)] border border-accent/25 bg-accent-soft/50 p-5">
          <p className="flex items-center gap-2 text-sm font-semibold text-primary">
            <Info className="size-4 text-accent-text" />
            {block.title}
          </p>
          <p className="mt-2.5 text-[0.95rem] leading-relaxed text-secondary">
            {block.text}
          </p>
        </aside>
      );

    case "code":
      return (
        <div className="mt-7 overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface-muted/60">
          <div className="border-b border-border px-4 py-2">
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-tertiary">
              {block.language}
            </span>
          </div>
          <pre className="hide-scrollbar overflow-x-auto p-4">
            <code className="font-mono text-[0.78rem] leading-[1.75] text-secondary">
              {block.code}
            </code>
          </pre>
        </div>
      );

    case "table":
      return (
        <div className="hide-scrollbar mt-7 overflow-x-auto rounded-[var(--radius-card)] border border-border">
          <table className="w-full min-w-[520px] border-collapse text-left">
            <thead>
              <tr className="border-b border-border bg-surface-muted/50">
                {block.columns.map((col) => (
                  <th
                    key={col}
                    scope="col"
                    className="px-4 py-3 text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-tertiary"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className={
                        j === 0
                          ? "px-4 py-3 align-top text-sm font-medium"
                          : "px-4 py-3 align-top text-sm text-secondary"
                      }
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}
