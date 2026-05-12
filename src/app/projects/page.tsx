"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { ArrowUpRight } from "lucide-react";

export default function Projects() {
  return (
    <div className="relative min-h-screen overflow-x-hidden px-5 pb-20 pt-28 text-foreground md:px-12 md:pb-24 md:pt-36 lg:px-16">
      <div className="vignette-glow" />

      <div className="fixed inset-0 z-[0] pointer-events-none">
        <div className="h-full w-full grid-background opacity-40" />
      </div>

      <div className="relative z-10">
        <div className="mb-8 flex flex-col gap-6 border-b-2 border-black/90 pb-8 sm:flex-row sm:items-end sm:justify-between md:mb-14">
          <div>
            <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.3em] text-black/20">
              [Projects]
            </span>
            <motion.h1
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="font-heading text-[18vw] font-black uppercase leading-[0.82] tracking-[-0.06em] text-black/90 sm:text-[13vw] lg:text-[10vw]"
            >
              SELECTED <br /> WORKS
            </motion.h1>
          </div>
          <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-black/35 md:text-sm">
            [ {projects.length} ] PROJECTS
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:gap-0">
          {projects.map((project, index) => {
            const projectUrl = project.demoUrl || project.githubUrl || "#";
            const isExternal = projectUrl.startsWith("http");

            return (
              <motion.a
                key={project.id}
                href={projectUrl}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative grid gap-6 overflow-hidden border border-black/[0.06] bg-white/25 p-5 backdrop-blur-sm transition-colors duration-300 hover:border-accent/20 hover:bg-white/45 md:grid-cols-[0.45fr_2fr_0.7fr] md:items-center md:border-x-0 md:border-t-0 md:bg-transparent md:p-0 md:py-14 md:backdrop-blur-0 md:hover:bg-transparent"
              >
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-accent opacity-70 md:hidden" />
                <div className="pointer-events-none absolute inset-0 -z-10 bg-accent opacity-0 transition-opacity duration-300 group-hover:opacity-[0.06]" />

                <div className="flex items-center justify-between gap-4 md:block">
                  <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-black/25 md:text-2xl md:tracking-normal">
                    0{index + 1}
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent/70 md:hidden">
                    {project.category}
                  </span>
                </div>

                <div>
                  <div className="mb-3 hidden font-mono text-[10px] uppercase tracking-[0.25em] text-black/25 md:block">
                    {project.category}
                  </div>
                  <h2 className="mb-4 max-w-[11ch] font-heading text-[2.35rem] font-black uppercase leading-[0.9] tracking-[-0.055em] text-black/85 transition-colors group-hover:text-accent sm:max-w-none sm:text-5xl md:mb-5 md:text-[clamp(3rem,5vw,5rem)]">
                    {project.name}
                  </h2>
                  <p className="mb-5 max-w-[36rem] text-[13px] leading-relaxed text-black/40 md:hidden">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-black/[0.05] bg-black/[0.035] px-3 py-1 font-mono text-[10px] uppercase tracking-tight text-black/45 md:border-0 md:bg-black/[0.04] md:text-[11px]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-black/[0.05] pt-4 md:justify-end md:border-0 md:pt-0">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-black/30 md:hidden">
                    View Project
                  </span>
                  <motion.div
                    whileHover={{ rotate: 45 }}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/80 text-black/80 transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-white md:h-20 md:w-20 md:border-2"
                  >
                    <ArrowUpRight className="h-4 w-4 md:h-7 md:w-7" />
                  </motion.div>
                </div>
              </motion.a>
            );
          })}
        </div>

        <div className="mt-20 text-center md:mt-36">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-black/35">
            MORE ON{" "}
            <a
              href="https://github.com/javaadde"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-black/70 underline decoration-black/20 underline-offset-4 transition-colors hover:text-accent"
            >
              GITHUB
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
