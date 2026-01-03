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

        const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0, ease: "none" });
        const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0, ease: "none" });

        const xFollowerTo = gsap.quickTo(followerRef.current, "x", { duration: 0.5, ease: "power3.out" });
        const yFollowerTo = gsap.quickTo(followerRef.current, "y", { duration: 0.5, ease: "power3.out" });

        const handleMouseMove = (e: MouseEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
            xFollowerTo(e.clientX);
            yFollowerTo(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);

        // Hover interactions
        const handleMouseEnter = () => {
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
        };

        const handleMouseLeave = () => {
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
        };

        const interactiveElements = document.querySelectorAll("a, button, .project-card, .project-item, .skill-card");
        interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", handleMouseEnter);
            el.addEventListener("mouseleave", handleMouseLeave);
        });

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            interactiveElements.forEach((el) => {
                el.removeEventListener("mouseenter", handleMouseEnter);
                el.removeEventListener("mouseleave", handleMouseLeave);
            });
            gsap.set("body", { cursor: "auto" });
        };
    }, []);

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-2 h-2 bg-silver rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
                style={{ transform: "translate(-50%, -50%)" }}
            />
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-10 h-10 border border-silver/30 rounded-full pointer-events-none z-[9998] hidden md:block"
                style={{ transform: "translate(-50%, -50%)" }}
            />
        </>
    );
}
