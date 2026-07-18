"use client";

import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "crimson" | "steel";
  hoverable?: boolean;
}

export default function GlowCard({
  children,
  className,
  glowColor = "crimson",
  hoverable = true,
}: GlowCardProps) {
  const glowMap = {
    crimson: "rgba(139, 0, 0, 0.4)",
    steel: "rgba(74, 74, 74, 0.4)",
  };

  return (
    <div
      className={cn(
        "relative rounded-2xl border border-steel/20 bg-obsidian-lighter/60 backdrop-blur-sm p-6",
        "transition-all duration-500 ease-out",
        hoverable && [
          "hover:-translate-y-1",
          "hover:border-steel/40",
        ],
        className
      )}
      style={{
        boxShadow: hoverable
          ? undefined
          : `0 0 20px ${glowMap[glowColor]}`,
      }}
      onMouseEnter={(e) => {
        if (hoverable) {
          e.currentTarget.style.boxShadow = `0 0 30px ${glowMap[glowColor]}, 0 0 60px ${glowMap[glowColor]}`;
        }
      }}
      onMouseLeave={(e) => {
        if (hoverable) {
          e.currentTarget.style.boxShadow = "none";
        }
      }}
    >
      {/* Animated conic-gradient border */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `conic-gradient(from var(--border-angle, 0turn), transparent 25%, ${glowMap[glowColor]} 50%, transparent 75%)`,
          padding: "1px",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          animation: "border-rotate 4s linear infinite",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
