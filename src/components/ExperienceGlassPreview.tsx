"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ExperienceItem } from "@/data/experiences";

interface ExperienceGlassPreviewProps {
  experience: ExperienceItem | null;
  position: { x: number; y: number };
  visible: boolean;
  onOpenDetails: (exp: ExperienceItem) => void;
}

export default function ExperienceGlassPreview({
  experience,
  position,
  visible,
  onOpenDetails,
}: ExperienceGlassPreviewProps) {
  if (!experience) return null;

  // Clamp position so the card stays smoothly on screen
  const cardWidth = 310;
  const cardHeight = 300;
  const padding = 20;

  let targetX = position.x + 24;
  let targetY = position.y - 100;

  if (typeof window !== "undefined") {
    if (targetX + cardWidth > window.innerWidth - padding) {
      targetX = position.x - cardWidth - 24;
    }
    if (targetX < padding) {
      targetX = padding;
    }
    if (targetY + cardHeight > window.innerHeight - padding) {
      targetY = window.innerHeight - cardHeight - padding;
    }
    if (targetY < padding) {
      targetY = padding;
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 15 }}
      animate={
        visible
          ? {
              opacity: 1,
              scale: 1,
              x: targetX,
              y: targetY,
            }
          : {
              opacity: 0,
              scale: 0.9,
              x: targetX,
              y: targetY + 15,
            }
      }
      transition={{
        type: "spring",
        damping: 28,
        stiffness: 300,
        mass: 0.5,
      }}
      className={`fixed top-0 left-0 z-[10030] pointer-events-auto ${
        visible ? "visible" : "pointer-events-none invisible"
      }`}
    >
      {/* Pure Frosted Glass Card with Transparent Blurred Effect */}
      <div className="relative">
        {/* Soft Ambient Blur Halo behind the card */}
        <div className="pointer-events-none absolute -inset-1.5 rounded-[36px] bg-white/40 blur-xl -z-10 opacity-70" />

        <div
          onClick={() => onOpenDetails(experience)}
          style={{
            backdropFilter: "blur(32px) saturate(160%)",
            WebkitBackdropFilter: "blur(32px) saturate(160%)",
          }}
          className="group relative w-[290px] sm:w-[310px] rounded-[30px] p-6 select-none overflow-hidden cursor-pointer
            bg-white/[0.16] 
            border border-white/70 
            shadow-[0_24px_55px_rgba(0,0,0,0.1),inset_0_1.5px_2px_rgba(255,255,255,0.7)]
            transition-all duration-200 hover:bg-white/[0.24] hover:border-white/90 hover:shadow-[0_28px_65px_rgba(0,0,0,0.14),inset_0_1.5px_2px_rgba(255,255,255,0.85)]"
        >
          {/* Subtle top-specular sheen */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/35 via-white/5 to-transparent rounded-[30px]" />

        {/* TOP ROW: Duration text & Asterisk (completely borderless) */}
        <div className="relative z-10 flex items-center justify-between mb-4">
          <span className="font-mono text-[10px] font-bold text-black/75 tracking-[0.25em] uppercase">
            {experience.durationBadge}
          </span>

          <span className="text-xl font-bold text-black/40 group-hover:text-black/80 transition-colors select-none leading-none">
            ✱
          </span>
        </div>

        {/* MIDDLE SECTION: Bold Dark Typography */}
        <div className="relative z-10 space-y-1 mb-3.5">
          <h3 className="font-heading font-black tracking-tight text-[#0d150e] text-[2.1rem] leading-[0.92] uppercase">
            {experience.company}
          </h3>
          <p className="font-heading font-semibold text-black/70 text-[13px] tracking-tight uppercase leading-snug">
            {experience.role}
          </p>
        </div>

        {/* FEATURE / TAGLINE (no border) */}
        <div className="relative z-10 mb-4 flex items-center gap-2 text-black/60 font-mono text-[10px] tracking-wide">
          <span className="font-bold" style={{ color: experience.accentColor }}>→</span>
          <span className="font-medium uppercase line-clamp-1">
            {experience.tagline}
          </span>
        </div>

        {/* PRODUCTS WORKED ON (fluid, borderless bullet list) */}
        <div className="relative z-10 mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-black/70 font-mono text-[11px]">
          {experience.products.slice(0, 3).map((prod, idx) => (
            <span key={prod.name} className="flex items-center gap-2">
              <span className="font-medium text-black/80">{prod.name}</span>
              {idx < 2 && <span className="text-black/30 font-normal">•</span>}
            </span>
          ))}
        </div>

        {/* MINIMAL BOTTOM ROW: simple text on left, plain arrow on right (no divider line, no border) */}
        <div className="relative z-10 flex items-center justify-between pt-1">
          {/* Simple little text bottom-left */}
          <span className="font-mono text-[11px] text-black/55 tracking-wider font-medium lowercase">
            {experience.durationFormatted} • {experience.location.toLowerCase().replace(", kerala", "")}
          </span>

          {/* Plain arrow without any border at bottom right corner */}
          <span className="text-black/50 group-hover:text-black group-hover:translate-x-1 transition-all">
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </div>
  </motion.div>
  );
}
