"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Layout, Server, Zap, PenTool } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        title: "Frontend Development",
        description: "Responsive, accessible, and scalable UI built with React & Next.js.",
        icon: <Layout className="w-6 h-6 text-emerald-400" />,
    },
    {
        title: "Full-Stack Foundations",
        description: "Robust APIs and secure authentication, prioritizing structure and logic.",
        icon: <Server className="w-6 h-6 text-emerald-400" />,
    },
    {
        title: "Performance & SEO",
        description: "Optimizing Core Web Vitals for fast loads and better visibility.",
        icon: <Zap className="w-6 h-6 text-emerald-400" />,
    },
    {
        title: "UI to Code Translation",
        description: "Converting Figma designs into pixel-perfect, interactive code.",
        icon: <PenTool className="w-6 h-6 text-emerald-400" />,
    },
];

export default function Services() {
    const container = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            // Title Animation
            gsap.fromTo(
                titleRef.current,
                {
                    y: 50,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: container.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                }
            );

            // Cards Animation
            const cards = cardsRef.current?.children;
            if (cards) {
                gsap.fromTo(
                    cards,
                    {
                        y: 60,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        stagger: 0.15,
                        duration: 1.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: cardsRef.current,
                            start: "top 80%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }
        },
        { scope: container }
    );

    return (
        <section
            ref={container}
            className="relative min-h-[80vh] w-full bg-bgBlack flex flex-col justify-center px-8 md:px-24 py-24 overflow-hidden"
        >
            <div className="max-w-8xl mx-auto w-full">
                {/* Header Section */}
                <div ref={titleRef} className="max-w-3xl mb-16 md:mb-24">
                    <h2 className="font-heading text-4xl md:text-6xl font-bold text-silver mb-6 leading-[1.1]">
                        I build fast, scalable, and user-focused web experiences.
                    </h2>
                    <p className="text-silver/60 text-lg md:text-xl font-light leading-relaxed max-w-xl">
                        Blending technical performance with clear, usable design to solve real problems.
                    </p>
                </div>

                {/* Cards Grid */}
                <div
                    ref={cardsRef}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group relative p-8 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all duration-500 hover:-translate-y-2"
                        >
                            {/* Soft hover glow effect */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10 flex flex-col items-start h-full">
                                <div className="p-3 mb-6 rounded-lg bg-white/5 border border-white/5 group-hover:scale-110 transition-transform duration-500">
                                    {service.icon}
                                </div>

                                <h3 className="font-heading text-xl font-semibold text-silver mb-3">
                                    {service.title}
                                </h3>

                                <p className="text-silver/50 text-sm leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
