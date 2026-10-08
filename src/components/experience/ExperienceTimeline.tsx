"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { EXPERIENCES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="relative w-full">
      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <SectionHeading
          badge="Track Record"
          title="Experience & Leadership"
          subtitle="Software development track record, systems engineering milestones, and developer community contributions."
        />

        {/* Vertical timeline */}
        <div className="relative">
          {/* Glowing vertical line */}
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-[2px]">
            <div className="w-full h-full bg-gradient-to-b from-crimson via-rose-500/40 to-white/10" />
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-crimson to-transparent"
              initial={{ height: "0%" }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: "easeOut" }}
              style={{ boxShadow: "0 0 12px rgba(139, 0, 0, 0.6)" }}
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
                  duration: 0.5,
                  delay: i * 0.12,
                  ease: "easeOut",
                }}
                className="relative pl-12 sm:pl-20"
              >
                {/* Timeline node */}
                <div
                  className={cn(
                    "absolute left-2.5 sm:left-6.5 top-2 w-3.5 h-3.5 rounded-full border-2",
                    "bg-neutral-950 transition-all duration-300",
                    i === 0
                      ? "border-crimson shadow-[0_0_12px_rgba(220,38,38,0.7)]"
                      : "border-white/30"
                  )}
                />

                {/* Content card */}
                <div className="rounded-2xl p-6 sm:p-7 glass-apple-card glass-apple-card-hover">
                  {/* Period badge */}
                  <span className="inline-block px-3 py-1 text-[10px] font-mono tracking-wider text-rose-300 bg-rose-500/10 border border-rose-500/20 rounded-full uppercase mb-3">
                    {exp.period}
                  </span>

                  {/* Role & Org */}
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {exp.role}
                  </h3>
                  <p className="text-xs sm:text-sm text-rose-400 mt-0.5 font-medium tracking-wide">
                    {exp.organization}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-neutral-300 mt-3 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Highlights */}
                  <ul className="mt-3.5 space-y-1.5">
                    {exp.highlights.map((h, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2.5 text-xs text-neutral-400"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-crimson-light flex-shrink-0" />
                        <span>{h}</span>
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
