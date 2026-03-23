"use client";

import React, { useEffect, useState, useMemo, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { format } from "date-fns";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Twitter,
  Mail,
  ExternalLink,
} from "lucide-react";
import { ScrambleText } from "@/components/ScrambleText";
import Link from "next/link";

/* ────────────── ANIMATED SECTION WRAPPER ────────────── */
function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [dateTime, setDateTime] = useState({ day: "", time: "" });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setDateTime({
        day: format(now, "EEE"),
        time: format(now, "h:mm:ss a"),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  /* ── DATA ── */
  const projects = [
    {
      id: "001",
      title: "Pulse.",
      category: "UX DESIGN · CASE STUDY",
      description:
        "A comprehensive health tracking platform designed to simplify patient monitoring and improve healthcare outcomes through intuitive data visualization.",
      year: "2025",
    },
    {
      id: "002",
      title: "Flux",
      category: "PRODUCT DESIGN · APP",
      description:
        "An AI-powered workflow automation tool that streamlines creative processes, enabling teams to focus on what matters most — building great products.",
      year: "2024",
    },
    {
      id: "003",
      title: "Halō",
      category: "FULL STACK · WEB APP",
      description:
        "A modern social platform connecting creators with audiences through immersive storytelling, live sessions, and community-driven content curation.",
      year: "2024",
    },
  ];

  const companies = [
    { name: "Design Studio", logo: "Design Studio." },
    { name: "Club", logo: "Club" },
    { name: "GeoServe", logo: "geoServe" },
    { name: "Geminus", logo: "GEMINUS" },
    { name: "Cardinal", logo: "CARDINAL" },
    { name: "Absa", logo: "absa" },
  ];

  const experiences = [
    {
      period: "June - Aug 2025",
      role: "UX Design Intern",
      company: "Design Studio UX/UI",
      description:
        "Worked across UX audits, user flows, wireframes, UI design, and prototyping to identify usability gaps and improve product clarity.",
    },
    {
      period: "May - June 2025",
      role: "Product Design Intern",
      company: "Aeza",
      description:
        "Contributed to defining the product's information architecture and core navigation system. Designed key UI surfaces focusing on clarity and scalability.",
    },
    {
      period: "2023 – Now",
      role: "Full Stack Developer",
      company: "Freelance",
      description:
        "Designed and developed end-to-end web applications for personal brands and companies, aligning user needs with business goals.",
    },
    {
      period: "2020 – 2023",
      role: "Frontend Developer",
      company: "Freelance",
      description:
        "Created responsive, high-performance websites and interfaces, strengthening my understanding of modern web architecture and visual hierarchy.",
    },
  ];

  return (
    <div className="relative min-h-screen select-none text-foreground overflow-x-hidden">
      {/* VIGNETTE GLOW */}
      <div className="vignette-glow" />

      {/* ARCHITECTURAL BACKGROUND GRID */}
      <div className="fixed inset-0 pointer-events-none z-[0]">
        <div className="h-full w-full grid-background opacity-40" />
      </div>

      {/* ═══════════════════ HERO SECTION ═══════════════════ */}
      <section className="relative z-10 min-h-screen flex flex-col pt-32 h-screen overflow-hidden">
        {/* Full screen vertical grid lines for alignment */}
        <div className="absolute inset-0 z-0 flex pointer-events-none px-6 md:px-12 lg:px-16">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 border-r border-black/[0.04] last:border-r-0 h-full"
            />
          ))}
        </div>

        {/* Hero Content Area */}
        <div className="relative z-10 flex-1 flex flex-col px-6 md:px-12 lg:px-16">
          {/* Top Metadata: Digital Clock */}
          <div className="flex justify-start">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-body text-[11px] tracking-tight text-black/40 font-medium"
            >
              {dateTime.day} — {dateTime.time} — IN
            </motion.div>
          </div>

          {/* Main Headings */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="grid grid-cols-12 gap-0">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="col-start-1 md:col-start-5 lg:col-start-6 col-span-12"
              >
                <h2 className="text-[44px] md:text-[64px] font-bold text-black/40 tracking-tight leading-none mb-4 font-heading">
                  Hello — I&apos;m
                </h2>
                <h1 className="font-bold font-heading text-[18vw] md:text-[14vw] lg:text-[11vw] leading-[0.85] tracking-[-0.05em] text-[#1a1a1a]">
                  Riddhiman
                </h1>
              </motion.div>
            </div>
          </div>

          {/* Subtitle & Experience Bar */}
          <div className="grid grid-cols-12 gap-0 pb-16 items-end">
            {/* Left: Product Designer / Kolkata */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.4,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="col-span-12 md:col-span-4 flex flex-col gap-1"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-[10px] tracking-[0.3em] font-medium text-[#006054]">
                  LE|
                </span>
              </div>
              <span className="text-[14px] md:text-[15px] text-black/80 font-medium tracking-tight">
                Product Designer
              </span>
              <span className="text-[14px] md:text-[15px] text-black/80 font-medium tracking-tight">
                Based in Kolkata
              </span>
            </motion.div>

            {/* Right: Experience */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.5,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="col-span-12 md:col-start-7 md:col-span-6 mt-10 md:mt-0 flex flex-col gap-4"
            >
              <div className="flex items-start gap-4">
                <span className="font-body text-[10px] tracking-[0.2em] uppercase text-black/30 pt-1 font-bold">
                  [EXPERIENCE]
                </span>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] text-black/20">→</span>
                    <span className="text-[14px] text-[#1a1a1a] font-medium tracking-tight underline decoration-black/10 underline-offset-4">
                      Aeza, Bangalore, Ind
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] text-black/20">→</span>
                    <span className="text-[14px] text-[#1a1a1a] font-medium tracking-tight underline decoration-black/10 underline-offset-4">
                      DesignStudio, Kolkata, Ind
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Companies Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="border-t border-black/[0.08]"
        >
          <div className="flex items-stretch px-6 md:px-12 lg:px-16">
            {/* Label Cell */}
            <div className="w-[30%] md:w-[25%] lg:w-[16.666%] py-8 border-r border-black/[0.08] flex items-center pr-8">
              <span className="font-body text-[14px] text-black/60 leading-tight font-medium">
                Companies I&apos;ve <br /> contributed to @
              </span>
            </div>
            {/* Logo Cells */}
            <div className="flex-1 flex overflow-hidden">
              {companies.map((company, i) => (
                <div
                  key={i}
                  className="flex-1 flex items-center justify-center border-r border-black/[0.08] last:border-r-0 py-8 bg-black/[0.01] hover:bg-black/[0.03] transition-colors duration-500"
                >
                  <span className="font-bold text-[13px] md:text-[14px] text-black/70 tracking-tight uppercase whitespace-nowrap px-4">
                    {company.logo}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════ CASE STUDIES SECTION ═══════════════════ */}
      <section className="relative z-10 px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <AnimatedSection className="py-16 md:py-24 border-t border-black/[0.05]">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
            <div>
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-black/20 block mb-3">
                Case Studies 2024/25
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-black/80 font-heading">
                See Selected Work
              </h2>
            </div>
            <span className="font-mono text-[10px] tracking-[0.2em] text-black/20 uppercase">
              UI/UX · Design · Development
            </span>
          </div>
        </AnimatedSection>

        {/* Project Cards */}
        {projects.map((project, i) => (
          <AnimatedSection key={project.id} delay={i * 0.1}>
            <div className="group border-t border-black/[0.05] py-12 md:py-20 cursor-pointer relative">
              {/* Hover background */}
              <div className="absolute inset-0 bg-black/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative z-10 flex flex-col md:flex-row md:items-start gap-8 md:gap-16">
                {/* Left: Number & Title */}
                <div className="flex-shrink-0 md:w-[45%]">
                  <span className="font-mono text-[10px] tracking-[0.3em] text-black/20 block mb-4">
                    [{project.id}]
                  </span>
                  <h3 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.85] tracking-[-0.05em] uppercase text-black/85 group-hover:text-black transition-colors duration-500">
                    <ScrambleText text={project.title} />
                  </h3>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-black/25 uppercase block mt-4">
                    {project.category}
                  </span>
                </div>

                {/* Right: Description & Arrow */}
                <div className="flex-1 flex flex-col justify-between md:min-h-[160px]">
                  <p className="text-[14px] md:text-[15px] leading-relaxed text-black/40 max-w-[500px] font-mono">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between mt-8">
                    <span className="font-mono text-[10px] text-black/20 italic">
                      {project.year}
                    </span>
                    <div className="w-14 h-14 border border-black/[0.08] rounded-full flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all duration-500">
                      <ArrowUpRight className="w-6 h-6 text-black/30 group-hover:text-white group-hover:-rotate-12 transition-all duration-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </section>

      {/* ═══════════════════ EXPERIENCE SECTION ═══════════════════ */}
      <section
        id="experience"
        className="relative z-10 px-6 md:px-12 lg:px-16 py-24 md:py-40"
      >
        <div className="section-divider mb-16" />

        <AnimatedSection>
          <div className="flex flex-col md:flex-row gap-16 md:gap-32">
            {/* Left Column */}
            <div className="md:w-[35%]">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-black/20 block mb-3">
                [Experience]
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-black/80 font-heading mb-8">
                Experience
              </h2>
              <Link
                href="#"
                className="group inline-flex items-center gap-3 text-[13px] font-semibold text-black/60 hover:text-accent transition-colors duration-300"
              >
                Download CV
                <span className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-300">
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:text-white transition-colors" />
                </span>
              </Link>
            </div>

            {/* Right Column - Timeline */}
            <div className="flex-1 flex flex-col gap-0">
              {experiences.map((exp, i) => (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <div className="border-t border-black/[0.05] py-8 md:py-10 group hover:bg-black/[0.01] transition-colors duration-500 px-4 -mx-4">
                    <div className="flex flex-col md:flex-row md:items-start gap-3 md:gap-8">
                      <span className="font-mono text-[11px] tracking-wide text-black/25 md:min-w-[140px] flex-shrink-0">
                        {exp.period}
                      </span>
                      <div className="flex-1">
                        <h4 className="text-lg md:text-xl font-bold tracking-tight text-black/80 mb-1">
                          {exp.role}
                        </h4>
                        <span className="text-[13px] font-medium text-accent/80 block mb-3">
                          {exp.company}
                        </span>
                        <p className="text-[13px] leading-relaxed text-black/35 max-w-[460px]">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* ═══════════════════ SIDE QUESTS / ART SECTION ═══════════════════ */}
      <section
        id="sidequests"
        className="relative z-10 px-6 md:px-12 lg:px-16 py-24 md:py-32"
      >
        <div className="section-divider mb-16" />

        <AnimatedSection>
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 mb-12">
            <div>
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-black/20 block mb-3">
                [000]
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-black/80 font-heading">
                SideQuests ↗
              </h2>
            </div>
            <p className="text-[14px] leading-relaxed text-black/35 max-w-[400px] md:pt-6">
              I&apos;ve always been drawn to both art and technology. While
              development is my craft, design is something I still return to —
              simply to explore and create.
            </p>
          </div>
        </AnimatedSection>

        {/* Art Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { name: "Modern Dashboard", color: "#1a1a2e" },
            { name: "API Architecture", color: "#16213e" },
            { name: "Mobile Interface", color: "#0f3460" },
            { name: "Design System", color: "#1a1a2e" },
          ].map((item, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="group relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-black/[0.03] to-black/[0.06] border border-black/[0.04]">
                <div
                  className="absolute inset-0 opacity-10 group-hover:opacity-25 transition-opacity duration-700"
                  style={{
                    background: `linear-gradient(135deg, ${item.color}, transparent)`,
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="text-[11px] font-bold tracking-tight text-black/50 block">
                    {item.name}
                  </span>
                  <span className="font-mono text-[9px] text-black/20">
                    12 x 6 inch · 2024
                  </span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <footer className="relative z-10 px-6 md:px-12 lg:px-16 pt-24 md:pt-40 pb-12">
        <div className="section-divider mb-16" />

        {/* Footer Info Row */}
        <AnimatedSection>
          <div className="flex flex-col md:flex-row justify-between gap-16 mb-20">
            <div>
              <span className="font-mono text-[9px] tracking-[0.3em] text-black/15 uppercase block mb-2">
                Designed by
              </span>
              <span className="text-[14px] font-medium text-black/50">
                Javad · © 2026
              </span>
            </div>
            <div className="text-right">
              <span className="font-mono text-[9px] tracking-[0.3em] text-black/15 uppercase block mb-2">
                All rights reserved
              </span>
              <span className="text-[14px] font-medium text-black/50">
                Portfolio 2026
              </span>
            </div>
          </div>
        </AnimatedSection>

        {/* Big Name */}
        <AnimatedSection>
          <h2 className="footer-cta text-black/[0.04] leading-[0.85] mb-16">
            Javad_
            <br />
            Portfolio_2026
          </h2>
        </AnimatedSection>

        {/* Footer Links & CTA */}
        <AnimatedSection>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 border-t border-black/[0.05] pt-12">
            {/* Links */}
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {[
                { name: "About ↗", href: "/about" },
                { name: "LinkedIn ↗", href: "https://linkedin.com" },
                { name: "GitHub ↗", href: "https://github.com" },
                { name: "Twitter ↗", href: "https://twitter.com" },
                { name: "Instagram ↗", href: "https://instagram.com" },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  className="text-[13px] font-medium text-black/30 hover:text-black/80 transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              href="mailto:your@email.com"
              className="connect-btn flex items-center gap-3"
            >
              LET&apos;S CONNECT
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </AnimatedSection>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-black/[0.03] flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-mono text-[9px] tracking-[0.3em] text-black/15 uppercase">
            Javad.dev — v2.0
          </span>
          <span className="font-mono text-[9px] tracking-[0.3em] text-black/15 uppercase">
            Built with Next.js · Framer Motion · Tailwind
          </span>
        </div>
      </footer>
    </div>
  );
}
