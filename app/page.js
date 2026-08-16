"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollCanvas from "@/components/ScrollCanvas";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutMe from "@/components/AboutMe";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import EducationActivities from "@/components/EducationActivities";
import HireMe from "@/components/HireMe";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const pageRef = useRef(null);

  return (
    <main ref={pageRef} className="relative bg-black/10 text-black font-silkscreen overflow-x-clip">
      {/* Floating Pill Capsule Navbar */}
      <Navbar />

      {/* Background Scroll Canvas */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ScrollCanvas triggerRef={pageRef} />
      </div>

      {/* HERO SECTION */}
      <div id="home" className="relative z-10">
        <Hero
          greeting="Hello World!"
          name="Im Piyush Singh"
        />
      </div>

      {/* ABOUT ME SECTION */}
      <div id="about" className="relative z-20">
        <AboutMe />
      </div>

      {/* TECH STACK SECTION */}
      <div id="stack" className="relative z-20">
        <TechStack />
      </div>

      {/* FEATURED PROJECTS CAROUSEL SECTION */}
      <div id="projects" className="relative z-20">
        <Projects />
      </div>

      {/* EDUCATION & ACTIVITIES SECTION */}
      <div id="education" className="relative z-20">
        <EducationActivities />
      </div>

      {/* HIRE ME / CONTACT SECTION */}
      <div id="contact" className="relative z-20">
        <HireMe />
      </div>

      
       
     
    </main>
  );
}