"use client";

import React, { useRef } from "react";
import { Download, Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Refresh ScrollTrigger to ensure correct positions after layout is stable
      ScrollTrigger.refresh();

      // 1. Section Entrance
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom-=80",
          toggleActions: "play none none reverse",
          once: true, // Only trigger once to avoid flickering on first render
        },
      });

      // 2. Headline & Subtext Reveal
      gsap.from([headlineRef.current, subtextRef.current], {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom-=120",
          toggleActions: "play none none reverse",
        },
      });

      // 4. Links Reveal
      if (linksRef.current) {
        gsap.from(linksRef.current, {
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: linksRef.current,
            start: "top bottom",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Global refresh after everything is set
      window.addEventListener("load", () => ScrollTrigger.refresh());
      return () =>
        window.removeEventListener("load", () => ScrollTrigger.refresh());
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-24 md:py-18 bg-bgBlack text-silver overflow-hidden relative"
    >
      {/* Subtle Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-emerald-400/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <header className="mb-16 md:mb-24">
          <h2
            ref={headlineRef}
            className="text-5xl md:text-8xl font-heading font-medium tracking-tight mb-8"
          >
            Let’s build something <br className="hidden md:block" /> meaningful.
          </h2>
          <p
            ref={subtextRef}
            className="text-silver/50 text-lg md:text-2xl font-light leading-relaxed max-w-2xl mx-auto"
          >
            I’m always open to discussing new projects, creative ideas, or
            opportunities to be part of your visions.
          </p>
        </header>

        {/* Primary Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20 md:mb-32">
          {/* Resume Download */}
          <a
            href="/images/Umar-Abdullah-Resume.pdf"
            target="_blank"
            className="group relative flex items-center gap-3 px-10 py-5 bg-emerald-400 text-bgBlack font-bold rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-emerald-400/10 cursor-pointer"
          >
            <Download className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
            <span>Download Resume</span>
          </a>

          {/* Email Contact */}
          <a
            href="mailto:uu0339843@gmail.com"
            className="group flex items-center gap-3 px-10 py-5 border border-white/10 hover:border-emerald-400/50 text-silver font-medium rounded-full transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-sm cursor-pointer"
          >
            <Mail className="w-5 h-5 text-emerald-400/60 group-hover:text-emerald-400 transition-colors" />
            <span>Contact Me</span>
          </a>
        </div>

        {/* Minimal Contact Details & Socials */}
        <div ref={linksRef} className="space-y-12">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-silver/20 font-bold">
              Direct Inquiries
            </span>
            <a
              href="mailto:uu0339843@gmail.com"
              className="text-xl md:text-2xl font-light text-silver hover:text-emerald-400 transition-colors underline-offset-8 decoration-emerald-400/20 hover:decoration-emerald-400 border-b border-white/5 pb-2"
            >
              uu0339843@gmail.com
            </a>
          </div>

          <div className="flex items-center justify-center gap-8 md:gap-12">
            <a
              href="https://github.com/UmarAbdullah79"
              target="_blank"
              className="flex items-center gap-2 text-silver/40 hover:text-silver transition-colors group"
            >
              <Github className="w-5 h-5" />
              <span className="text-sm font-medium">GitHub</span>
              <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
            </a>
            <a
              href="https://www.linkedin.com/in/umar-abdullah-718169293/"
              target="_blank"
              className="flex items-center gap-2 text-silver/40 hover:text-silver transition-colors group"
            >
              <Linkedin className="w-5 h-5" />
              <span className="text-sm font-medium">LinkedIn</span>
              <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
            </a>
          </div>
        </div>

        {/* Final Footer Note */}
        <footer className="mt-32 pt-12 border-t border-white/5 text-silver/60 text-xs tracking-widest uppercase flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 Umar Abdullah — Built with Next.js, GSAP & Tailwind</p>
          <p>Tamil Nadu, India</p>
        </footer>
      </div>
    </section>
  );
}
