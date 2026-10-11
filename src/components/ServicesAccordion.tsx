"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowUpRight, Sparkles } from "lucide-react";
import { sound } from "@/lib/SoundSystem";

interface ServiceItem {
  id: string;
  num: string;
  title: string;
  category: string;
  description: string;
  capabilities: string[];
}

const services: ServiceItem[] = [
  {
    id: "architecture",
    num: "01",
    title: "Full-Stack Web Architecture",
    category: "ENGINEERING",
    description:
      "Enterprise-grade web systems built with Next.js, TypeScript, and modern headless backends. Clean folder structures, optimized rendering pipelines, and rigorous type safety.",
    capabilities: [
      "Next.js App Router & Server Components",
      "TypeScript Architecture & API Contracts",
      "Headless CMS (Sanity, Strapi, Webflow)",
      "Database Modeling & Cloud Deployments",
    ],
  },
  {
    id: "motion",
    num: "02",
    title: "Creative Motion & Interaction",
    category: "EXPERIENCE",
    description:
      "Awwwards-level interactive graphics motion. Integrating GSAP, Lenis momentum scrolling, canvas effects, and WebGL physics to make digital products unforgettable.",
    capabilities: [
      "GSAP ScrollTrigger & Timeline Sequencing",
      "Lenis Smooth Momentum Scrolling",
      "Micro-Interactions & Magnetic Elements",
      "Tactile Sound Design & Spatial Cursors",
    ],
  },
  {
    id: "ecommerce",
    num: "03",
    title: "Ecommerce & Conversion Systems",
    category: "COMMERCE",
    description:
      "High-converting storefronts for luxury, apparel, and direct-to-consumer brands. Focused on sub-second load times, friction-free discovery, and instant WhatsApp or Stripe checkout.",
    capabilities: [
      "Custom Headless Shopify & Stripe Checkout",
      "WhatsApp Direct Ordering Flows",
      "Product Discovery & Dynamic Filtering",
      "Mobile-First Shopping Ergonomics",
    ],
  },
  {
    id: "design-systems",
    num: "04",
    title: "UI/UX & Design Systems",
    category: "SYSTEMS",
    description:
      "Cohesive design tokens, component libraries, and modular guidelines that scale smoothly from prototype to enterprise application without design debt.",
    capabilities: [
      "Modular Tailwind CSS & Custom Themes",
      "Accessible Semantic Markup (WCAG 2.1)",
      "Component-Driven State Architecture",
      "Responsive Fluid Typography & Grids",
    ],
  },
];

export default function ServicesAccordion() {
  const [openId, setOpenId] = useState<string | null>("architecture");

  const toggleItem = (id: string) => {
    sound.playClick(650);
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      id="services"
      className="relative py-24 sm:py-32 px-5 sm:px-8 md:px-14 lg:px-20 bg-[#f1f6ec] text-[#0d150e] border-t border-black/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/10 pb-8 mb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase text-[#2c8a4b]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CAPABILITIES & DISCIPLINES</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#0d150e] mt-2">
              Everything built with obsessive care.
            </h2>
          </div>
          <div className="font-mono text-xs uppercase tracking-widest text-[#0d150e]/50">
            [ 04 SERVICES ]
          </div>
        </div>

        {/* Monolog-Style Accordion Rows */}
        <div className="divide-y divide-black/10">
          {services.map((service) => {
            const isOpen = openId === service.id;

            return (
              <div
                key={service.id}
                className="group py-6 sm:py-8 transition-colors duration-300"
              >
                {/* Row Header Trigger */}
                <button
                  onClick={() => toggleItem(service.id)}
                  data-cursor-text={isOpen ? "CLOSE" : "EXPAND"}
                  className="w-full text-left flex items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start sm:items-center gap-4 sm:gap-8">
                    <span className="font-mono text-xs text-[#2c8a4b] mt-1 sm:mt-0 font-semibold">
                      {service.num}
                    </span>
                    <div>
                      <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-[#0d150e] group-hover:text-[#2c8a4b] group-hover:translate-x-2 transition-all duration-300">
                        {service.title}
                      </h3>
                      <span className="font-mono text-[10px] tracking-widest uppercase text-[#0d150e]/40 sm:hidden block mt-1">
                        {service.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <span className="hidden sm:inline font-mono text-[11px] tracking-widest uppercase text-[#0d150e]/40">
                      {service.category}
                    </span>
                    <div className="w-8 h-8 rounded-full border border-black/15 flex items-center justify-center text-[#0d150e] group-hover:border-[#2c8a4b] group-hover:text-[#2c8a4b] transition-colors">
                      {isOpen ? (
                        <Minus className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Expanding Content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 sm:pl-16 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-10">
                        <p className="md:col-span-7 font-body text-sm sm:text-base text-[#0d150e]/75 leading-relaxed">
                          {service.description}
                        </p>

                        <div className="md:col-span-5 space-y-2.5">
                          <span className="font-mono text-[10px] uppercase tracking-widest text-[#2c8a4b] block">
                            Key Deliverables:
                          </span>
                          <ul className="space-y-1.5">
                            {service.capabilities.map((cap) => (
                              <li
                                key={cap}
                                className="flex items-center gap-2 font-mono text-xs text-[#0d150e]/80"
                              >
                                <span className="w-1 h-1 rounded-full bg-[#2c8a4b]" />
                                <span>{cap}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
