"use client";

import { useRef, useEffect } from "react";
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

  // Preload all frames immediately with priority on frame 0
  useEffect(() => {
    const images = [];
    
    // Priority load frame 0 first
    const firstImg = new Image();
    firstImg.src = getFrameUrl(0);
    images.push(firstImg);

    for (let i = 1; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      images.push(img);
    }
    
    imagesRef.current = images;
  }, []);

  useGSAP(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawFrame = (frameIndex) => {
      const targetIndex = Math.min(
        Math.max(0, Math.round(frameIndex)),
        FRAME_COUNT - 1
      );

      const images = imagesRef.current;
      if (!images || images.length === 0) return;

      let img = images[targetIndex];

      // If at top (frame 0) and frame 0 is ready, guarantee frame 0 is rendered
      if (targetIndex === 0 && images[0]?.complete && images[0]?.naturalWidth) {
        img = images[0];
      } else if (!img || !img.complete || !img.naturalWidth) {
        // Fallback to last rendered or frame 0
        if (lastRenderedIndexRef.current >= 0 && images[lastRenderedIndexRef.current]?.complete) {
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
    };

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      // When at top of page, strictly draw frame 0
      const currentScrollY = typeof window !== "undefined" ? window.scrollY : 0;
      if (currentScrollY <= 0) {
        animRef.current.frame = 0;
        drawFrame(0);
      } else {
        drawFrame(animRef.current.frame);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Initial render: check if first image is cached/ready or attach onload
    const checkAndDrawFirstFrame = () => {
      const first = imagesRef.current[0] || (new Image());
      if (first.complete && first.naturalWidth) {
        handleResize();
        drawFrame(0);
      } else {
        first.onload = () => {
          handleResize();
          drawFrame(0);
        };
      }
    };

    checkAndDrawFirstFrame();

    const triggerElement = triggerRef?.current || document.body;

    const tween = gsap.to(animRef.current, {
      frame: FRAME_COUNT - 1,
      ease: "none",
      scrollTrigger: {
        trigger: triggerElement,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const isAtTop = self.progress <= 0.001 || (typeof window !== "undefined" && window.scrollY <= 2);
          if (isAtTop) {
            animRef.current.frame = 0;
            drawFrame(0);
          } else {
            drawFrame(animRef.current.frame);
          }
        },
      },
    });

    // Make sure initial state is at 0
    if (typeof window !== "undefined" && window.scrollY <= 2) {
      animRef.current.frame = 0;
      drawFrame(0);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      tween.kill();
      if (tween.scrollTrigger) {
        tween.scrollTrigger.kill();
      }
    };
  }, [triggerRef]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full object-cover block pointer-events-none"
    />
  );
}