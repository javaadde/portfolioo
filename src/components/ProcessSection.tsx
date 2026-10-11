"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Compass, Palette, Rocket } from "lucide-react";
import { sound } from "@/lib/SoundSystem";

const steps = [
  {
    step: "01",
    label: "Step 01",
    title: "We unearth what moves people",
    icon: Compass,
    description:
      "Before writing a line of code or designing a single frame, we dissect your product truth. We map user friction, audit performance bottlenecks, and define the core thesis that will make your brand unmistakable.",
    highlight: "Clarity over assumptions",
  },
  {
    step: "02",
    label: "Step 02",
    title: "We craft the experience",
    icon: Palette,
    description:
      "Where architectural discipline meets artistic obsession. We build custom design systems, weave silky GSAP motion physics, and fine-tune tactile micro-interactions that make the software feel alive.",
    highlight: "Craft without compromise",
  },
  {
    step: "03",
    label: "Step 03",
    title: "We send it into the world",
    icon: Rocket,
    description:
      "Your platform launches as a battle-tested asset. Deployed on modern edge infrastructure with sub-second page loads, automated pipelines, and conversion ergonomics that compound your growth.",
    highlight: "Engineered for scale",
  },
];

export default function ProcessSection() {
  return (
    <section
      id="process"
      className="relative py-24 sm:py-32 px-5 sm:px-8 md:px-14 lg:px-20 bg-[#e6f0dd] text-[#0d150e] border-t border-black/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/10 pb-8 mb-16">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase text-[#2c8a4b]">
              <span>THE THREE-STAGE PROCESS</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#0d150e] mt-2">
              From ambition to timeless reality.
            </h2>
          </div>
          <div className="font-mono text-xs uppercase tracking-widest text-[#0d150e]/50">
            [ ROADMAP ]
          </div>
        </div>

        {/* 3 Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, idx) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.step}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="group relative rounded-3xl bg-[#f1f6ec] border border-black/10 p-8 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300"
              >
                <div>
                  {/* Step Micrographic Header (Monolog process style) */}
                  <div className="flex items-center justify-between border-b border-black/10 pb-4 mb-6">
                    <div className="flex items-center gap-2 font-mono text-xs text-[#0d150e] font-semibold">
                      <span className="w-2 h-2 rounded-full bg-[#2c8a4b]" />
                      <span>{item.label}</span>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-[#2c8a4b] group-hover:scale-110 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-heading text-2xl font-bold tracking-tight text-[#0d150e] group-hover:text-[#2c8a4b] transition-colors">
                    {item.title}
                  </h3>

                  <p className="font-body text-xs sm:text-sm text-[#0d150e]/70 leading-relaxed mt-4">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-black/10 flex items-center justify-between font-mono text-[11px] text-[#0d150e]/60">
                  <span>// {item.highlight}</span>
                  <span className="text-[#2c8a4b] font-semibold">0{idx + 1}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
