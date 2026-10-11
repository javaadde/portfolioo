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
      {/* 1. Background blobs (z-0) */}
      <div className="absolute inset-0 pointer-events-none bg-[#f8f9f8] overflow-hidden">
        {/* Top right blob */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-300 via-purple-300 to-orange-200 opacity-60 blur-[60px]" />
        
        {/* Middle right blob */}
        <div className="absolute top-[35%] right-[10%] w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-blue-400 via-pink-400 to-purple-300 opacity-50 blur-[70px]" />
        
        {/* Bottom center blob */}
        <div className="absolute bottom-[-15%] left-[30%] w-[600px] h-[500px] rounded-full bg-gradient-to-t from-orange-300 via-pink-300 to-blue-200 opacity-60 blur-[80px]" />
      </div>

      {/* 2. Fluted Glass Overlay - covers background (z-10) */}
      <div className="absolute inset-0 pointer-events-none z-10 fluted-glass" />

      {/* 3. Keycaps at bottom right, placed ON TOP of glass (z-20) */}
      <div
        ref={mascotRef}
        className="absolute right-8 sm:right-16 bottom-12 z-20 flex items-end gap-6 pointer-events-auto"
      >
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
          <div className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-xl group-hover:drop-shadow-2xl transition-all">
            <Image src={keyGithub} alt="GitHub" width={150} height={150} className="w-full h-full object-contain" />
          </div>
        </a>
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
          <div className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-xl group-hover:drop-shadow-2xl transition-all">
            <Image src={keyLinkedin} alt="LinkedIn" width={150} height={150} className="w-full h-full object-contain" />
          </div>
        </a>
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
          <div className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-xl group-hover:drop-shadow-2xl transition-all">
            <Image src={keyX} alt="X (Twitter)" width={150} height={150} className="w-full h-full object-contain" />
          </div>
        </a>
      </div>

      {/* Floating Cursor Tooltip */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-150 ease-out flex items-center justify-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_4px_12px_rgba(0,0,0,0.05)] ${
          tooltip.visible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transform: `translate3d(calc(${tooltip.x}px - 50%), calc(${tooltip.y}px - 240%), 0)`,
        }}
      >
        <span className="font-mono text-[11px] font-bold text-black uppercase tracking-widest drop-shadow-sm">
          {tooltip.text}
        </span>
      </div>

      {/* 4. Left-aligned hero text content - ON TOP of glass (z-20) */}
      <div
        ref={textRef}
        className="relative z-20 my-auto flex flex-col items-start justify-center px-[8%] md:px-[15%] pt-28 pb-24 max-w-4xl"
      >
        <p className="font-sans text-3xl md:text-[2.5rem] text-black mb-0 tracking-tight">
          hellow - im
        </p>

        <h1 className="font-sans font-bold tracking-tighter text-black text-[6rem] sm:text-[8rem] md:text-[10rem] leading-[1]">
          jaavadde
        </h1>

        <div className="mt-4 font-sans text-lg md:text-xl text-black">
          <p className="mb-2 font-medium text-black/90">{`{ Experiance }`}</p>
          <div className="flex flex-col gap-1.5">
            {experiencesData.map((exp) => (
              <div
                key={exp.id}
                role="button"
                tabIndex={0}
                onClick={() => {
                  sound.playClick(700);
                  setIsPreviewVisible(false);
                  router.push(`/experience?company=${exp.id}`);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    sound.playClick(700);
                    setIsPreviewVisible(false);
                    router.push(`/experience?company=${exp.id}`);
                  }
                }}
                onMouseEnter={(e) => {
                  sound.playHover();
                  setActiveExp(exp);
                  setPreviewPos({ x: e.clientX, y: e.clientY });
                  setIsPreviewVisible(true);
                }}
                onMouseMove={(e) => {
                  setPreviewPos({ x: e.clientX, y: e.clientY });
                }}
                onMouseLeave={() => {
                  setIsPreviewVisible(false);
                }}
                className="group flex items-center gap-2.5 py-0.5 cursor-pointer w-fit select-none"
              >
                <span className="font-bold text-black/40 group-hover:text-[#22b34a] group-hover:translate-x-1 transition-all">
                  &#8594;
                </span>
                <span className="group-hover:text-black transition-colors">
                  <strong className="font-bold tracking-tight underline decoration-black/20 group-hover:decoration-[#22b34a] underline-offset-4">
                    {exp.company}
                  </strong>
                  <span className="text-black/70 group-hover:text-black">
                    , {exp.location.toLowerCase().replace(", kerala", "")}
                  </span>
                </span>
                <span className="opacity-0 group-hover:opacity-100 font-mono text-[10px] text-[#22b34a] tracking-wider uppercase ml-1 transition-all">
                  [View Page]
                </span>
              </div>
            ))}
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
