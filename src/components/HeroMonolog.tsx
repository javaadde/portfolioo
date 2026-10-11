"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sound } from "@/lib/SoundSystem";
import { experiencesData, type ExperienceItem } from "@/data/experiences";
import ExperienceGlassPreview from "@/components/ExperienceGlassPreview";
import keyGithub from "@/assets/meterials/key icons/github.png";
import keyLinkedin from "@/assets/meterials/key icons/linkedin.png";
import keyX from "@/assets/meterials/key icons/x.com.png";

export default function HeroMonolog() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const mascotRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, text: "" });
  
  // Experience hover preview states
  const [activeExp, setActiveExp] = useState<ExperienceItem | null>(null);
  const [previewPos, setPreviewPos] = useState({ x: 0, y: 0 });
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !mascotRef.current) return;

    const ctx = gsap.context(() => {
      // Mascot gently rises away as the user scrolls past
      gsap.to(mascotRef.current, {
        y: -90,
        rotation: -4,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // Text entrance
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power3.out",
          delay: 0.15,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#fdfefd] text-[#0d150e] flex flex-col justify-center overflow-hidden select-none"
    >
      {/* ===== LAYER 1: ATMOSPHERIC AURORA & PASTEL HALOS (Matching Experience Page) ===== */}
      <div className="absolute inset-0 pointer-events-none bg-[#fbfdfb] overflow-hidden -z-20">
        <div className="absolute -top-[12%] -right-[8%] w-[680px] h-[680px] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-200/40 via-sky-200/35 to-emerald-100/25 opacity-80 blur-[90px]" />
        <div className="absolute top-[20%] left-[25%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-emerald-100/30 via-teal-100/20 to-transparent opacity-70 blur-[100px]" />
        <div className="absolute -bottom-[15%] -left-[6%] w-[560px] h-[680px] bg-gradient-to-t from-emerald-200/40 via-teal-200/30 to-sky-200/35 opacity-70 blur-[85px]" />
      </div>

      {/* ===== LAYER 2: FLUTED GLASS OVERLAY (Matching Experience Page) ===== */}
      <div className="absolute inset-0 pointer-events-none fluted-glass -z-10 opacity-70" />

      {/* 3. Keycaps at bottom right, placed ON TOP of glass (z-20) */}
      {/* Order matching refined design: LinkedIn -> GitHub -> X */}
      <div
        ref={mascotRef}
        className="absolute right-6 sm:right-12 md:right-16 bottom-10 sm:bottom-12 z-20 flex items-end gap-4 sm:gap-6 pointer-events-auto"
      >
        {/* LinkedIn */}
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sound.playClick(900)}
          onMouseEnter={(e) => setTooltip({ visible: true, text: "LinkedIn", x: e.clientX, y: e.clientY })}
          onMouseMove={(e) => setTooltip(prev => ({ ...prev, x: e.clientX, y: e.clientY }))}
          onMouseLeave={() => setTooltip(prev => ({ ...prev, visible: false }))}
          className="flex flex-col items-center transition-transform active:scale-90 active:translate-y-3 hover:translate-y-1 group"
        >
          <div className="w-22 h-22 sm:w-28 sm:h-28 md:w-32 md:h-32 drop-shadow-xl group-hover:drop-shadow-2xl transition-all">
            <Image src={keyLinkedin} alt="LinkedIn" width={160} height={160} className="w-full h-full object-contain" priority />
          </div>
        </a>

        {/* GitHub */}
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sound.playClick(900)}
          onMouseEnter={(e) => setTooltip({ visible: true, text: "Github", x: e.clientX, y: e.clientY })}
          onMouseMove={(e) => setTooltip(prev => ({ ...prev, x: e.clientX, y: e.clientY }))}
          onMouseLeave={() => setTooltip(prev => ({ ...prev, visible: false }))}
          className="flex flex-col items-center transition-transform active:scale-90 active:translate-y-3 hover:translate-y-1 group"
        >
          <div className="w-22 h-22 sm:w-28 sm:h-28 md:w-32 md:h-32 drop-shadow-xl group-hover:drop-shadow-2xl transition-all">
            <Image src={keyGithub} alt="GitHub" width={160} height={160} className="w-full h-full object-contain" priority />
          </div>
        </a>

        {/* X.com */}
        <a
          href="https://x.com"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sound.playClick(900)}
          onMouseEnter={(e) => setTooltip({ visible: true, text: "X.com", x: e.clientX, y: e.clientY })}
          onMouseMove={(e) => setTooltip(prev => ({ ...prev, x: e.clientX, y: e.clientY }))}
          onMouseLeave={() => setTooltip(prev => ({ ...prev, visible: false }))}
          className="flex flex-col items-center transition-transform active:scale-90 active:translate-y-3 hover:translate-y-1 group"
        >
          <div className="w-22 h-22 sm:w-28 sm:h-28 md:w-32 md:h-32 drop-shadow-xl group-hover:drop-shadow-2xl transition-all">
            <Image src={keyX} alt="X (Twitter)" width={160} height={160} className="w-full h-full object-contain" priority />
          </div>
        </a>
      </div>

      {/* Floating Cursor Tooltip */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-150 ease-out flex items-center justify-center px-4 py-2 rounded-full bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[inset_0_1px_2px_rgba(255,255,255,0.7),0_4px_12px_rgba(0,0,0,0.04)] ${
          tooltip.visible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transform: `translate3d(calc(${tooltip.x}px - 50%), calc(${tooltip.y}px - 240%), 0)`,
        }}
      >
        <span className="font-mono text-[11px] font-medium text-[#0d150e] uppercase tracking-widest drop-shadow-xs">
          {tooltip.text}
        </span>
      </div>

      {/* 4. Left-aligned hero text content - ON TOP of glass (z-20) */}
      <div
        ref={textRef}
        className="relative z-20 my-auto flex flex-col items-start justify-center px-[8%] sm:px-[12%] md:px-[16%] lg:px-[20%] pt-28 pb-20 max-w-5xl"
      >
        {/* "hello - im" with stylized asterisk above the stem of 'i' in Space Grotesk */}
        <p className="pl-1.5 sm:pl-2 font-grotesk text-3xl sm:text-4xl md:text-[2.65rem] text-[#0d150e] mb-1 sm:mb-1.5 tracking-tight font-normal select-none">
          hello -{" "}
          <span className="inline-flex items-baseline font-grotesk">
            <span className="relative inline-block leading-none">
              <span className="opacity-0">i</span>
              <span className="absolute left-0 bottom-0 leading-none">ı</span>
              <span className="absolute -top-[0.24em] left-1/2 -translate-x-1/2 text-[0.84em] font-serif font-black select-none leading-none">
                *
              </span>
            </span>
            <span>m</span>
          </span>
        </p>

        {/* Large "javaadde" title in Space Grotesk */}
        <h1 className="font-grotesk font-bold tracking-tight text-[#0d150e] text-[5.5rem] sm:text-[7.5rem] md:text-[9.5rem] lg:text-[11rem] leading-[0.88] -ml-1 select-none">
          javaadde
        </h1>

        {/* Sub-layout: Software Developer (left) & { Experiance } (right) */}
        {/* Aligned with first and second 'a' of javaadde */}
        <div className="mt-5 sm:mt-6 md:mt-7 pl-8 sm:pl-10 md:pl-14 lg:pl-16 flex flex-row items-start gap-10 sm:gap-14 md:gap-20 lg:gap-24 select-none">
          {/* Left Column: Software Developer & Based in Kochi */}
          <div className="flex flex-col whitespace-nowrap">
            <p className="font-grotesk font-medium text-[#0d150e] text-lg sm:text-xl md:text-[1.35rem] leading-tight tracking-tight">
              Software Developer
            </p>
            <p className="mt-1 sm:mt-1.5 font-grotesk font-normal text-[#0d150e]/55 text-sm sm:text-base md:text-[1.05rem] leading-tight tracking-tight">
              Based in Kochi
            </p>
          </div>

          {/* Right Column: { Experiance } & Company list */}
          <div className="flex flex-col whitespace-nowrap">
            <p className="font-grotesk font-normal text-[#0d150e] text-lg sm:text-xl md:text-[1.35rem] leading-tight tracking-tight mb-2 sm:mb-2.5">
              {"{ Experiance }"}
            </p>

            <div className="flex flex-col gap-1.5 sm:gap-2 font-grotesk text-sm sm:text-base md:text-[1.05rem] tracking-tight">
              {/* Bytsolv */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => {
                  sound.playClick(700);
                  setIsPreviewVisible(false);
                  router.push(`/experience?company=bytsolv`);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    sound.playClick(700);
                    setIsPreviewVisible(false);
                    router.push(`/experience?company=bytsolv`);
                  }
                }}
                onMouseEnter={(e) => {
                  sound.playHover();
                  const exp = experiencesData.find((item) => item.id === "bytsolv");
                  if (exp) {
                    setActiveExp(exp);
                    setPreviewPos({ x: e.clientX, y: e.clientY });
                    setIsPreviewVisible(true);
                  }
                }}
                onMouseMove={(e) => {
                  setPreviewPos({ x: e.clientX, y: e.clientY });
                }}
                onMouseLeave={() => {
                  setIsPreviewVisible(false);
                }}
                className="group flex items-center gap-2 cursor-pointer w-fit select-none transition-transform hover:translate-x-1"
              >
                <span className="font-bold text-[#0d150e] text-base sm:text-lg transition-transform group-hover:translate-x-0.5">
                  &#8594;
                </span>
                <span className="text-[#0d150e]">
                  <strong className="font-bold text-[#0d150e] underline decoration-transparent group-hover:decoration-[#0d150e]/30 underline-offset-4 transition-all">
                    Bytsolv
                  </strong>
                  , kochi, india
                </span>
              </div>

              {/* Devxtra */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => {
                  sound.playClick(700);
                  setIsPreviewVisible(false);
                  router.push(`/experience?company=devxtra`);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    sound.playClick(700);
                    setIsPreviewVisible(false);
                    router.push(`/experience?company=devxtra`);
                  }
                }}
                onMouseEnter={(e) => {
                  sound.playHover();
                  const exp = experiencesData.find((item) => item.id === "devxtra");
                  if (exp) {
                    setActiveExp(exp);
                    setPreviewPos({ x: e.clientX, y: e.clientY });
                    setIsPreviewVisible(true);
                  }
                }}
                onMouseMove={(e) => {
                  setPreviewPos({ x: e.clientX, y: e.clientY });
                }}
                onMouseLeave={() => {
                  setIsPreviewVisible(false);
                }}
                className="group flex items-center gap-2 cursor-pointer w-fit select-none transition-transform hover:translate-x-1"
              >
                <span className="font-bold text-[#0d150e] text-base sm:text-lg transition-transform group-hover:translate-x-0.5">
                  &#8594;
                </span>
                <span className="text-[#0d150e]">
                  <strong className="font-bold text-[#0d150e] underline decoration-transparent group-hover:decoration-[#0d150e]/30 underline-offset-4 transition-all">
                    Devxtra
                  </strong>
                  , kochi, india
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Glass Preview Card near cursor */}
      <ExperienceGlassPreview
        experience={activeExp}
        position={previewPos}
        visible={isPreviewVisible}
        onOpenDetails={(exp) => {
          sound.playClick(700);
          setIsPreviewVisible(false);
          router.push(`/experience?company=${exp.id}`);
        }}
      />
    </section>
  );
}
