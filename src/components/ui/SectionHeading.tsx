"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  className?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  title,
  subtitle,
  badge,
  className,
  align = "center",
}: SectionHeadingProps) {
  return (
    <motion.div
      className={cn(
        "mb-10 sm:mb-12",
        align === "center" && "text-center",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {badge && (
        <div className="mb-2.5">
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-mono tracking-wider text-rose-300 bg-rose-500/10 border border-rose-500/20 uppercase">
            {badge}
          </span>
        </div>
      )}

      <h2
        className={cn(
          "text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white",
          "relative inline-block"
        )}
      >
        <span className="bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
          {title}
        </span>
      </h2>

      {subtitle && (
        <p className="mt-3 text-xs sm:text-sm text-neutral-400 max-w-2xl mx-auto leading-relaxed font-normal">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
