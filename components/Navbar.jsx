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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  // Smoothly glide the pill using GSAP with fluid easing on desktop
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
    setMobileMenuOpen(false);
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
    <>
      {/* DESKTOP NAVBAR (MD and UP): Sliding Pill Capsule */}
      <header className="hidden md:block fixed top-6 left-1/2 -translate-x-1/2 z-50 select-none max-w-[94vw]">
        <nav
          ref={containerRef}
          className="relative inline-flex items-center bg-white border-2 border-black rounded-full p-1.5 shadow-md overflow-x-auto"
        >
          {/* Hardware-Accelerated GSAP Sliding Active Black Pill */}
          <span
            ref={pillRef}
            aria-hidden="true"
            className="absolute top-1.5 bottom-1.5 left-0 bg-black rounded-full pointer-events-none opacity-0"
          />

          <ul className="relative flex items-center list-none m-0 p-0 font-silkscreen text-xs md:text-sm font-bold">
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.id;

              return (
                <li key={item.id}>
                  <button
                    ref={(el) => {
                      if (el) navRefs.current[item.id] = el;
                    }}
                    onClick={() => handleNavClick(item.id)}
                    className={`relative z-10 px-4 md:px-6 py-2 rounded-full uppercase tracking-wider transition-colors duration-300 cursor-pointer ${
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

      {/* MOBILE NAVBAR (BELOW MD): 8-Bit Retro Header with Floating Dropdown */}
      <header className="block md:hidden fixed top-3 left-0 right-0 z-50 px-4 select-none pointer-events-none">
        <div className="flex items-center justify-between max-w-md mx-auto pointer-events-auto">
          {/* Current Section Badge / Brand */}
          <button
            onClick={() => handleNavClick("home")}
            className="bg-white text-black border-2 border-black px-3.5 py-1.5 pixel-shadow-sm font-silkscreen font-bold text-xs uppercase tracking-wider flex items-center gap-2 active:scale-95 transition-transform cursor-pointer"
          >
            <span className="w-2 h-2 bg-black inline-block animate-pulse" />
            <span>{NAV_ITEMS.find((n) => n.id === activeTab)?.label || "MENU"}</span>
          </button>

          {/* Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="bg-black text-white border-2 border-black px-3.5 py-1.5 pixel-shadow-sm font-silkscreen font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 active:scale-95 transition-transform cursor-pointer"
          >
            <span>{mobileMenuOpen ? "✕" : "☰"}</span>
            <span>{mobileMenuOpen ? "CLOSE" : "MENU"}</span>
          </button>
        </div>

        {/* 8-Bit Pixel Dropdown Menu */}
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 backdrop-blur-[2px] pointer-events-auto"
            />

            {/* Menu Panel */}
            <div className="relative z-50 mt-2 max-w-md mx-auto bg-white border-3 border-black pixel-shadow p-3 space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-150 pointer-events-auto">
              <div className="flex items-center justify-between border-b-2 border-black pb-2 px-1 mb-2">
                <span className="font-silkscreen text-[11px] font-bold text-black/70 uppercase">
                  NAVIGATION MAP
                </span>
                <span className="font-silkscreen text-[10px] font-bold bg-black text-white px-1.5 py-0.5">
                  8-BIT
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`font-silkscreen font-bold text-xs py-2.5 px-3 border-2 border-black text-left flex items-center justify-between uppercase transition-all duration-100 ${
                        isActive
                          ? "bg-black text-white pixel-shadow-sm"
                          : "bg-white text-black hover:bg-black/5 active:bg-black active:text-white"
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && <span className="text-[10px]">▶</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
}
