"use client";

import React, { useRef } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom-=100px",
          toggleActions: "play none none none",
          once: true,
        },
      });

      // Footer Animation (delayed)
      tl.from(
        ".animate-footer",
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.2"
      );

      // Hover animations for links
      const links = document.querySelectorAll(".hover-link");
      links.forEach((link) => {
        const arrow = link.querySelector(".arrow-icon");
        link.addEventListener("mouseenter", () => {
          gsap.to(arrow, { x: 5, duration: 0.3, ease: "power2.out" });
        });
        link.addEventListener("mouseleave", () => {
          gsap.to(arrow, { x: 0, duration: 0.3, ease: "power2.out" });
        });
      });
    },
    { scope: footerRef }
  );

  return (
    <>
      <footer ref={footerRef} className="mt-auto pb-8 w-full max-w-6xl mx-auto">
        {/* Subtle Divider */}
        <div className="animate-footer w-full h-px bg-white/5 mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          {/* Brand/Role */}
          <div className="animate-footer">
            <h3 className="text-silver font-medium mb-2">Umar Abdullah</h3>
            <p className="text-silver/30 text-sm">
              Frontend / React-focused Developer
            </p>
          </div>

          {/* Navigation */}
          <nav className="animate-footer flex flex-col gap-3">
            <span className="text-[10px] uppercase tracking-widest text-silver/20 font-bold mb-2">
              Navigation
            </span>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {["Home", "Projects", "About", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-silver/40 hover:text-silver text-sm transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </nav>

          {/* Socials */}
          <div className="animate-footer flex flex-col gap-3 md:items-end lg:items-start">
            <span className="text-[10px] uppercase tracking-widest text-silver/20 font-bold mb-2">
              Social Profiles
            </span>
            <div className="flex gap-6">
              {[
                {
                  name: "LinkedIn",
                  url: "https://www.linkedin.com/in/umar-abdullah-718169293/",
                },
                { name: "GitHub", url: "https://github.com/UmarAbdullah79" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  className="text-silver/40 hover:text-silver text-sm transition-colors"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="animate-footer flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/3 gap-4">
          <p className="text-silver/20 text-[10px] tracking-wider uppercase">
            © 2026 Umar Abdullah. Built with care.
          </p>
          <p className="text-silver/20 text-[10px] tracking-wider uppercase">
            Tamil Nadu, India
          </p>
        </div>
      </footer>
    </>
  );
}
