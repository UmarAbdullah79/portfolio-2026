"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgIndexRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.inOut", duration: 1.8 },
      });

      // Prepare Initial States
      gsap.set([headerRef.current, footerRef.current, contentRef.current], {
        opacity: 0,
      });
      gsap.set(headerRef.current, { y: -30 });
      gsap.set(footerRef.current, { y: 20 });
      gsap.set(contentRef.current, { y: 30 });
      gsap.set(bgIndexRef.current, { opacity: 0, x: 50, scale: 0.9 });

      // The "High-End" Sequence
      tl.to(bgIndexRef.current, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 2.5,
        ease: "expo.out",
      })
        .to(
          headerRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
          },
          0.5
        )
        .fromTo(
          headlineRef.current?.querySelectorAll(".line-inner") || [],
          {
            yPercent: 100,
            skewY: 7,
          },
          {
            yPercent: 0,
            skewY: 0,
            stagger: 0.12,
            duration: 2,
            ease: "expo.out",
          },
          0.4
        )
        .to(
          contentRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 1.5,
          },
          "-=1.4"
        )
        .fromTo(
          ".cta-item-line",
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: "left",
            duration: 1.2,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.8"
        )
        .fromTo(
          ".cta-item-text",
          { opacity: 0, x: -10 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.1,
            duration: 1,
            ease: "power2.out",
          },
          "-=1"
        )
        .to(
          footerRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
          },
          "-=1.2"
        );

      // Interactive Parallax
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 40;
        const yPos = (clientY / window.innerHeight - 0.5) * 40;

        gsap.to(bgIndexRef.current, {
          x: xPos,
          y: yPos,
          duration: 2,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative min-h-screen w-full bg-bgBlack flex flex-col justify-center px-8 md:px-24 py-20 overflow-hidden"
    >
      {/* Subtle Noise Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />

      <div className="relative z-10 max-w-8xl">
        {/* Editorial Header / Intro */}
        <div
          ref={headerRef}
          className="mb-6 md:mb-14 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-silver/5 pb-8"
        >
          <div className="flex flex-col gap-2">
            <span className="font-heading font-black text-silver text-2xl tracking-tight">
              Umar Abdullah
            </span>
            <span className="text-[10px] tracking-[0.4em] uppercase text-silver/40 font-medium">
              Full-stack developer &middot; React Specialist
            </span>
          </div>
          <div className=" md:block">
            <div className="flex flex-col gap-1">
              <span className="text-[9px] tracking-[0.3em] text-silver/20 uppercase font-medium">
                Status
              </span>
              <div className="flex md:flex-col flex-row pt-3 md:pt-0 gap-1">
                <span className="text-[10px] tracking-widest text-silver/60 font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 uppercase rounded-full bg-emerald-500/50 animate-pulse" />
                  OPEN TO WORK
                </span>
                <span className="text-[10px] tracking-widest text-silver/60 font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 animate-pulse" />
                  AVAILABLE FOR PROJECTS
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Headline - Dramatic scale */}
        <h1
          ref={headlineRef}
          className="font-heading text-[11vw] md:text-[8.5vw] lg:text-[7.5vw] font-bold leading-[0.85] text-silver tracking-tightest mb-12 md:mb-20"
        >
          <span className="block overflow-hidden pb-1 md:pb-2">
            <span className="line-inner block">Websites shouldn’t</span>
          </span>
          <span className="block overflow-hidden pb-1 md:pb-2">
            <span className="line-inner block">be forgotten. I build</span>
          </span>
          <span className="block line-inner overflow-hidden pb-1 md:pb-2">
            <span className=" block md:inline italic font-light font-serif pr-6 text-silver/80">
              the kind
            </span>
            <span className=" block overflow-hidden md:inline">
              that aren’t.
            </span>
          </span>
        </h1>

        <div
          ref={contentRef}
          className="flex flex-col md:flex-row gap-12 md:gap-32 items-start"
        >
          {/* Supporting Paragraph */}
          <div className="max-w-xl">
            <p className="text-xl md:text-2xl text-silver/60 font-light leading-relaxed">
              Synthesizing technical precision with aesthetic authority. I
              architect refined digital systems that prioritize clarity,
              typography, and the choreography of motion.
            </p>
          </div>

          {/* Pure Typographic CTAs */}
          <div className="flex flex-col gap-6 pt-2">
            <a
              href="#projects"
              className="cta-item-text group flex items-center gap-4 text-xs md:text-sm tracking-[0.3em] font-bold text-silver uppercase transition-all"
            >
              <span className="cta-item-line inline-block w-8 h-px bg-silver/20 transition-all group-hover:w-12 group-hover:bg-silver" />
              View Selected Work
            </a>
            <a
              href="/cv.pdf"
              className="cta-item-text group flex items-center gap-4 text-xs md:text-sm tracking-[0.3em] font-bold text-silver/40 uppercase transition-all hover:text-silver"
            >
              <span className="cta-item-line inline-block w-8 h-px bg-silver/10 transition-all group-hover:w-12 group-hover:bg-silver" />
              Download Resume
            </a>
          </div>
        </div>
      </div>

      {/* Background Index / Aesthetic Elements */}
      <div
        ref={bgIndexRef}
        className="absolute top-1/2 right-12 -translate-y-1/2 pointer-events-none hidden lg:block"
      >
        <span className="text-[20vh] font-heading font-black text-silver/5 select-none tracking-tighter">
          01
        </span>
      </div>

      {/* Bottom info bar */}
      <div
        ref={footerRef}
        className="md:absolute pt-10 md:pt-0 bottom-6 left-8 md:left-24 right-8 md:right-24 flex justify-between items-end"
      >
        <div className="flex flex-col gap-1">
          <span className="text-[10px] tracking-[0.4em] uppercase text-silver/20 font-medium">
            Portfolio 2026 &copy; v1.0
          </span>
        </div>
        <div className="text-[10px] tracking-[0.3em] text-silver/20 uppercase font-medium rotate-90 md:rotate-0 origin-right">
          BASED IN INDIA &middot; IST
        </div>
      </div>
    </section>
  );
}
