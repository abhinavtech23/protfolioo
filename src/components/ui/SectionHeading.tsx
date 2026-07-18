"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  title,
  subtitle,
  className,
  align = "center",
}: SectionHeadingProps) {
  return (
    <motion.div
      className={cn(
        "mb-6 sm:mb-8",
        align === "center" && "text-center",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h2
        className={cn(
          "font-cinzel text-xl sm:text-2xl md:text-3xl font-bold tracking-wide text-ivory",
          "relative inline-block"
        )}
      >
        {title}
        {/* Crimson underline accent */}
        <span className="absolute -bottom-2 left-0 h-[1.5px] w-full bg-gradient-to-r from-transparent via-crimson to-transparent" />
      </h2>
      {subtitle && (
        <p className="mt-3 text-xs sm:text-sm text-ivory-muted max-w-2xl mx-auto font-inter leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
