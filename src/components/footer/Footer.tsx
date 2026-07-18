"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { CONTACT } from "@/lib/constants";

const Particles = dynamic(() => import("@/components/ui/particles"), {
  ssr: false,
  loading: () => null,
});

export default function Footer() {
  return (
    <div
      id="contact"
      className="relative w-full h-full flex items-center justify-center pb-6"
    >
      {/* Particles Background */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <Suspense fallback={null}>
          <Particles
            color="#8B0000"
            particleCount={3000}
            animate={false}
          />
        </Suspense>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center space-y-6"
        >
          {/* Heading */}
          <h2 className="font-cinzel text-xl sm:text-2xl md:text-3xl font-bold text-ivory tracking-wide">
            Let&apos;s Connect
          </h2>

          <p className="font-inter text-xs sm:text-sm text-ivory-muted max-w-md mx-auto leading-relaxed">
            Open to collaboration, hackathons, and opportunities in systems
            engineering and cross-platform development.
          </p>

          {/* Contact links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            {/* Email */}
            <a
              href={`mailto:${CONTACT.email}`}
              className="group flex items-center gap-3 px-5 py-3 rounded-xl border border-steel/20 bg-obsidian-lighter/60 backdrop-blur-md transition-all duration-300 hover:border-crimson/30 hover:shadow-lg hover:shadow-crimson/10 hover:scale-[1.02]"
            >
              <svg
                className="w-4 h-4 text-steel-light group-hover:text-crimson transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              <span className="font-inter text-xs sm:text-sm text-ivory-muted group-hover:text-ivory transition-colors">
                {CONTACT.email}
              </span>
            </a>

            {/* LinkedIn */}
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-5 py-3 rounded-xl border border-steel/20 bg-obsidian-lighter/60 backdrop-blur-md transition-all duration-300 hover:border-crimson/30 hover:shadow-lg hover:shadow-crimson/10 hover:scale-[1.02]"
            >
              <svg
                className="w-4 h-4 text-steel-light group-hover:text-crimson transition-colors"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span className="font-inter text-xs sm:text-sm text-ivory-muted group-hover:text-ivory transition-colors">
                {CONTACT.linkedinDisplay}
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
