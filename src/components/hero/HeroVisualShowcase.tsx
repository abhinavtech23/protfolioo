"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const HeroInteractiveCore = dynamic(
  () => import("./HeroInteractiveCore"),
  { ssr: false, loading: () => null }
);

export default function HeroVisualShowcase() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Ambient Radial Backlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[460px] h-[340px] sm:h-[460px] bg-gradient-to-tr from-crimson/25 via-red-950/20 to-transparent rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[200px] h-[200px] bg-white/[0.03] rounded-full blur-[60px] pointer-events-none" />

      {/* Interactive 3D Canvas */}
      <div className="relative z-10 w-full flex items-center justify-center">
        <HeroInteractiveCore />
      </div>

      {/* Floating Glassmorphism Telemetry Cards */}
      {/* Card 1: AI / ML Pipeline */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        className="absolute top-4 sm:top-8 right-2 sm:right-6 z-20 max-w-[240px] sm:max-w-[270px] glass-apple-card glass-apple-card-hover rounded-2xl p-3.5 sm:p-4 text-left pointer-events-auto"
      >
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-mono tracking-wider text-neutral-300 font-medium">
              AI INFERENCE
            </span>
          </div>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.06] text-neutral-400 border border-white/[0.08]">
            &lt;16ms
          </span>
        </div>
        <p className="text-xs sm:text-sm font-semibold text-white tracking-tight">
          Computer Vision & Predictive ML
        </p>
        <p className="text-[11px] text-neutral-400 mt-0.5 leading-snug">
          TensorFlow · OpenCV · Automated Clinical & Edge Analytics
        </p>
      </motion.div>

      {/* Card 2: Cross-Platform App Architecture */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        className="absolute bottom-4 sm:bottom-8 left-2 sm:left-4 z-20 max-w-[250px] sm:max-w-[280px] glass-apple-card glass-apple-card-hover rounded-2xl p-3.5 sm:p-4 text-left pointer-events-auto"
      >
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm">📱</span>
            <span className="text-[11px] font-mono tracking-wider text-rose-300 font-medium">
              APP ARCHITECTURE
            </span>
          </div>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20">
            60 FPS
          </span>
        </div>
        <p className="text-xs sm:text-sm font-semibold text-white tracking-tight">
          Flutter & Concurrent Systems
        </p>
        <p className="text-[11px] text-neutral-400 mt-0.5 leading-snug">
          Reactive state management · Low-latency bidirectional pipelines
        </p>
      </motion.div>

      {/* Card 3: Software Engineering Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        className="hidden sm:flex absolute bottom-24 -right-2 z-20 items-center gap-2 glass-apple px-3 py-2 rounded-xl border border-white/10 text-neutral-300 text-[11px] font-mono pointer-events-auto shadow-lg shadow-black/50"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
        <span>SDE / AI Focus</span>
        <span className="text-neutral-500">|</span>
        <span className="text-neutral-400">Production Ready</span>
      </motion.div>
    </div>
  );
}
