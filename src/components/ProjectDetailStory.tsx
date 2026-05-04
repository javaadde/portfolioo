"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { CircleDot, CornerDownRight } from "lucide-react";
import type { SelectedProject } from "@/data/selectedProjects";

type ProjectDetailStoryProps = {
  project: SelectedProject;
};

const navItems = [
  { label: "Challenge", href: "#challenge" },
  { label: "Solution", href: "#solution" },
  { label: "Explorations", href: "#highlights" },
  { label: "Back to top", href: "#top" },
];

export default function ProjectDetailStory({ project }: ProjectDetailStoryProps) {
  const storyRef = useRef<HTMLElement | null>(null);
  const [scrollPercent, setScrollPercent] = useState(0);
  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollPercent(Math.min(100, Math.max(0, Math.round(latest * 100))));
  });

  return (
    <article
      ref={storyRef}
      className="relative z-10 mx-auto grid max-w-[1800px] border-y border-black/[0.08] md:block"
    >
      <aside className="border-b border-black/[0.08] md:fixed md:bottom-0 md:left-12 md:top-[72px] md:z-20 md:w-[370px] md:border-b-0 md:border-r md:border-black/[0.08] lg:left-16">
        <div className="relative flex h-full flex-col px-6 py-9 sm:px-8 md:px-6 md:py-10">
          <div>
            <div className="flex h-[44px] w-[58px] items-center gap-[3px]" aria-hidden="true">
              <span className="h-[44px] w-[28px] rounded-l-full rounded-r-[3px] bg-accent" />
              <span className="h-[44px] w-[28px] rounded-l-[3px] rounded-r-full bg-accent" />
            </div>

            <div className="absolute right-[34px] top-[145px] text-left">
              <motion.span className="font-mono text-[13px] font-bold tabular-nums text-black/48">
                {scrollPercent}%
              </motion.span>
            </div>
          </div>

          <div className="mt-[44px]">
            <h1 className="max-w-[7.4ch] font-heading text-[45px] font-black leading-[0.94] tracking-tight text-black/88">
              {project.title}.
            </h1>
            <p className="mt-8 max-w-[300px] font-mono text-[12px] font-bold uppercase leading-[1.5] tracking-[0.01em] text-black/48">
              {project.description}
            </p>
          </div>

          <nav className="mt-14 flex flex-wrap gap-x-5 gap-y-3 text-[14px] font-medium text-black/42 md:mt-auto md:flex-col md:gap-3.5 md:pb-[50px]">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="inline-flex items-center gap-3 transition-colors hover:text-black"
              >
                <CornerDownRight className="h-4 w-4 stroke-[1.8]" />
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </aside>

      <div className="md:ml-[370px]">
        <section className="relative min-h-[360px] overflow-hidden border-b border-black/[0.08] md:h-[46svh] md:min-h-[430px]">
          <Image
            src={project.previewImage}
            alt={`${project.title} project preview`}
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 75vw"
          />
        </section>

        <section className="grid grid-cols-1 gap-7 border-b border-black/[0.08] px-6 py-8 md:grid-cols-4 md:gap-10 md:px-10 lg:px-16">
          {[
            ["Project timeline", project.timeline],
            ["Project Type", project.projectType],
            ["Tools", project.tools.join("\n")],
            ["My Role", project.role],
          ].map(([label, value]) => (
            <div key={label}>
              <h2 className="text-[16px] font-medium text-black/58">{label}</h2>
              <p className="mt-3 whitespace-pre-line text-[14px] leading-[1.85] text-black/52">
                {value}
              </p>
            </div>
          ))}
        </section>

        <section className="px-6 py-16 md:px-10 md:py-24 lg:px-16">
          <div id="overview" className="scroll-mt-28">
            <span className="inline-flex items-center gap-2 text-[16px] text-black/48">
              <CircleDot className="h-4 w-4" />
              Overview
            </span>
            <h2 className="mt-7 font-heading text-[clamp(1.7rem,2.7vw,2.5rem)] font-medium leading-tight tracking-tight text-black/85">
              Building {project.title} into a focused digital product.
            </h2>
            <p className="mt-7 max-w-[75rem] text-[18px] leading-[1.45] text-black/62">
              {project.overview}
            </p>
          </div>

          <div id="challenge" className="mt-20 scroll-mt-28">
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-black/25">
              Challenge
            </span>
            <p className="mt-5 border-l-2 border-accent pl-6 text-[17px] leading-[1.8] text-black/62">
              {project.challenge}
            </p>
          </div>

          <div id="solution" className="mt-20 scroll-mt-28">
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-black/25">
              Solution
            </span>
            <p className="mt-5 text-[17px] leading-[1.8] text-black/58">
              {project.solution}
            </p>
          </div>

          <div id="highlights" className="mt-20 scroll-mt-28">
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-black/25">
              Highlights
            </span>
            <div className="mt-6 grid grid-cols-1 border-t border-black/[0.06] sm:grid-cols-2">
              {project.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="border-b border-black/[0.06] py-5 sm:odd:border-r sm:odd:pr-6 sm:even:pl-6"
                >
                  <p className="text-[15px] font-medium text-black/65">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-24 flex flex-wrap items-center gap-4 border-t border-black/[0.06] pt-8">
            <Link
              href="/#selected-work"
              className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-black/45 transition-colors hover:text-black"
            >
              Back to selected work
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}
