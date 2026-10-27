/** Route-level fallback. Mirrors the page rhythm so the swap isn't jarring. */
export default function Loading() {
  return (
    <div className="shell py-20" aria-busy aria-label="Loading">
      <div className="h-3 w-24 animate-pulse rounded-full bg-surface-muted" />
      <div className="mt-6 h-10 w-full max-w-2xl animate-pulse rounded-xl bg-surface-muted" />
      <div className="mt-3 h-10 w-full max-w-md animate-pulse rounded-xl bg-surface-muted" />
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-64 animate-pulse rounded-[var(--radius-card)] bg-surface-muted"
            style={{ animationDelay: `${i * 120}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
