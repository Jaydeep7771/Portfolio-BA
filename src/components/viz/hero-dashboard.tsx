import {
  Activity,
  ArrowUpRight,
  Bot,
  CheckCircle2,
  Sparkles,
  Workflow,
} from "lucide-react";

const bars = [52, 68, 44, 81, 62, 94, 73];
const linePoints = [
  [0, 34],
  [16, 28],
  [32, 31],
  [48, 19],
  [64, 23],
  [80, 11],
  [100, 6],
] as const;

const linePath = linePoints.map(([x, y]) => `${x},${y}`).join(" ");

/**
 * The hero's "analytics console" — entirely generated, so no image assets and
 * it stays crisp at any density.
 *
 * Deliberately a server component with CSS animation and no Framer. It sits
 * above the fold, where JS-driven entrances delay paint and perpetual
 * JS-driven float loops occupy the main thread for the whole session; both
 * showed up directly in mobile LCP and total blocking time. Nothing here is
 * interactive, so there is nothing to hydrate.
 */
export function HeroDashboard() {
  return (
    <div className="relative mx-auto w-full max-w-[34rem]" aria-hidden>
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -inset-8 -z-10">
        <div className="absolute right-6 top-4 size-56 rounded-full bg-accent/20 blur-[70px]" />
        <div className="absolute bottom-6 left-2 size-48 rounded-full bg-violet-500/15 blur-[70px]" />
      </div>

      {/* Main console */}
      <div
        className="card-in relative rounded-[1.6rem] border border-border bg-surface p-4 shadow-[var(--shadow-lg)] sm:p-5"
        style={{ animationDelay: "100ms" }}
      >
        {/* Window chrome */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-rose-400/70" />
            <span className="size-2.5 rounded-full bg-amber-400/70" />
            <span className="size-2.5 rounded-full bg-emerald-400/70" />
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-surface-muted px-2.5 py-1">
            <Activity className="size-3 text-accent" />
            <span className="text-[0.62rem] font-medium text-secondary">Live</span>
          </div>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { label: "Visibility", value: "+30%", tone: "text-positive" },
            { label: "Cycle time", value: "−41%", tone: "text-accent-text" },
            { label: "Adoption", value: "92%", tone: "text-violet" },
          ].map((kpi, i) => (
            <div
              key={kpi.label}
              className="fade-up rounded-xl border border-border bg-surface-muted/50 p-2.5"
              style={{ animationDelay: `${350 + i * 80}ms` }}
            >
              <p className="text-[0.58rem] uppercase tracking-[0.1em] text-tertiary">
                {kpi.label}
              </p>
              <p className={`mt-1 text-base font-semibold ${kpi.tone}`}>
                {kpi.value}
              </p>
            </div>
          ))}
        </div>

        {/* Bar chart */}
        <div className="mt-3 rounded-xl border border-border p-3.5">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[0.68rem] font-medium text-secondary">
              Visits logged / week
            </p>
            <span className="flex items-center gap-1 text-[0.62rem] font-medium text-positive">
              <ArrowUpRight className="size-3" />
              18.4%
            </span>
          </div>
          <div className="flex h-[72px] items-end gap-1.5">
            {bars.map((h, i) => (
              <div
                key={i}
                className={`flex-1 origin-bottom rounded-t-[3px] ${
                  i === bars.length - 2 ? "bg-accent" : "bg-primary/15"
                }`}
                style={{
                  height: `${h}%`,
                  animation: `grow-bar 0.7s cubic-bezier(0.16,1,0.3,1) ${
                    600 + i * 70
                  }ms both`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Trend line */}
        <div className="mt-3 rounded-xl border border-border p-3.5">
          <p className="mb-2 text-[0.68rem] font-medium text-secondary">
            Requirement throughput
          </p>
          <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="h-14 w-full">
            <defs>
              <linearGradient id="hero-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.28" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polygon
              points={`0,40 ${linePath} 100,40`}
              fill="url(#hero-area)"
              style={{ animation: "fade-in 0.6s ease 1.3s both" }}
            />
            <polyline
              points={linePath}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              pathLength={1}
              style={{
                strokeDasharray: 1,
                animation:
                  "draw-line 1.1s cubic-bezier(0.16,1,0.3,1) 850ms both",
              }}
            />
          </svg>
        </div>
      </div>

      {/* Floating glass card — AI agent */}
      <div
        className="card-in absolute -left-3 top-[42%] hidden w-[11.5rem] sm:block sm:-left-10"
        style={{ animationDelay: "750ms" }}
      >
        <div className="float-mid glass rounded-2xl border border-border p-3.5 shadow-[var(--shadow-lg)]">
          <div className="flex items-center gap-2">
            <span className="grid size-7 place-items-center rounded-lg bg-accent/15">
              <Bot className="size-3.5 text-accent" />
            </span>
            <p className="text-[0.7rem] font-semibold">BA Copilot</p>
          </div>
          <div className="mt-2.5 space-y-1.5">
            {["Epics drafted", "28 stories", "AC generated"].map((t, i) => (
              <div
                key={t}
                className="flex items-center gap-1.5"
                style={{
                  animation: `fade-in 0.4s ease ${1100 + i * 180}ms both`,
                }}
              >
                <CheckCircle2 className="size-3 text-positive" />
                <span className="text-[0.62rem] text-secondary">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating glass card — automation */}
      <div
        className="card-in absolute -right-2 -top-5 hidden w-[9.5rem] sm:block sm:-right-8"
        style={{ animationDelay: "950ms" }}
      >
        <div className="float-slow glass rounded-2xl border border-border p-3.5 shadow-[var(--shadow-lg)]">
          <div className="flex items-center gap-2">
            <Workflow className="size-3.5 text-violet" />
            <p className="text-[0.68rem] font-semibold">Automation</p>
          </div>
          <p className="mt-2 text-[0.58rem] text-tertiary">Hours saved / mo</p>
          <p className="text-xl font-semibold tabular-nums">120h</p>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-border">
            <div
              className="h-full origin-left bg-violet"
              style={{
                transform: "scaleX(0.78)",
                animation: "grow-bar-x 0.9s cubic-bezier(0.16,1,0.3,1) 1.4s both",
              }}
            />
          </div>
        </div>
      </div>

      {/* Floating pill — prompt */}
      <div
        className="card-in absolute -bottom-5 right-2 sm:right-0"
        style={{ animationDelay: "1150ms" }}
      >
        <div className="float-fast glass flex items-center gap-2 rounded-full border border-border px-3.5 py-2 shadow-[var(--shadow-md)]">
          <Sparkles className="size-3.5 text-accent" />
          <span className="text-[0.66rem] font-medium text-secondary">
            &ldquo;Turn this BRD into a sprint backlog&rdquo;
          </span>
        </div>
      </div>
    </div>
  );
}
