"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Works", href: "#work" },
  { label: "Experience", href: "#exp" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      currentScrollY > lastScrollY && currentScrollY > 80
        ? setShowNavbar(false)
        : setShowNavbar(true);

      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.setAttribute("data-nav-open", "true");
    } else {
      document.body.style.overflow = "unset";
      document.body.removeAttribute("data-nav-open");
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.removeAttribute("data-nav-open");
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Trigger Button */}
      <div
        className={`z-999 fixed bg-bgBlack top-0 transition-all duration-300 ${showNavbar ? "translate-y-0" : "-translate-y-full!"
          }`}
      >
        <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />
        <div className="flex py-6 justify-between w-screen items-center px-20  border-none">
          <div className="flex  flex-col gap-2">
            <span className="font-heading font-black text-silver text-2xl tracking-tight">
              Umar Abdullah
            </span>
            <span className="text-[10px] tracking-[0.4em] uppercase text-silver/40 font-medium">
              Full-stack developer &middot; React Specialist
            </span>
          </div>
          <button
            className="cursor-pointer p-2 group transition-opacity duration-400"
            onClick={toggleMenu}
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={isOpen}
            aria-controls="main-nav"
          >
            <span
              className={` ${isOpen
                  ? "text-bgBlack/80 group-hover:bg-bgBlack "
                  : "text-silver/80 group-hover:text-silver"
                } text-[0.75rem] uppercase tracking-[0.3em] font-medium transition-all duration-400 ease-[cubic-bezier(0.215,0.61,0.355,1)]  group-hover:tracking-[0.4em]`}
            >
              {isOpen ? <X /> : <Menu />}
            </span>
          </button>
        </div>
      </div>

      {/* Navigation Overlay */}
      <nav
        id="main-nav"
        className={`fixed inset-0 w-screen h-screen bg-silver z-1000 flex items-center justify-start px-8 md:px-[8vw] transition-all duration-1200 ease-[cubic-bezier(0.77,0,0.175,1)] 
          ${isOpen
            ? "visible opacity-100 [clip-path:inset(0_0_0%_0)]"
            : "invisible opacity-0 [clip-path:inset(0_0_100%_0)]"
          }`}
      >
        <div className="absolute right-20 top-10">
          <button
            onClick={toggleMenu}
            className="font-heading text-xl cursor-pointer md:text-[clamp(1.5rem,2vw,8rem)] font-black text-bgBlack/80 no-underline leading-[0.9] tracking-[-0.04em] transition-all duration-600 ease-[cubic-bezier(0.165,0.84,0.44,1)] hover:scale-80 hover:text-bgBlack"
          >
            X
          </button>
        </div>
        <div className="w-full">
          <ul className="list-none p-0 m-0 flex flex-col gap-4 md:gap-6">
            {NAV_LINKS.map((link, index) => (
              <li
                key={link.label}
                className={`overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.215,0.61,0.355,1)]
                  ${isOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-full"
                  }`}
                style={{
                  transitionDelay: isOpen ? `${500 + index * 100}ms` : "0ms",
                }}
              >
                <Link
                  href={link.href}
                  className="inline-block font-heading text-6xl md:text-[clamp(3.5rem,8vw,10rem)] font-black text-bgBlack/80 no-underline leading-[0.9] tracking-[-0.04em] transition-all duration-600 ease-[cubic-bezier(0.165,0.84,0.44,1)] hover:tracking-[-0.01em] hover:pl-8 hover:text-bgBlack"
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
