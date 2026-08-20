"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 19 Technologies arranged in a symmetrical 3-4-5-4-3 Hexagonal Honeycomb
const HEX_ROWS = [
  // Row 1 (3 items - top)
  [
    {
      name: "HTML5",
      bg: "bg-[#E34F26] text-white",
      shadow: "shadow-orange-500/20",
      icon: (
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm16.5 6.3H6l.3 3.4h11.4l-.4 4.8-5.3 1.5-5.3-1.5-.2-2.7H3.1l.4 5.3 8.5 2.4 8.5-2.4.9-10.9z" />
        </svg>
      ),
    },
    {
      name: "CSS3",
      bg: "bg-[#1572B6] text-white",
      shadow: "shadow-blue-500/20",
      icon: (
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm16.5 6.3H6l.3 3.4h11.4l-.4 4.8-5.3 1.5-5.3-1.5-.2-2.7H3.1l.4 5.3 8.5 2.4 8.5-2.4.9-10.9z" />
        </svg>
      ),
    },
    {
      name: "JavaScript",
      bg: "bg-[#F7DF1E] text-black",
      shadow: "shadow-yellow-500/20",
      icon: (
        <svg className="w-8 h-8 fill-current font-bold" viewBox="0 0 24 24">
          <path d="M3 3h18v18H3V3zm10.7 13.5c-.7.6-1.5.9-2.3.9-2 0-3.3-1.3-3.3-3.2v-.2c0-2 1.3-3.3 3.3-3.3.9 0 1.6.3 2.1.8l-1.1 1.2c-.3-.4-.6-.6-1-.6-.9 0-1.6.6-1.6 1.7v.2c0 1.1.7 1.7 1.6 1.7.4 0 .8-.2 1.1-.5v-1h-1.4v-1.3h2.6v3.3zm5.6-3.8c0-.7-.4-1.2-1.3-1.6l-.7-.3c-.6-.3-.9-.5-.9-.9 0-.4.4-.7.9-.7.5 0 .9.2 1.2.6l1-1c-.6-.6-1.3-.9-2.2-.9-1.3 0-2.3.8-2.3 2.1 0 .7.4 1.2 1.2 1.5l.7.3c.7.3 1 .6 1 1 0 .5-.4.8-1 .8-.6 0-1.1-.3-1.5-.8l-1.1 1.1c.6.8 1.5 1.2 2.6 1.2 1.5 0 2.7-.9 2.7-2.5z" />
        </svg>
      ),
    },
  ],

  // Row 2 (4 items)
  [
    {
      name: "React",
      bg: "bg-[#0f172a] text-[#00d8ff]",
      shadow: "shadow-cyan-500/20",
      icon: (
        <svg className="w-9 h-9 fill-none stroke-current" viewBox="-11.5 -10.23174 23 20.46348">
          <circle cx="0" cy="0" r="2.05" fill="#00d8ff" />
          <g stroke="#00d8ff" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      ),
    },
    {
      name: "Next.js",
      bg: "bg-black text-white",
      shadow: "shadow-white/10",
      icon: (
        <svg className="w-9 h-9 fill-current" viewBox="0 0 180 180">
          <path d="M90 0C40.2944 0 0 40.2944 0 90C0 139.706 40.2944 180 90 180C139.706 180 180 139.706 180 90C180 40.2944 139.706 0 90 0ZM140.597 148.971L73.1818 63.6364V126.818H58.6364V53.1818H72.2727L141.977 141.227C141.516 143.834 140.974 146.417 140.354 148.971H140.597ZM121.364 96.8182H106.818V53.1818H121.364V96.8182Z" />
        </svg>
      ),
    },
    {
      name: "Tailwind CSS",
      bg: "bg-[#0f172a] text-[#38bdf8]",
      shadow: "shadow-sky-500/20",
      icon: (
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
        </svg>
      ),
    },
    {
      name: "Python",
      bg: "bg-[#1e293b] text-[#38bdf8]",
      shadow: "shadow-sky-500/20",
      icon: (
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M11.9 2c-3.7 0-3.5 1.6-3.5 1.6l.04 1.7h3.5v.5H4.9s-2.3.3-2.3 3.5 2 3.4 2 3.4h1.2v-1.7s-.1-2 2-2h3.4c2 0 1.9-1.9 1.9-1.9V3.6S13.3 2 11.9 2zm-1 1a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4zm1.2 19c3.7 0 3.5-1.6 3.5-1.6l-.04-1.7h-3.5v-.5h7s2.3-.3 2.3-3.5-2-3.4-2-3.4h-1.2v1.7s.1 2-2 2H12.7c-2 0-1.9 1.9-1.9 1.9v3.5s-.2 1.6 1.3 1.6zm1-1a.7.7 0 1 1 0-1.4.7.7 0 0 1 0 1.4z" />
        </svg>
      ),
    },
  ],

  // Row 3 (5 items - Center widest row)
  [
    {
      name: "Java",
      bg: "bg-gradient-to-br from-[#5382a1] to-[#e76f00] text-white",
      shadow: "shadow-orange-500/20",
      icon: (
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M8.85 16.82c-.87-.4-1.3-.87-1.3-1.4 0-1.12 1.4-1.74 3.73-1.74.87 0 1.7.09 2.43.26-.52-.6-1.3-1-2.43-1-2.8 0-4.96 1.05-4.96 2.53 0 .8.6 1.48 1.7 1.92l.83-.57zm4.27-5.58c.87.52 1.3 1.13 1.3 1.74 0 .35-.1.7-.26 1.05.6-.26 1.13-.6 1.48-1.05.78-.96.6-2-1.3-3.13-.52-.35-1.13-.6-1.83-.87.43.7.6 1.48.6 2.26zm-2.1-4.7c-.52-.87-1.3-1.4-2.26-1.4-.43 0-.87.09-1.22.26 1.05.7 1.74 1.74 2.1 3.05.43-.7.96-1.3 1.38-1.91zm6.97 9.84c-1.3 1.4-3.73 2.1-6.62 2.1-3.66 0-6.62-1.05-6.62-2.79 0-.7.43-1.3 1.22-1.83l-.7-.52c-1.13.78-1.74 1.65-1.74 2.61 0 2.26 3.66 3.66 8.27 3.66 3.4 0 6.1-1.05 7.14-2.7l-.96-.53z" />
        </svg>
      ),
    },
    {
      name: "C",
      bg: "bg-[#00599C] text-white",
      shadow: "shadow-blue-500/20",
      icon: <span className="font-extrabold text-2xl">C</span>,
    },
    {
      name: "SQL",
      bg: "bg-[#00758F] text-white",
      shadow: "shadow-cyan-500/20",
      icon: (
        <div className="flex flex-col items-center">
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <ellipse cx="12" cy="6" rx="9" ry="3" />
            <path d="M3 6v6c0 1.66 4.03 3 9 3s9-1.34 9-3V6" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M3 12v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
          <span className="text-[8px] font-bold">SQL</span>
        </div>
      ),
    },
    {
      name: "MongoDB",
      bg: "bg-[#001E2B] text-[#00ED64]",
      shadow: "shadow-emerald-500/20",
      icon: (
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M12 24c-1.3 0-5.8-2.6-5.8-11.8C6.2 3.8 11.2.2 11.5.1c.3-.1.7-.1 1 0 .3.1 5.3 3.7 5.3 12.1 0 9.2-4.5 11.8-5.8 11.8zm.2-21.7c-2.4 1.7-4.1 5.4-4.1 9.9 0 6.6 2.7 9.4 3.9 10.4V2.3zm.6 0v20.3c1.2-1 3.9-3.8 3.9-10.4 0-4.5-1.7-8.2-4.1-9.9z" />
        </svg>
      ),
    },
    {
      name: "Oracle",
      bg: "bg-[#EA1B22] text-white",
      shadow: "shadow-red-500/20",
      icon: <span className="font-black text-xs tracking-tighter">ORACLE</span>,
    },
  ],

  // Row 4 (4 items)
  [
    {
      name: "Supabase",
      bg: "bg-[#171717] text-[#3ECF8E]",
      shadow: "shadow-emerald-500/20",
      icon: (
        <svg className="w-8 h-8 fill-current text-[#3ECF8E]" viewBox="0 0 24 24">
          <path d="M21.362 9.354H12V.396a.396.396 0 0 0-.716-.233L.82 13.918a.792.792 0 0 0 .616 1.272H12v8.414a.396.396 0 0 0 .716.233l10.464-13.755a.792.792 0 0 0-.616-1.272z" />
        </svg>
      ),
    },
    {
      name: "Git",
      bg: "bg-[#F05032] text-white",
      shadow: "shadow-orange-500/20",
      icon: (
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M23.546 10.93L13.067.452a1.5 1.5 0 0 0-2.126 0L8.808 2.585l2.83 2.829a1.78 1.78 0 0 1 2.25 2.261l2.72 2.72a1.78 1.78 0 1 1-1.07 1.07l-2.54-2.541v6.071a1.78 1.78 0 1 1-1.51 0V9.825a1.78 1.78 0 0 1-.96-.96L7.96 11.45a1.78 1.78 0 1 1-1.07-1.07l2.58-2.58L.454 12.98a1.5 1.5 0 0 0 0 2.125l10.48 10.48a1.5 1.5 0 0 0 2.125 0l10.487-10.48a1.5 1.5 0 0 0 0-2.175z" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      bg: "bg-[#181717] text-white",
      shadow: "shadow-white/10",
      icon: (
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
        </svg>
      ),
    },
    {
      name: "Postman",
      bg: "bg-[#FF6C37] text-white",
      shadow: "shadow-orange-500/20",
      icon: (
        <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5v-2.18c2.4-.41 4.27-2.28 4.68-4.68H19.5v-1.64h-1.82c-.41-2.4-2.28-4.27-4.68-4.68V1.5H11.36v1.82c-2.4.41-4.27 2.28-4.68 4.68H4.5v1.64h1.82c.41 2.4 2.28 4.27 4.68 4.68v2.18H13z" />
        </svg>
      ),
    },
  ],

  // Row 5 (3 items - bottom)
  [
    {
      name: "Vercel",
      bg: "bg-black text-white",
      shadow: "shadow-white/10",
      icon: (
        <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
          <path d="M24 22.525H0l12-21.05 12 21.05z" />
        </svg>
      ),
    },
    {
      name: "Render",
      bg: "bg-[#1f2937] text-[#46E3B7]",
      shadow: "shadow-emerald-500/20",
      icon: <span className="font-extrabold text-xs text-[#46E3B7] tracking-wider">RENDER</span>,
    },
    {
      name: "GSAP",
      bg: "bg-[#0a0a0a] text-[#88CE02]",
      shadow: "shadow-lime-500/20",
      icon: (
        <div className="flex flex-col items-center justify-center font-black tracking-tighter">
          <span className="text-lg font-extrabold text-[#88CE02] leading-none">GSAP</span>
        </div>
      ),
    },
  ],
];

export default function TechStack({ className = "" }) {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

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
            trigger: headerRef.current,
            start: "top 90%", // Crosses bottom 10vh of viewport
            toggleActions: "play none none reverse",
          },
        }
      );

      // Tech cards animation - pops up only after the grid crosses bottom 10vh
      gsap.fromTo(
        ".hex-tech-card",
        {
          scale: 0,
          opacity: 0,
          rotation: () => (Math.random() - 0.5) * 30,
        },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.6,
          ease: "back.out(1.6)",
          stagger: {
            amount: 0.6,
            from: "center",
          },
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
      className={`min-h-fit md:min-h-[365vh] flex flex-col justify-start px-4 xs:px-6 sm:px-10 md:px-16 lg:px-20 py-20 sm:py-24 md:pt-36 md:pb-20 ${className}`}
    >
      {/* Maximum 50vw Container on the Left */}
      <div className="w-full md:max-w-[50vw] text-left space-y-6 sm:space-y-10">
        
        {/* Refined 8-Bit Title Design */}
        <div ref={headerRef} className="space-y-2 sm:space-y-3">
          <div className="relative">
            <h2
              className="font-silkscreen font-bold text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black tracking-tight uppercase leading-tight"
              style={{
                textShadow: "3px 3px 0px #000000",
              }}
            >
              TECH STACK & TOOLS
            </h2>
            <div className="w-16 sm:w-28 h-1.5 bg-black mt-2 sm:mt-3 pixel-shadow-sm" />
          </div>
        </div>

        {/* Floating Hexagonal Honeycomb Formation (Centered in Container) */}
        <div
          ref={gridRef}
          className="flex flex-col items-center justify-center gap-1.5 xs:gap-2 sm:gap-3.5 md:gap-4 w-full pt-2 select-none"
        >
          {HEX_ROWS.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex items-center justify-center gap-1.5 xs:gap-2 sm:gap-3.5 md:gap-4 w-full"
            >
              {row.map((tech) => (
                <div
                  key={tech.name}
                  className={`hex-tech-card group relative flex items-center justify-center w-11 h-11 xs:w-13 xs:h-13 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-xl xs:rounded-2xl sm:rounded-3xl ${tech.bg} border-2 sm:border-3 border-black pixel-shadow-sm transition-all duration-300 ease-out cursor-pointer hover:scale-125 hover:z-30 hover:-rotate-3 active:scale-95`}
                >
                  {/* Tech Icon */}
                  <div className="transition-transform duration-200 group-hover:scale-110 flex items-center justify-center pointer-events-none scale-75 xs:scale-85 sm:scale-100">
                    {tech.icon}
                  </div>

                  {/* Pixel Tooltip Popup on Hover */}
                  <div className="absolute -top-9 sm:-top-10 left-1/2 -translate-x-1/2 px-2 sm:px-2.5 py-0.5 sm:py-1 bg-black text-white font-silkscreen text-[9px] sm:text-xs font-bold rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-200 shadow-md border border-white/20 z-50">
                    {tech.name}
                    {/* Tooltip Arrow */}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-black" />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
