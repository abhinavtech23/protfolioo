"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MONTAGE_IMAGES } from "@/lib/constants";

gsap.registerPlugin(useGSAP);

interface IntroSequenceProps {
  onComplete: () => void;
}

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload all montage images
  const preloadImages = useCallback(() => {
    let loaded = 0;
    const total = MONTAGE_IMAGES.length;

    if (total === 0) {
      setImagesLoaded(true);
      return;
    }

    MONTAGE_IMAGES.forEach((src) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        loaded++;
        if (loaded >= total) {
          setImagesLoaded(true);
        }
      };
      img.src = src;
    });
  }, []);

  useEffect(() => {
    preloadImages();
  }, [preloadImages]);

  // Master GSAP Timeline
  useGSAP(
    () => {
      if (!imagesLoaded || !containerRef.current || !textRef.current || !backgroundRef.current) return;

      const tl = gsap.timeline({
        onComplete: () => {
          // Fade out the entire overlay container at the end
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.6,
            ease: "power2.inOut",
            onComplete: onComplete,
          });
        },
      });

      // --- PHASE 1 & 2: Full-screen Image Montage + Reactive Text Animation ---
      const switchCount = 36;
      const totalMontageDuration = 3.2;

      for (let i = 0; i < switchCount; i++) {
        const progress = i / switchCount;
        // power3.out curve to decelerate the montage flashing speed
        const time = Math.pow(progress, 3.0) * totalMontageDuration;

        tl.call(
          () => {
            const currentImgIdx = i % MONTAGE_IMAGES.length;

            // Toggle background image visibility
            imageRefs.current.forEach((img, idx) => {
              if (img) {
                if (idx === currentImgIdx) {
                  gsap.set(img, { opacity: 1 });
                  // Subtly scale the active background photo up
                  gsap.fromTo(
                    img,
                    { scale: 1.15 },
                    { scale: 1.0, duration: 0.25, ease: "power1.out" }
                  );
                } else {
                  gsap.set(img, { opacity: 0 });
                }
              }
            });

            // Reactively pulse the center title text in sync with each photo switch
            gsap.fromTo(
              textRef.current,
              {
                scale: 1.08,
                filter: "brightness(1.6) contrast(1.2)",
                textShadow: "0 0 40px rgba(139, 0, 0, 0.9), 0 0 80px rgba(139, 0, 0, 0.5)",
              },
              {
                scale: 1.0,
                filter: "brightness(1.0) contrast(1.0)",
                textShadow: "0 0 25px rgba(139, 0, 0, 0.5), 0 0 50px rgba(139, 0, 0, 0.2)",
                duration: 0.15,
                ease: "power2.out",
              }
            );
          },
          [],
          time
        );
      }

      // Slowly scale the entire text container up slightly during montage
      tl.fromTo(
        textContainerRef.current,
        { scale: 0.9 },
        { scale: 1.05, duration: totalMontageDuration, ease: "power1.out" },
        0
      );

      // --- PHASE 3: Fade Background to Black + Resolve Text to Steel Metallic ---
      // Fade out background images
      tl.to(
        backgroundRef.current,
        {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
        },
        totalMontageDuration
      );

      // Resolve text to solid brushed steel metallic look
      tl.call(
        () => {
          if (textRef.current) {
            textRef.current.classList.add("metallic-resolve");
            // Remove text-shadow to look clean and premium
            textRef.current.style.textShadow = "none";
          }
        },
        [],
        totalMontageDuration
      );

      // Pulse text outline resolve
      tl.fromTo(
        textRef.current,
        { scale: 1.05 },
        {
          scale: 1.0,
          duration: 0.6,
          ease: "power3.out",
        },
        totalMontageDuration
      );

      // --- PHASE 4: Translate to Navbar Logo Position (4.5s - 5.7s) ---
      tl.to(
        textContainerRef.current,
        {
          scale: 0.28,
          x: () => {
            const vw = window.innerWidth;
            return -(vw / 2) + (vw < 640 ? 80 : 130);
          },
          y: () => {
            const vh = window.innerHeight;
            return -(vh / 2) + (vh < 640 ? 30 : 40);
          },
          opacity: 0.9,
          duration: 1.2,
          ease: "power3.inOut",
        },
        4.5
      );

      // Fade out the logo element right at the end to match navbar mount
      tl.to(
        textContainerRef.current,
        {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        },
        5.4
      );
    },
    { scope: containerRef, dependencies: [imagesLoaded, onComplete] }
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      {/* Skip button */}
      <button
        onClick={onComplete}
        className="absolute bottom-8 right-8 z-[110] font-inter text-xs tracking-widest text-steel-light/60 hover:text-ivory/80 transition-colors duration-300 uppercase"
      >
        Skip Intro →
      </button>

      {/* Full-screen Background Images */}
      {imagesLoaded && (
        <div ref={backgroundRef} className="absolute inset-0 w-full h-full">
          {MONTAGE_IMAGES.map((src, idx) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={idx}
              src={src}
              alt=""
              ref={(el) => {
                imageRefs.current[idx] = el;
              }}
              className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none"
              style={{ transformOrigin: "center center" }}
            />
          ))}
          {/* Dark Vignette Overlays for Cinematic Depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 pointer-events-none" />
          <div className="absolute inset-0 bg-black/50 pointer-events-none" />
        </div>
      )}

      {/* Center Title overlay */}
      <div
        ref={textContainerRef}
        className="relative z-10 text-center pointer-events-none select-none will-change-transform"
      >
        <div
          ref={textRef}
          className="font-cinzel font-black tracking-[0.08em] text-ivory transition-all duration-300"
          style={{
            fontSize: "clamp(3.5rem, 12vw, 9rem)",
            fontWeight: 900,
            textShadow: "0 0 25px rgba(139, 0, 0, 0.5)",
          }}
        >
          ABHINAV
        </div>
      </div>
    </div>
  );
}
