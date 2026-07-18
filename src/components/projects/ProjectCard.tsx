"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/constants";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      onClick={() => setExpanded(!expanded)}
      className={cn(
        "group relative rounded-2xl border cursor-pointer",
        "backdrop-blur-md bg-obsidian-lighter/40",
        "transition-all duration-500 ease-out overflow-hidden",
        expanded
          ? "border-crimson/30 shadow-[0_0_30px_rgba(139,0,0,0.12)]"
          : "border-steel/15 hover:border-steel/30 hover:shadow-[0_0_20px_rgba(139,0,0,0.08)]",
        "hover:-translate-y-0.5"
      )}
    >
      {/* Subtle top gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-crimson/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="p-4 sm:p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-inter text-[10px] text-crimson tracking-widest uppercase font-medium">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="h-[1px] w-6 bg-crimson/30" />
            </div>

            <h3 className="font-cinzel text-base sm:text-lg font-bold text-ivory tracking-wide">
              {project.name}
            </h3>
            <p className="font-inter text-xs text-ivory-muted mt-1 line-clamp-2">
              {project.tagline}
            </p>
          </div>

          {/* Expand indicator */}
          <motion.div
            animate={{ rotate: expanded ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0 w-6 h-6 rounded-full border border-steel/25 flex items-center justify-center text-steel-light group-hover:border-crimson/40 group-hover:text-crimson transition-colors text-xs"
          >
            +
          </motion.div>
        </div>

        {/* Tech stack pills */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-[9px] font-inter tracking-wider rounded-md border border-crimson/15 text-steel-lighter bg-crimson/5 uppercase"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="px-2 py-0.5 text-[9px] font-inter tracking-wider rounded-md border border-steel/15 text-steel-lighter uppercase">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Expandable Details */}
        <AnimatePresence mode="wait">
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-3 pt-3 border-t border-steel/10 space-y-3">
                <p className="font-inter text-xs leading-relaxed text-ivory-muted">
                  {project.description}
                </p>

                <ul className="space-y-1.5">
                  {project.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-[11px] font-inter text-steel-lighter"
                    >
                      <span className="mt-1 w-1 h-1 rounded-full bg-crimson/50 flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>

                {project.teamCredits && (
                  <p className="font-inter text-[10px] text-steel-light italic pt-2 border-t border-steel/10">
                    {project.teamCredits}
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
