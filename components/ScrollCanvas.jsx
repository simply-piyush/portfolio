"use client";

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FRAME_COUNT = 295;

const getFrameUrl = (index) => {
  const paddedIndex = String(index).padStart(3, "0");
  const delay = index === 167 ? "0.086s" : "0.043s";
  return `/frames/frame_${paddedIndex}_delay-${delay}.webp`;
};

export default function ScrollCanvas({ triggerRef }) {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const animRef = useRef({ frame: 0 });
  const lastRenderedIndexRef = useRef(-1);

  // Helper to calculate initial target frame based on current scroll position
  const getScrollProgress = useCallback(() => {
    if (typeof window === "undefined") return 0;
    const scrollY = window.scrollY || window.pageYOffset || 0;
    const maxScroll = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight
    );
    return Math.min(1, Math.max(0, scrollY / maxScroll));
  }, []);

  const drawFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const targetIndex = Math.min(
      Math.max(0, Math.round(frameIndex)),
      FRAME_COUNT - 1
    );

    const images = imagesRef.current;
    if (!images || images.length === 0) return;

    let img = images[targetIndex];

    // If target frame is not ready, find the closest loaded frame
    if (!img || !img.complete || !img.naturalWidth) {
      let closestLoadedImg = null;
      let minDistance = Infinity;

      for (let offset = 1; offset < FRAME_COUNT; offset++) {
        const prevIdx = targetIndex - offset;
        const nextIdx = targetIndex + offset;

        if (prevIdx >= 0 && images[prevIdx]?.complete && images[prevIdx]?.naturalWidth) {
          closestLoadedImg = images[prevIdx];
          break;
        }
        if (nextIdx < FRAME_COUNT && images[nextIdx]?.complete && images[nextIdx]?.naturalWidth) {
          closestLoadedImg = images[nextIdx];
          break;
        }
      }

      if (closestLoadedImg) {
        img = closestLoadedImg;
      } else if (lastRenderedIndexRef.current >= 0 && images[lastRenderedIndexRef.current]?.complete) {
        img = images[lastRenderedIndexRef.current];
      } else if (images[0]?.complete && images[0]?.naturalWidth) {
        img = images[0];
      } else {
        return;
      }
    }

    lastRenderedIndexRef.current = targetIndex;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    if (!imgWidth || !imgHeight) return;

    // Aspect ratio cover calculation
    const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
    const drawWidth = imgWidth * scale;
    const drawHeight = imgHeight * scale;
    const drawX = (canvasWidth - drawWidth) / 2;
    const drawY = (canvasHeight - drawHeight) / 2;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  }, []);

  // Preload images with priority on current scroll position and frame 0
  useEffect(() => {
    const images = new Array(FRAME_COUNT);
    const initialProgress = getScrollProgress();
    const initialTargetIndex = Math.min(
      FRAME_COUNT - 1,
      Math.max(0, Math.round(initialProgress * (FRAME_COUNT - 1)))
    );

    const onImageLoad = (loadedIndex) => {
      // If the loaded image is close to the current active frame or nothing rendered yet, render it
      const currentTarget = Math.round(animRef.current.frame);
      if (
        lastRenderedIndexRef.current === -1 ||
        Math.abs(loadedIndex - currentTarget) <= 2 ||
        (currentTarget === 0 && loadedIndex === 0)
      ) {
        drawFrame(animRef.current.frame);
      }
    };

    const loadImage = (index) => {
      if (images[index]) return images[index];
      const img = new Image();
      img.src = getFrameUrl(index);
      if (img.complete && img.naturalWidth) {
        onImageLoad(index);
      } else {
        img.onload = () => onImageLoad(index);
      }
      images[index] = img;
      return img;
    };

    // 1. High priority: Target frame for current scroll position
    loadImage(initialTargetIndex);
    // 2. High priority: Frame 0 (top of page)
    if (initialTargetIndex !== 0) {
      loadImage(0);
    }

    // 3. Medium priority: Frames immediately surrounding initial target
    for (let offset = 1; offset <= 15; offset++) {
      if (initialTargetIndex - offset >= 0) loadImage(initialTargetIndex - offset);
      if (initialTargetIndex + offset < FRAME_COUNT) loadImage(initialTargetIndex + offset);
    }

    // 4. Batch load the remaining frames progressively
    const loadRemaining = () => {
      for (let i = 0; i < FRAME_COUNT; i++) {
        if (!images[i]) {
          loadImage(i);
        }
      }
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(loadRemaining, { timeout: 1500 });
      imagesRef.current = images;
      return () => window.cancelIdleCallback(idleId);
    } else {
      const timer = setTimeout(loadRemaining, 100);
      imagesRef.current = images;
      return () => clearTimeout(timer);
    }
  }, [drawFrame, getScrollProgress]);

  useGSAP(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      drawFrame(animRef.current.frame);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const triggerElement = triggerRef?.current || document.body;

    // Synchronize initial frame with current scroll position right away
    const initialProgress = getScrollProgress();
    const initialFrame = initialProgress * (FRAME_COUNT - 1);
    animRef.current.frame = initialFrame;
    drawFrame(initialFrame);

    const tween = gsap.to(animRef.current, {
      frame: FRAME_COUNT - 1,
      ease: "none",
      scrollTrigger: {
        trigger: triggerElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.1,
        invalidateOnRefresh: true,
        onRefresh: (self) => {
          animRef.current.frame = self.progress * (FRAME_COUNT - 1);
          drawFrame(animRef.current.frame);
        },
        onUpdate: (self) => {
          animRef.current.frame = self.progress * (FRAME_COUNT - 1);
          drawFrame(animRef.current.frame);
        },
      },
    });

    // Refresh ScrollTrigger after slight layout settling to ensure exact heights
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
      if (tween.scrollTrigger) {
        animRef.current.frame = tween.scrollTrigger.progress * (FRAME_COUNT - 1);
        drawFrame(animRef.current.frame);
      }
    }, 50);

    return () => {
      clearTimeout(refreshTimer);
      window.removeEventListener("resize", handleResize);
      tween.kill();
      if (tween.scrollTrigger) {
        tween.scrollTrigger.kill();
      }
    };
  }, [triggerRef, drawFrame, getScrollProgress]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full object-cover block pointer-events-none"
    />
  );
}