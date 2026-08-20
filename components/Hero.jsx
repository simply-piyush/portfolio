"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SocialLinks from "./SocialLinks";

export default function Hero({
  greeting = "Hello World!",
  name = "Im Piyush Singh",
  links,
  className = "",
}) {
  const containerRef = useRef(null);
  const greetingRef = useRef(null);
  const nameRef = useRef(null);
  const linksRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: {
          ease: "back.out(1.4)",
          duration: 0.8,
        },
      });

      // 1. Hello World! - speech box pops in first
      tl.fromTo(
        greetingRef.current,
        {
          y: 70,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
        }
      )
        // 2. Im Piyush Singh - starts exactly 0.1s after Hello World appears
        .fromTo(
          nameRef.current,
          {
            y: 80,
            opacity: 0,
            scale: 0.92,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
          },
          "+=0.1"
        )
        // 3. Social Links pop in
        .fromTo(
          linksRef.current,
          {
            y: 40,
            opacity: 0,
            scale: 0.85,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
          },
          "-=0.3"
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className={`relative min-h-[500vh] flex flex-col items-center justify-start text-center px-6 sm:px-10 md:px-16 lg:px-20 pt-48 sm:pt-64 pb-20 overflow-hidden select-none font-silkscreen ${className}`}
    >
      <div className="relative z-10 flex flex-col items-center max-w-5xl mx-auto space-y-6 md:space-y-8">
        {/* Hello World! - Pixel Speech Box */}
        <div ref={greetingRef} className="inline-block">
          <div className="relative group bg-white text-black border-3 border-black px-5 py-2.5 pixel-shadow transition-transform duration-200 hover:scale-105">
            <span className="font-silkscreen text-xs sm:text-sm md:text-base font-semibold tracking-widest uppercase">
              {greeting}
            </span>

            {/* Speech bubble pixel tail */}
            <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-black" />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[7px] border-t-white" />
          </div>
        </div>

        {/* Im Piyush Singh - Silkscreen Headline */}
        <div ref={nameRef} className="max-w-4xl">
          <h1 className="font-silkscreen font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-black leading-tight">
            {name}
          </h1>
        </div>

        {/* LinkedIn & GitHub Links */}
        <div ref={linksRef} className="pt-2 sm:pt-4">
          <SocialLinks links={links} />
        </div>
      </div>
    </section>
  );
}
