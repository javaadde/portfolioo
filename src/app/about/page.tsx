"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

function AnimatedBlock({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  const skills = [
    {
      category: "Frontend",
      items: [
        "React.js",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
      ],
    },
    {
      category: "Backend",
      items: ["Node.js", "Express", "MongoDB", "PostgreSQL", "Prisma"],
    },
    {
      category: "Tools",
      items: ["Docker", "Git", "Figma", "VS Code", "Linux"],
    },
  ];

  return (
    <div className="relative min-h-screen px-6 md:px-12 lg:px-16 pt-28 md:pt-36 pb-24">
      {/* VIGNETTE */}
      <div className="vignette-glow" />

      {/* GRID BG */}
      <div className="fixed inset-0 pointer-events-none z-[0]">
        <div className="h-full w-full grid-background opacity-40" />
      </div>

      <div className="relative z-10">
        {/* Page Title */}
        <AnimatedBlock>
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-black/20 block mb-4">
            [About]
          </span>
          <h1 className="text-[12vw] md:text-[8vw] font-black font-heading tracking-[-0.05em] leading-[0.85] text-black/90 mb-6">
            About Me
          </h1>
          <div className="w-24 h-1 bg-accent mb-16" />
        </AnimatedBlock>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          {/* Left: Bio */}
          <div className="md:col-span-7">
            <AnimatedBlock delay={0.1}>
              <p className="text-2xl md:text-3xl font-semibold leading-[1.3] tracking-tight text-black/70 mb-8">
                I&apos;m Javad, a full-stack developer passionate about building
                products that solve real problems through clean architecture and
                thoughtful user experience.
              </p>
            </AnimatedBlock>

            <AnimatedBlock delay={0.2}>
              <p className="text-[15px] leading-relaxed text-black/40 mb-12 max-w-[600px]">
                With a focus on modern web technologies, I bridge the gap
                between design and engineering. I believe great products emerge
                from the intersection of visual polish, technical excellence,
                and deep empathy for the end user.
              </p>
            </AnimatedBlock>

            {/* Skills */}
            <AnimatedBlock delay={0.3}>
              <div className="border-t border-black/[0.05] pt-10">
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-black/20 block mb-8">
                  [Skills & Technologies]
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                  {skills.map((group, i) => (
                    <div key={i}>
                      <h4 className="text-[13px] font-bold text-black/70 mb-4 tracking-tight">
                        {group.category}
                      </h4>
                      <ul className="flex flex-col gap-2">
                        {group.items.map((item) => (
                          <li
                            key={item}
                            className="text-[13px] text-black/35 flex items-center gap-2"
                          >
                            <span className="w-1 h-1 bg-accent/40 rounded-full" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedBlock>

            {/* Journey */}
            <AnimatedBlock delay={0.4}>
              <div className="border-t border-black/[0.05] pt-10 mt-12">
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-black/20 block mb-8">
                  [Journey]
                </span>
                <div className="flex flex-col gap-10">
                  {[
                    {
                      num: "01",
                      title: "Full Stack Development",
                      desc: "Building end-to-end web applications with modern frameworks and scalable architectures.",
                    },
                    {
                      num: "02",
                      title: "UI/UX Sensibility",
                      desc: "Turning design concepts into pixel-perfect, performant, and accessible digital experiences.",
                    },
                    {
                      num: "03",
                      title: "Problem Solving",
                      desc: "Approaching complex challenges with systems thinking and clean, maintainable solutions.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6">
                      <span className="font-mono text-[12px] text-accent/50 font-bold pt-1">
                        {item.num}
                      </span>
                      <div>
                        <h4 className="text-lg font-bold tracking-tight text-black/75 mb-2">
                          {item.title}
                        </h4>
                        <p className="text-[13px] text-black/35 leading-relaxed max-w-[400px]">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedBlock>
          </div>

          {/* Right: Sticky Panel */}
          <div className="md:col-span-5">
            <div className="md:sticky md:top-28">
              <AnimatedBlock delay={0.2}>
                {/* Visual Block */}
                <div className="w-full aspect-square bg-gradient-to-br from-accent/5 to-accent/15 border border-black/[0.04] flex items-center justify-center mb-8 relative overflow-hidden">
                  <div className="absolute inset-0 grid-background opacity-20" />
                  <div className="relative">
                    <span className="text-[80px] md:text-[100px] font-black text-accent/10 tracking-[-0.05em] font-heading">
                      JD
                    </span>
                  </div>
                </div>

                {/* Contact Card */}
                <div className="border border-black/[0.06] p-6 md:p-8 bg-white/30 backdrop-blur-sm">
                  <span className="font-mono text-[9px] tracking-[0.3em] text-black/20 uppercase block mb-4">
                    Get in touch
                  </span>
                  <p className="text-[14px] text-black/50 mb-4 leading-relaxed">
                    Based in Kerala, India.
                    <br />
                    Open for freelance & full-time opportunities worldwide.
                  </p>
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 text-[13px] font-bold text-accent hover:text-accent/80 transition-colors"
                  >
                    LET&apos;S TALK
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </AnimatedBlock>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
