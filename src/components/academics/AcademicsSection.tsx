"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import SectionHeading from "@/components/ui/SectionHeading";
import { EDUCATION, AWARDS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const Scene3DBackground = dynamic(
  () => import("@/components/ui/Scene3DBackground"),
  { ssr: false, loading: () => null }
);

export default function AcademicsSection() {
  return (
    <section id="academics" className="relative w-full h-full flex flex-col justify-start overflow-y-auto pr-1 no-scrollbar pb-6">
      {/* 3D Particles + Constellation Background */}
      <Scene3DBackground
        variant="particles-constellation"
        particleCount={120}
        particleColor="#4A0000"
        lineColor="#2A2A2A"
        spread={9}
        showRings
      />
      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <SectionHeading
          title="Academics & Triumphs"
          subtitle="Academic foundation and competitive achievements."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Education Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={cn(
              "rounded-2xl border border-steel/20 bg-obsidian-lighter/50 backdrop-blur-sm p-6 sm:p-8",
              "transition-all duration-500 hover:border-steel/30",
              "hover:shadow-lg hover:shadow-crimson/5"
            )}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🎓</span>
              <h3 className="font-cinzel text-xs tracking-[0.25em] text-crimson uppercase font-semibold">
                Education
              </h3>
            </div>

            <h4 className="font-cinzel text-lg sm:text-xl font-bold text-ivory tracking-wide leading-tight">
              {EDUCATION.degree}
            </h4>
            <p className="font-inter text-sm text-ivory-muted mt-1">
              {EDUCATION.field}
            </p>

            <div className="mt-4 pt-4 border-t border-steel/15">
              <p className="font-inter text-xs sm:text-sm text-steel-lighter leading-relaxed">
                {EDUCATION.university}
              </p>
              <p className="font-inter text-[10px] text-crimson/70 mt-1.5 tracking-wider uppercase">
                {EDUCATION.expectedGraduation}
              </p>
            </div>
          </motion.div>

          {/* Awards Column */}
          <div className="space-y-3.5">
            {AWARDS.map((award, i) => (
              <motion.div
                key={award.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.12,
                  ease: "easeOut",
                }}
                className={cn(
                  "group rounded-2xl border border-steel/20 bg-obsidian-lighter/50 backdrop-blur-sm p-4 sm:p-5",
                  "transition-all duration-500 hover:border-steel/30",
                  "hover:-translate-y-0.5 hover:shadow-lg hover:shadow-crimson/5"
                )}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 0 20px rgba(139, 0, 0, 0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-xl flex-shrink-0 mt-0.5">
                    {award.icon}
                  </span>
                  <p className="font-inter text-xs sm:text-sm text-ivory leading-relaxed">
                    {award.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
