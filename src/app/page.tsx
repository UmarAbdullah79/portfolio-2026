"use client";

import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

import Hero from "@/components/Hero";
import Hero2 from "@/components/Hero-2";
import Services from "@/components/Services";
import ProofOverClaims from "@/components/ProofOverClaims";
import Exp from "@/components/Exp";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

gsap.registerPlugin(ScrollToPlugin);

export default function Home() {
  useGSAP(() => {
    let isAnimating = false;

    // 🔥 INTRO REVEAL (on page load)
    const introReveal = () => {
      const tl = gsap.timeline();

      tl.set(".bricks", {
        visibility: "visible",
        scaleY: 1,
      })
        .to(".bricks", {
          scaleY: 0,
          duration: 1,
          stagger: {
            each: 0.08,
            grid: [2, 5],
            axis: "x",
          },
          ease: "power4.inOut",
        })
        .set(".bricks", { visibility: "hidden" });
    };

    // 🔥 SECTION TRANSITION (on nav click)
    const playSectionTransition = (targetId: string) => {
      if (isAnimating) return;
      isAnimating = true;

      const tl = gsap.timeline({
        defaults: { ease: "power4.inOut" },
        onComplete: () => {
          isAnimating = false;
        },
      });

      tl.set(".bricks", { visibility: "visible" })
        .to(".bricks", {
          scaleY: 1,
          duration: 0.8,
          stagger: {
            each: 0.08,
            grid: [2, 5],
            axis: "x",
          },
        })
        .to(window, {
          scrollTo: `#${targetId}`,
          duration: 0.01,
        })
        .to(".bricks", {
          scaleY: 0,
          duration: 0.8,
          stagger: {
            each: 0.08,
            grid: [2, 5],
            axis: "x",
          },
        })
        .set(".bricks", { visibility: "hidden" });
    };

    // ▶️ RUN INTRO ONCE
    introReveal();

    // ▶️ INTERCEPT ALL HASH LINKS
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        const id = link.getAttribute("href")?.replace("#", "");
        if (!id) return;

        playSectionTransition(id);
      });
    });
  });

  return (
    <>
      {/* FULLSCREEN TRANSITION LAYER */}
      <div className="fixed inset-0 z-999 flex flex-col pointer-events-none">
        <div className="flex flex-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={`top-${i}`}
              className="bricks flex-1 bg-silver origin-top scale-y-100 will-change-transform"
            />
          ))}
        </div>
        <div className="flex flex-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={`bottom-${i}`}
              className="bricks flex-1 bg-silver origin-bottom scale-y-100 will-change-transform"
            />
          ))}
        </div>
      </div>

      {/* SECTIONS */}

      {/* <Hero2 /> */}
      <Hero />
      <Services />
      <ProofOverClaims />
      <Exp />
      <Skills />
      <Contact />
    </>
  );
}
