"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { sound } from "@/lib/SoundSystem";
import { experiencesData, type ExperienceItem } from "@/data/experiences";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import folderGlassySmall from "@/assets/meterials/icons/folder glassy small.png";
import paprLogo from "@/assets/project-logos/papr.png";
import hayonLogo from "@/assets/project-logos/hayon.webp";
import remainLogo from "@/assets/project-logos/remain.png";
import smileoxLogo from "@/assets/project-logos/smileox.png";

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

  const otherCompany =
    experiencesData.find((exp) => exp.id !== activeExp.id) || experiencesData[0];

  const toggleCompany = () => {
    selectCompany(otherCompany);
  };

  // Helper to pick the proper product logo
  const getProductLogo = (prodName: string) => {
    const lower = prodName.toLowerCase();
    if (lower.includes("papr")) return paprLogo;
    if (lower.includes("remain")) return remainLogo;
    if (lower.includes("smileox")) return smileoxLogo;
    if (lower.includes("hayon")) return hayonLogo;
    return folderGlassySmall;
  };

  return (
    <div className="relative w-full min-h-screen h-screen bg-[#fdfefd] text-[#0d150e] flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-18 overflow-hidden select-none">
      {/* ===== LAYER 1: ATMOSPHERIC AURORA & PASTEL HALOS ===== */}
      <div className="absolute inset-0 pointer-events-none bg-[#fbfdfb] overflow-hidden -z-20">
        <div className="absolute -top-[12%] -right-[8%] w-[680px] h-[680px] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-200/40 via-sky-200/35 to-emerald-100/25 opacity-80 blur-[90px]" />
        <div className="absolute top-[20%] left-[25%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-emerald-100/30 via-teal-100/20 to-transparent opacity-70 blur-[100px]" />
        <div className="absolute -bottom-[15%] -left-[6%] w-[560px] h-[680px] bg-gradient-to-t from-emerald-200/40 via-teal-200/30 to-sky-200/35 opacity-70 blur-[85px]" />
      </div>

      {/* ===== LAYER 2: FLUTED GLASS OVERLAY ===== */}
      <div className="absolute inset-0 pointer-events-none fluted-glass -z-10 opacity-70" />

      {/* ===== TOP ROW: EXPERIANCE // COMPANY (TOP-RIGHT NAV BAR REMOVED) ===== */}
      <header className="relative z-10 w-full flex items-center justify-between">
        <Link
          href="/"
          onClick={() => sound.playClick(600)}
          className="group inline-flex items-baseline transition-opacity hover:opacity-75"
        >
          <span className="font-serif italic font-normal text-xl sm:text-2xl tracking-tight text-[#0d150e]">
            experiance{" "}
            <span className="font-mono text-sm sm:text-base font-normal text-[#0d150e]/40 mx-1.5 not-italic">
              //
            </span>{" "}
            {activeExp.company.toLowerCase()}
          </span>
        </Link>

        {/* Top-right corner is kept completely clean and empty as requested */}
        <div />
      </header>

      {/* ===== CENTER: SHIPPED & CONTRIBUTED PRODUCTS WITH LOGOS & LINKS ===== */}
      <main className="relative z-10 w-full max-w-6xl mx-auto my-auto py-4 sm:py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeExp.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            {/* Products Grid: Shipped & Contributed */}
            <div
              className={`grid grid-cols-1 ${
                activeExp.products.length >= 3
                  ? "md:grid-cols-3 gap-4 sm:gap-5"
                  : "md:grid-cols-2 gap-5 sm:gap-7"
              } items-stretch`}
            >
              {activeExp.products.map((prod) => {
                const logoSrc = getProductLogo(prod.name);
                const isShipped = prod.type === "Shipped Product";
                const isThreeCol = activeExp.products.length >= 3;

                return (
                  <div
                    key={prod.name}
                    className={`relative rounded-[26px] sm:rounded-[32px] ${
                      isThreeCol ? "p-5 sm:p-6" : "p-6 sm:p-8"
                    } backdrop-blur-2xl bg-white/[0.48] hover:bg-white/[0.72] 
                      border border-white/90 
                      shadow-[0_12px_40px_rgba(0,0,0,0.03),inset_0_1.5px_2px_rgba(255,255,255,0.95)] 
                      flex flex-col justify-between transition-all duration-300 group`}
                  >
                    <div>
                      {/* Top Header of Product Card: Logo & Capsule Pill */}
                      <div className="flex items-start justify-between gap-3">
                        {/* Logo Container */}
                        <div
                          className={`${
                            isThreeCol ? "w-12 h-12 sm:w-14 sm:h-14" : "w-14 h-14 sm:w-16 sm:h-16"
                          } relative rounded-2xl bg-white/80 p-2 border border-white/90 shadow-xs flex items-center justify-center shrink-0`}
                        >
                          <Image
                            src={logoSrc}
                            alt={`${prod.name} logo`}
                            width={isThreeCol ? 48 : 56}
                            height={isThreeCol ? 48 : 56}
                            className="w-full h-full object-contain"
                            priority
                          />
                        </div>

                        {/* Capsule Pill: Shipped or Contributed */}
                        <span
                          className={`px-3 py-1 rounded-full border text-[10px] sm:text-[11px] font-mono tracking-wider uppercase backdrop-blur-sm shadow-xs ${
                            isShipped
                              ? "border-[#0d150e]/20 bg-white/70 text-[#0d150e] font-semibold"
                              : "border-[#0d150e]/10 bg-white/40 text-[#0d150e]/60 font-normal"
                          }`}
                        >
                          {prod.type}
                        </span>
                      </div>

                      {/* Product Name in Regular Grotesk */}
                      <h3
                        className={`font-grotesk font-normal ${
                          isThreeCol ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl"
                        } text-[#0d150e] tracking-tight mt-4`}
                      >
                        {prod.name}
                      </h3>

                      {/* Product Tagline */}
                      {prod.tagline && (
                        <div className="font-mono text-xs text-[#0d150e]/50 mt-1 uppercase tracking-wide">
                          {prod.tagline}
                        </div>
                      )}

                      {/* Product Description in Regular Grotesk */}
                      <p className="font-grotesk font-normal text-sm sm:text-[15px] text-[#0d150e]/75 leading-relaxed mt-3">
                        {prod.description}
                      </p>
                    </div>

                    {/* Bottom Action Row: Role on Left, Visit Link on Right */}
                    <div className="pt-6 mt-6 border-t border-[#0d150e]/[0.08] flex items-center justify-between gap-4">
                      <span className="font-mono text-xs text-[#0d150e]/60">
                        {prod.role}
                      </span>

                      {prod.link ? (
                        <a
                          href={prod.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => sound.playClick(900)}
                          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#0d150e] hover:bg-black text-white font-mono text-xs tracking-wider transition-all shadow-xs active:scale-95"
                        >
                          <span>visit product</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <span className="font-mono text-xs text-[#0d150e]/40">
                          Active Deployment
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ===== BOTTOM ROW: CIRCULAR ARROW ACTION, 3-LINE METADATA & SWITCHER ===== */}
      <footer className="relative z-10 w-full flex flex-col sm:flex-row sm:items-end justify-between gap-5 pt-2">
        {/* Left: Circular Arrow Button & 3-Line Metadata */}
        <div className="flex items-center gap-4 sm:gap-5">
          {/* Circular Button with Arrow ( > ) */}
          <button
            onClick={toggleCompany}
            title={`Switch to ${otherCompany.company}`}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-[#0d150e]/20 bg-white/60 hover:bg-white/90 active:scale-95 backdrop-blur-md flex items-center justify-center text-[#0d150e] transition-all duration-200 group shrink-0 shadow-sm"
          >
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
          </button>

          {/* 3 Clean Stacked Lines */}
          <div className="font-mono text-[11px] sm:text-xs text-[#0d150e]/75 leading-snug space-y-0.5">
            <div className="text-[#0d150e] font-semibold">
              {activeExp.durationFormatted} • {activeExp.period}
            </div>
            <div className="text-[#0d150e]/70">{activeExp.location}</div>
            <div className="text-[#0d150e]/50">
              {activeExp.techStack.slice(0, 4).join(" • ")}
            </div>
          </div>
        </div>

        {/* Center / Right: Studio Copyright & Minimal Company Switcher */}
        <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-8">
          <div className="font-mono text-[10px] sm:text-xs text-[#0d150e]/40 tracking-wider">
            © {activeExp.company} Studio 2026
          </div>

          {/* Minimal Company Switcher Tabs */}
          <div className="inline-flex items-center gap-1.5 font-mono text-[11px] bg-white/50 backdrop-blur-md border border-[#0d150e]/10 p-1 rounded-full shadow-xs">
            {experiencesData.map((exp) => {
              const active = exp.id === activeExp.id;
              return (
                <button
                  key={exp.id}
                  onClick={() => selectCompany(exp)}
                  className={`px-3 py-1 rounded-full transition-all duration-150 ${
                    active
                      ? "bg-[#0d150e] text-white font-semibold shadow-xs"
                      : "text-[#0d150e]/60 hover:text-[#0d150e]"
                  }`}
                >
                  {exp.company}
                </button>
              );
            })}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function ExperiencePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#fdfefd] font-mono text-xs uppercase tracking-widest text-[#0d150e]/40">
          Loading Experience...
        </div>
      }
    >
      <ExperienceContent />
    </Suspense>
  );
}
