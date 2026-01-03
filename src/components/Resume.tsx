"use client";

import React, { useRef } from "react";
import { Download, ExternalLink } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Resume() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Section Entrance
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      });

      // Sequential Text Reveal
      if (textRef.current) {
        const lines = textRef.current.children;
        gsap.from(lines, {
          opacity: 0,
          y: 15,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 90%",
          },
        });
      }

      // Buttons Reveal
      if (buttonsRef.current) {
        const buttons = buttonsRef.current.children;
        gsap.from(buttons, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: buttonsRef.current,
            start: "top 90%",
          },
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="resume"
      className="py-24 md:py-40 bg-bgBlack text-silver overflow-hidden border-t border-white/5"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Header */}
        <div className="space-y-4 mb-12">
          <span className="block text-emerald-400 text-xs md:text-sm font-bold tracking-[0.2em] uppercase">
            Resume
          </span>
          <h2
            ref={titleRef}
            className="text-5xl md:text-7xl font-heading font-medium tracking-tight"
          >
            For Hiring Flow
          </h2>
        </div>

        {/* Description Paragraph */}
        <div ref={textRef} className="max-w-2xl mx-auto space-y-4 mb-16">
          <p className="text-silver/60 text-lg md:text-xl font-light leading-relaxed mb-2">
            A comprehensive overview of my technical expertise, project
            leadership, and the impact I have delivered across various
            high-growth environments.
          </p>
          <div className="h-px w-12 bg-emerald-400/20 mx-auto" />
        </div>

        {/* CTA Buttons */}
        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          {/* Download Button */}
          <button
            onClick={() =>
              window.open("/images/Umar-Abdullah-Resume.pdf", "_blank")
            }
            className="group relative flex items-center gap-3 px-8 py-4 bg-emerald-400 text-bgBlack font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_-5px_rgba(52,211,153,0.3)] hover:shadow-[0_0_30px_-5px_rgba(52,211,153,0.5)] cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Download className="w-5 h-5 group-hover:animate-bounce" />
              Download PDF
            </span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
          </button>

          {/* View Online Button */}
          <button
            onClick={() =>
              window.open("/images/Umar-Abdullah-Resume.pdf", "_blank")
            }
            className="group flex items-center gap-3 px-8 py-4 border border-white/10 hover:border-emerald-400/50 text-silver font-medium rounded-full transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-sm"
          >
            <span className="relative overflow-hidden inline-block pr-1">
              <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                View Online
              </span>
              <span className="absolute top-full left-0 inline-block transition-transform duration-300 group-hover:-translate-y-full text-emerald-400">
                View Online
              </span>
            </span>
            <ExternalLink className="w-5 h-5 text-silver/40 group-hover:text-emerald-400 transition-colors" />
          </button>
        </div>

        {/* Footer Note */}
        <p className="mt-24 text-silver/20 text-xs tracking-widest uppercase font-medium">
          Optimized for Technical Reviewers & Hiring Managers
        </p>
      </div>
    </section>
  );
}
