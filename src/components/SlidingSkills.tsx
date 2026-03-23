"use client";

import { motion } from "framer-motion";

const SKILLS = [
  "NEXT.JS",
  "REACT.JS",
  "TYPESCRIPT",
  "FRAMER MOTION",
  "TAILWIND CSS",
  "NODE.JS",
  "MONGODB",
  "POSTGRESQL",
  "PRISMA",
  "DOCKER",
];

export default function SlidingSkills() {
  return (
    <div
      style={{
        width: "100%",
        overflow: "hidden",
        padding: "5rem 0",
        background: "var(--foreground)",
        color: "var(--background)",
      }}
    >
      <div style={{ display: "flex", gap: "2rem", minWidth: "200%" }}>
        <motion.div
          animate={{ x: [0, "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ display: "flex", gap: "4rem", paddingRight: "4rem" }}
        >
          {/* Double the list for seamless loop */}
          {[...SKILLS, ...SKILLS].map((skill, i) => (
            <span
              key={i}
              style={{
                fontSize: "8vw",
                fontWeight: 900,
                whiteSpace: "nowrap",
                opacity: 0.3,
                letterSpacing: "-0.05em",
              }}
            >
              {skill}{" "}
              <span
                style={{
                  color: "var(--accent)",
                  opacity: 1,
                  textShadow: "2px 2px 0 var(--foreground)",
                }}
              >
                *
              </span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
