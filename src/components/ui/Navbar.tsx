"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";

interface NavbarProps {
  visible: boolean;
}

export default function Navbar({ visible }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b shadow-lg shadow-black/20",
        scrolled
          ? "glass-strong border-steel/10"
          : "bg-transparent border-transparent shadow-none"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between h-16 sm:h-20">
        {/* Left: Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className={cn(
                "font-inter text-sm tracking-wider cursor-pointer transition-colors duration-300",
                "text-ivory-muted hover:text-ivory",
                "relative after:absolute after:-bottom-1 after:left-0 after:h-[1.5px] after:bg-crimson",
                "after:transition-all after:duration-300",
                "after:w-0 hover:after:w-full"
              )}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle navigation menu"
        >
          <span
            className={cn(
              "block w-6 h-[2px] bg-ivory transition-all duration-300",
              mobileOpen && "rotate-45 translate-y-[5px]"
            )}
          />
          <span
            className={cn(
              "block w-6 h-[2px] bg-ivory transition-all duration-300",
              mobileOpen && "opacity-0"
            )}
          />
          <span
            className={cn(
              "block w-6 h-[2px] bg-ivory transition-all duration-300",
              mobileOpen && "-rotate-45 -translate-y-[5px]"
            )}
          />
        </button>

        {/* Right: Logo (Miniature Marvel Studios style) — TOP RIGHT */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-1.5 select-none scale-90 sm:scale-100 origin-right cursor-pointer"
        >
          <div className="bg-crimson px-2 py-1 border border-white/10 rounded-sm">
            <span className="font-oswald text-xs sm:text-sm font-extrabold tracking-[-0.03em] text-white leading-none block">
              ABHINAV
            </span>
          </div>
          <div className="flex flex-col items-center justify-center relative px-1 py-[3px] border-y-2 border-white/90">
            <span className="font-oswald text-[9px] sm:text-[11px] font-bold tracking-[0.2em] text-white leading-none block">
              TIWARI
            </span>
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-strong border-t border-steel/10 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="font-inter text-sm tracking-wider text-left py-1 cursor-pointer transition-colors text-ivory-muted hover:text-ivory"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
