"use client";

import React from "react";

export default function StoryBlock({ number, title, text, className = "" }) {
  return (
    <section className={`min-h-screen flex items-center px-6 sm:px-10 md:px-16 lg:px-20 py-24 ${className}`}>
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-[140px_1fr] gap-8 md:gap-16 items-start">
          <div>
            <div className="inline-block bg-white border-2 border-black px-3.5 py-1.5 pixel-shadow-sm font-silkscreen text-xs text-black font-bold tracking-widest uppercase">
              LVL {number}
            </div>
          </div>

          <div className="space-y-6">
            <h2
              className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight max-w-4xl text-black font-silkscreen leading-tight"
              style={{
                textShadow: "2px 2px 0px rgba(0,0,0,0.15)",
              }}
            >
              {title}
            </h2>

            <p className="text-base sm:text-xl leading-relaxed text-black/75 max-w-2xl font-mono">
              {text}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
