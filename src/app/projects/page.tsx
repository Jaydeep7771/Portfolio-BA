import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { PageHeader } from "@/components/page-header";
import { ProjectExplorer } from "@/components/project-explorer";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Business analysis, product and AI automation case studies — each with the business problem, research, requirements, solution and measured impact.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Five problems, worked end to end"
        description="Every one of these carries the full trail: what was actually wrong, the research that reframed it, the requirements, the solution, and what changed afterwards — including the parts that didn't go to plan."
      />
      <div className="shell py-12 sm:py-16">
        <ProjectExplorer projects={projects} />
      </div>
    </>
  );
}
