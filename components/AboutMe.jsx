"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const DEFAULT_ABOUT_TEXT =
  "I'm a Computer Science student and aspiring software developer with a strong focus on frontend development and building interactive digital experiences. I enjoy turning ideas into clean, responsive, and engaging products using technologies like JavaScript, React, Next.js, and modern web tools. Alongside web development, I've explored mobile development with React Native and backend technologies to understand the complete product development process. I'm a hands-on learner who enjoys solving problems, experimenting with new technologies, and continuously improving through real-world projects. My goal is to build meaningful products that combine thoughtful design with solid engineering.";

export default function AboutMe({
  title = "ABOUT ME",
  text = DEFAULT_ABOUT_TEXT,
  className = "",
}) {
  const containerRef = useRef(null);
  const boxRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        boxRef.current,
        {
          y: 80,
          opacity: 0,
          scale: 0.88,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className={`min-h-[140vh] md:min-h-[500vh] flex flex-col justify-start px-4 xs:px-6 sm:px-10 md:px-16 lg:px-20 pt-28 sm:pt-36 pb-20 ${className}`}
    >
      {/* Maximum 50vw width container aligned to the left */}
      <div className="w-full md:max-w-[50vw] text-left">
        {/* 8-Bit Pixel Dialog Box */}
        <div
          ref={boxRef}
          className="relative bg-white text-black border-4 border-black pixel-shadow p-4 xs:p-6 sm:p-10 md:p-12 space-y-4 sm:space-y-6 md:space-y-8"
        >
          {/* Dialog Box Title Bar with Enlarged ABOUT ME */}
          <div className="flex items-center justify-between border-b-4 border-black pb-3 sm:pb-4">
            <div className="flex items-center gap-2.5 sm:gap-3.5">
              <span className="w-3 h-3 sm:w-4 sm:h-4 bg-black inline-block" />
              <h2 className="font-silkscreen font-bold text-xl sm:text-2xl md:text-3xl lg:text-5xl tracking-widest uppercase text-black">
                {title}
              </h2>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 font-silkscreen font-bold text-xs">
              <span className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-black flex items-center justify-center bg-white hover:bg-black hover:text-white cursor-pointer transition-colors leading-none text-[10px] sm:text-xs">
                _
              </span>
              <span className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-black flex items-center justify-center bg-white hover:bg-black hover:text-white cursor-pointer transition-colors leading-none text-[10px] sm:text-xs">
                ×
              </span>
            </div>
          </div>

          {/* Dialog Body Content - Easily Readable Font */}
          <p className="font-body text-sm xs:text-base sm:text-lg md:text-xl leading-relaxed sm:leading-relaxed md:leading-loose text-black/90 font-normal tracking-normal">
            {text}
          </p>

          {/* Pixel Speech Pointer */}
          <div className="absolute -bottom-3 left-6 sm:left-10 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[14px] border-t-black" />
          <div className="absolute -bottom-1.5 left-6 sm:left-10 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[9px] border-t-white" />
        </div>
      </div>
    </section>
  );
}
