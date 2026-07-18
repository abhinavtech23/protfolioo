"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import SectionHeading from "@/components/ui/SectionHeading";
import { EXPERIENCES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const Scene3DBackground = dynamic(
  () => import("@/components/ui/Scene3DBackground"),
  { ssr: false, loading: () => null }
);

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="relative w-full h-full flex flex-col justify-start overflow-y-auto pr-1 no-scrollbar pb-6">
      {/* 3D Minimal Particles Background */}
      <Scene3DBackground
        variant="minimal"
        particleCount={100}
        particleColor="#3A0000"
        spread={10}
      />

      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <SectionHeading
          title="Experience & Leadership"
          subtitle="Professional milestones and community leadership in the developer ecosystem."
        />

        {/* Vertical timeline */}
        <div className="relative">
          {/* Glowing vertical line */}
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-[2px]">
            <div className="w-full h-full bg-gradient-to-b from-crimson/60 via-crimson/30 to-steel/10" />
            {/* Animated pulse overlay */}
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-crimson to-transparent"
              initial={{ height: "0%" }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeOut" }}
              style={{ boxShadow: "0 0 10px rgba(139, 0, 0, 0.4)" }}
            />
          </div>

          {/* Timeline items */}
          <div className="space-y-8">
            {EXPERIENCES.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.15,
                  ease: "easeOut",
                }}
                className="relative pl-12 sm:pl-20"
              >
                {/* Timeline node */}
                <div
                  className={cn(
                    "absolute left-2.5 sm:left-6.5 top-1.5 w-3.5 h-3.5 rounded-full border-2",
                    "bg-obsidian transition-all duration-300",
                    i === 0
                      ? "border-crimson shadow-[0_0_10px_rgba(139,0,0,0.5)]"
                      : "border-steel/50"
                  )}
                />

                {/* Content card */}
                <div
                  className={cn(
                    "rounded-2xl border border-steel/15 bg-obsidian-lighter/40 backdrop-blur-sm p-5 sm:p-6",
                    "transition-all duration-500 hover:border-steel/30",
                    "hover:shadow-lg hover:shadow-crimson/5"
                  )}
                >
                  {/* Period badge */}
                  <span className="inline-block px-2.5 py-0.5 text-[9px] font-inter tracking-widest text-crimson/80 border border-crimson/20 rounded-full uppercase mb-2">
                    {exp.period}
                  </span>

                  {/* Role & Org */}
                  <h3 className="font-cinzel text-base sm:text-lg font-bold text-ivory tracking-wide">
                    {exp.role}
                  </h3>
                  <p className="font-inter text-xs text-crimson/70 mt-0.5 tracking-wide">
                    {exp.organization}
                  </p>

                  {/* Description */}
                  <p className="font-inter text-xs sm:text-sm text-ivory-muted mt-3 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Highlights */}
                  <ul className="mt-3 space-y-1.5">
                    {exp.highlights.map((h, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-xs font-inter text-steel-lighter"
                      >
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-crimson/50 flex-shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
