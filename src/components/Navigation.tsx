"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Approach", href: "#approach" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Trigger Button */}
      <button
        className="fixed top-8 right-8 md:top-12 md:right-12 z-1000 bg-none border-none cursor-pointer p-2 group transition-opacity duration-400"
        onClick={toggleMenu}
        aria-label={isOpen ? "Close Menu" : "Open Menu"}
        aria-expanded={isOpen}
        aria-controls="main-nav"
      >
        <span
          className={` ${
            isOpen
              ? "text-bgBlack/80 group-hover:bg-bgBlack "
              : "text-silver/80 group-hover:text-silver"
          } text-[0.75rem] uppercase tracking-[0.3em] font-medium transition-all duration-400 ease-[cubic-bezier(0.215,0.61,0.355,1)]  group-hover:tracking-[0.4em]`}
        >
          {isOpen ? <X /> : <Menu />}
        </span>
      </button>

      {/* Navigation Overlay */}
      <nav
        id="main-nav"
        className={`fixed inset-0 w-screen h-screen bg-silver z-900 flex items-center justify-start px-8 md:px-[8vw] transition-all duration-1200 ease-[cubic-bezier(0.77,0,0.175,1)] 
          ${
            isOpen
              ? "visible opacity-100 [clip-path:inset(0_0_0%_0)]"
              : "invisible opacity-0 [clip-path:inset(0_0_100%_0)]"
          }`}
      >
        <div className="w-full">
          <ul className="list-none p-0 m-0 flex flex-col gap-4 md:gap-6">
            {NAV_LINKS.map((link, index) => (
              <li
                key={link.label}
                className={`overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.215,0.61,0.355,1)]
                  ${
                    isOpen
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-full"
                  }`}
                style={{
                  transitionDelay: isOpen ? `${500 + index * 100}ms` : "0ms",
                }}
              >
                <Link
                  href={link.href}
                  className="inline-block font-heading text-6xl md:text-[clamp(3.5rem,12vw,10rem)] font-black text-bgBlack/80 no-underline leading-[0.9] tracking-[-0.04em] transition-all duration-600 ease-[cubic-bezier(0.165,0.84,0.44,1)] hover:tracking-[-0.01em] hover:pl-8 hover:text-bgBlack"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="block relative">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
