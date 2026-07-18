"use client";

import { Particles } from "./particles";

export type SceneVariant = "particles" | "constellation" | "particles-constellation" | "minimal";

interface Scene3DBackgroundProps {
  variant?: SceneVariant;
  particleCount?: number;
  particleColor?: string;
  lineColor?: string;
  spread?: number;
  showRings?: boolean;
  className?: string;
}

export default function Scene3DBackground({
  variant = "particles",
  particleCount = 300,
  particleColor = "#8B0000",
  className = "",
}: Scene3DBackgroundProps) {
  // Map particle counts for the new rendering engine
  let mappedCount = particleCount;
  if (variant === "minimal") {
    mappedCount = 1000;
  } else if (variant === "constellation") {
    mappedCount = 2000;
  } else if (variant === "particles-constellation" || variant === "particles") {
    mappedCount = 3500;
  }

  return (
    <Particles
      color={particleColor}
      particleCount={mappedCount}
      animate={false}
      className={`opacity-35 ${className}`}
    />
  );
}
