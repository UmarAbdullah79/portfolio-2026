"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const CREDIBILITY_ITEMS = [
    {
        label: "Experience",
        statement: "Refining digital interfaces through 3+ years of professional engineering.",
    },
    {
        label: "Expertise",
        statement: "Specialized in React ecosystems and the choreography of fluid motion.",
    },
    {
        label: "Reliability",
        statement: "Consistent track record of shipping high-performance production sites.",
    },
    {
        label: "Philosophy",
        statement: "Technical precision balanced with a design-first, editorial approach.",
    },
];

export default function Credebility() {
    const sectionRef = useRef<HTMLElement>(null);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                },
            });

            // Animate Section Label
            tl.from(".cred-label", {
                opacity: 0,
                y: 20,
                duration: 1.2,
                ease: "power3.out",
            });

            // Animate Items
            tl.from(
                itemsRef.current,
                {
                    opacity: 0,
                    y: 40,
                    stagger: 0.15,
                    duration: 1.5,
                    ease: "expo.out",
                },
                "-=0.8"
            );

            // Animate Background Ornament
            tl.from(
                ".cred-bg-text",
                {
                    opacity: 0,
                    scale: 0.95,
                    x: 20,
                    duration: 2.5,
                    ease: "expo.out",
                },
                0.5
            );
        },
        { scope: sectionRef }
    );

    return (
        <section
            ref={sectionRef}
            className="relative w-full bg-bgBlack py-32 md:py-48 px-8 md:px-24 border-t border-silver/5"
        >
            <div className="max-w-8xl mx-auto">
                {/* Section Label */}
                <div className="mb-16 md:mb-24 overflow-hidden">
                    <span className="cred-label block text-[10px] tracking-[0.4em] uppercase text-silver/20 font-medium">
                        Trust & Expertise
                    </span>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 lg:gap-24">
                    {CREDIBILITY_ITEMS.map((item, index) => (
                        <div
                            key={item.label}
                            ref={(el) => {
                                itemsRef.current[index] = el;
                            }}
                            className="cred-item flex flex-col gap-8 group"
                        >
                            {/* Index Marker */}
                            <div className="flex items-center gap-4">
                                <span className="text-[10px] font-medium tracking-[0.3em] text-silver/10 uppercase group-hover:text-silver/40 transition-colors duration-500">
                                    0{index + 1}
                                </span>
                                <div className="h-px w-4 bg-silver/5 group-hover:w-8 group-hover:bg-silver/20 transition-all duration-500" />
                            </div>

                            {/* Statement */}
                            <div>
                                <h3 className="text-[10px] tracking-[0.2em] text-silver/30 uppercase mb-4 font-medium italic">
                                    {item.label}
                                </h3>
                                <p className="font-heading text-xl md:text-2xl leading-[1.4] text-silver/60 font-light tracking-tight group-hover:text-silver transition-colors duration-700">
                                    {item.statement}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Subtle Background Ornament */}
            <div className="absolute bottom-12 right-12 pointer-events-none opacity-[0.03]">
                <span className="cred-bg-text block font-heading text-[15vw] font-black text-silver leading-none select-none">
                    Reliability
                </span>
            </div>
        </section>
    );
}