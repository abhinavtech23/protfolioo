"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CinematicIntro from "@/components/intro/CinematicIntro";
import Navbar from "@/components/ui/Navbar";
import HeroSection from "@/components/hero/HeroSection";
import TechArsenal from "@/components/arsenal/TechArsenal";
import ProjectsSection from "@/components/projects/ProjectsSection";
import ExperienceTimeline from "@/components/experience/ExperienceTimeline";
import AcademicsSection from "@/components/academics/AcademicsSection";
import Footer from "@/components/footer/Footer";

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <div className="min-h-screen w-full bg-obsidian">
      {/* Cinematic Intro Sequence */}
      {!introComplete && (
        <CinematicIntro onComplete={() => setIntroComplete(true)} />
      )}

      {/* Persistent Navbar — visible after intro */}
      <Navbar visible={introComplete} />

      {/* Main scrollable content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: introComplete ? 1 : 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* Hero — full viewport height */}
        <section className="relative w-full min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full pt-20 sm:pt-24 pb-12">
            <HeroSection />
          </div>
        </section>

        {/* Tech Arsenal */}
        <section className="relative w-full py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <TechArsenal />
          </div>
        </section>

        {/* Projects */}
        <section className="relative w-full py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <ProjectsSection />
          </div>
        </section>

        {/* Experience */}
        <section className="relative w-full py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <ExperienceTimeline />
          </div>
        </section>

        {/* Academics */}
        <section className="relative w-full py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <AcademicsSection />
          </div>
        </section>

        {/* Contact */}
        <section className="relative w-full py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <Footer />
          </div>
        </section>

        {/* Credits bar */}
        <footer className="w-full border-t border-steel/10 py-4 text-center bg-obsidian-light">
          <p className="font-inter text-[10px] sm:text-xs text-steel-light/75 tracking-wider">
            Designed & Built by Abhinav Tiwari · {new Date().getFullYear()}
          </p>
        </footer>
      </motion.main>
    </div>
  );
}
