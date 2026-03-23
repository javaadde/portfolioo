"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import Link from "next/link";

export default function Projects() {
  return (
    <div
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
        minHeight: "100vh",
        padding: "10rem 2rem 5rem 2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          borderBottom: "2px solid var(--foreground)",
          paddingBottom: "2rem",
          marginBottom: "4rem",
        }}
      >
        <motion.h1
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          style={{ fontSize: "10vw", margin: 0 }}
        >
          SELECTED <br /> WORKS
        </motion.h1>
        <div className="mono" style={{ fontSize: "1.2rem" }}>
          [ {projects.length} ] PROJECTS
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0" }}>
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            style={{
              borderBottom: "1px solid var(--border)",
              padding: "4rem 0",
              display: "grid",
              gridTemplateColumns: "1fr 2fr 1fr",
              alignItems: "center",
              cursor: "pointer",
              position: "relative",
            }}
          >
            {/* Project Index */}
            <div className="mono" style={{ fontSize: "1.5rem", opacity: 0.3 }}>
              0{index + 1}
            </div>

            {/* Project Metadata */}
            <div>
              <h2
                style={{
                  fontSize: "4rem",
                  textTransform: "uppercase",
                  marginBottom: "0.5rem",
                }}
              >
                {project.name}
              </h2>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="mono"
                    style={{
                      fontSize: "0.8rem",
                      background: "var(--secondary)",
                      padding: "0.2rem 0.6rem",
                      borderRadius: "1rem",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* View Link */}
            <div style={{ textAlign: "right" }}>
              <motion.div
                whileHover={{ rotate: 45 }}
                style={{
                  display: "inline-flex",
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  border: "2px solid var(--foreground)",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2rem",
                }}
              >
                &#x2197;
              </motion.div>
            </div>

            {/* Hover overlay effect */}
            <motion.div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "var(--accent)",
                zIndex: -1,
                opacity: 0,
              }}
              whileHover={{ opacity: 0.1 }}
            />
          </motion.div>
        ))}
      </div>

      <div style={{ marginTop: "10rem", textAlign: "center" }}>
        <p className="mono">
          MORE ON{" "}
          <a
            href="https://github.com/javaadde"
            target="_blank"
            style={{ textDecoration: "underline", fontWeight: 700 }}
          >
            GITHUB
          </a>
        </p>
      </div>
    </div>
  );
}
