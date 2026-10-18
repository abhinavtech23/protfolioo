"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MONTAGE_IMAGES } from "@/lib/constants";
import { Howl } from "howler";

gsap.registerPlugin(useGSAP);

interface CinematicIntroProps {
  onComplete: () => void;
}

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const abhinavBoxRef = useRef<SVGRectElement>(null);
  const abhinavTextRef = useRef<SVGTextElement>(null);
  const tiwariGroupRef = useRef<SVGGElement>(null);
  const resolveLayerRef = useRef<SVGRectElement>(null);
  const sweepRef = useRef<SVGRectElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  // Sound references
  const flipbookSoundRef = useRef<Howl | null>(null);
  const boomSoundRef = useRef<Howl | null>(null);
  const sheenSoundRef = useRef<Howl | null>(null);

  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload all flipbook images
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

  // Load high-fidelity audio files
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Page flip shutter sound
    flipbookSoundRef.current = new Howl({
      src: ["/audio/flipbook_sfx.mp3"],
      volume: 0.8,
    });

    // Sub-bass Zimmer boom
    boomSoundRef.current = new Howl({
      src: ["/audio/cinematic_boom.mp3"],
      volume: 0.9,
    });

    // Metallic sheen whoosh sweep
    sheenSoundRef.current = new Howl({
      src: ["/audio/metallic_sheen.mp3"],
      volume: 0.7,
    });

    return () => {
      flipbookSoundRef.current?.unload();
      boomSoundRef.current?.unload();
      sheenSoundRef.current?.unload();
    };
  }, []);

  // Master GSAP Timeline (plays automatically once images are loaded)
  useGSAP(
    () => {
      if (!imagesLoaded || !containerRef.current || !svgRef.current || !backgroundRef.current) return;

      // Resume AudioContext if suspended by browser security policy
      if (typeof window !== "undefined" && (window as any).Howler?.ctx?.resume) {
        (window as any).Howler.ctx.resume().catch(() => {});
      }

      const tl = gsap.timeline({
        onComplete: () => {
          // Fade out the entire intro container to reveal the Hero
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.6,
            ease: "power2.inOut",
            onComplete: onComplete,
          });
        },
      });

      // --- PHASE 1 & 2: The Flipbook Engine & Zoom Out (0s - 2.5s) ---
      // Start with scale 2.4 (zoomed into the text) and pull back
      tl.fromTo(
        svgRef.current,
        { scale: 2.4, rotate: -3 },
        {
          scale: 1,
          rotate: 0,
          duration: 2.8,
          ease: "power3.out",
        },
        0
      );

      // Play flipbook engine sound
      tl.call(
        () => {
          flipbookSoundRef.current?.play();
        },
        [],
        0
      );

      // Dynamic Audio Control: Pitch down and fade volume as timeline decelerates
      const audioControl = { volume: 0.8, rate: 1.25 };
      tl.to(
        audioControl,
        {
          volume: 0.05,
          rate: 0.5,
          duration: 2.5,
          ease: "power2.out",
          onUpdate: () => {
            if (flipbookSoundRef.current) {
              flipbookSoundRef.current.volume(audioControl.volume);
              flipbookSoundRef.current.rate(audioControl.rate);
            }
          },
          onComplete: () => {
            flipbookSoundRef.current?.stop();
          },
        },
        0
      );

      // Rapidly toggle the full-screen background images
      const switchCount = 38;
      const totalMontageDuration = 2.5;

      for (let i = 0; i < switchCount; i++) {
        const progress = i / switchCount;
        const time = Math.pow(progress, 2.8) * totalMontageDuration;

        tl.call(
          () => {
            const currentImgIdx = i % MONTAGE_IMAGES.length;

            imageRefs.current.forEach((img, idx) => {
              if (img) {
                if (idx === currentImgIdx) {
                  gsap.set(img, { opacity: 1 });
                  // Scale up active background photo
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

            // Reactively pulse the title text in sync with each background image switch
            gsap.fromTo(
              abhinavTextRef.current,
              {
                scale: 1.06,
                filter: "brightness(1.5)",
              },
              {
                scale: 1.0,
                filter: "brightness(1.0)",
                duration: 0.12,
                ease: "power2.out",
              }
            );
          },
          [],
          time
        );
      }

      // --- PHASE 3: Color Bleed, Solidification & Light Sweep (2.5s - 3.5s) ---
      // Fade out full screen background images to black
      tl.to(
        backgroundRef.current,
        {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
        },
        2.5
      );

      // Resolve ABHINAV text to white steel and box to crimson
      tl.to(
        resolveLayerRef.current,
        {
          opacity: 1,
          duration: 0.4,
          ease: "power2.inOut",
        },
        2.5
      );

      tl.to(
        abhinavBoxRef.current,
        {
          fill: "#8B0000",
          stroke: "#ffffff",
          duration: 0.4,
          ease: "power2.inOut",
        },
        2.5
      );

      // Trigger sub-bass Zimmer boom
      tl.call(
        () => {
          boomSoundRef.current?.play();
        },
        [],
        2.5
      );

      // Fade in the right side: TIWARI + Border lines
      tl.fromTo(
        tiwariGroupRef.current,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        2.6
      );

      // Trigger metallic sheen whoosh
      tl.call(
        () => {
          if (sheenSoundRef.current) {
            sheenSoundRef.current.play();
            sheenSoundRef.current.fade(0.7, 0, 1800);
          }
        },
        [],
        2.7
      );

      // Trigger the shiny white light sweep across the resolved text
      tl.fromTo(
        sweepRef.current,
        { x: -1000 },
        {
          x: 1000,
          duration: 1.2,
          ease: "power2.inOut",
        },
        2.8
      );

      // Accentuate the resolve with a slight scale bump
      tl.to(
        svgRef.current,
        {
          scale: 1.03,
          duration: 0.15,
          yoyo: true,
          repeat: 1,
          ease: "power2.out",
        },
        2.5
      );

      // --- PHASE 4: Hold at center, then fade out (3.6s - 5.0s) ---
      // Keep the resolved logo at the same scale & position (center of screen).
      // Just hold for a beat, then fade out the whole container via onComplete.
      tl.to(
        svgRef.current,
        {
          scale: 1,
          duration: 1.0,
          ease: "none",
        },
        3.6
      );

      // Gentle fade of the SVG at the very end before the container fades
      tl.to(
        svgRef.current,
        {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
        },
        4.4
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
      {/* Loading state indicator (shown only if assets are preloading) */}
      {!imagesLoaded && (
        <div className="absolute inset-0 bg-black flex flex-col items-center justify-center z-[120]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-steel/20 border-t-crimson rounded-full animate-spin" />
            <span className="font-inter text-xs tracking-wider text-steel-light uppercase">
              Loading Systems...
            </span>
          </div>
        </div>
      )}

      {/* Full-screen Background Photo Montage */}
      {imagesLoaded && (
        <div ref={backgroundRef} className="absolute inset-0 w-full h-full z-0">
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
          {/* Cinematic vignettes for high readability and depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 pointer-events-none" />
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        </div>
      )}

      {/* Skip button */}
      <button
        onClick={() => {
          try {
            flipbookSoundRef.current?.stop();
            boomSoundRef.current?.stop();
            sheenSoundRef.current?.stop();
          } catch {}
          onComplete();
        }}
        className="absolute top-6 right-6 z-50 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider text-neutral-400 hover:text-white glass-apple border border-white/10 hover:border-white/30 transition-all cursor-pointer pointer-events-auto"
      >
        Skip ✕
      </button>

      {/* SVG Container holding the Marvel logo replication */}
      {imagesLoaded && (
        <svg
          ref={svgRef}
          viewBox="0 0 1000 250"
          className="w-full max-w-5xl px-6 aspect-[4/1] z-10 will-change-transform pointer-events-none select-none"
        >
          <defs>
            {/* Mask for ABHINAV block lettering */}
            <clipPath id="abhinav-mask">
              <text
                x="285"
                y="125"
                textAnchor="middle"
                dominantBaseline="central"
                className="font-oswald"
                textLength="470"
                lengthAdjust="spacingAndGlyphs"
                style={{
                  fontSize: "140px",
                  fontWeight: 800,
                  letterSpacing: "-0.06em",
                }}
              >
                ABHINAV
              </text>
            </clipPath>

            {/* Brushed steel metallic gradient for final resolve text */}
            <linearGradient id="metallic-resolve-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D8D8D8" />
              <stop offset="50%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#B0B0B0" />
            </linearGradient>

            {/* Light sweep gradient */}
            <linearGradient id="sweep-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* LEFT SIDE: "ABHINAV" in box */}
          <g>
            {/* The Backing Box (initially black/translucent, turns crimson on resolve) */}
            <rect
              ref={abhinavBoxRef}
              x="20"
              y="35"
              width="530"
              height="180"
              fill="#000000"
              fillOpacity="0.5"
              stroke="#4A4A4A"
              strokeWidth="4"
              rx="4"
            />

            {/* White text (during montage, text is white, resolves to metallic gradient on resolve) */}
            <text
              ref={abhinavTextRef}
              x="285"
              y="125"
              textAnchor="middle"
              dominantBaseline="central"
              className="font-oswald fill-white transition-all duration-300"
              textLength="470"
              lengthAdjust="spacingAndGlyphs"
              style={{
                fontSize: "140px",
                fontWeight: 800,
                letterSpacing: "-0.06em",
                transformOrigin: "285px 125px",
              }}
            >
              ABHINAV
            </text>

            {/* Metallic texture resolved on top (hidden initially) */}
            <g clipPath="url(#abhinav-mask)">
              <rect
                ref={resolveLayerRef}
                x="20"
                y="35"
                width="530"
                height="180"
                fill="url(#metallic-resolve-grad)"
                opacity={0}
              />
            </g>

            {/* Light sweep element clipped to the text */}
            <g clipPath="url(#abhinav-mask)">
              <rect
                ref={sweepRef}
                x="0"
                y="35"
                width="400"
                height="180"
                fill="url(#sweep-grad)"
              />
            </g>
          </g>

          {/* RIGHT SIDE: "TIWARI" with border lines */}
          <g ref={tiwariGroupRef} opacity="0">
            {/* Top horizontal border line */}
            <line
              x1="570"
              y1="45"
              x2="980"
              y2="45"
              stroke="#FFFFFF"
              strokeWidth="5"
            />

            {/* TIWARI Text */}
            <text
              x="775"
              y="125"
              textAnchor="middle"
              dominantBaseline="central"
              className="font-oswald fill-white"
              textLength="350"
              lengthAdjust="spacingAndGlyphs"
              style={{
                fontSize: "100px",
                fontWeight: 700,
                letterSpacing: "0.22em",
              }}
            >
              TIWARI
            </text>

            {/* Bottom horizontal border line */}
            <line
              x1="570"
              y1="205"
              x2="980"
              y2="205"
              stroke="#FFFFFF"
              strokeWidth="5"
            />
          </g>
        </svg>
      )}
    </div>
  );
}
