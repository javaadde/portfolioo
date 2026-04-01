"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { format } from "date-fns";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Twitter,
  Mail,
} from "lucide-react";
import { ScrambleText } from "@/components/ScrambleText";
import PixelLoadingPreview from "@/components/PixelLoadingPreview";
import InitialsLogo from "@/components/InitialsLogo";
import Link from "next/link";
import hayonPreview from "@/assets/project-images/hayon.png";

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

  /* ── DATA ── */
  const projects = [
    {
      id: "001",
      title: "Hayon",
      category: "SOCIAL MEDIA · WEB APP",
      description:
        "An all-in-one social media planning platform built to help teams think, plan, and post from one clean workspace with a fast mobile-first experience.",
      year: "2026",
      liveUrl: "https://hayon.site",
      githubUrl: "https://github.com/devxtra-community/hayon",
      previewImage: hayonPreview,
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
      name: "Twitter",
      href: "https://twitter.com/javaadde",
      icon: <Twitter className="w-4 h-4" />,
    },
    {
      name: "Email",
      href: "mailto:javaadde@gmail.com",
      icon: <Mail className="w-4 h-4" />,
    },
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

  const mobileHighlightExperiences = [
    { id: "aeza", label: "Aeza, Bangalore, Ind" },
    { id: "design-studio", label: "DesignStudio, Kolkata, Ind" },
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

              <Link
                href="mailto:javaadde@gmail.com"
                className="connect-btn flex items-center justify-between"
              >
                LET&apos;S CONNECT
                <ArrowUpRight className="h-4 w-4" />
              </Link>
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
          <div className="flex flex-col items-stretch px-4 sm:px-6 md:flex-row md:px-12 lg:px-16">
            {/* Label Cell */}
            <div className="relative flex items-center border-b border-black/[0.08] py-4 md:w-[25%] md:border-b-0 md:border-r md:py-6 md:pr-8 lg:w-[16.666%]">
              <div className="relative flex w-full items-end justify-between gap-4 overflow-hidden">
                <div className="relative z-10 inline-block">
                  <span className="mb-3 block font-mono text-[9px] uppercase tracking-[0.24em] text-black/20">
                    Connect
                  </span>
                  <span className="font-body text-[14px] text-black/60 leading-tight font-medium">
                    Find me <br /> on the web @
                  </span>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-black/24">
                      Social Archive
                    </span>
                    <span className="h-px w-6 bg-black/[0.1]" />
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-black/38">
                      04
                    </span>
                  </div>
                </div>

                <div className="relative z-10 hidden shrink-0 md:block">
                  <div className="relative flex h-[54px] w-[54px] items-center justify-center border border-black/[0.06] bg-black/[0.015]">
                    <div className="absolute inset-[8px] border border-dashed border-black/[0.08]" />
                    <InitialsLogo className="w-[22px] opacity-80" />
                  </div>
                </div>

                <div className="pointer-events-none absolute -right-2 bottom-0 hidden opacity-[0.05] md:block">
                  <InitialsLogo className="w-[72px]" />
                </div>
              </div>
            </div>
            {/* Social Cells */}
            <div className="grid flex-1 grid-cols-2 overflow-hidden md:flex md:grid-cols-none">
              {socials.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-label={social.name}
                  data-cursor-type="social-btn"
                  className={`flex min-h-[68px] items-center justify-center gap-2 bg-black/[0.01] py-4 transition-all duration-500 group/social hover:bg-black/[0.04] md:min-h-0 md:flex-1 md:border-r md:border-black/[0.08] md:py-6 md:last:border-r-0 ${
                    i % 2 === 0 ? "border-r border-black/[0.08]" : ""
                  } ${i < socials.length - 2 ? "border-b border-black/[0.08]" : ""}`}
                >
                  <span className="text-black/30 group-hover/social:text-black/70 transition-colors duration-500">
                    {social.icon}
                  </span>
                  <span className="font-bold text-[13px] md:text-[14px] text-black/70 tracking-tight uppercase whitespace-nowrap group-hover/social:text-black transition-colors duration-500">
                    {social.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════ CASE STUDIES SECTION ═══════════════════ */}
      <section className="relative z-10 px-4 sm:px-6 md:px-12 lg:px-16">
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
        {projects.map((project, i) => (
          <AnimatedSection key={project.id} delay={i * 0.1}>
            {project.title === "Hayon" && "previewImage" in project ? (
              <div className="group relative border-t border-black/[0.05] py-10 sm:py-12 md:py-20">
                <div className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
                  <div className="md:col-span-2">
                    <span className="font-mono text-[10px] tracking-[0.3em] text-black/20 block">
                      [{project.id}]
                    </span>
                  </div>

                  <div className="md:col-span-3">
                    <h3 className="text-[2.2rem] md:text-[3rem] font-bold leading-[0.95] tracking-[-0.05em] text-black/85 font-heading">
                      <ScrambleText text={`${project.title}.`} />
                    </h3>
                  </div>

                  <div className="md:col-span-7">
                    <p className="max-w-[44rem] font-mono text-[12px] md:text-[15px] leading-[1.55] uppercase tracking-[0.03em] text-black/48">
                      {project.description}
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/35 transition-colors duration-300 hover:text-black"
                      >
                        Live Site
                      </a>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/35 transition-colors duration-300 hover:text-black"
                      >
                        GitHub Repo
                      </a>
                    </div>
                  </div>
                </div>

                <PixelLoadingPreview
                  src={project.previewImage!}
                  alt="Hayon project showcase preview"
                  href={project.liveUrl!}
                />
              </div>
            ) : (
            <div className="group relative cursor-pointer border-t border-black/[0.05] py-10 sm:py-12 md:py-20">
              {/* Hover background */}
              <div className="absolute inset-0 bg-black/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-start md:gap-16">
                {/* Left: Number & Title */}
                <div className="flex-shrink-0 md:w-[45%]">
                  <span className="font-mono text-[10px] tracking-[0.3em] text-black/20 block mb-4">
                    [{project.id}]
                  </span>
                  <h3 className="text-[clamp(2.9rem,18vw,5rem)] md:text-7xl lg:text-8xl font-black leading-[0.85] tracking-[-0.05em] uppercase text-black/85 group-hover:text-black transition-colors duration-500">
                    <ScrambleText text={project.title} />
                  </h3>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-black/25 uppercase block mt-4">
                    {project.category}
                  </span>
                </div>

                {/* Right: Description & Arrow */}
                <div className="flex flex-1 flex-col justify-between gap-6 md:min-h-[160px]">
                  <p className="max-w-[34rem] font-mono text-[13px] leading-relaxed text-black/40 sm:text-[14px] md:text-[15px]">
                    {project.description}
                  </p>
                  <div className="mt-2 flex flex-col gap-4 md:mt-8 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-[10px] text-black/20 italic">
                        {project.year}
                      </span>
                      {"liveUrl" in project && project.liveUrl ? (
                        <div className="flex items-center gap-3">
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/35 transition-colors duration-300 hover:text-black"
                          >
                            Live
                          </a>
                          {"githubUrl" in project && project.githubUrl ? (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/35 transition-colors duration-300 hover:text-black"
                            >
                              GitHub
                            </a>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                    <a
                      href={"liveUrl" in project && project.liveUrl ? project.liveUrl : "#"}
                      target={"liveUrl" in project && project.liveUrl ? "_blank" : undefined}
                      rel={
                        "liveUrl" in project && project.liveUrl
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-black/[0.08] transition-all duration-500 group-hover:border-black group-hover:bg-black md:h-14 md:w-14"
                    >
                      <ArrowUpRight className="h-5 w-5 text-black/30 transition-all duration-500 group-hover:-rotate-12 group-hover:text-white md:h-6 md:w-6" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            )}
          </AnimatedSection>
        ))}
      </section>

      {/* ═══════════════════ EXPERIENCE SECTION ═══════════════════ */}
      <section
        id="experience"
        className="relative z-10 px-4 sm:px-6 md:px-12 lg:px-16 py-20 md:py-40"
      >
        <div className="section-divider mb-16" />

        <AnimatedSection>
          <div className="flex flex-col gap-12 md:flex-row md:gap-32">
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
                  <div className="group border-t border-black/[0.05] px-0 py-8 transition-colors duration-500 hover:bg-black/[0.01] md:-mx-4 md:px-4 md:py-10">
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:gap-8">
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
        className="relative z-10 px-4 sm:px-6 md:px-12 lg:px-16 py-20 md:py-32"
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
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
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
                { name: "Twitter ↗", href: "https://twitter.com/javaadde" },
                { name: "Instagram ↗", href: "https://instagram.com" },
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
            <Link
              href="mailto:javaadde@gmail.com"
              className="connect-btn flex w-full items-center justify-between gap-3 md:w-auto md:justify-center"
            >
              LET&apos;S CONNECT
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
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
