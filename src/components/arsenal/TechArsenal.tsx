"use client";

import { motion, Variants } from "framer-motion";
import dynamic from "next/dynamic";
import SectionHeading from "@/components/ui/SectionHeading";
import { TECH_ARSENAL } from "@/lib/constants";
import { cn } from "@/lib/utils";

const Scene3DBackground = dynamic(
  () => import("@/components/ui/Scene3DBackground"),
  { ssr: false, loading: () => null }
);

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: i * 0.15,
      ease: "easeOut",
    },
  }),
};

export default function TechArsenal() {
  return (
    <section id="arsenal" className="relative w-full h-full flex flex-col justify-start overflow-y-auto pr-1 no-scrollbar pb-6">
      {/* 3D Particle Background */}
      <Scene3DBackground
        variant="particles"
        particleCount={200}
        particleColor="#5C0000"
        spread={12}
      />

      <div className="relative z-10 w-full">
        <SectionHeading
          title="Technical Arsenal"
          subtitle="A curated stack of technologies forged through production-grade projects and systems engineering."
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
                "group relative rounded-2xl border border-steel/20 bg-obsidian-lighter/50 backdrop-blur-sm p-5 sm:p-6",
                "transition-all duration-500 ease-out",
                "hover:-translate-y-0.5 hover:border-steel/40",
                // Span logic for bento layout
                category.span === "large" && "sm:col-span-2",
                category.span === "medium" && "col-span-1"
              )}
              style={{ willChange: "transform" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 25px rgba(139, 0, 0, 0.15), 0 0 50px rgba(139, 0, 0, 0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Animated border glow on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background:
                    "conic-gradient(from 0turn, transparent 25%, rgba(139,0,0,0.3) 50%, transparent 75%)",
                  padding: "1px",
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                  animation: "border-rotate 4s linear infinite",
                }}
              />

              {/* Category icon */}
              <div className="text-xl sm:text-2xl mb-3 text-crimson opacity-80 group-hover:opacity-100 transition-opacity">
                {category.icon}
              </div>

              {/* Title */}
              <h3 className="font-cinzel text-base sm:text-lg font-semibold text-ivory mb-3 tracking-wide">
                {category.title}
              </h3>

              {/* Skills tags */}
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className={cn(
                      "inline-block px-3 py-1.5 text-xs font-inter",
                      "rounded-lg border border-steel/25 bg-obsidian/60",
                      "text-ivory-muted tracking-wide",
                      "transition-all duration-300",
                      "hover:border-crimson/40 hover:text-ivory hover:bg-crimson/10"
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
