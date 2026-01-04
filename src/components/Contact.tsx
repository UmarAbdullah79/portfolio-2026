"use client";

import React, { useRef } from "react";
import { ArrowRight, Github, Linkedin, Mail, Phone } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top bottom-=100px",
          toggleActions: "play none none none",
          once: true,
        },
      });

      // Contact Section Animation
      tl.from(".animate-contact", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      });

      // Footer Animation (delayed stagger)
      tl.from(
        ".animate-footer",
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
        },
        "-=0.2"
      );

      // CTA Hover: Arrow Slide
      const ctas = document.querySelectorAll(".cta-hover");
      ctas.forEach((cta) => {
        const arrow = cta.querySelector(".arrow-icon");
        cta.addEventListener("mouseenter", () => {
          gsap.to(arrow, { x: 6, duration: 0.3, ease: "power2.out" });
        });
        cta.addEventListener("mouseleave", () => {
          gsap.to(arrow, { x: 0, duration: 0.3, ease: "power2.out" });
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="contact"
      className="pt-32 pb-12 px-6 bg-bgBlack overflow-hidden flex flex-col min-h-screen"
    >
      {/* Contact Section */}
      <div ref={contactRef} className="max-w-4xl mx-auto w-full mb-32">
        <span className="animate-contact inline-block px-3 py-1 rounded-full bg-white/5 text-[10px] font-medium tracking-wider uppercase text-silver/40 mb-8">
          Hiring Status
        </span>

        <h2 className="animate-contact text-4xl md:text-7xl font-heading font-medium text-silver mb-8 leading-[1.1] tracking-tight">
          Open to Frontend, React & <br className="hidden md:block" />{" "}
          Full-Stack Opportunities
        </h2>

        <p className="animate-contact text-silver/50 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
          Currently exploring frontend, React, and full-stack roles where UI
          quality, performance, and scalability are priorities.
        </p>

        {/* <ul className="animate-contact grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-12 mb-16">
          {[
            "React & Next.js Ecosystem",
            "UI-Focused Development",
            "Performance-Aware Coding",
            "Advanced GSAP Animations",
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-silver/60">
              <div className="w-1.5 h-1.5 rounded-full bg-silver/20" />
              <span className="text-sm md:text-base font-medium">{item}</span>
            </li>
          ))}
        </ul> */}

        {/* CTAs */}
        <div className="animate-contact flex flex-wrap items-center gap-6 mb-16">
          <a
            href="mailto:uu0339843@gmail.com"
            className="cta-hover flex items-center gap-3 px-8 py-4 bg-silver text-bgBlack font-bold rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            Contact Me
            <ArrowRight className="arrow-icon w-5 h-5" />
          </a>
          <a
            href="/images/Umar-Abdullah-Resume.pdf"
            target="_blank"
            className="cta-hover flex items-center gap-2 text-silver/60 hover:text-silver font-medium px-4 py-4 transition-colors duration-300 group"
          >
            Download Resume
            <ArrowRight className="arrow-icon w-4 h-4" />
          </a>
        </div>

        {/* Professional Links */}
        <div className="animate-contact flex flex-wrap items-center gap-8 pt-8 border-t border-white/5">
          {[
            {
              name: "GitHub",
              url: "https://github.com/UmarAbdullah79",
              icon: Github,
            },
            {
              name: "LinkedIn",
              url: "https://www.linkedin.com/in/umar-abdullah-718169293/",
              icon: Linkedin,
            },
            {
              name: "Message",
              url: "https://api.whatsapp.com/send/?phone=919047812365&text=Hi+Umar%21+I+came+across+your+portfolio+and+would+love+to+discuss+a+potential+project+or+collaboration.&type=phone_number&app_absent=0",
              icon: Mail,
            },
            { name: "Call", url: "tel:+919047812365", icon: Phone },
          ].map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              className="relative group flex items-center gap-2 text-silver/40 hover:text-silver text-sm font-medium transition-colors"
            >
              <social.icon className="w-4 h-4" />
              <span>{social.name}</span>
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-silver transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
