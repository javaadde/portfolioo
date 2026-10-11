"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sound } from "@/lib/SoundSystem";
import { X, ArrowUpRight, Sprout } from "lucide-react";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import fireHeadFlame from "@/assets/meterials/fire users/4.png";

interface AboutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const mascotImage: StaticImageData = fireHeadFlame;

const principles = [
  {
    title: "Outcomes first, taste second",
    description:
      "Every creative decision and architectural pattern is interrogated against one question: does this actually serve genuine user conversion, performance, and long-term scale?",
  },
  {
    title: "All in or nothing",
    description:
      "I take on fewer projects to give each one obsessive attention. When I commit to your build, I am fully invested and responsible for the craftsmanship and the outcome.",
  },
  {
    title: "Human-first, always",
    description:
      "Behind every digital touchpoint is a real person with real stakes. The most impactful digital experiences feel effortless, responsive, and unmistakably human.",
  },
  {
    title: "Intention over speed",
    description:
      "Rushed code compounds into technical debt and design fatigue. We move with deliberate clarity. Every interaction and micro-detail earns its place.",
  },
];

const awards = [
  { title: "Awwwards Site of The Day", count: "Featured" },
  { title: "FWA of the Day", count: "Honoree" },
  { title: "CSS Design Awards", count: "Special Kudos" },
  { title: "Mindsparkle Mag", count: "Design Selection" },
  { title: "Next.js Showcase", count: "Selected Works" },
];

const clients = [
  "Hayon Platform",
  "Trendzy Fashion",
  "Lumiere Jewels",
  "Kido Apparel",
  "DevXtra Community",
  "Vercel Ecosystem",
  "TypeScript Guild",
];

export default function AboutDrawer({ isOpen, onClose }: AboutDrawerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        sound.playClick(600);
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10050] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => {
              sound.playClick(500);
              onClose();
            }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer Content */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative z-10 w-full max-w-2xl h-full bg-[#f1f6ec] text-[#0d150e] shadow-2xl flex flex-col overflow-y-auto"
            data-lenis-prevent
          >
            {/* soft grassy aura inside the drawer */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="grass-blob grass-blob-a -top-16 right-[-10%] w-[420px] h-[420px] opacity-60" />
              <div className="grass-blob grass-blob-b bottom-[20%] left-[-15%] w-[380px] h-[380px] opacity-50 [animation-delay:-8s]" />
            </div>

            {/* Drawer Header */}
            <div className="relative z-20 sticky top-0 bg-[#f1f6ec]/95 backdrop-blur-md border-b border-black/10 px-6 sm:px-10 py-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#22b34a] animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#0d150e]/70 font-semibold">
                  About the Developer & Studio
                </span>
              </div>

              <button
                onClick={() => {
                  sound.playClick(600);
                  onClose();
                }}
                className="group flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/10 hover:border-black/30 hover:bg-black/5 transition-all text-xs font-mono uppercase tracking-wider text-black/80"
              >
                <span>Close</span>
                <span className="text-[10px] text-black/40 group-hover:text-black">esc</span>
                <X className="w-3.5 h-3.5 text-[#22b34a]" />
              </button>
            </div>

            {/* Content Body */}
            <div className="relative p-6 sm:p-10 space-y-12">
              {/* Bio / Manifesto */}
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#22b34a]">
                    // MANIFESTO
                  </span>
                  <div className="h-px flex-1 bg-black/10" />
                </div>

                <div className="flex items-start gap-5">
                  <div className="relative shrink-0">
                    {/* Fire-user mascot heads the manifesto */}
                    <Image
                      src={mascotImage}
                      alt="Flame-head mascot"
                      className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-[0_14px_24px_rgba(255,140,60,0.35)]"
                    />
                  </div>
                  <p className="font-heading text-2xl sm:text-3xl leading-[1.3] tracking-tight font-medium text-[#0d150e]">
                    Hey, I&apos;m Javad. I build high-performance, change-making web experiences for brands and founders who refuse to be underestimated.
                  </p>
                </div>

                <p className="font-body text-sm sm:text-base leading-relaxed text-[#0d150e]/70">
                  I watched ambitious creators and exceptional software teams stay invisible because their digital presence never caught up to the scale of what they had actually built.
                  That gap became my craft. I blend systems architecture, GSAP & WebGL motion, and modern full-stack web engineering into tactile digital artifacts that evoke emotion and drive results.
                </p>

                <div className="flex flex-wrap gap-4 pt-2 font-mono text-[11px] text-[#0d150e]/50 uppercase tracking-widest">
                  <span>EST. 2024</span>
                  <span>•</span>
                  <span>FULL-STACK & CREATIVE MOTION</span>
                  <span>•</span>
                  <span>GLOBAL AVAILABILITY</span>
                </div>
              </div>

              {/* Principles Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#22b34a]">
                    // CORE PRINCIPLES
                  </span>
                  <div className="h-px flex-1 bg-black/10" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {principles.map((item, idx) => (
                    <div
                      key={item.title}
                      className="p-5 rounded-2xl bg-[#22b34a]/[0.05] border border-[#22b34a]/10 space-y-2 hover:bg-[#22b34a]/[0.09] transition-colors"
                    >
                      <div className="font-mono text-[10px] text-[#2c8a4b]">0{idx + 1}</div>
                      <h4 className="font-heading font-semibold text-sm text-[#0d150e]">
                        {item.title}
                      </h4>
                      <p className="font-body text-xs leading-relaxed text-[#0d150e]/65">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Honors & Accolades */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#22b34a]">
                    // HONORS & RECOGNITION
                  </span>
                  <div className="h-px flex-1 bg-black/10" />
                </div>

                <div className="divide-y divide-black/10 rounded-2xl border border-[#22b34a]/15 bg-white/55 backdrop-blur-sm overflow-hidden">
                  {awards.map((award) => (
                    <div
                      key={award.title}
                      className="flex items-center justify-between p-4 hover:bg-black/[0.02] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Sprout className="w-3.5 h-3.5 text-[#22b34a]" />
                        <span className="font-heading text-sm font-medium text-[#0d150e]">
                          {award.title}
                        </span>
                      </div>
                      <span className="font-mono text-xs uppercase tracking-wider text-[#0d150e]/50">
                        {award.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Client & Partner List */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#22b34a]">
                    // ECOSYSTEM & COLLABORATORS
                  </span>
                  <div className="h-px flex-1 bg-black/10" />
                </div>

                <div className="flex flex-wrap gap-2">
                  {clients.map((client) => (
                    <span
                      key={client}
                      className="px-3.5 py-1.5 rounded-full border border-[#22b34a]/15 bg-[#22b34a]/[0.04] font-mono text-[11px] text-[#0d150e]/70 uppercase tracking-wider"
                    >
                      {client}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Banner */}
              <div className="p-6 rounded-3xl bg-[#0b150e] text-[#f1f6ec] space-y-4 relative overflow-hidden">
                <div className="grass-blob grass-blob-a -top-20 -right-10 w-[300px] h-[300px] opacity-45" />
                <div className="relative font-mono text-[10px] text-[#37a558] uppercase tracking-[0.2em]">
                  Let&apos;s build together
                </div>
                <h3 className="relative font-heading text-xl font-medium tracking-tight">
                  Have an ambitious vision ready to come alive?
                </h3>
                <a
                  href="mailto:javaadde@gmail.com"
                  onClick={() => sound.playClick(900)}
                  className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#22b34a] text-white font-mono text-xs uppercase tracking-widest hover:bg-[#37a558] hover:shadow-[0_10px_30px_rgba(34,179,74,0.4)] transition-all"
                >
                  Schedule an intro call
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
