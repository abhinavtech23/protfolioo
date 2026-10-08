"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "./ProjectCard";
import { PROJECTS } from "@/lib/constants";

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative w-full">
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <SectionHeading
          badge="Featured Engineering"
          title="Flagship Software Systems"
          subtitle="Production-grade systems showcasing AI/ML inference pipelines, intelligent mobile architectures, and distributed software engineering."
        />

        {/* 2×2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
