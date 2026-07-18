"use client";

import dynamic from "next/dynamic";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "./ProjectCard";
import { PROJECTS } from "@/lib/constants";

const Scene3DBackground = dynamic(
  () => import("@/components/ui/Scene3DBackground"),
  { ssr: false, loading: () => null }
);

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative w-full h-full flex flex-col justify-start overflow-y-auto pr-1 no-scrollbar pb-6"
    >
      {/* 3D Constellation Background */}
      <Scene3DBackground
        variant="constellation"
        particleCount={150}
        particleColor="#5C0000"
        lineColor="#3A3A3A"
        spread={10}
      />

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <SectionHeading
          title="The Roster"
          subtitle="Flagship projects spanning AI, IoT, robotics, and cross-platform mobile architecture."
        />

        {/* 2×2 Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
