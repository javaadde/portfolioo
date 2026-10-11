"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { sound } from "@/lib/SoundSystem";
import { experiencesData, type ExperienceItem } from "@/data/experiences";
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  MapPin,
  Briefcase,
  CheckCircle2,
  Sparkles,
  Layers,
  Terminal,
} from "lucide-react";

// 3D Glass Materials from src/assets/meterials
import fireMascotBytsolv from "@/assets/meterials/fire users/2.png";
import fireMascotDevxtra from "@/assets/meterials/fire users/3.png";
import folderGlassyBig from "@/assets/meterials/icons/folder glassy big.png";
import folderGlassySmall from "@/assets/meterials/icons/folder glassy small.png";
import folderBlue from "@/assets/meterials/icons/folder-blue.png";
import keyEsc from "@/assets/meterials/icons/esc.png";
import keyCtrl from "@/assets/meterials/icons/ctrl.png";
import keyMail from "@/assets/meterials/icons/mail.png";
import keyGithub from "@/assets/meterials/key icons/github.png";
import keyLinkedin from "@/assets/meterials/key icons/linkedin.png";

function ExperienceContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const companyParam = searchParams.get("company")?.toLowerCase();
  const initialCompany =
    experiencesData.find((exp) => exp.id === companyParam) || experiencesData[0];

  const [activeExp, setActiveExp] = useState<ExperienceItem>(initialCompany);

  useEffect(() => {
    if (companyParam) {
      const match = experiencesData.find((exp) => exp.id === companyParam);
      if (match) setActiveExp(match);
    }
  }, [companyParam]);

  const selectCompany = (exp: ExperienceItem) => {
    sound.playClick(750);
    setActiveExp(exp);
    router.replace(`/experience?company=${exp.id}`, { scroll: false });
  };

  const isBytsolv = activeExp.id === "bytsolv";
  const mascotImage = isBytsolv ? fireMascotBytsolv : fireMascotDevxtra;

  return (
    <div className="relative min-h-screen w-full bg-[#f6faf3] text-[#0d150e] overflow-x-hidden selection:bg-[#22b34a]/20">
      {/* ===== LAYER 1: VIBRANT PRISMATIC GRADIENT BLOBS ===== */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top left vibrant emerald aurora */}
        <div className="absolute -top-[15%] -left-[10%] w-[680px] h-[680px] rounded-full bg-gradient-to-br from-[#22b34a]/30 via-[#38bdf8]/20 to-transparent blur-[90px] animate-pulse" />
        
        {/* Center right electric violet & peach bloom */}
        <div className="absolute top-[25%] -right-[10%] w-[720px] h-[720px] rounded-full bg-gradient-to-tl from-[#a855f7]/25 via-[#f97316]/20 to-[#38bdf8]/15 blur-[100px]" />
        
        {/* Bottom center deep meadow glow */}
        <div className="absolute -bottom-[20%] left-[20%] w-[800px] h-[700px] rounded-full bg-gradient-to-t from-[#22b34a]/25 via-[#4ade80]/15 to-transparent blur-[110px]" />
      </div>

      {/* ===== LAYER 2: FLUTED PRISM GLASS PATTERN ===== */}
      <div className="fixed inset-0 pointer-events-none z-[1] opacity-40 fluted-glass" />

      {/* ===== LAYER 3: MAIN CONTENT CONTAINER ===== */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 md:px-12 pt-28 md:pt-36 pb-28">
        
        {/* TOP BAR: Back Button & Company Switcher Glass Pill */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-12">
          {/* Back to Home with ESC Keycap */}
          <Link
            href="/"
            onClick={() => sound.playClick(600)}
            className="group inline-flex items-center gap-3 px-4 py-2 rounded-full 
              backdrop-blur-2xl bg-white/40 hover:bg-white/70 
              border border-white/80 shadow-[0_4px_16px_rgba(0,0,0,0.04),inset_0_1px_2px_rgba(255,255,255,0.9)] 
              transition-all duration-200 text-xs font-mono uppercase tracking-wider text-[#0d150e]/80 w-fit"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Return to Portfolio</span>
            <div className="w-5 h-5 relative shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
              <Image src={keyEsc} alt="ESC keycap" fill className="object-contain" />
            </div>
          </Link>

          {/* Company Switcher Glass Tab Container */}
          <div className="inline-flex items-center p-1.5 rounded-full 
            backdrop-blur-3xl bg-white/40 border border-white/80 
            shadow-[0_8px_28px_rgba(0,0,0,0.06),inset_0_1px_2px_rgba(255,255,255,0.9)]">
            {experiencesData.map((exp) => {
              const active = exp.id === activeExp.id;
              return (
                <button
                  key={exp.id}
                  onClick={() => selectCompany(exp)}
                  className={`relative px-5 py-2 rounded-full font-heading text-sm font-bold tracking-tight transition-all duration-200 flex items-center gap-2 ${
                    active
                      ? "text-[#0d150e] shadow-[0_4px_18px_rgba(0,0,0,0.08),inset_0_1px_1.5px_rgba(255,255,255,1)]"
                      : "text-black/50 hover:text-black hover:bg-white/20"
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="active-glass-pill"
                      className="absolute inset-0 rounded-full bg-white/90 backdrop-blur-xl border border-white"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <span className="uppercase">{exp.company}</span>
                    <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-black/5 text-black/60">
                      {exp.durationBadge}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ===== HERO EXPERIENCE SHOWCASE CARD ===== */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeExp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-10"
          >
            {/* Top Large Frosted Glass Showcase Banner */}
            <div className="relative rounded-[36px] p-7 sm:p-10 md:p-12 overflow-hidden
              backdrop-blur-3xl bg-white/[0.38] 
              border border-white/90 
              shadow-[0_30px_80px_rgba(0,0,0,0.08),inset_0_1.5px_2px_rgba(255,255,255,0.95)]">
              
              {/* Diffuse Glass Sheen */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/60 via-white/20 to-transparent" />
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left: Company Details & Overview */}
                <div className="lg:col-span-8 space-y-6">
                  {/* Tenure & Period Pill */}
                  <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full 
                    bg-white/60 border border-white/90 backdrop-blur-md shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#22b34a] animate-pulse" />
                    <span className="font-mono text-[11px] font-bold text-[#0d150e]/80 uppercase tracking-widest">
                      {activeExp.durationBadge} • {activeExp.period}
                    </span>
                    <span className="text-black/40 font-mono text-xs">
                      ({activeExp.durationMonths} months total)
                    </span>
                  </div>

                  {/* Headline & Title */}
                  <div className="space-y-2">
                    <h1 className="font-heading font-black tracking-tight text-[#0d150e] text-4xl sm:text-5xl md:text-6xl uppercase leading-[0.92]">
                      {activeExp.fullName}
                    </h1>
                    <p className="font-heading text-xl sm:text-2xl font-semibold text-[#0d150e]/75">
                      {activeExp.role}
                    </p>
                  </div>

                  {/* Tagline Callout */}
                  <div className="flex items-center gap-2 text-sm font-mono text-[#0d150e]/70">
                    <span className="text-[#22b34a] font-bold text-base">→</span>
                    <span className="font-semibold uppercase">{activeExp.tagline}</span>
                  </div>

                  {/* Summary */}
                  <p className="font-body text-base sm:text-lg leading-relaxed text-[#0d150e]/80 max-w-2xl">
                    {activeExp.summary}
                  </p>

                  {/* Quick Stat Chips */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/50 border border-white/80 font-mono text-xs text-[#0d150e]/80">
                      <MapPin className="w-3.5 h-3.5 text-[#22b34a]" />
                      <span>{activeExp.location}</span>
                    </div>
                    <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/50 border border-white/80 font-mono text-xs text-[#0d150e]/80">
                      <Calendar className="w-3.5 h-3.5 text-[#22b34a]" />
                      <span>{activeExp.durationFormatted} tenure</span>
                    </div>
                    <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/50 border border-white/80 font-mono text-xs text-[#0d150e]/80">
                      <Briefcase className="w-3.5 h-3.5 text-[#22b34a]" />
                      <span>{activeExp.products.length} Products Shipped</span>
                    </div>
                  </div>
                </div>

                {/* Right: Floating 3D Mascot Character */}
                <div className="lg:col-span-4 flex flex-col items-center justify-center">
                  <div className="relative group/mascot flex items-center justify-center">
                    {/* Glowing back-orb behind mascot */}
                    <div className="absolute w-44 h-44 rounded-full bg-gradient-to-br from-[#22b34a]/30 to-[#38bdf8]/30 blur-2xl group-hover/mascot:scale-125 transition-transform duration-500" />
                    
                    {/* 3D Flame Mascot Image */}
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="relative w-44 h-44 sm:w-56 sm:h-56 drop-shadow-[0_20px_35px_rgba(0,0,0,0.18)]"
                    >
                      <Image
                        src={mascotImage}
                        alt={`${activeExp.company} mascot`}
                        fill
                        className="object-contain"
                        priority
                      />
                    </motion.div>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-black/40 mt-2">
                    [EXP // {activeExp.id.toUpperCase()}]
                  </span>
                </div>
              </div>
            </div>

            {/* ===== PRODUCTS & SYSTEMS SHIPPED SECTION ===== */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 relative">
                    <Image src={folderGlassyBig} alt="Glassy folder" fill className="object-contain" />
                  </div>
                  <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight text-[#0d150e]">
                    Products & Systems Built
                  </h2>
                </div>
                <span className="font-mono text-xs text-black/40 uppercase tracking-widest hidden sm:inline-block">
                  [ {activeExp.products.length} SHIPPED ]
                </span>
              </div>

              {/* Grid of Shipped Products */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {activeExp.products.map((prod, idx) => (
                  <div
                    key={prod.name}
                    className="group relative rounded-[28px] p-6 sm:p-7 flex flex-col justify-between
                      backdrop-blur-2xl bg-white/[0.32] 
                      border border-white/80 
                      shadow-[0_16px_40px_rgba(0,0,0,0.05),inset_0_1.5px_2px_rgba(255,255,255,0.9)] 
                      hover:bg-white/[0.48] hover:shadow-[0_24px_50px_rgba(0,0,0,0.08),inset_0_1.5px_2px_rgba(255,255,255,1)] 
                      transition-all duration-300"
                  >
                    <div>
                      {/* Product Header Row with Folder Icon */}
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="w-10 h-10 relative shrink-0 drop-shadow-sm">
                          <Image
                            src={idx % 2 === 0 ? folderGlassySmall : folderBlue}
                            alt="Folder"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span className="font-mono text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/70 border border-white text-black/70 uppercase">
                          {prod.role}
                        </span>
                      </div>

                      {/* Product Title */}
                      <h3 className="font-heading font-bold text-xl text-[#0d150e] mb-2 leading-tight">
                        {prod.name}
                      </h3>

                      {/* Description */}
                      <p className="font-body text-xs sm:text-sm text-black/70 leading-relaxed">
                        {prod.description}
                      </p>
                    </div>

                    {/* Bottom Link or Tag */}
                    <div className="pt-5 mt-4 border-t border-black/[0.06] flex items-center justify-between">
                      <span className="font-mono text-[10px] text-black/40 uppercase tracking-wider">
                        0{idx + 1} // PRODUCTION
                      </span>

                      {prod.link ? (
                        <a
                          href={prod.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => sound.playClick(900)}
                          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#22b34a] hover:underline"
                        >
                          <span>Repository</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <span className="text-xs font-mono text-[#22b34a] font-medium">
                          Active Architecture
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ===== RESPONSIBILITIES & ENGINEERING HIGHLIGHTS ===== */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Responsibilities */}
              <div className="lg:col-span-7 rounded-[32px] p-7 sm:p-9
                backdrop-blur-2xl bg-white/[0.32] 
                border border-white/80 
                shadow-[0_20px_50px_rgba(0,0,0,0.06),inset_0_1.5px_2px_rgba(255,255,255,0.9)] space-y-6">
                
                <div className="flex items-center gap-3">
                  <Terminal className="w-5 h-5 text-[#22b34a]" />
                  <h3 className="font-heading font-bold text-xl uppercase tracking-tight text-[#0d150e]">
                    Responsibilities & Engineering Scope
                  </h3>
                </div>

                <div className="space-y-4">
                  {activeExp.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3.5 text-sm sm:text-[15px] text-[#0d150e]/80 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#22b34a] shrink-0 mt-1" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Tech Stack & Metrics */}
              <div className="lg:col-span-5 space-y-6">
                {/* Tech Stack Glass Box */}
                <div className="rounded-[32px] p-7
                  backdrop-blur-2xl bg-white/[0.32] 
                  border border-white/80 
                  shadow-[0_20px_50px_rgba(0,0,0,0.06),inset_0_1.5px_2px_rgba(255,255,255,0.9)] space-y-4">
                  
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-black/50">
                    <Layers className="w-4 h-4 text-[#22b34a]" />
                    <span>Technologies Utilized</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {activeExp.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-full border border-white/90 bg-white/60 font-mono text-xs text-[#0d150e] font-medium shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Metrics Glass Box */}
                <div className="grid grid-cols-3 gap-3">
                  {activeExp.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-2xl p-4 text-center
                        backdrop-blur-2xl bg-white/[0.32] border border-white/80 shadow-sm"
                    >
                      <div className="font-heading font-black text-lg text-[#0d150e]">
                        {metric.value}
                      </div>
                      <div className="font-mono text-[9px] uppercase tracking-wider text-black/50 mt-1">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ===== BOTTOM NAVIGATION / SWITCH COMPANY BANNER ===== */}
            <div className="rounded-[32px] p-8 sm:p-10 
              backdrop-blur-3xl bg-[#0b150c]/90 text-white 
              border border-white/20 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <span className="font-mono text-[10px] text-[#5ed88a] uppercase tracking-widest">
                  Want to explore more?
                </span>
                <h4 className="font-heading text-2xl font-bold tracking-tight text-white">
                  {isBytsolv ? "Check out Devxtra Experience" : "Check out Bytsolv Experience"}
                </h4>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() =>
                    selectCompany(
                      experiencesData.find((exp) => exp.id !== activeExp.id) ||
                        experiencesData[0]
                    )
                  }
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#22b34a] hover:bg-[#2cb352] text-[#0b150c] font-mono text-xs uppercase font-bold tracking-wider transition-all active:scale-95 shadow-[0_10px_30px_rgba(34,179,74,0.35)]"
                >
                  <span>Switch to {isBytsolv ? "Devxtra" : "Bytsolv"}</span>
                  <div className="w-4 h-4 relative shrink-0">
                    <Image src={keyCtrl} alt="Ctrl" fill className="object-contain" />
                  </div>
                </button>

                <a
                  href="mailto:javaadde@gmail.com"
                  onClick={() => sound.playClick(900)}
                  className="p-3 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white transition-all"
                  title="Contact via email"
                >
                  <div className="w-5 h-5 relative shrink-0">
                    <Image src={keyMail} alt="Email" fill className="object-contain" />
                  </div>
                </a>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}

export default function ExperiencePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#f6faf3] font-mono text-xs uppercase tracking-widest text-black/40">
          Loading Experience...
        </div>
      }
    >
      <ExperienceContent />
    </Suspense>
  );
}
