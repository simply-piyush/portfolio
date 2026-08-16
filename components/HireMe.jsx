"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HireMe({ className = "" }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [copied, setCopied] = useState(false);

  const containerRef = useRef(null);
  const boxRef = useRef(null);
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

      // Dialog Box Pop-in
      gsap.fromTo(
        boxRef.current,
        {
          y: 60,
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
            trigger: boxRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef }
  );

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailSubject = encodeURIComponent(
      formData.subject || `Opportunity Inquiry from ${formData.name || "Portfolio Visitor"}`
    );
    const emailBody = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );

    window.location.href = `mailto:piyush.singh.formal@gmail.com?subject=${emailSubject}&body=${emailBody}`;
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("piyush.singh.formal@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      ref={containerRef}
      className={`min-h-[100vh] flex flex-col justify-start px-6 sm:px-10 md:px-16 lg:px-20 pt-32 sm:pt-36 pb-20 select-none ${className}`}
    >
      {/* 40vw width container aligned to the right */}
      <div className="w-full flex justify-end">
        <div className="w-full md:max-w-[40vw] text-left space-y-8">
        {/* Header */}
        <div ref={headerRef} className="space-y-3">
          <h2
            className="font-silkscreen font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-tight"
            style={{
              textShadow: "4px 4px 0px #000000",
            }}
          >
            HIRE ME
          </h2>
          <div className="w-20 sm:w-28 h-2 bg-white pixel-shadow" />
        </div>

        {/* 8-Bit Pixel Dialog Contact Box */}
        <div
          ref={boxRef}
          className="relative bg-white text-black border-4 border-black pixel-shadow p-6 sm:p-8 md:p-10 space-y-6"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b-4 border-black pb-4 flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <span className="w-3.5 h-3.5 bg-black inline-block animate-pulse" />
              <h3 className="font-silkscreen font-bold text-lg sm:text-xl md:text-2xl tracking-wider uppercase text-black">
                TRANSMIT MESSAGE
              </h3>
            </div>
            <button
              onClick={copyEmail}
              type="button"
              className="font-silkscreen font-bold text-[11px] sm:text-xs bg-black text-white px-3 py-1 hover:bg-black/80 active:scale-95 transition-all cursor-pointer"
            >
              {copied ? "COPIED! ✓" : "COPY EMAIL"}
            </button>
          </div>

          {/* Direct Email Display Badge */}
          <div className="bg-black/5 border-2 border-black p-3 flex items-center justify-between flex-wrap gap-2">
            <span className="font-silkscreen text-[11px] sm:text-xs font-bold text-black/70 uppercase">
              Target Inbox:
            </span>
            <a
              href="mailto:piyush.singh.formal@gmail.com"
              className="font-mono font-bold text-xs sm:text-sm text-black hover:underline tracking-tight"
            >
              piyush.singh.formal@gmail.com
            </a>
          </div>

          {/* Interactive Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name Field */}
              <div className="space-y-1.5">
                <label className="font-silkscreen text-xs font-bold text-black uppercase tracking-wider block">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Elon Musk"
                  className="w-full bg-white text-black font-body text-sm sm:text-base border-3 border-black p-2.5 focus:outline-none focus:bg-black/5 font-medium"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-1.5">
                <label className="font-silkscreen text-xs font-bold text-black uppercase tracking-wider block">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="spacex@example.com"
                  className="w-full bg-white text-black font-body text-sm sm:text-base border-3 border-black p-2.5 focus:outline-none focus:bg-black/5 font-medium"
                />
              </div>
            </div>

            {/* Subject Field */}
            <div className="space-y-1.5">
              <label className="font-silkscreen text-xs font-bold text-black uppercase tracking-wider block">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Project Collaboration / Job Opportunity"
                className="w-full bg-white text-black font-body text-sm sm:text-base border-3 border-black p-2.5 focus:outline-none focus:bg-black/5 font-medium"
              />
            </div>

            {/* Message Field */}
            <div className="space-y-1.5">
              <label className="font-silkscreen text-xs font-bold text-black uppercase tracking-wider block">
                Message / Proposal
              </label>
              <textarea
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Let's build something incredible together..."
                className="w-full bg-white text-black font-body text-sm sm:text-base border-3 border-black p-2.5 focus:outline-none focus:bg-black/5 font-medium resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center justify-between gap-4 flex-wrap">
              <button
                type="submit"
                className="bg-black text-white border-3 border-black px-6 py-3 font-silkscreen font-bold text-xs sm:text-sm uppercase tracking-widest pixel-shadow-sm transition-all duration-150 hover:bg-white hover:text-black active:translate-x-0.5 active:translate-y-0.5 cursor-pointer flex items-center gap-2"
              >
                <span>SEND TRANSMISSION</span>
                <span>▶</span>
              </button>

              <span className="font-silkscreen text-[10px] sm:text-xs text-black/60 font-semibold">
                Direct to: piyush.singh.formal@gmail.com
              </span>
            </div>
          </form>

          {/* Bottom Pixel Speech Tail */}
          <div className="absolute -bottom-3 right-8 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[14px] border-t-black" />
          <div className="absolute -bottom-1.5 right-8 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[9px] border-t-white" />
        </div>
      </div>
    </div>
    </section>
  );
}
