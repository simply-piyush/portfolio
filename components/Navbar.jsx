"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

const NAV_ITEMS = [
  { id: "home", label: "HOME" },
  { id: "about", label: "ABOUT" },
  { id: "stack", label: "STACK" },
  { id: "projects", label: "PROJECTS" },
  { id: "education", label: "EDUCATION" },
  { id: "contact", label: "CONTACT" },
];

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("home");
  const activeTabRef = useRef("home");
  const navRefs = useRef({});
  const containerRef = useRef(null);
  const pillRef = useRef(null);
  const targetScrollIdRef = useRef(null);
  const scrollEndTimerRef = useRef(null);

  // Sync ref with state
  useEffect(() => {
    activeTabRef.current = activeTab;
  }, [activeTab]);

  // Smoothly glide the pill using GSAP with fluid easing
  const movePill = useCallback((tabId, immediate = false) => {
    const activeEl = navRefs.current[tabId];
    const containerEl = containerRef.current;
    const pillEl = pillRef.current;

    if (activeEl && containerEl && pillEl) {
      const activeRect = activeEl.getBoundingClientRect();
      const containerRect = containerEl.getBoundingClientRect();
      const targetX = activeRect.left - containerRect.left;
      const targetWidth = activeRect.width;

      if (immediate) {
        gsap.set(pillEl, {
          x: targetX,
          width: targetWidth,
          opacity: 1,
        });
      } else {
        gsap.to(pillEl, {
          x: targetX,
          width: targetWidth,
          opacity: 1,
          duration: 0.38,
          ease: "power3.out",
          overwrite: "auto",
        });
      }
    }
  }, []);

  // Update pill position when activeTab changes
  useEffect(() => {
    movePill(activeTab);
  }, [activeTab, movePill]);

  // Initial layout calculation and resize handler
  useEffect(() => {
    const handleResize = () => {
      movePill(activeTabRef.current, true);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [movePill]);

  // Smooth ScrollSpy on window scroll
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      // If navigating via click, check if destination reached
      if (targetScrollIdRef.current) {
        const targetEl = document.getElementById(targetScrollIdRef.current);
        if (targetEl) {
          const targetTop = targetEl.getBoundingClientRect().top + window.scrollY;
          if (Math.abs(window.scrollY - targetTop) < 60) {
            targetScrollIdRef.current = null;
          }
        }

        clearTimeout(scrollEndTimerRef.current);
        scrollEndTimerRef.current = setTimeout(() => {
          targetScrollIdRef.current = null;
        }, 200);

        return;
      }

      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Bottom of page detection (activates contact)
          const isAtBottom =
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 80;

          if (isAtBottom) {
            const lastItem = NAV_ITEMS[NAV_ITEMS.length - 1];
            if (activeTabRef.current !== lastItem.id) {
              setActiveTab(lastItem.id);
            }
            ticking = false;
            return;
          }

          const scrollPos = window.scrollY + window.innerHeight * 0.35;

          for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
            const item = NAV_ITEMS[i];
            const el = document.getElementById(item.id);
            if (el) {
              const top = el.getBoundingClientRect().top + window.scrollY;
              if (scrollPos >= top) {
                if (activeTabRef.current !== item.id) {
                  setActiveTab(item.id);
                }
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollEndTimerRef.current);
    };
  }, []);

  const handleNavClick = (id) => {
    setActiveTab(id);
    movePill(id);
    targetScrollIdRef.current = id;

    const element = document.getElementById(id);
    if (element) {
      const top = Math.max(0, element.getBoundingClientRect().top + window.scrollY);
      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }

    clearTimeout(scrollEndTimerRef.current);
    scrollEndTimerRef.current = setTimeout(() => {
      targetScrollIdRef.current = null;
    }, 1800);
  };

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 select-none max-w-[94vw]">
      <nav
        ref={containerRef}
        className="relative inline-flex items-center bg-white border-2 border-black rounded-full p-1 sm:p-1.5 shadow-md overflow-x-auto"
      >
        {/* Hardware-Accelerated GSAP Sliding Active Black Pill */}
        <span
          ref={pillRef}
          aria-hidden="true"
          className="absolute top-1 bottom-1 sm:top-1.5 sm:bottom-1.5 left-0 bg-black rounded-full pointer-events-none opacity-0"
        />

        <ul className="relative flex items-center list-none m-0 p-0 font-silkscreen text-[10px] sm:text-xs md:text-sm font-bold">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;

            return (
              <li key={item.id}>
                <button
                  ref={(el) => {
                    if (el) navRefs.current[item.id] = el;
                  }}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative z-10 px-3 sm:px-5 md:px-6 py-1.5 sm:py-2 rounded-full uppercase tracking-wider transition-colors duration-300 cursor-pointer ${
                    isActive
                      ? "text-white"
                      : "text-black hover:text-black/60"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
