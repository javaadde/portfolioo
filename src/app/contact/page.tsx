"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, Github, Linkedin, Twitter } from "lucide-react";

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

export default function Contact() {
  const socials = [
    { name: "LINKEDIN", href: "https://linkedin.com", icon: Linkedin },
    { name: "GITHUB", href: "https://github.com", icon: Github },
    { name: "TWITTER", href: "https://x.com/javaaddee", icon: Twitter },
    { name: "INSTAGRAM", href: "https://javade.in", icon: null },
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
            [Contact]
          </span>
          <h1 className="text-[14vw] md:text-[10vw] font-black font-heading tracking-[-0.05em] leading-[0.85] text-black/90 mb-4">
            LET&apos;S
            <br />
            TALK
          </h1>
          <div className="w-24 h-1 bg-accent mb-16" />
        </AnimatedBlock>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          {/* Left: Contact Info */}
          <div className="md:col-span-6">
            <AnimatedBlock delay={0.1}>
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-black/20 block mb-6">
                Ready to collaborate?
              </span>
              <p className="text-xl md:text-2xl font-medium text-black/60 leading-relaxed mb-10 max-w-[500px]">
                I&apos;m always open to discussing new projects, creative ideas,
                or opportunities to be part of your vision.
              </p>
            </AnimatedBlock>

            <AnimatedBlock delay={0.2}>
              <div className="flex flex-col gap-6 mb-12">
                <Link
                  href="mailto:your@email.com"
                  className="group flex items-center gap-4 text-xl md:text-2xl font-bold text-black/80 hover:text-accent transition-colors duration-300"
                >
                  <Mail className="w-5 h-5 text-black/30 group-hover:text-accent transition-colors" />
                  your@email.com
                </Link>
              </div>
            </AnimatedBlock>

            <AnimatedBlock delay={0.3}>
              <div className="border-t border-black/[0.05] pt-8">
                <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-black/15 block mb-4">
                  Location
                </span>
                <p className="text-lg font-medium text-black/60">
                  Kerala, India
                </p>
                <p className="text-[13px] text-black/30 mt-1">
                  Available for remote work worldwide
                </p>
              </div>
            </AnimatedBlock>
          </div>

          {/* Right: Socials */}
          <div className="md:col-span-6">
            <AnimatedBlock delay={0.2}>
              <div className="bg-accent/[0.03] border border-black/[0.04] p-8 md:p-10">
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-black/20 block mb-8">
                  Socials
                </span>
                <div className="flex flex-col gap-0">
                  {socials.map((social, i) => (
                    <Link
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      className="group flex items-center justify-between py-5 border-b border-black/[0.05] last:border-b-0 hover:px-4 transition-all duration-300"
                    >
                      <span className="text-xl md:text-2xl font-black tracking-tight text-black/70 group-hover:text-black transition-colors">
                        {social.name}
                      </span>
                      <ArrowUpRight className="w-5 h-5 text-black/20 group-hover:text-accent group-hover:-rotate-12 transition-all duration-300" />
                    </Link>
                  ))}
                </div>
              </div>
            </AnimatedBlock>

            <AnimatedBlock delay={0.3}>
              <div className="mt-8 p-6 border border-black/[0.04]">
                <p className="text-[13px] font-mono text-black/25 leading-relaxed">
                  Prefer a quick chat? Feel free to DM me on any platform. I
                  typically respond within 24 hours.
                </p>
              </div>
            </AnimatedBlock>
          </div>
        </div>

        {/* Bottom Decorative Text */}
        <AnimatedBlock delay={0.4}>
          <div className="mt-24 md:mt-40">
            <h2 className="text-[10vw] md:text-[8vw] font-black font-heading text-black/[0.03] tracking-[-0.04em] leading-[0.85] uppercase">
              JAVAD
            </h2>
          </div>
        </AnimatedBlock>
      </div>
    </div>
  );
}
