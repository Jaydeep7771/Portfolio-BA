import type { Project, Tag } from "../types";
import { dhvSalesTracking } from "./dhv-sales-tracking";
import { invictusProcurementPortal } from "./invictus-procurement-portal";
import { aiResumeTailoring } from "./ai-resume-tailoring";
import { aiBusinessAnalystCopilot } from "./ai-business-analyst-copilot";
import { aiDashboardGenerator } from "./ai-dashboard-generator";

/** Display order: flagship first, then by weight of the story. */
export const projects: Project[] = [
  aiBusinessAnalystCopilot,
  dhvSalesTracking,
  invictusProcurementPortal,
  aiDashboardGenerator,
  aiResumeTailoring,
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Tags that are actually in use, in the canonical order. */
export function activeTags(): Tag[] {
  const used = new Set(projects.flatMap((p) => p.tags));
  return [...used];
}
