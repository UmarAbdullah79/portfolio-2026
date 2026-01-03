"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Sai Constructions",
    description:
      "Built a multi-page construction company website with GSAP-powered animations, responsive layouts, and smooth scroll interactions, delivered through close team collaboration.",
    image: "/images/sai-1.jpg",
    tech: ["React", "GSAP", "Tailwind"],
    link: "https://saiconstructiongroups.com/",
    cta: "Live Demo",
  },
  {
    title: "Iunoware",
    description:
      "Migrated a legacy frontend to React and Tailwind, rebuilding key sections with modular components for better scalability, maintainability, and modern UX.",
    image: "/images/iuno.png",
    tech: ["React", "GSAP", "Tailwind"],
    link: "https://iunoware.com/",
    cta: "Live Demo",
  },
  {
    title: "FinPulse Fintech",
    description:
      "Real-time financial tracking with bank-grade security protocols.",
    image: "/images/project_fintech_app_1767092724598.png",
    tech: ["Next.js", "D3.js", "Prisma"],
    link: "#",
    cta: "Live Demo",
  },
  {
    title: "MediFlow Portal",
    description: "Improving patient throughput by 25% with digital workflow.",
    image: "/images/project_healthcare_portal_1767092748135.png",
    tech: ["React", "Express", "Firebase"],
    link: "#",
    cta: "View Project",
  },
];

export default function SelectedProjects() {
  const containerRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!scrollRef.current) return;

      // Entrance Animation
      gsap.fromTo(
        ".fade-in-text",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );

      const cards = gsap.utils.toArray(".project-card");
      gsap.fromTo(
        cards,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: scrollRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef }
  );

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      id="projects"
      className="py-16 md:py-32 bg-bgBlack overflow-hidden min-h-screen flex flex-col justify-center"
    >
      <div className="max-w-8xl mx-auto px-6 md:px-24 w-full grid grid-cols-1 lg:grid-cols-[30%_70%] gap-12 lg:gap-24 items-start">
        {/* Left Section (Static) */}
        <div className="lg:sticky lg:top-32 space-y-6 md:space-y-8">
          <div className="space-y-2">
            <span className="fade-in-text block text-emerald-400 font-medium tracking-[0.2em] uppercase text-xs">
              Portfolio
            </span>
            <h2 className="fade-in-text text-5xl md:text-7xl font-bold font-heading text-silver leading-[1.05] tracking-tight">
              Selected <br /> Projects
            </h2>
          </div>

          <p className="fade-in-text text-silver/60 text-lg md:text-xl font-light leading-relaxed max-w-sm">
            Showcasing real-world, production-ready work focused on solving
            complex problems with clean code.
          </p>

          <div className="fade-in-text flex gap-4 pt-4 md:pt-8">
            <button
              onClick={scrollLeft}
              aria-label="Scroll Left"
              className="p-4 rounded-full border border-white/10 text-silver hover:bg-white/5 hover:border-white/20 transition-all group"
            >
              <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 group-active:scale-90 transition-transform" />
            </button>
            <button
              onClick={scrollRight}
              aria-label="Scroll Right"
              className="p-4 rounded-full border border-white/10 text-silver hover:bg-white/5 hover:border-white/20 transition-all group"
            >
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-active:scale-90 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right Section (Interactive Horizontal Scroll) */}
        <div className="relative group/scroll">
          <div
            ref={scrollRef}
            className="flex gap-6 md:gap-10 overflow-x-auto pb-12 pt-4 scroll-smooth no-scrollbar snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {projects.map((project, index) => (
              <div
                key={index}
                className="project-card min-w-75 md:min-w-112.5 aspect-3/4 group relative rounded-4xl overflow-hidden bg-white/3 border border-white/5 snap-start transition-all duration-500 hover:border-white/20 hover:shadow-2xl hover:shadow-emerald-500/5"
              >
                {/* Image Overlay */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 300px, 450px"
                    className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-80"
                  />
                  {/* Gradient Mask */}
                  <div className="absolute inset-0 bg-linear-to-t from-bgBlack via-bgBlack/40 to-transparent z-10" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 z-20 p-8 md:p-12 flex flex-col justify-end items-start gap-4 md:gap-6">
                  <div className="flex flex-wrap gap-2 transform transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    {project.tech.map((tag, t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] uppercase tracking-wider text-silver/90 backdrop-blur-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-2 transform transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <h3 className="text-3xl md:text-4xl font-heading font-bold text-silver">
                      {project.title}
                    </h3>
                    <p className="text-silver/50 text-sm md:text-base leading-relaxed max-w-70 md:max-w-xs group-hover:text-silver/80 transition-colors">
                      {project.description}
                    </p>
                  </div>

                  <a
                    href={project.link}
                    target="_blank"
                    className="inline-flex items-center gap-2 mt-2 text-emerald-400 font-medium group/btn opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100"
                  >
                    <span className="relative overflow-hidden h-6 flex items-center">
                      <span className="inline-block transition-transform duration-300 group-hover/btn:-translate-y-full text-sm md:text-base">
                        {project.cta}
                      </span>
                      <span className="absolute top-full left-0 inline-block transition-transform duration-300 group-hover/btn:-translate-y-full text-white text-sm md:text-base">
                        {project.cta}
                      </span>
                    </span>
                    <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                  </a>
                </div>
              </div>
            ))}

            {/* Empty Spacer to allow better viewing of the last card */}
            <div className="min-w-[10vw] shrink-0" />
          </div>
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
