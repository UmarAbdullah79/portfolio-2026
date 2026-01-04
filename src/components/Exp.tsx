"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: "Software Developer Intern",
    company: "Iunoware Pvt Ltd.",
    type: "Internship",
    period: "July 2025 — Present",
    bullets: [
      "Involved in the complete website development lifecycle, from initial client discussions and requirement gathering to final delivery and demo.",
      "Collaborated with the team to understand business goals, target users, and website purpose, translating them into structured layouts and user-focused designs.",
      "Contributed to decisions around color palettes, typography, and overall visual direction to ensure brand alignment and usability.",
      "Built and refined responsive, production-ready web interfaces, iterating based on internal reviews and client feedback.",
    ],
    tech: "React, JavaScript, Tailwind CSS, GSAP, Git, Responsive Design, Client Demos, Requirement Analysis",
  },
  // {
  //   role: "Freelance Web Developer — Independent Client Projects",
  //   company: "Self-Employed",
  //   type: "Freelance",
  //   period: "December 2025 — Present",
  //   bullets: [
  //     "Designed and developed complete websites and landing pages for referral-based clients, handled outside core work hours.",
  //     "Owned the full project lifecycle, from requirement discussion and design decisions to development, testing, and deployment.",
  //     "Delivered responsive, performance-focused websites tailored to client goals and target audiences.",
  //     "Managed hosting setup and production deployment, ensuring smooth handover and client satisfaction.",
  //   ],
  //   tech: "React, JavaScript, Tailwind CSS, GSAP, Git, Hosting & Deployment, Client Communication",
  // },
];

export default function Exp() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Section fade-in & upward motion
      gsap.from(".exp-header", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // 2. Timeline line reveal
      gsap.from(lineRef.current, {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.5,
        ease: "none",
        scrollTrigger: {
          trigger: ".exp-list",
          start: "top 70%",
          end: "bottom 70%",
          scrub: 1,
        },
      });

      // 3. Blocks reveal - sequential
      const blocks = gsap.utils.toArray(".exp-block");
      blocks.forEach((block: any, i: number) => {
        gsap.from(block, {
          x: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: block,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="exp"
      className="py-24 md:py-40 bg-bgBlack text-silver overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Section Header */}
        <header className="exp-header mb-20 md:mb-32 max-w-3xl">
          <span className="block text-emerald-400 text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-4">
            Experience
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-medium tracking-tight mb-8">
            Work experience
          </h2>
          <p className="text-silver/60 text-lg md:text-xl font-light leading-relaxed">
            Real work. Real learning. A track record of continuous growth and
            hands-on contributions across modern technology stacks.
          </p>
        </header>

        {/* Timeline List */}
        <div className="exp-list relative">
          {/* Vertical Timeline Line */}
          <div
            ref={lineRef}
            className="absolute left-0 md:left-[30%] top-0 bottom-0 w-px bg-white/10 hidden md:block"
          />

          <div className="space-y-24 md:space-y-32">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="exp-block group grid grid-cols-1 md:grid-cols-[30%_1fr] gap-8 md:gap-24 relative"
              >
                {/* Left Column: Context (Hidden Dot on Desktop) */}
                <div className="relative">
                  <div className="space-y-2 pt-1 md:text-right md:pr-12 lg:pr-16">
                    <p className="text-emerald-400/80 font-mono text-sm tracking-tighter">
                      {exp.period}
                    </p>
                    <h3 className="text-lg md:text-xl font-bold font-heading text-silver/40 group-hover:text-silver transition-colors">
                      {exp.company}
                    </h3>
                    <span className="inline-block text-[10px] uppercase tracking-widest border border-white/10 px-2 py-0.5 rounded text-white/30">
                      {exp.type}
                    </span>
                  </div>

                  {/* Timeline Dot */}
                  <div className="absolute top-3 -left-1.25 md:left-[calc(100%-5px)] w-2.5 h-2.5 rounded-full bg-bgBlack border-2 border-emerald-400 hidden md:block z-10" />
                </div>

                {/* Right Column: Role & Responsibilities */}
                <div className="space-y-6">
                  <h4 className="text-2xl md:text-3xl font-heading font-bold">
                    {exp.role}
                  </h4>

                  <ul className="space-y-4">
                    {exp.bullets.map((bullet, bIndex) => (
                      <li
                        key={bIndex}
                        className="flex gap-4 group/bullet px-2 -mx-2 hover:bg-white/2 p-1 rounded transition-colors"
                      >
                        <span className="text-emerald-400/30 mt-1.5 shrink-0 select-none">
                          —
                        </span>
                        <p className="text-silver/60 text-base md:text-lg font-light leading-relaxed group-hover/bullet:text-silver/90 transition-colors">
                          {bullet}
                        </p>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 mt-6 border-t border-white/5 flex flex-wrap gap-x-4 gap-y-2">
                    <span className="text-[10px] uppercase tracking-widest text-silver/30 font-bold self-center">
                      Tech & Practices:
                    </span>
                    <p className="text-xs md:text-sm font-mono text-silver/40 italic">
                      {exp.tech}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
