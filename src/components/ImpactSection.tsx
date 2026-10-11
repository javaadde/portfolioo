"use client";

import { motion } from "framer-motion";
import { Sparkles, Quote, Award } from "lucide-react";

const testimonials = [
  {
    quote:
      "For years our digital experience struggled to showcase our capabilities effectively. Within 30 days of launching the new site, we generated over $100k in high-value inbound sales.",
    author: "Andrew Tynes",
    role: "Founder, Mammoth Murals",
    metric: "$100k+",
    metricLabel: "New Inbound Sales",
  },
  {
    quote:
      "Within 3 months of launch, we saw $2M+ in qualified project leads and saved 20 hours a month filtering enquiries. The interface qualifies clients automatically and looks world-class.",
    author: "Johnny Hyde",
    role: "Principal, OH Architecture",
    metric: "$2M+",
    metricLabel: "Qualified Pipeline",
  },
  {
    quote:
      "A rare collaborator. Cares about your vision as if it were their own. Relentless in finding elegant technical solutions — the exact partner ambitious digital products need.",
    author: "Jonathon Shannon",
    role: "Director, Supersolid Agency",
    metric: "100%",
    metricLabel: "Client Satisfaction",
  },
];

const marqueeItems = [
  "NEXT.JS 16",
  "REACT 19",
  "GSAP SCROLLTRIGGER",
  "LENIS SMOOTH SCROLL",
  "TYPESCRIPT",
  "TAILWIND CSS V4",
  "WEBGL & SHADERS",
  "HEADLESS CMS",
  "AWWWARDS HONORS",
  "CSSDA WINNER",
];

export default function ImpactSection() {
  return (
    <section className="relative py-24 sm:py-32 px-5 sm:px-8 md:px-14 lg:px-20 bg-[#f1f6ec] text-[#0d150e] border-t border-black/10 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/10 pb-8">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase text-[#2c8a4b]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>MEASURABLE OUTCOMES</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#0d150e] mt-2">
              Proof that craft delivers compounding returns.
            </h2>
          </div>
          <div className="font-mono text-xs uppercase tracking-widest text-[#0d150e]/50">
            [ VERIFIED IMPACT ]
          </div>
        </div>

        {/* Testimonials 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.author}
              className="p-8 rounded-3xl bg-white/70 border border-black/10 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                <Quote className="w-6 h-6 text-[#2c8a4b] opacity-60" />
                <p className="font-body text-sm leading-relaxed text-[#0d150e]/80 italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="pt-6 border-t border-black/10 flex items-end justify-between">
                <div>
                  <div className="font-heading font-bold text-sm text-[#0d150e]">
                    {item.author}
                  </div>
                  <div className="font-mono text-[11px] text-[#0d150e]/50">
                    {item.role}
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-heading font-black text-xl text-[#2c8a4b]">
                    {item.metric}
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-wider text-[#0d150e]/40">
                    {item.metricLabel}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Marquee Banner */}
        <div className="relative pt-8 overflow-hidden">
          <div className="flex gap-8 whitespace-nowrap animate-marquee">
            {[...marqueeItems, ...marqueeItems].map((tag, i) => (
              <span
                key={i}
                className="font-mono text-xs font-semibold tracking-[0.25em] text-[#0d150e]/30 uppercase flex items-center gap-6"
              >
                <span>{tag}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#2c8a4b]/60" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
