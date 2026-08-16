"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PROJECTS = [
  {
    id: "01",
    title: "Student Management Platform",
    tagline: "Cross-Platform Academic & Finance Ecosystem",
    description:
      "Built a cross-platform student management system using React, SwiftUI, Node.js, and MongoDB with real-time attendance, marks, fees, and student data management integrated with Google Sheets synchronization.",
    technologies: ["React", "SwiftUI", "Node.js", "Express.js", "MongoDB"],
    category: "Full Stack & Mobile",
    accent: "bg-[#00d8ff]/10 text-cyan-900 border-cyan-800",
  },
  {
    id: "02",
    title: "EduAuth (Frontend)",
    tagline: "OCR Academic Certificate Verification",
    description:
      "A certificate verification platform designed to validate the authenticity of academic certificates using OCR, database checks, and verification workflows for institutions, employers, and students.",
    technologies: ["React", "HTML5", "CSS3", "JavaScript", "Python"],
    category: "Frontend",
    accent: "bg-[#38bdf8]/10 text-sky-900 border-sky-800",
  },
  {
    id: "03",
    title: "DevDraft (Frontend)",
    tagline: "AI-Assisted Hackathon Participant Scoring",
    description:
      "Built an AI-assisted hackathon selection platform using Next.js that analyzes GitHub profiles, resumes, and code quality to score participants and categorize teams by skill level.",
    technologies: [
      "Next.js",
      "Node.js",
      "Express.js",
      "Prisma",
      "GitHub API",
      "Gemini API",
      "Langchain",
    ],
    category: "Frontend",
    accent: "bg-[#88CE02]/10 text-lime-950 border-lime-800",
  },
];

export default function Projects({ className = "" }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const cardRef = useRef(null);

  useGSAP(
    () => {
      // Header and initial card trigger
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

      gsap.fromTo(
        cardRef.current,
        {
          y: 50,
          opacity: 0,
          scale: 0.92,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef }
  );

  const changeSlide = (newIndex, newDirection) => {
    if (newIndex === currentIndex) return;

    setDirection(newDirection);

    // Animate out current card
    gsap.to(cardRef.current, {
      x: newDirection * -60,
      opacity: 0,
      scale: 0.95,
      duration: 0.22,
      ease: "power2.in",
      onComplete: () => {
        setCurrentIndex(newIndex);
        // Animate in new card
        gsap.fromTo(
          cardRef.current,
          {
            x: newDirection * 60,
            opacity: 0,
            scale: 0.95,
          },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.35,
            ease: "back.out(1.5)",
          }
        );
      },
    });
  };

  const handlePrev = () => {
    const nextIdx = (currentIndex - 1 + PROJECTS.length) % PROJECTS.length;
    changeSlide(nextIdx, -1);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % PROJECTS.length;
    changeSlide(nextIdx, 1);
  };

  const currentProject = PROJECTS[currentIndex];

  return (
    <section
      ref={containerRef}
      className={`min-h-[230vh] flex flex-col justify-start px-6 sm:px-10 md:px-16 lg:px-20 pt-32 sm:pt-36 pb-20 ${className}`}
    >
      {/* 50vw container aligned to the left */}
      <div className="w-full md:max-w-[50vw] text-left space-y-8">
        {/* Header */}
        <div ref={headerRef} className="space-y-3">
          <h2
            className="font-silkscreen font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-tight"
            style={{
              textShadow: "4px 4px 0px #000000",
            }}
          >
            FEATURED PROJECTS
          </h2>
          <div className="w-20 sm:w-28 h-2 bg-white mt-3 pixel-shadow" />
        </div>

        {/* Carousel Outer Wrapper */}
        <div className="space-y-6">
          {/* Main 8-bit Project Card with Fixed Dimensions */}
          <div
            ref={cardRef}
            className="relative bg-white text-black border-4 border-black pixel-shadow p-6 sm:p-8 md:p-10 min-h-[460px] sm:min-h-[490px] md:min-h-[520px] flex flex-col justify-between select-none"
          >
            {/* Top & Middle Content */}
            <div className="space-y-5">
              {/* Top Bar with Project Number and Category */}
              <div className="flex items-center justify-between border-b-4 border-black pb-4 flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <span className="bg-black text-white font-silkscreen font-bold text-xs sm:text-sm px-2.5 py-1">
                    PROJECT {currentProject.id}
                  </span>
                  <span className="font-silkscreen text-xs text-black/70 font-bold uppercase tracking-wider">
                    / 0{PROJECTS.length}
                  </span>
                </div>

                <span className="font-silkscreen text-[11px] sm:text-xs font-bold uppercase tracking-widest px-3 py-1 bg-black/5 border-2 border-black">
                  {currentProject.category}
                </span>
              </div>

              {/* Project Title & Tagline */}
              <div className="space-y-1.5">
                <h3 className="font-silkscreen font-bold text-xl sm:text-2xl md:text-3xl text-black leading-snug">
                  {currentProject.title}
                </h3>
                <p className="font-silkscreen text-xs sm:text-sm text-black/60 font-semibold tracking-wide">
                  {currentProject.tagline}
                </p>
              </div>

              {/* Description */}
              <p className="font-body text-base sm:text-lg leading-relaxed text-black/90 font-normal">
                {currentProject.description}
              </p>
            </div>

            {/* Bottom Section: Tech Badges */}
            <div className="space-y-2 pt-4">
              <div className="font-silkscreen text-[11px] font-bold tracking-widest text-black/70 uppercase">
                Technologies:
              </div>
              <div className="flex flex-wrap gap-2">
                {currentProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="font-silkscreen font-bold text-[10px] sm:text-xs px-2.5 py-1 bg-black text-white rounded-none border border-black transition-transform hover:scale-105"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Pixel Speech Tail */}
            <div className="absolute -bottom-3 left-8 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[14px] border-t-black" />
            <div className="absolute -bottom-1.5 left-8 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[9px] border-t-white" />
          </div>

          {/* Carousel Controls & Pagination */}
          <div className="flex items-center justify-between pt-2">
            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-3 font-silkscreen">
              <button
                onClick={handlePrev}
                aria-label="Previous project"
                className="bg-white text-black border-3 border-black px-4 sm:px-5 py-2 pixel-shadow-sm font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-150 hover:bg-black hover:text-white active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
              >
                ◀ PREV
              </button>

              <button
                onClick={handleNext}
                aria-label="Next project"
                className="bg-white text-black border-3 border-black px-4 sm:px-5 py-2 pixel-shadow-sm font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-150 hover:bg-black hover:text-white active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
              >
                NEXT ▶
              </button>
            </div>

            {/* Pagination Indicators */}
            <div className="flex items-center gap-2">
              {PROJECTS.map((proj, idx) => {
                const isActive = currentIndex === idx;
                return (
                  <button
                    key={proj.id}
                    onClick={() => changeSlide(idx, idx > currentIndex ? 1 : -1)}
                    className={`transition-all duration-200 cursor-pointer border-2 border-black ${
                      isActive
                        ? "w-8 h-3 bg-black"
                        : "w-3 h-3 bg-white hover:bg-black/30"
                    }`}
                    aria-label={`Go to project ${idx + 1}`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
