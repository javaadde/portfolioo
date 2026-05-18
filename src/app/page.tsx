"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { format } from "date-fns";
import {
  ArrowUpRight,
  Github,
  Instagram,
  Linkedin,
  Mail,
} from "lucide-react";
import { ScrambleText } from "@/components/ScrambleText";
import PixelLoadingPreview from "@/components/PixelLoadingPreview";
import ProjectBrandMark from "@/components/ProjectBrandMark";
import InitialsLogo from "@/components/InitialsLogo";
import RoboToy from "@/components/RoboToy";
import { selectedProjects } from "@/data/selectedProjects";
import Link from "next/link";

/* ────────────── ANIMATED SECTION WRAPPER ────────────── */
function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
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

/* ────────────── TYPING ANIMATION ────────────── */
const typingPhrases = [
  "Building ideas into code_",
  "Crafting digital experiences_",
  "Full-stack developer & creator_",
  "Designing seamless interfaces_",
  "Turning concepts into reality_",
];

function TypingAnimation() {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const phrase = typingPhrases[currentPhrase];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && charIndex < phrase.length) {
      // Typing forward
      timeout = setTimeout(
        () => {
          setDisplayText(phrase.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        },
        60 + Math.random() * 40,
      );
    } else if (!isDeleting && charIndex === phrase.length) {
      // Pause at end
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex > 0) {
      // Deleting
      timeout = setTimeout(() => {
        setDisplayText(phrase.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, 30);
    } else if (isDeleting && charIndex === 0) {
      // Move to next phrase
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setCurrentPhrase((prev) => (prev + 1) % typingPhrases.length);
      }, 0);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentPhrase]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 1 }}
      className="flex items-center gap-2"
    >
      <span className="font-mono text-[10px] tracking-[0.2em] text-black/20 uppercase">
        {"//"}
      </span>
      <span className="font-mono text-[12px] md:text-[13px] tracking-tight text-black/40">
        {displayText}
      </span>
      <span
        className="inline-block w-[2px] h-[16px] bg-[#006054]"
        style={{ animation: "blink 1s step-end infinite" }}
      />
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

  const socials = [
    {
      name: "GitHub",
      href: "https://github.com/javaadde",
      icon: <Github className="w-4 h-4" />,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/javaadde",
      icon: <Linkedin className="w-4 h-4" />,
    },
    {
      name: "Instagram",
      href: "https://instagram.com/javade.in",
      icon: <Instagram className="w-4 h-4" />,
    },
    {
      name: "Email",
      href: "mailto:javaadde@gmail.com",
      icon: <Mail className="w-4 h-4" />,
    },
  ];

  const mobileHighlightExperiences = [
    { id: "devxtra", label: "Devxtra, Kochi, Ind" },
  ];

  return (
    <div className="relative min-h-screen select-none text-foreground overflow-x-hidden">
      {/* VIGNETTE GLOW */}
      <div className="vignette-glow" />
      <RoboToy />

      {/* ARCHITECTURAL BACKGROUND GRID */}
      <div className="fixed inset-0 pointer-events-none z-[0]">
        <div className="h-full w-full grid-background opacity-40" />
      </div>

      {/* ═══════════════════ HERO SECTION ═══════════════════ */}
      <section className="relative z-10 flex min-h-[100svh] flex-col overflow-hidden pt-20 md:min-h-screen md:pt-32">
        {/* Full screen vertical grid lines for alignment */}
        <div className="pointer-events-none absolute inset-0 z-0 flex px-4 sm:px-6 md:px-12 lg:px-16">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className={`h-full flex-1 border-r border-black/[0.04] last:border-r-0 ${
                i % 2 === 1 ? "hidden md:block" : ""
              }`}
            />
          ))}
        </div>

        {/* Hero Content Area */}
        <div className="relative z-10 flex flex-1 flex-col px-4 sm:px-6 md:px-12 lg:px-16">
          {/* Top Metadata: Digital Clock */}
          <div className="mx-auto flex w-full max-w-[21rem] justify-start md:max-w-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-body text-[9px] sm:text-[11px] tracking-tight text-black/40 font-medium"
            >
              {dateTime.day} — {dateTime.time} — IN
            </motion.div>
          </div>

          {/* Main Headings */}
          <div className="mx-auto flex w-full max-w-[21rem] flex-1 flex-col py-10 sm:py-16 md:max-w-none md:justify-center md:py-0">
            <div className="grid grid-cols-12 gap-y-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="col-span-12 md:col-start-5 lg:col-start-6"
              >
                <h2 className="mb-3 max-w-[10ch] text-[clamp(1.45rem,6vw,4rem)] font-bold leading-none tracking-tight text-black/40 font-heading">
                  Hello — I&apos;m
                </h2>
                <h1 className="max-w-[8ch] font-bold font-heading text-[clamp(3.9rem,12vw,5.5rem)] md:max-w-none md:text-[14vw] lg:text-[11vw] leading-[0.84] tracking-[-0.07em] text-[#1a1a1a]">
                  javaadde
                </h1>

                {/* Subtitle & Experience — directly under name */}
                <div className="mt-5 flex flex-col gap-4 sm:mt-8 sm:gap-8 md:flex-row md:gap-16">
                  {/* Left: FullStack Developer / Kochi */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.4,
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="mt-2 flex max-w-[14rem] flex-col gap-1 md:mt-12 md:gap-1.5"
                  >
                    <span className="text-[12px] sm:text-[13px] md:text-[15px] text-black/80 font-medium tracking-tight">
                      FullStack Developer
                    </span>
                    <span className="text-[12px] sm:text-[13px] md:text-[15px] text-black/80 font-medium tracking-tight">
                      Based in Kochi
                    </span>
                  </motion.div>

                  {/* Right: Experience */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.5,
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="mt-12 hidden flex-col gap-4 md:flex md:mt-12"
                  >
                    <div className="flex items-start gap-4">
                      <span className="font-body text-[9px] tracking-[0.2em] uppercase text-black/30 pt-1 font-bold">
                        [EXPERIENCE]
                      </span>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[12px] sm:text-[13px] text-black/20">
                            →
                          </span>
                          <span className="text-[12px] sm:text-[13px] text-[#1a1a1a] font-medium tracking-tight underline decoration-black/10 underline-offset-4">
                            Devxtra, Kochi, Ind
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.55,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-auto flex flex-col gap-10 pb-2 md:hidden"
            >
              <div className="flex flex-col gap-5">
                <span className="font-body text-[9px] tracking-[0.2em] uppercase text-black/30 font-bold">
                  [EXPERIENCE]
                </span>
                <div className="flex flex-col gap-2.5">
                  {mobileHighlightExperiences.map((experience) => (
                    <div key={experience.id} className="flex items-center gap-2">
                      <span className="text-[12px] sm:text-[13px] text-black/20">
                        →
                      </span>
                      <span className="text-[12px] sm:text-[13px] text-[#1a1a1a] font-medium tracking-tight">
                        {experience.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                data-connect-trigger
                className="connect-btn flex items-center justify-between"
              >
                LET&apos;S CONNECT
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </motion.div>
          </div>

          {/* Typing Animation — Bottom Left */}
          <div className="hidden pb-10 sm:pb-14 md:block md:pb-16">
            <TypingAnimation />
          </div>
        </div>

        {/* Socials Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="hidden border-t border-black/[0.08] md:block"
        >
          <div className="px-4 sm:px-6 md:px-12 lg:px-16">
            <div className="relative flex flex-col items-stretch border-y border-black/[0.08] md:flex-row">
              <span className="corner-plus tl" />
              <span className="corner-plus tr" />
              <span className="corner-plus bl" />
              <span className="corner-plus br" />

            {/* Label Cell */}
              <div className="relative flex items-center border-b border-black/[0.08] px-4 py-3 md:w-[34%] md:border-b-0 md:border-r md:px-6 lg:w-[28%]">
                <div className="relative flex w-full items-center justify-between gap-4">
                  <div className="relative z-10 inline-block">
                    <span className="font-body text-[12px] text-black/68 leading-tight font-medium">
                      Find me <br /> on the web @
                    </span>
                  </div>

                  <div className="relative z-10 hidden shrink-0 md:block">
                    <div className="relative flex h-[26px] w-[26px] items-center justify-center border border-black/[0.08] bg-transparent">
                      <span className="corner-plus tl" />
                      <span className="corner-plus tr" />
                      <span className="corner-plus bl" />
                      <span className="corner-plus br" />
                      <InitialsLogo className="w-[10px] opacity-75" />
                    </div>
                  </div>
                </div>
              </div>
              {/* Social Cells */}
              <div className="grid flex-1 grid-cols-2 md:ml-auto md:w-[58%] md:flex md:grid-cols-none lg:w-[62%]">
                {[{ name: "", href: "", icon: null, empty: true }, ...socials].map(
                  (social, i) => {
                    const isEmpty = "empty" in social && social.empty;

                    return (
                      <a
                        key={i}
                        href={isEmpty ? undefined : social.href}
                        target={isEmpty ? undefined : "_blank"}
                        rel={isEmpty ? undefined : "noopener noreferrer"}
                        data-cursor-label={isEmpty ? undefined : social.name}
                        data-cursor-type={isEmpty ? undefined : "social-btn"}
                        className={`group/social relative flex min-h-[40px] items-center justify-center gap-1.5 bg-black/[0.01] px-2 py-2.5 transition-all duration-500 md:min-h-0 md:flex-1 md:py-3 ${
                          i % 2 === 0 ? "border-r border-black/[0.08]" : ""
                        } ${i < socials.length - 1 ? "border-b border-black/[0.08] md:border-b-0" : ""} ${
                          i !== socials.length ? "md:border-r md:border-black/[0.08]" : ""
                        }`}
                        aria-hidden={isEmpty ? true : undefined}
                      >
                        {!isEmpty ? (
                          <>
                            <span className="text-black/30 transition-colors duration-500 group-hover/social:text-black/70">
                              {social.icon}
                            </span>
                            <span className="font-bold text-[10px] text-black/70 tracking-tight uppercase whitespace-nowrap transition-colors duration-500 group-hover/social:text-black md:text-[11px]">
                              {social.name}
                            </span>
                          </>
                        ) : null}
                      </a>
                    );
                  },
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════ CASE STUDIES SECTION ═══════════════════ */}
      <section
        id="selected-work"
        className="relative z-10 px-4 sm:px-6 md:px-12 lg:px-16"
      >
        {/* Section Header */}
        <AnimatedSection className="border-t border-black/[0.05] py-12 md:py-24">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
            <div>
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-black/20 block mb-3">
                Case Studies 2024/25
              </span>
              <h2 className="relative inline-block pb-4 text-3xl md:text-4xl font-bold tracking-[-0.03em] text-black/80 font-heading">
                <span className="relative z-10">See Selected Work</span>
                <svg
                  viewBox="0 0 320 28"
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-1 left-0 h-[18px] w-[78%] md:h-[22px]"
                >
                  <path
                    d="M6 18C41 10 78 24 115 17C154 9 193 23 230 16C260 10 283 12 314 8"
                    stroke="#d64242"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.95"
                  />
                  <path
                    d="M10 22C44 14 81 27 118 21C155 15 194 26 229 20C259 16 284 17 311 14"
                    stroke="#ef6a5b"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.7"
                  />
                </svg>
              </h2>
            </div>
            <span className="font-mono text-[10px] tracking-[0.2em] text-black/20 uppercase">
              UI/UX · Design · Development
            </span>
          </div>
        </AnimatedSection>

        {/* Project Cards */}
        {selectedProjects.map((project, i) => (
          <AnimatedSection key={project.id} delay={i * 0.1}>
            <div className="relative border-t border-black/[0.05] py-8 sm:py-12 md:py-20">
              <div className="relative z-10 grid grid-cols-1 gap-5 overflow-hidden border border-black/[0.06] bg-white/[0.24] px-4 py-5 shadow-[0_18px_60px_rgba(0,0,0,0.035)] backdrop-blur-sm sm:px-5 sm:py-6 md:grid-cols-12 md:items-start md:gap-x-10 md:gap-y-4 md:bg-transparent md:px-8 md:py-7 md:shadow-none md:backdrop-blur-0 lg:gap-x-14">
                <span className="corner-plus tl" />
                <span className="corner-plus tr" />
                <span className="corner-plus bl" />
                <span className="corner-plus br" />

                <div className="flex items-center justify-between gap-4 md:col-span-2 md:block">
                  <span className="block font-mono text-[10px] tracking-[0.3em] text-black/20">
                    [{project.id}]
                  </span>
                  <div className="flex items-center gap-3 md:mt-5 md:block">
                    {["hayon", "trendzy"].includes(project.slug) ? (
                      <ProjectBrandMark
                        slug={project.slug}
                        className="h-8 w-8 md:h-10 md:w-10"
                      />
                    ) : null}
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-accent/70 md:hidden">
                      {project.year}
                    </span>
                  </div>
                </div>

                <div className="md:col-span-4">
                  <h3 className="max-w-[12ch] text-[2.15rem] font-semibold leading-[0.9] tracking-[-0.045em] text-black/85 font-heading sm:max-w-[13ch] md:text-[clamp(1.85rem,3vw,2.45rem)] md:leading-[0.98] md:tracking-tight">
                    <ScrambleText text={`${project.title}.`} />
                  </h3>
                  <span className="mt-3 block border-l border-accent/45 pl-3 font-mono text-[9px] uppercase tracking-[0.22em] text-black/35 md:border-0 md:pl-0 md:text-black/25">
                    {project.category} · {project.year}
                  </span>
                </div>

                <div className="md:col-span-6">
                  <p className="max-w-[34rem] border-t border-black/[0.05] pt-4 font-mono text-[11px] leading-[1.75] uppercase tracking-[0.035em] text-black/50 md:border-0 md:pt-0 md:text-[12px] md:leading-[1.65] md:tracking-[0.04em] md:text-black/48">
                    {project.description}
                  </p>
                </div>
              </div>

              <PixelLoadingPreview
                src={project.previewImage!}
                alt={`${project.title} project showcase preview`}
                href={`/projects/${project.slug}`}
              />
            </div>
          </AnimatedSection>
        ))}
      </section>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <footer className="relative z-10 px-4 sm:px-6 md:px-12 lg:px-16 pt-20 md:pt-40 pb-10 md:pb-12">
        <div className="section-divider mb-16" />

        {/* Footer Info Row */}
        <AnimatedSection>
          <div className="mb-16 flex flex-col justify-between gap-10 md:mb-20 md:flex-row md:gap-16">
            <div>
              <span className="font-mono text-[9px] tracking-[0.3em] text-black/15 uppercase block mb-2">
                Designed by
              </span>
              <span className="text-[14px] font-medium text-black/50">
                Javad · © 2026
              </span>
            </div>
            <div className="text-left md:text-right">
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
          <div className="flex flex-col items-start justify-between gap-8 border-t border-black/[0.05] pt-10 md:flex-row md:items-end md:gap-12 md:pt-12">
            {/* Links */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 md:gap-x-8">
              {[
                { name: "About ↗", href: "/about" },
                { name: "LinkedIn ↗", href: "https://linkedin.com/in/javaadde" },
                { name: "GitHub ↗", href: "https://github.com/javaadde" },
                { name: "Twitter ↗", href: "https://x.com/javaaddee" },
                { name: "Instagram ↗", href: "https://instagram.com/javade.in" },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  data-cursor-label={link.name.replace(" ↗", "")}
                  data-cursor-type="social-btn"
                  className="text-[13px] font-medium text-black/30 hover:text-black/80 transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <button
              type="button"
              data-connect-trigger
              className="connect-btn flex w-full items-center justify-between gap-3 md:w-auto md:justify-center"
            >
              LET&apos;S CONNECT
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </AnimatedSection>

        {/* Bottom Bar */}
        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-black/[0.03] pt-6 md:mt-16 md:flex-row md:items-center md:gap-4 md:pt-8">
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
