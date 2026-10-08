"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { NAV_LINKS, HERO } from "@/lib/constants";

interface NavbarProps {
  visible: boolean;
}

export default function Navbar({ visible }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  const scrollToSection = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileOpen(false);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-400",
        scrolled
          ? "glass-apple border-b border-white/[0.08] shadow-2xl shadow-black/60"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between h-16 sm:h-20">
        {/* Left: Brand Monogram / Name */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-crimson to-red-950 flex items-center justify-center border border-crimson-light/40 shadow-sm shadow-crimson/30 group-hover:scale-105 transition-transform">
            <span className="font-mono font-bold text-xs text-white">AT</span>
          </div>
          <div className="flex flex-col text-left">
            <span className="font-semibold text-sm tracking-tight text-white group-hover:text-rose-200 transition-colors">
              Abhinav Tiwari
            </span>
            <span className="text-[10px] font-mono text-neutral-400 tracking-wider">
              SWE · AI · APP DEV
            </span>
          </div>
        </button>

        {/* Center: Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-full glass-apple border border-white/[0.06]">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="px-4 py-1.5 text-xs font-medium text-neutral-300 hover:text-white hover:bg-white/[0.08] rounded-full transition-all duration-200 cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right: Quick Action & Mobile Menu */}
        <div className="flex items-center gap-3">
          <a
            href={HERO.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium glass-apple border border-white/10 hover:border-crimson/40 hover:bg-crimson/10 text-neutral-200 hover:text-white transition-all shadow-sm"
          >
            <span>Resume</span>
            <span className="text-neutral-400">↗</span>
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col justify-center items-center gap-1.5 w-9 h-9 rounded-xl glass-apple border border-white/10 p-2 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <span
              className={cn(
                "block w-4 h-[1.5px] bg-white transition-all duration-300",
                mobileOpen && "rotate-45 translate-y-[4.5px]"
              )}
            />
            <span
              className={cn(
                "block w-4 h-[1.5px] bg-white transition-all duration-300",
                mobileOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "block w-4 h-[1.5px] bg-white transition-all duration-300",
                mobileOpen && "-rotate-45 -translate-y-[4.5px]"
              )}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden glass-apple border-t border-white/[0.08] overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-left text-sm font-medium py-1.5 text-neutral-300 hover:text-white transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-2 border-t border-white/[0.08]">
                <a
                  href={HERO.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-medium text-rose-300 py-1"
                >
                  <span>Download Resume</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
