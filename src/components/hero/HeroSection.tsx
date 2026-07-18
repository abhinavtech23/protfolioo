"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { HERO } from "@/lib/constants";

// Dynamic import to avoid SSR issues with Three.js
const Particles = dynamic(() => import("@/components/ui/particles"), {
  ssr: false,
  loading: () => null,
});

const headlineWords = HERO.headline.split(" ");

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.2,
    },
  },
};

const wordVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export default function HeroSection() {
  const scrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
    >
      {/* Full-screen Particles Background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <Particles
            color="#8B0000"
            particleCount={10000}
            animate={true}
            className="opacity-60"
          />
        </Suspense>
      </div>

      {/* Subtle radial crimson glow overlay */}
      <div
        className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(circle, rgba(139,0,0,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Content Layer — sits above 3D */}
      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pointer-events-none">
        {/* Left: Text content (spans 7 cols) */}
        <div className="lg:col-span-7 space-y-6 text-left pointer-events-auto">
          {/* Headline — word-by-word staggered reveal */}
          <motion.h1
            className="font-cinzel text-xl sm:text-2xl md:text-3xl lg:text-[2.2rem] font-bold leading-normal tracking-wide text-ivory"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {headlineWords.map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariants}
                className="inline-block mr-[0.25em]"
                style={{
                  color:
                    word === "|"
                      ? "#8B0000"
                      : undefined,
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="font-inter text-sm sm:text-base text-ivory-muted leading-relaxed max-w-xl"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
          >
            {HERO.subheadline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-4 pt-2"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.5, ease: "easeOut" }}
          >
            <button
              onClick={scrollToProjects}
              className="inline-flex items-center gap-2 px-6 py-3 bg-crimson text-ivory font-inter text-xs sm:text-sm font-medium tracking-wider rounded-lg cursor-pointer transition-all duration-300 hover:bg-crimson-light hover:shadow-lg hover:shadow-crimson/20 hover:scale-[1.02]"
            >
              View Projects
              <span className="text-xs">→</span>
            </button>
            <a
              href={HERO.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-steel/40 text-ivory-muted font-inter text-xs sm:text-sm font-medium tracking-wider rounded-lg transition-all duration-300 hover:border-ivory/40 hover:text-ivory hover:bg-white/5 hover:scale-[1.02]"
            >
              Download Resume
              <span className="text-xs">↗</span>
            </a>
          </motion.div>
        </div>

        {/* Right side intentionally empty — 3D fills background */}
        <div className="lg:col-span-5 hidden lg:block" />
      </div>
    </section>
  );
}
