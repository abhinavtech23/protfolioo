"use client";

import { motion, Variants } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { TECH_ARSENAL } from "@/lib/constants";
import { cn } from "@/lib/utils";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: "easeOut",
    },
  }),
};

export default function TechArsenal() {
  return (
    <section id="arsenal" className="relative w-full">
      <div className="relative z-10 w-full">
        <SectionHeading
          badge="Core Stack & Toolkit"
          title="Technical Arsenal"
          subtitle="Curated technologies across AI, full-stack software development, cross-platform architecture, and concurrent backends."
        />

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-auto">
          {TECH_ARSENAL.map((category, i) => (
            <motion.div
              key={category.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className={cn(
                "group relative rounded-2xl p-6 sm:p-7 glass-apple-card glass-apple-card-hover",
                category.span === "large" && "sm:col-span-2",
                category.span === "medium" && "col-span-1"
              )}
            >
              {/* Header inside card */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-lg text-rose-300 group-hover:scale-105 group-hover:border-rose-400/30 transition-all">
                  {category.icon}
                </div>
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                  {category.items.length} Techs
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-bold text-white mb-4 tracking-tight group-hover:text-rose-200 transition-colors">
                {category.title}
              </h3>

              {/* Skills tags */}
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className={cn(
                      "inline-block px-3 py-1.5 text-xs font-mono",
                      "rounded-lg border border-white/[0.08] bg-white/[0.03]",
                      "text-neutral-300 tracking-wide",
                      "transition-all duration-300",
                      "hover:border-crimson/50 hover:text-white hover:bg-crimson/15 hover:scale-[1.02]"
                    )}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
