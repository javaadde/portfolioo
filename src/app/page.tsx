"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { format } from "date-fns";
import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import hayonPreview from "@/assets/project-images/hayon.png";
import Image from "next/image";

/* ─────────────────── WIN2000 WINDOW WRAPPER ─────────────────── */
function Win2kWindow({
  title,
  children,
  icon,
  className = "",
  statusBar,
}: {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  statusBar?: string;
}) {
  return (
    <div className={`win-window ${className}`} style={{ overflow: "hidden" }}>
      {/* Title Bar */}
      <div className="win-titlebar">
        <div className="flex items-center gap-1.5 min-w-0">
          {icon ?? (
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" style={{ flexShrink: 0 }}>
              <rect x="0" y="0" width="5" height="5" fill="#f00" />
              <rect x="7" y="0" width="5" height="5" fill="#0a0" />
              <rect x="0" y="7" width="5" height="5" fill="#00f" />
              <rect x="7" y="7" width="5" height="5" fill="#ff0" />
            </svg>
          )}
          <span className="truncate" style={{ fontFamily: '"MS Sans Serif","Tahoma",sans-serif', fontSize: 11, fontWeight: "bold" }}>
            {title}
          </span>
        </div>
        <div className="flex items-center gap-0.5 flex-shrink-0 ml-2">
          <span className="win-titlebar-btn" aria-hidden="true">
            <span style={{ fontSize: 8, lineHeight: 1, marginTop: 3, display: "block" }}>_</span>
          </span>
          <span className="win-titlebar-btn" aria-hidden="true">
            <span style={{ fontSize: 7, lineHeight: 1, border: "1px solid #000", width: 7, height: 7, display: "block" }} />
          </span>
          <span className="win-titlebar-btn" aria-hidden="true" style={{ fontSize: 10, fontWeight: "bold" }}>✕</span>
        </div>
      </div>
      {/* Content */}
      <div style={{ background: "#d4d0c8", padding: "6px 8px 8px" }}>
        {children}
      </div>
      {/* Status Bar */}
      {statusBar && (
        <div className="win-statusbar">
          <div className="win-statusbar-panel">{statusBar}</div>
          <div className="win-statusbar-panel" style={{ flex: "0 0 80px", textAlign: "center" }}>Ready</div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────── ANIMATED SECTION ─────────────────── */
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
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────── TYPING ANIMATION ─────────────────── */
const typingPhrases = [
  "Building ideas into code_",
  "Crafting digital experiences_",
  "Full-stack developer & creator_",
  "Designing seamless interfaces_",
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
      timeout = setTimeout(() => {
        setDisplayText(phrase.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 60 + Math.random() * 40);
    } else if (!isDeleting && charIndex === phrase.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayText(phrase.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, 30);
    } else if (isDeleting && charIndex === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setCurrentPhrase((prev) => (prev + 1) % typingPhrases.length);
      }, 0);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentPhrase]);

  return (
    <div className="flex items-center gap-1" style={{ fontFamily: '"Courier New", monospace', fontSize: 11, color: "#000" }}>
      <span style={{ color: "#0a246a", fontWeight: "bold" }}>&gt;</span>
      <span>{displayText}</span>
      <span style={{ display: "inline-block", width: 6, height: 12, background: "#000", animation: "blink 1s step-end infinite" }} />
    </div>
  );
}

/* ─────────────────── PROGRESS BAR ─────────────────── */
function ProgressBar({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <span style={{ fontFamily: '"MS Sans Serif","Tahoma",sans-serif', fontSize: 11, width: 120, flexShrink: 0 }}>{label}</span>
      <div className="win-progress-track flex-1">
        <div className="win-progress-fill" style={{ width: `${value}%` }} />
      </div>
      <span style={{ fontFamily: '"MS Sans Serif","Tahoma",sans-serif', fontSize: 11, width: 32, textAlign: "right", flexShrink: 0 }}>{value}%</span>
    </div>
  );
}

/* ─────────────────── MAIN PAGE ─────────────────── */
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
  ];

  const socials = [
    { name: "GitHub", href: "https://github.com/javaadde", icon: <Github className="w-3 h-3" /> },
    { name: "LinkedIn", href: "https://linkedin.com/in/javaadde", icon: <Linkedin className="w-3 h-3" /> },
    { name: "Twitter", href: "https://twitter.com/javaadde", icon: <Twitter className="w-3 h-3" /> },
    { name: "Email", href: "mailto:javaadde@gmail.com", icon: <Mail className="w-3 h-3" /> },
  ];

  const skills = [
    { label: "React / Next.js", value: 92 },
    { label: "TypeScript", value: 88 },
    { label: "Node.js / APIs", value: 85 },
    { label: "UI / UX Design", value: 80 },
    { label: "Databases", value: 78 },
  ];

  return (
    <div
      className="relative min-h-screen select-none overflow-x-hidden"
      style={{
        paddingTop: 72,
        paddingBottom: 40,
        paddingLeft: 8,
        paddingRight: 8,
        background: "#3a6ea5",
      }}
    >
      {/* ═══ HERO SECTION ═══ */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3"
      >
        {/* Main Hero Window */}
        <Win2kWindow
          title="Welcome to Javad.dev"
          className="md:col-span-2"
          statusBar={`${dateTime.day} — ${dateTime.time} — Kochi, IN`}
        >
          <div className="flex flex-col gap-4 p-2">
            {/* Big Name */}
            <div>
              <div
                style={{
                  fontFamily: '"VT323", monospace',
                  fontSize: "clamp(3rem, 10vw, 5.5rem)",
                  lineHeight: 0.9,
                  letterSpacing: 2,
                  color: "#0a246a",
                  textShadow: "2px 2px 0 #808080",
                }}
              >
                JAVAADDE
              </div>
              <div
                style={{
                  fontFamily: '"MS Sans Serif","Tahoma",sans-serif',
                  fontSize: 13,
                  fontWeight: "bold",
                  color: "#000",
                  marginTop: 4,
                }}
              >
                FullStack Developer — Based in Kochi, India
              </div>
            </div>

            <div className="section-divider" />

            <TypingAnimation />

            <div className="section-divider" />

            {/* Info table */}
            <table
              style={{
                fontFamily: '"MS Sans Serif","Tahoma",sans-serif',
                fontSize: 11,
                borderCollapse: "collapse",
                width: "100%",
              }}
            >
              <tbody>
                {[
                  ["Name:", "Javad (javaadde)"],
                  ["Role:", "Full Stack Developer"],
                  ["Location:", "Kochi, Kerala, India"],
                  ["Experience:", "Devxtra, Kochi"],
                  ["Status:", "Available for work"],
                ].map(([key, val]) => (
                  <tr key={key}>
                    <td
                      style={{
                        padding: "2px 8px 2px 0",
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                        color: "#000080",
                        verticalAlign: "top",
                        width: 100,
                      }}
                    >
                      {key}
                    </td>
                    <td style={{ padding: "2px 0", color: "#000" }}>{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="section-divider" />

            {/* Buttons */}
            <div className="flex flex-wrap gap-2">
              <Link href="mailto:javaadde@gmail.com" className="win-btn win-btn-default">
                Send Email
              </Link>
              <Link
                href="https://github.com/javaadde"
                target="_blank"
                rel="noopener noreferrer"
                className="win-btn"
              >
                GitHub Profile
              </Link>
              <Link href="/about" className="win-btn">
                About Me
              </Link>
            </div>
          </div>
        </Win2kWindow>

        {/* Side Panel */}
        <div className="flex flex-col gap-3">
          {/* Skills Window */}
          <Win2kWindow title="Skills.exe — Properties">
            <div className="p-1">
              <div className="win-section-header mb-3">Technical Proficiency</div>
              {skills.map((s) => (
                <ProgressBar key={s.label} label={s.label} value={s.value} />
              ))}
            </div>
          </Win2kWindow>

          {/* Socials Window */}
          <Win2kWindow title="Find Me Online">
            <div className="flex flex-col gap-1 p-1">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="win-btn flex items-center gap-2 w-full text-left"
                >
                  {s.icon}
                  {s.name}
                </a>
              ))}
            </div>
          </Win2kWindow>
        </div>
      </motion.div>

      {/* ═══ PROJECTS SECTION ═══ */}
      <AnimatedSection delay={0.1}>
        <Win2kWindow
          title="Case Studies — Selected Work [2024/2025]"
          statusBar="1 item(s) — UI/UX · Design · Development"
          className="mb-3"
        >
          <div className="p-2">
            <div className="win-section-header mb-3">Case Studies 2024/25 — See Selected Work</div>
            {projects.map((project) => (
              <div key={project.id} className="win-sunken p-0 mb-3 overflow-hidden">
                {/* Project header row */}
                <div
                  style={{
                    background: "#d4d0c8",
                    borderBottom: "1px solid #808080",
                    padding: "4px 8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 8,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      style={{
                        fontFamily: '"Courier New",monospace',
                        fontSize: 10,
                        color: "#808080",
                        flexShrink: 0,
                      }}
                    >
                      [{project.id}]
                    </span>
                    <span
                      style={{
                        fontFamily: '"VT323",monospace',
                        fontSize: 24,
                        color: "#0a246a",
                        lineHeight: 1,
                      }}
                    >
                      {project.title}.
                    </span>
                    <span
                      style={{
                        fontFamily: '"MS Sans Serif","Tahoma",sans-serif',
                        fontSize: 10,
                        color: "#808080",
                      }}
                    >
                      {project.category}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: '"Courier New",monospace',
                      fontSize: 10,
                      color: "#808080",
                    }}
                  >
                    {project.year}
                  </span>
                </div>

                {/* Project body */}
                <div
                  style={{
                    background: "#ffffff",
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: 0,
                  }}
                >
                  {/* Description */}
                  <div style={{ padding: "10px 12px" }}>
                    <p
                      style={{
                        fontFamily: '"MS Sans Serif","Tahoma",sans-serif',
                        fontSize: 11,
                        lineHeight: 1.5,
                        color: "#000",
                        maxWidth: 480,
                        marginBottom: 10,
                      }}
                    >
                      {project.description}
                    </p>
                    <div className="flex gap-3 flex-wrap">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="win-btn flex items-center gap-1"
                        style={{ fontSize: 10 }}
                      >
                        <ArrowUpRight className="w-3 h-3" /> Live Site
                      </a>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="win-btn flex items-center gap-1"
                        style={{ fontSize: 10 }}
                      >
                        <Github className="w-3 h-3" /> GitHub Repo
                      </a>
                    </div>
                  </div>

                  {/* Project preview image */}
                  <div
                    style={{
                      borderLeft: "2px solid #808080",
                      width: 200,
                      height: 140,
                      overflow: "hidden",
                      flexShrink: 0,
                    }}
                    className="hidden md:block"
                  >
                    <Image
                      src={project.previewImage}
                      alt={`${project.title} project showcase preview`}
                      width={200}
                      height={140}
                      style={{ objectFit: "cover", width: "100%", height: "100%", imageRendering: "auto" }}
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* View all button */}
            <div className="flex justify-end mt-2">
              <Link href="/projects" className="win-btn win-btn-default flex items-center gap-1">
                View All Projects <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </Win2kWindow>
      </AnimatedSection>

      {/* ═══ FOOTER ═══ */}
      <AnimatedSection delay={0.2}>
        <Win2kWindow title="Contact & Info — javaadde@gmail.com">
          <div className="p-2">
            <div
              style={{
                fontFamily: '"VT323",monospace',
                fontSize: "clamp(2rem,5vw,4rem)",
                color: "#d4d0c8",
                textShadow: "2px 2px 0 #808080",
                lineHeight: 0.9,
                marginBottom: 12,
                letterSpacing: 2,
              }}
            >
              JAVAD_
              <br />
              PORTFOLIO_2026
            </div>

            <div className="section-divider mb-4" />

            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-end">
              <div>
                <div
                  style={{
                    fontFamily: '"Courier New",monospace',
                    fontSize: 10,
                    color: "#808080",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    marginBottom: 3,
                  }}
                >
                  Designed by
                </div>
                <div
                  style={{
                    fontFamily: '"MS Sans Serif","Tahoma",sans-serif',
                    fontSize: 12,
                    fontWeight: "bold",
                  }}
                >
                  Javad · © 2026
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: "About", href: "/about" },
                  { name: "LinkedIn", href: "https://linkedin.com/in/javaadde" },
                  { name: "GitHub", href: "https://github.com/javaadde" },
                  { name: "Twitter", href: "https://twitter.com/javaadde" },
                ].map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    className="win-btn"
                    style={{ fontSize: 10 }}
                  >
                    {link.name} ↗
                  </Link>
                ))}
              </div>
              <Link
                href="mailto:javaadde@gmail.com"
                className="win-btn win-btn-default flex items-center gap-2"
                style={{ fontWeight: "bold" }}
              >
                LET&apos;S CONNECT <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="section-divider mt-4 mb-3" />

            <div className="flex flex-col md:flex-row justify-between gap-2">
              <span
                style={{
                  fontFamily: '"Courier New",monospace',
                  fontSize: 10,
                  color: "#808080",
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                }}
              >
                Javad.dev — v2.0
              </span>
              <span
                style={{
                  fontFamily: '"Courier New",monospace',
                  fontSize: 10,
                  color: "#808080",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                }}
              >
                Built with Next.js · Framer Motion · Tailwind
              </span>
            </div>
          </div>
        </Win2kWindow>
      </AnimatedSection>
    </div>
  );
}
