import type { LucideIcon } from "lucide-react";

/* -------------------------------------------------------------------------
   Taxonomy
------------------------------------------------------------------------- */

export const TAGS = [
  "Business Analysis",
  "Product",
  "Analytics",
  "AI",
  "Power BI",
  "SQL",
] as const;

export type Tag = (typeof TAGS)[number];

/* -------------------------------------------------------------------------
   Case-study section union

   Every project page is a list of these. Adding a new kind of section means
   adding a variant here and a branch in <CaseStudySection>, not a new page.
------------------------------------------------------------------------- */

export type Kpi = {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  /** Shown under the number — what the figure actually means. */
  note?: string;
  decimals?: number;
};

export type FlowNode = {
  id: string;
  label: string;
  /** Optional second line, e.g. the owning role or system. */
  meta?: string;
  kind?: "start" | "step" | "decision" | "system" | "end";
};

export type FlowEdge = {
  from: string;
  to: string;
  label?: string;
};

export type ArchLayer = {
  title: string;
  subtitle?: string;
  nodes: { label: string; meta?: string }[];
};

export type UserStory = {
  id: string;
  as: string;
  want: string;
  so: string;
  points?: number;
  priority?: "Must" | "Should" | "Could";
  criteria?: string[];
};

export type SequenceStep = {
  from: string;
  to: string;
  label: string;
  kind?: "call" | "return";
};

export type CaseStudySection =
  | { kind: "prose"; title: string; body: string[]; }
  | { kind: "list"; title: string; intro?: string; items: { title: string; body: string }[] }
  | { kind: "kpis"; title: string; intro?: string; items: Kpi[] }
  | { kind: "flow"; title: string; intro?: string; nodes: FlowNode[]; edges: FlowEdge[] }
  | { kind: "architecture"; title: string; intro?: string; layers: ArchLayer[] }
  | { kind: "sequence"; title: string; intro?: string; actors: string[]; steps: SequenceStep[] }
  | { kind: "stories"; title: string; intro?: string; items: UserStory[] }
  | { kind: "criteria"; title: string; intro?: string; groups: { title: string; items: string[] }[] }
  | { kind: "stack"; title: string; intro?: string; groups: { title: string; items: string[] }[] }
  | { kind: "table"; title: string; intro?: string; columns: string[]; rows: string[][] };

/* -------------------------------------------------------------------------
   Projects
------------------------------------------------------------------------- */

export type Project = {
  slug: string;
  title: string;
  /** One line a recruiter can scan in under two seconds. */
  summary: string;
  /** The role played, e.g. "Business Analyst". */
  role: string;
  org: string;
  period: string;
  tags: Tag[];
  tools: string[];
  featured?: boolean;
  /** Drives the generated hero artwork; no image assets required. */
  accent: "sky" | "violet" | "emerald" | "amber" | "rose";
  /** Headline outcome shown on the index card. */
  impact: { value: string; label: string };
  sections: CaseStudySection[];
  lessons: string[];
};

/* -------------------------------------------------------------------------
   Product case studies (self-directed teardowns)
------------------------------------------------------------------------- */

export type JourneyStage = {
  stage: string;
  action: string;
  thought: string;
  /** -2 (frustrated) … 2 (delighted). Drives the emotion curve. */
  emotion: -2 | -1 | 0 | 1 | 2;
  painPoint?: string;
};

export type ProductCaseStudy = {
  slug: string;
  product: string;
  title: string;
  summary: string;
  category: string;
  accent: Project["accent"];
  context: string[];
  journey: JourneyStage[];
  painPoints: { title: string; body: string; severity: "High" | "Medium" | "Low" }[];
  competitors: { name: string; strength: string; gap: string }[];
  hypotheses: string[];
  solutions: { title: string; body: string; effort: "S" | "M" | "L"; impact: "High" | "Medium" }[];
  wireframes: { title: string; caption: string; blocks: string[] }[];
  metrics: Kpi[];
  rollout: string[];
};

/* -------------------------------------------------------------------------
   Supporting content
------------------------------------------------------------------------- */

export type TimelineEntry = {
  id: string;
  period: string;
  title: string;
  org: string;
  kind: "education" | "engineering" | "analysis" | "consulting" | "ai" | "product";
  summary: string;
  achievements: string[];
  skills: string[];
};

export type SkillCategory = {
  id: string;
  title: string;
  blurb: string;
  icon: LucideIcon;
  skills: { name: string; level: number }[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readingMinutes: number;
  featured?: boolean;
  accent: Project["accent"];
  /** Rendered by <Article>; a tiny structured format, not markdown. */
  body: ArticleBlock[];
};

export type ArticleBlock =
  | { kind: "p"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "ol"; items: string[] }
  | { kind: "quote"; text: string; cite?: string }
  | { kind: "callout"; title: string; text: string }
  | { kind: "code"; language: string; code: string }
  | { kind: "table"; columns: string[]; rows: string[][] };

export type Certification = {
  name: string;
  issuer: string;
  year: string;
  credentialId?: string;
  skills: string[];
};
