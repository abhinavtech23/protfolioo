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
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      onClick={() => setExpanded(!expanded)}
      className={cn(
        "group relative rounded-2xl cursor-pointer p-5 sm:p-6",
        "glass-apple-card glass-apple-card-hover overflow-hidden",
        expanded && "border-rose-500/40 shadow-2xl shadow-crimson/20"
      )}
    >
      {/* Top subtle glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-crimson-light/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-mono text-rose-400 tracking-widest uppercase font-semibold">
              PROJECT {String(index + 1).padStart(2, "0")}
            </span>
            <div className="h-[1px] w-8 bg-rose-500/30" />
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-rose-200 transition-colors">
            {project.name}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 mt-1 line-clamp-2 leading-relaxed">
            {project.tagline}
          </p>
        </div>

        {/* Expand / Collapse Indicator */}
        <motion.div
          animate={{ rotate: expanded ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 w-7 h-7 rounded-full glass-apple flex items-center justify-center text-neutral-300 group-hover:border-rose-400/40 group-hover:text-white transition-colors text-sm font-light"
        >
          +
        </motion.div>
      </div>

      {/* Tech stack pills */}
      <div className="flex flex-wrap gap-1.5 mt-4">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="px-2.5 py-1 text-[11px] font-mono tracking-wide rounded-lg border border-white/[0.08] text-neutral-300 bg-white/[0.03] group-hover:border-white/[0.12] transition-colors"
          >
            {tech}
          </span>
        ))}
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
            <div className="mt-4 pt-4 border-t border-white/[0.08] space-y-3.5">
              <p className="text-xs sm:text-sm leading-relaxed text-neutral-300/90 font-normal">
                {project.description}
              </p>

              <div className="space-y-2">
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block">
                  Key Architectural Highlights:
                </span>
                <ul className="space-y-1.5">
                  {project.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-xs text-neutral-300"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-crimson-light flex-shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {project.teamCredits && (
                <p className="text-[11px] text-neutral-400 italic pt-2 border-t border-white/[0.06]">
                  {project.teamCredits}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-4 pt-2 flex items-center justify-between text-[11px] font-mono text-neutral-500">
        <span>{expanded ? "Click to collapse" : "Click to view architectural details"}</span>
        <span>{expanded ? "▲" : "▼"}</span>
      </div>
    </motion.div>
  );
}
