"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { EDUCATION, AWARDS } from "@/lib/constants";

export default function AcademicsSection() {
  return (
    <section id="academics" className="relative w-full">
      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <SectionHeading
          badge="Credentials & Honors"
          title="Academics & Competitive Triumphs"
          subtitle="Engineering foundation and proven excellence across competitive hackathons and innovations."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Education Card (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-5 rounded-2xl p-6 sm:p-7 glass-apple-card glass-apple-card-hover"
          >
            <div className="flex items-center gap-2.5 mb-4">
              <span className="text-xl">🎓</span>
              <span className="text-[11px] font-mono tracking-widest text-rose-400 uppercase font-semibold">
                ACADEMIC DEGREE
              </span>
            </div>

            <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-tight">
              {EDUCATION.degree}
            </h4>
            <p className="text-sm text-neutral-300 mt-1">
              {EDUCATION.field}
            </p>

            <div className="mt-5 pt-4 border-t border-white/[0.08]">
              <p className="text-xs text-neutral-400 leading-relaxed">
                {EDUCATION.university}
              </p>
              <div className="mt-3 inline-block px-2.5 py-1 rounded-md text-[10px] font-mono tracking-wider text-rose-300 bg-rose-500/10 border border-rose-500/20 uppercase">
                {EDUCATION.expectedGraduation}
              </div>
            </div>
          </motion.div>

          {/* Awards Column (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            {AWARDS.map((award, i) => (
              <motion.div
                key={award.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  ease: "easeOut",
                }}
                className="group rounded-2xl p-4 sm:p-5 glass-apple-card glass-apple-card-hover"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-105 group-hover:border-rose-400/30 transition-all">
                    {award.icon}
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-white group-hover:text-rose-200 transition-colors leading-relaxed">
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
