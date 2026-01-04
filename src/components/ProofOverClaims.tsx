"use client";

import React, { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Sai Constructions",
    description:
      "Built a multi-page construction company website featuring services, project highlights, and contact sections. Crafted smooth GSAP-powered hero animations, scroll reveals, and horizontal interactions while maintaining performance and responsiveness across devices. Collaborated closely in a two-member team to deliver a clean, modern interface with strong client approval.",
    tech: ["React", "GSAP", "JavaScript", "Tailwind CSS"],
    link: "https://saiconstructiongroups.com/",
    cta: "View Project",
  },
  {
    title: "Iunoware Pvt Ltd.",
    description:
      "Modernized a legacy front-end by migrating from HTML & Bootstrap to React and Tailwind, resulting in a more scalable, consistent, and maintainable UI system. Reworked key homepage sections and hero layout to better align with brand identity and modern UX principles. Built modular, reusable components that simplified state management and significantly reduced code complexity, delivering a responsive, production-ready solution as part of a small, fast-moving team.",
    tech: ["React", "GSAP", "JavaScript", "Tailwind CSS"],
    link: "https://iunoware.com/",
    cta: "View Project",
  },
  {
    title: "Terra Loom",
    description:
      "Delivered an end-to-end client website, from layout implementation to deployment. Built SEO-optimized product pages with smooth scrolling, lazy loading, and performance-focused image handling. Enhanced user engagement through subtle animations, form validation, and responsive design, resulting in a polished experience that met performance, SEO, and cross-device standards.",

    tech: ["HTML", "Bootstrap", "JavaScript"],
    link: "#",
    cta: "View Project",
  },
];

export default function ProofOverClaims() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // 1. Clear initial states to ensure visibility if JS fails or ScrollTrigger is slow
      const elementsToAnimate = gsap.utils.toArray([
        headerRef.current?.children,
        ".project-item",
      ]);

      // 2. Setup initial hidden states using gsap.set inside the hook
      gsap.set(elementsToAnimate, {
        opacity: 0,
        y: 40,
      });

      // 3. Single timeline for the entire section reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      tl.to(elementsToAnimate, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
      });

      // 4. Force refresh after hydration is fully stable
      ScrollTrigger.refresh();
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="work"
      className="py-24 md:py-40 bg-bgBlack text-silver overflow-hidden"
    >
      <div className="max-w-9xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Section Header */}
        <header ref={headerRef} className="mb-20 md:mb-32 max-w-3xl">
          <span className="block text-emerald-400 text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-4">
            Selected Work
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-medium tracking-tight mb-8">
            Proof over claims
          </h2>
          <p className="text-silver/60 text-lg md:text-xl font-light leading-relaxed">
            Real-world experience is measured in outcomes, not just code. Here
            is how I have helped products scale, teams move faster, and users
            succeed.
          </p>
        </header>

        {/* Project List */}
        <div className="project-list flex flex-col border-t border-white/10">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-item group grid grid-cols-1 md:grid-cols-[1fr_1.5fr] py-12 md:py-20 border-b border-white/10 hover:bg-white/2 hover:-translate-y-1.5 transition-all duration-500 ease-in-out px-4 -mx-4 cursor-default"
            >
              {/* Left Column: Project Identity */}
              <div className="mb-8 md:mb-0 space-y-4">
                <div className="flex flex-col gap-1">
                  <h3 className="text-2xl md:text-3xl font-heading font-bold group-hover:text-emerald-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap pt-2 gap-x-4 gap-y-2">
                    {project.tech.map((item, i) => (
                      <span
                        key={i}
                        className="text-xs md:text-sm text-silver/30 font-mono"
                      >
                        {item}
                        {i !== project.tech.length - 1 && (
                          <span className="ml-4 text-white/10">/</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Project Proof */}
              <div className="flex flex-col justify-between space-y-6 md:pl-12 lg:pl-20 border-l-0 md:border-l border-white/5">
                <div className="space-y-4">
                  <p className="text-xl md:text-2xl font-light leading-relaxed text-silver/80">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-col gap-6 pt-4">
                  <div>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm md:text-base font-medium group/link"
                    >
                      <span className="border-b border-white/20 pb-0.5 group-hover/link:border-emerald-400 transition-colors">
                        {project.cta}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-silver/40 group-hover/link:text-emerald-400 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
