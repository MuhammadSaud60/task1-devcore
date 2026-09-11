import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

const images = [
  "/imgs/img-1.png",
  "/imgs/img-2.png",
  "/imgs/img-3.png",
  "/imgs/img-4.jpeg",
  "/imgs/img-5.jpeg",
  "/imgs/img-6.jpeg",
  "/imgs/img-7.png",
];

const phrases = [
  "BUSINESSES FORWARD",
  "COMMERCE FASTER",       
  "BRANDS HIGHER",         
  "WORKFLOWS SMARTER",     
  "PRODUCTS TO SCALE",
];

// Configuration for floating aesthetic geometric shapes
const floatingShapes = [
  // Crosses
  { id: 1, type: "cross", top: "18%", left: "12%", size: "w-3 h-3", depth: 35, opacity: "opacity-40" },
  { id: 2, type: "cross", top: "72%", left: "82%", size: "w-4 h-4", depth: -45, opacity: "opacity-50" },
  { id: 3, type: "cross", top: "35%", left: "88%", size: "w-3 h-3", depth: 25, opacity: "opacity-35" },
  // Diamonds / Rotated Squares
  { id: 4, type: "diamond", top: "22%", left: "78%", size: "w-2.5 h-2.5", depth: -30, opacity: "opacity-40" },
  { id: 5, type: "diamond", top: "68%", left: "15%", size: "w-3 h-3", depth: 40, opacity: "opacity-45" },
  // Rings
  { id: 6, type: "ring", top: "48%", left: "8%", size: "w-4 h-4", depth: -20, opacity: "opacity-30" },
  { id: 7, type: "ring", top: "14%", left: "48%", size: "w-3 h-3", depth: 50, opacity: "opacity-35" },
  { id: 8, type: "ring", top: "82%", left: "45%", size: "w-5 h-5", depth: -35, opacity: "opacity-25" },
  // Stars / Sparkles
  { id: 9, type: "sparkle", top: "28%", left: "28%", size: "w-3 h-3", depth: 20, opacity: "opacity-60" },
  { id: 10, type: "sparkle", top: "62%", left: "70%", size: "w-3.5 h-3.5", depth: -25, opacity: "opacity-50" },
];

const backgroundShapes = [
  { id: "bg-1", type: "ring", top: "12%", left: "18%", size: "w-28 h-28", opacity: "opacity-15" },
  { id: "bg-2", type: "diamond", top: "24%", left: "76%", size: "w-20 h-20", opacity: "opacity-10" },
  { id: "bg-3", type: "cross", top: "70%", left: "22%", size: "w-12 h-12", opacity: "opacity-15" },
  { id: "bg-4", type: "ring", top: "74%", left: "82%", size: "w-36 h-36", opacity: "opacity-10" },
];

const Hero = () => {
  const containerRef = useRef(null);
  const imageIndex = useRef(0);
  const phraseRef = useRef(null);
  const shapesRef = useRef([]);
  const backgroundShapesRef = useRef([]);
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const letters = containerRef.current.querySelectorAll(".initial-letter");
    const tl = gsap.timeline();

    letters.forEach((letterEl, index) => {
      const finalChar = letterEl.getAttribute("data-char") || "";

      if (finalChar === "\u00A0") {
        letterEl.textContent = "\u00A0";
        return;
      }

      tl.to(
        letterEl,
        {
          delay: 0.2,
          duration: 0.35,
          onStart: () => {
            let scrambleCount = 0;
            const interval = setInterval(() => {
              letterEl.textContent = chars.charAt(
                Math.floor(Math.random() * chars.length)
              );
              scrambleCount++;
              if (scrambleCount > 5) {
                clearInterval(interval);
                letterEl.textContent = finalChar;
              }
            }, 35);
          },
        },
        index * 0.04 + 0.2
      );
    });

    // Reveal third line + CTA buttons
    tl.to(
      phraseRef.current,
      {
        y: "0%",
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
      },
      "-=0.2"
    );

    tl.to(
      ".hero-btn",
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      },
      "-=0.3"
    );

    // Continuous ambient floating animation for shapes
    shapesRef.current.forEach((shapeEl, idx) => {
      if (!shapeEl) return;
      gsap.to(shapeEl, {
        y: "+=12",
        x: idx % 2 === 0 ? "+=8" : "-=8",
        rotation: idx % 2 === 0 ? 45 : -45,
        duration: 3 + (idx % 3),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    backgroundShapesRef.current.forEach((shapeEl, idx) => {
      if (!shapeEl) return;
      gsap.to(shapeEl, {
        y: idx % 2 === 0 ? 18 : -18,
        x: idx % 2 === 0 ? -12 : 12,
        rotation: idx % 2 === 0 ? 20 : -20,
        duration: 5 + idx,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: idx * 0.25,
      });
    });

    // Continuous loop cycling through phrases
    const cycleInterval = setInterval(() => {
      if (!phraseRef.current) return;

      gsap.to(phraseRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
          gsap.fromTo(
            phraseRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
          );
        },
      });
    }, 3000);

    return () => clearInterval(cycleInterval);
  }, []);

  // Combined Cursor Handler: Parallax for shapes + Image Trail
  useEffect(() => {
    if (!containerRef.current) return;

    let lastX = 0,
      lastY = 0;
    const threshold = 120;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const mouseXRatio = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const mouseYRatio = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1

      // 1. Smoothly move floating shapes based on depth factors
      shapesRef.current.forEach((shapeEl, i) => {
        if (!shapeEl) return;
        const depth = floatingShapes[i]?.depth || 25;
        gsap.to(shapeEl, {
          x: mouseXRatio * depth,
          y: mouseYRatio * depth,
          duration: 1.2,
          ease: "power2.out",
          overwrite: "auto",
        });
      });

      // 2. Image Trail on Cursor Threshold
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const distance = Math.hypot(dx, dy);

      if (distance < threshold) return;

      const dirX = dx / distance || 0;
      const dirY = dy / distance || 0;

      lastX = e.clientX;
      lastY = e.clientY;

      const rotation = dirX > 0 ? 12 : -12;
      const src = images[imageIndex.current % images.length];
      imageIndex.current++;

      const img = document.createElement("img");
      img.src = src;

      Object.assign(img.style, {
        position: "absolute",
        left: `${e.clientX}px`,
        top: `${e.clientY}px`,
        width: "280px",
        height: "auto",
        pointerEvents: "none",
        transform: "translate(-50%, -50%)",
        borderRadius: "50%",
        opacity: "0",
        objectFit: "cover",
        willChange: "transform, opacity",
        filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.25))",
        zIndex: "10",
      });

      containerRef.current?.appendChild(img);

      gsap.fromTo(
        img,
        {
          scale: 0.6,
          opacity: 0,
          borderRadius: "50%",
          x: `-=${dirX * 80}`,
          y: `-=${dirY * 80}`,
        },
        {
          scale: 1,
          opacity: 1,
          borderRadius: 0,
          duration: 1.4,
          rotate: rotation,
          ease: "power3.out",
          x: `+=${dirX * 180}`,
          y: `+=${dirY * 180}`,
        }
      );

      gsap.to(img, {
        opacity: 0,
        scale: 1.05,
        duration: 1.2,
        delay: 0.8,
        ease: "power2.out",
        onComplete: () => img.remove(),
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Render individual SVG icons based on shape type
  const renderShapeIcon = (type) => {
    switch (type) {
      case "cross":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-full h-full">
            <path strokeLinecap="round" d="M12 5v14M5 12h14" />
          </svg>
        );
      case "diamond":
        return (
          <div className="w-full h-full border border-white/80 rotate-45" />
        );
      case "ring":
        return (
          <div className="w-full h-full rounded-full border border-white/70" />
        );
      case "sparkle":
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative z-[999] bg-black min-h-screen w-full text-white flex flex-col items-center justify-center gap-4 md:gap-8 overflow-hidden px-4 py-16"
    >
      {/* Animated background geometry */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {backgroundShapes.map((item, idx) => (
          <div
            key={item.id}
            ref={(el) => (backgroundShapesRef.current[idx] = el)}
            style={{ top: item.top, left: item.left }}
            className={`absolute ${item.size} ${item.opacity} text-lime-300 will-change-transform blur-[0.2px]`}
          >
            {renderShapeIcon(item.type)}
          </div>
        ))}
      </div>

      {/* Interactive Floating Shapes (Foreground Parallax Layer) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {floatingShapes.map((item, idx) => (
          <div
            key={item.id}
            ref={(el) => (shapesRef.current[idx] = el)}
            style={{ top: item.top, left: item.left }}
            className={`absolute ${item.size} ${item.opacity} text-white will-change-transform drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]`}
          >
            {renderShapeIcon(item.type)}
          </div>
        ))}
      </div>

    

      {/* First line: SOFTWARE THAT MOVE */}
      <div className="z-30 flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-2">
        <div className="relative flex items-center justify-center px-3 py-2">
          <h1 className="relative font-sans font-black tracking-tight text-[6.5vw] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl uppercase leading-none overflow-hidden whitespace-nowrap">
            {"SOFTWARE".split("").map((char, ci) => (
              <span
                key={ci}
                data-char={char === " " ? "\u00A0" : char}
                className="initial-letter inline-block will-change-transform"
              >
                &nbsp;
              </span>
            ))}
          </h1>
        </div>

        <h1 className="font-sans font-black tracking-tight text-[6.5vw] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl uppercase leading-none overflow-hidden whitespace-nowrap">
          {"THAT MOVE".split("").map((char, ci) => (
            <span
              key={ci}
              data-char={char === " " ? "\u00A0" : char}
              className="initial-letter inline-block will-change-transform"
            >
              &nbsp;
            </span>
          ))}
        </h1>
      </div>

      {/* Second line: ROTATING SERVICES PHRASES */}
      <div className="min-h-[1.3em] flex items-center justify-center py-2 z-30">
        <h1
          ref={phraseRef}
          className="opacity-0 translate-y-6 font-sans font-black tracking-tight text-[6.5vw] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl uppercase leading-none whitespace-nowrap text-lime-400 will-change-transform"
        >
          {phrases[phraseIndex]}
        </h1>
      </div>

      {/* Buttons Block */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mt-8 md:mt-12 z-30 w-full">
        <a
          href="#services"
          className="cursor-pointer hero-btn opacity-0 translate-y-6 px-8 py-3.5 rounded-full border border-gray-600 text-white text-sm md:text-base tracking-widest uppercase transition-all duration-500 ease-out hover:bg-white hover:text-black hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95"
        >
          Explore Services
        </a>
        <a
          href="#contact"
          className="cursor-pointer hero-btn opacity-0 translate-y-6 px-8 py-3.5 rounded-full bg-white text-black border border-white text-sm md:text-base tracking-widest uppercase transition-all duration-500 ease-out hover:bg-gray-200 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] active:scale-95"
        >
          Let's Talk
        </a>
      </div>
    </div>
  );
};

export default Hero;