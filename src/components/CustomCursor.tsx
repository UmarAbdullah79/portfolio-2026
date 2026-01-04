"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hide default cursor on desktop
    if (window.matchMedia("(pointer: fine)").matches) {
      gsap.set("body", { cursor: "none" });
      gsap.set("a, button, [role='button']", { cursor: "none" });
    } else {
      // Disable on touch devices
      return;
    }

    const xTo = gsap.quickTo(cursorRef.current, "x", {
      duration: 0,
      ease: "none",
    });
    const yTo = gsap.quickTo(cursorRef.current, "y", {
      duration: 0,
      ease: "none",
    });

    const xFollowerTo = gsap.quickTo(followerRef.current, "x", {
      duration: 0.5,
      ease: "power3.out",
    });
    const yFollowerTo = gsap.quickTo(followerRef.current, "y", {
      duration: 0.5,
      ease: "power3.out",
    });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      xFollowerTo(e.clientX);
      yFollowerTo(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Hover interactions
    const handleMouseEnter = () => {
      const isNavOpen = document.body.getAttribute("data-nav-open") === "true";

      if (isNavOpen) {
        gsap.to(followerRef.current, {
          scale: 1.8,
          backgroundColor: "rgba(10, 10, 10, 0.05)",
          borderColor: "rgba(10, 10, 10, 0.6)",
          duration: 0.3,
        });
        gsap.to(cursorRef.current, {
          scale: 0.6,
          backgroundColor: "#000000",
          duration: 0.3,
        });
      } else {
        gsap.to(followerRef.current, {
          scale: 2,
          backgroundColor: "rgba(52, 211, 153, 0.1)", // emerald-400 with low opacity
          borderColor: "rgba(52, 211, 153, 0.5)",
          duration: 0.3,
        });
        gsap.to(cursorRef.current, {
          scale: 0.5,
          backgroundColor: "#34d399", // emerald-400
          duration: 0.3,
        });
      }
    };

    const handleMouseLeave = () => {
      const isNavOpen = document.body.getAttribute("data-nav-open") === "true";

      if (isNavOpen) {
        gsap.to(followerRef.current, {
          scale: 0.8,
          backgroundColor: "transparent",
          borderColor: "rgba(10, 10, 10, 0.3)",
          duration: 0.3,
        });
        gsap.to(cursorRef.current, {
          scale: 0.8,
          backgroundColor: "#0a0a0a",
          duration: 0.3,
        });
      } else {
        gsap.to(followerRef.current, {
          scale: 1,
          backgroundColor: "transparent",
          borderColor: "rgba(209, 209, 199, 0.3)", // silver/30
          duration: 0.3,
        });
        gsap.to(cursorRef.current, {
          scale: 1,
          backgroundColor: "#d1d1c7", // silver
          duration: 0.3,
        });
      }
    };

    const interactiveElements = document.querySelectorAll(
      "a, button, .project-card, .project-item, .skill-card"
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    // Contrast observer for Nav Open state
    const observer = new MutationObserver(() => {
      const isNavOpen = document.body.getAttribute("data-nav-open") === "true";

      if (isNavOpen) {
        gsap.to(cursorRef.current, {
          backgroundColor: "#0a0a0a", // bgBlack
          mixBlendMode: "normal",
          scale: 0.8,
          duration: 0.4,
          ease: "power2.out"
        });
        gsap.to(followerRef.current, {
          borderColor: "rgba(10, 10, 10, 0.3)",
          mixBlendMode: "normal",
          scale: 0.8,
          duration: 0.4,
          ease: "power2.out"
        });
      } else {
        gsap.to(cursorRef.current, {
          backgroundColor: "#d1d1c7", // silver
          mixBlendMode: "difference",
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        });
        gsap.to(followerRef.current, {
          borderColor: "rgba(209, 209, 199, 0.3)",
          mixBlendMode: "difference",
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        });
      }
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ["data-nav-open"] });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
      observer.disconnect();
      gsap.set("body", { cursor: "auto" });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="custom-cursor fixed top-0 left-0 w-2 h-2 bg-silver rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{ transform: "translate(-50%, -50%)" }}
      />
      <div
        ref={followerRef}
        className="custom-follower fixed top-0 left-0 w-10 h-10 border border-silver/30 rounded-full pointer-events-none z-[9998] hidden md:block"
        style={{ transform: "translate(-50%, -50%)" }}
      />
    </>
  );
}
