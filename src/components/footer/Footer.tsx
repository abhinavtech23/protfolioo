"use client";

import { motion } from "framer-motion";
import { CONTACT } from "@/lib/constants";

export default function Footer() {
  return (
    <div
      id="contact"
      className="relative w-full flex items-center justify-center pb-12"
    >
      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center space-y-6"
        >
          {/* Badge */}
          <div className="inline-block px-3 py-1 rounded-full text-[11px] font-mono tracking-wider text-rose-300 bg-rose-500/10 border border-rose-500/20 uppercase">
            Let&apos;s Build Together
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Connect & Collaborate
          </h2>

          <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto leading-relaxed">
            Actively seeking full-time and internship opportunities across Software Engineering (SWE / SDE), AI Development, and Mobile Engineering.
          </p>

          {/* Contact links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
            {/* Email */}
            <a
              href={`mailto:${CONTACT.email}`}
              className="group flex items-center gap-3 px-6 py-3.5 rounded-2xl glass-apple-card glass-apple-card-hover transition-all duration-300"
            >
              <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
                <svg
                  className="w-4 h-4"
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
              </div>
              <div className="text-left">
                <span className="text-[10px] font-mono text-neutral-500 uppercase block">Email</span>
                <span className="text-xs sm:text-sm font-medium text-neutral-200 group-hover:text-white transition-colors">
                  {CONTACT.email}
                </span>
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-3.5 rounded-2xl glass-apple-card glass-apple-card-hover transition-all duration-300"
            >
              <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              <div className="text-left">
                <span className="text-[10px] font-mono text-neutral-500 uppercase block">LinkedIn</span>
                <span className="text-xs sm:text-sm font-medium text-neutral-200 group-hover:text-white transition-colors">
                  {CONTACT.linkedinDisplay}
                </span>
              </div>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
