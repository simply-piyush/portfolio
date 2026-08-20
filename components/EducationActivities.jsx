"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function EducationActivities({ className = "" }) {
  const containerRef = useRef(null);
  const leftCardRef = useRef(null);
  const rightCardRef = useRef(null);
  const headerRef = useRef(null);

  useGSAP(
    () => {
      // Header Animation
      gsap.fromTo(
        headerRef.current,
        {
          y: 40,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Left Card (Education) pop in from left
      gsap.fromTo(
        leftCardRef.current,
        {
          x: -50,
          opacity: 0,
          scale: 0.92,
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Right Card (Activities) pop in from right
      gsap.fromTo(
        rightCardRef.current,
        {
          x: 50,
          opacity: 0,
          scale: 0.92,
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.4)",
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
      className={`min-h-fit md:min-h-[300vh] flex flex-col justify-start px-4 xs:px-6 sm:px-10 md:px-16 lg:px-20 py-20 sm:py-24 md:pt-36 md:pb-20 select-none ${className}`}
    >
      <div className="w-full space-y-8 sm:space-y-12">
        {/* Section Header: Centered & White */}
        <div ref={headerRef} className="text-center flex flex-col items-center justify-center space-y-2 sm:space-y-3">
          <h2
            className="font-silkscreen font-bold text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-tight"
            style={{
              textShadow: "4px 4px 0px #000000",
            }}
          >
            EDUCATION & ACTIVITIES
          </h2>
          <div className="w-20 sm:w-36 h-1.5 sm:h-2 bg-white pixel-shadow" />
        </div>

        {/* 30vw Split Columns with Matching Equal Sizes */}
        <div className="flex flex-col lg:flex-row justify-between items-stretch w-full gap-6 sm:gap-8 lg:gap-0">
          {/* ================= LEFT CARD: EDUCATION (30vw) ================= */}
          <div
            ref={leftCardRef}
            className="w-full lg:w-[30vw] lg:max-w-[30vw] min-h-[440px] sm:min-h-[500px] relative bg-white text-black border-4 border-black pixel-shadow p-4 xs:p-6 sm:p-7 md:p-8 flex flex-col justify-between"
          >
            {/* Card Content Area */}
            <div className="space-y-4 sm:space-y-6">
              {/* Card Header Bar */}
              <div className="flex items-center justify-between border-b-4 border-black pb-3 sm:pb-3.5">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 bg-black inline-block" />
                  <h3 className="font-silkscreen font-bold text-lg xs:text-xl sm:text-2xl md:text-3xl tracking-wider uppercase text-black">
                    EDUCATION
                  </h3>
                </div>
              </div>

              {/* Education Entry 1 */}
              <div className="space-y-2.5 sm:space-y-3 bg-black/5 p-3.5 xs:p-4 sm:p-5 border-2 border-black">
                <h4 className="font-silkscreen font-bold text-xs xs:text-sm sm:text-base md:text-lg text-black leading-snug">
                  Techno Engineering College Banipur
                </h4>
                <div className="space-y-1.5 sm:space-y-2">
                  <p className="font-body text-xs xs:text-sm sm:text-base md:text-lg font-semibold text-black/90 leading-relaxed">
                    B.Tech in Computer Science &amp; Engineering
                  </p>
                  <div className="inline-block bg-black text-white px-2.5 sm:px-3 py-0.5 sm:py-1 font-silkscreen text-[11px] sm:text-sm font-bold mt-1">
                    Current CGPA: 7.6 / 10
                  </div>
                </div>
              </div>

              {/* Education Entry 2 */}
              <div className="space-y-2.5 sm:space-y-3 bg-black/5 p-3.5 xs:p-4 sm:p-5 border-2 border-black">
                <h4 className="font-silkscreen font-bold text-xs xs:text-sm sm:text-base md:text-lg text-black leading-snug">
                  St. Jude’s High School
                </h4>
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex flex-col gap-1.5 sm:gap-2 pt-1">
                    <span className="bg-white border-2 border-black px-2.5 sm:px-3 py-1 sm:py-1.5 font-body text-xs sm:text-sm md:text-base font-bold text-black">
                      Higher Secondary (12th): <strong className="font-silkscreen text-black font-bold text-xs sm:text-base">66%</strong> (2023)
                    </span>
                    <span className="bg-white border-2 border-black px-2.5 sm:px-3 py-1 sm:py-1.5 font-body text-xs sm:text-sm md:text-base font-bold text-black">
                      Secondary (10th): <strong className="font-silkscreen text-black font-bold text-xs sm:text-base">87%</strong> (2021)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Pixel Speech Tail */}
            <div className="absolute -bottom-3 left-6 sm:left-8 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[14px] border-t-black" />
            <div className="absolute -bottom-1.5 left-6 sm:left-8 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[9px] border-t-white" />
          </div>

          {/* ================= RIGHT CARD: ACTIVITIES (30vw) ================= */}
          <div
            ref={rightCardRef}
            className="w-full lg:w-[30vw] lg:max-w-[30vw] min-h-[440px] sm:min-h-[500px] relative bg-white text-black border-4 border-black pixel-shadow p-4 xs:p-6 sm:p-7 md:p-8 flex flex-col justify-between"
          >
            {/* Card Content Area */}
            <div className="space-y-4 sm:space-y-6">
              {/* Card Header Bar */}
              <div className="flex items-center justify-between border-b-4 border-black pb-3 sm:pb-3.5">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 bg-black inline-block" />
                  <h3 className="font-silkscreen font-bold text-lg xs:text-xl sm:text-2xl md:text-3xl tracking-wider uppercase text-black">
                    ACTIVITIES
                  </h3>
                </div>
              </div>

              {/* Educational Activities / Hackathons */}
              <div className="space-y-2.5 sm:space-y-3 bg-black/5 p-3.5 xs:p-4 sm:p-5 border-2 border-black">
                <div className="flex items-center gap-2">
                  <span className="font-silkscreen text-[11px] sm:text-sm font-bold bg-black text-white px-2 sm:px-2.5 py-0.5">
                    EDUCATIONAL
                  </span>
                </div>
                <p className="font-body text-xs xs:text-sm sm:text-base md:text-lg font-semibold text-black/90 leading-snug">
                  Participated in Hackathons:
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                  {[
                    "InnovoCon 2025",
                    "SIH 2025",
                    "Hexafall 2025",
                    "Metamorph 2025",
                    "Binary V2",
                  ].map((hackathon) => (
                    <span
                      key={hackathon}
                      className="bg-white border-2 border-black px-2 sm:px-2.5 py-0.5 sm:py-1 font-silkscreen text-[11px] sm:text-sm font-bold text-black hover:bg-black hover:text-white transition-colors"
                    >
                      {hackathon}
                    </span>
                  ))}
                </div>
              </div>

              {/* Co-curricular Activities (No Emojis, Pure Retro Badges) */}
              <div className="space-y-2.5 sm:space-y-3 bg-black/5 p-3.5 xs:p-4 sm:p-5 border-2 border-black">
                <div className="flex items-center gap-2">
                  <span className="font-silkscreen text-[11px] sm:text-sm font-bold bg-black text-white px-2 sm:px-2.5 py-0.5">
                    CO-CURRICULAR
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-2.5 pt-1">
                  <div className="bg-white border-2 border-black px-2.5 sm:px-3.5 py-1 sm:py-1.5 font-silkscreen text-[11px] sm:text-sm md:text-base font-bold text-black hover:bg-black hover:text-white transition-colors">
                    GYM &amp; FITNESS
                  </div>
                  <div className="bg-white border-2 border-black px-2.5 sm:px-3.5 py-1 sm:py-1.5 font-silkscreen text-[11px] sm:text-sm md:text-base font-bold text-black hover:bg-black hover:text-white transition-colors">
                    MMA (MARTIAL ARTS)
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Pixel Speech Tail */}
            <div className="absolute -bottom-3 right-6 sm:right-8 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[14px] border-t-black" />
            <div className="absolute -bottom-1.5 right-6 sm:right-8 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[9px] border-t-white" />
          </div>
        </div>
      </div>
    </section>
  );
}
