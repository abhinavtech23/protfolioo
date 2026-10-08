"use client";

import { motion } from "framer-motion";
import { HERO } from "@/lib/constants";
import HeroVisualShowcase from "./HeroVisualShowcase";

export default function HeroSection() {
  const scrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      id="hero"
      className="relative w-full min-h-[calc(100vh-5rem)] flex items-center justify-center py-8 lg:py-0"
    >
      {/* Ambient background lighting */}
      <div className="absolute -top-24 left-1/4 w-[500px] h-[500px] bg-crimson/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-red-950/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 tech-grid opacity-40 pointer-events-none" />

      {/* Main Grid: 2 Columns */}
      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* Left Column: Typography & CTAs (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex items-center"
          >
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-apple border border-emerald-500/25 text-emerald-400 text-xs font-medium tracking-wide shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>{HERO.badge}</span>
            </div>
          </motion.div>

          {/* Name & Headline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="space-y-3"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
              Hi, I&apos;m{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-rose-300">
                {HERO.name}
              </span>
            </h1>

            <p className="text-lg sm:text-2xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 via-rose-300 to-crimson-light">
              {HERO.title}
            </p>
          </motion.div>

          {/* Subheadline / Bio */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="text-sm sm:text-base text-neutral-300/90 leading-relaxed max-w-xl font-normal"
          >
            {HERO.subheadline}
          </motion.p>

          {/* Core Tech Stack Badges */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            className="flex flex-wrap gap-2 pt-1"
          >
            {HERO.skillsList.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 text-xs font-mono rounded-lg bg-white/[0.04] text-neutral-300 border border-white/[0.08] hover:border-crimson/40 hover:bg-crimson/10 transition-colors"
              >
                {skill}
              </span>
            ))}
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-3.5 pt-2"
          >
            <button
              onClick={scrollToProjects}
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-crimson via-red-800 to-crimson-light text-white font-medium text-xs sm:text-sm tracking-wide shadow-lg shadow-crimson/25 hover:shadow-crimson/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
            >
              <span>Explore Projects</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </button>

            <a
              href={HERO.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl glass-apple text-neutral-200 font-medium text-xs sm:text-sm tracking-wide border border-white/10 hover:border-white/25 hover:text-white hover:bg-white/[0.06] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              <span>View Resume</span>
              <span className="text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                ↗
              </span>
            </a>

            <button
              onClick={scrollToContact}
              className="inline-flex items-center gap-1.5 px-4 py-3.5 text-xs sm:text-sm font-medium text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              Get in Touch
            </button>
          </motion.div>

          {/* Impact Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65, ease: "easeOut" }}
            className="pt-4 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl"
          >
            {HERO.stats.map((stat) => (
              <div key={stat.label} className="space-y-0.5">
                <div className="text-lg sm:text-xl font-bold font-mono text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-[11px] text-neutral-400 font-medium leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Column: Interactive 3D & Telemetry Showcase (5 cols) */}
        <div className="lg:col-span-5 w-full flex items-center justify-center">
          <HeroVisualShowcase />
        </div>
      </div>
    </div>
  );
}
