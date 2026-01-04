"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillDomains = [
  {
    title: "Frontend Engineering",
    description:
      "Building performance-first, accessible, and scalable user interfaces.",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript (ES6+)",
      "TypeScript",
      "React.js",
      "Next.js",
    ],
  },
  {
    title: "Backend & Data",
    description:
      "Designing secure architectures and managing data across SQL and NoSQL ecosystems.",
    skills: [
      "Node.js",
      "Express.js",
      "RESTful APIs",
      "MongoDB",
      "PostgreSQL",
      "JWT / OAuth",
    ],
  },
  {
    title: "UI, Motion & Styling",
    description:
      "Crafting immersive digital experiences through precision styling and fluid animations.",
    skills: [
      "Tailwind CSS",
      "GSAP",
      "Bootstrap",
      "Responsive Design",
      "Motion Design",
    ],
  },
  {
    title: "Tooling & Workflow",
    description:
      "Maintaining a disciplined development process through version control and collaborative testing.",
    skills: ["Git", "GitHub", "Postman", "CI/CD Basics", "Vite", "NPM / Yarn"],
  },
];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Header Animation
      gsap.from(".skills-header", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      });

      // Grid Items Stagger
      gsap.from(".skill-card", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".skills-grid",
          start: "top 80%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="skills"
      className="py-24 md:py-40 bg-bgBlack text-silver overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Section Header */}
        <header className="skills-header mb-20 md:mb-32 max-w-3xl">
          <span className="block text-emerald-400 text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-4">
            Technical Landscape
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-medium tracking-tight mb-8">
            Core strengths & <br /> tools I work with
          </h2>
          <p className="text-silver/60 text-lg md:text-xl font-light leading-relaxed">
            I specialize in building production-ready applications with a focus
            on maintainability, performance, and user experience.
          </p>
        </header>

        {/* Skills Grid */}
        <div className="skills-grid grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10 overflow-hidden">
          {skillDomains.map((domain, index) => (
            <div
              key={index}
              className="skill-card group bg-bgBlack p-8 md:p-12 lg:p-16 hover:bg-white/2 transition-colors duration-500"
            >
              <h3 className="text-2xl md:text-3xl font-heading font-bold mb-6 group-hover:text-emerald-400 transition-colors duration-300">
                {domain.title}
              </h3>
              <p className="text-silver/50 text-base md:text-lg font-light leading-relaxed mb-10 max-w-md">
                {domain.description}
              </p>

              <div className="flex flex-wrap gap-x-4 gap-y-3">
                {domain.skills.map((skill, sIndex) => (
                  <div
                    key={sIndex}
                    className="flex items-center gap-2 group/skill"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-sm md:text-base text-silver/40 group-hover:text-silver/90 transition-colors font-mono">
                      {skill}
                    </span>
                    {sIndex !== domain.skills.length - 1 && (
                      <span className="text-white/5 ml-2">/</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Accent */}
        <div className="mt-20 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/5" />
          <p className="text-[10px] uppercase tracking-[0.3em] text-silver/20 font-bold whitespace-nowrap">
            Continuous Learning — Systemic Growth
          </p>
          <div className="h-px flex-1 bg-white/5" />
        </div>
      </div>
    </section>
  );
}
