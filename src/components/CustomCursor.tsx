"use client";

import React, { useEffect, useState } from "react";
import {
  motion,
  useSpring,
  useMotionValue,
  AnimatePresence,
  useTransform,
} from "framer-motion";

export default function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 350, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const snappedX = useTransform(smoothX, (value) => Math.round(value));
  const snappedY = useTransform(smoothY, (value) => Math.round(value));

  const [hovered, setHovered] = useState(false);
  const [label, setLabel] = useState("");
  const [cursorType, setCursorType] = useState<string | null>(null);
  const [isPressed, setIsPressed] = useState(false);
  const [isTouchDevice] = useState(
    () =>
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0),
  );
  const isButtonCursor =
    cursorType === "social-btn" || cursorType === "project-image";

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-cursor-label]");
      if (target) {
        setHovered(true);
        setLabel(target.getAttribute("data-cursor-label") || "");
        setCursorType(target.getAttribute("data-cursor-type") || null);
      } else {
        setHovered(false);
        setCursorType(null);
      }
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [mouseX, mouseY]);

  if (isTouchDevice) return null;

  return (
    <div className="hidden md:block pointer-events-none">
      {/* Crosshair Lines */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-[9998]"
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {/* Horizontal Line */}
        <motion.div
          className="fixed left-0 right-0 h-px pointer-events-none"
          style={{
            top: snappedY,
            background:
              "linear-gradient(to right, transparent 2%, rgba(0,0,0,0.36) 15%, rgba(0,0,0,0.36) 85%, transparent 98%)",
          }}
        />
        {/* Vertical Line */}
        <motion.div
          className="fixed top-0 bottom-0 w-px pointer-events-none"
          style={{
            left: snappedX,
            background:
              "linear-gradient(to bottom, transparent 2%, rgba(0,0,0,0.36) 10%, rgba(0,0,0,0.36) 90%, transparent 98%)",
          }}
        />

        {/* End Squares — Left */}
        <motion.div
          className="fixed w-[8px] h-[8px] bg-black/60 left-0 -translate-y-1/2"
          style={{ top: snappedY }}
        />
        {/* End Squares — Right */}
        <motion.div
          className="fixed w-[8px] h-[8px] bg-black/60 right-0 -translate-y-1/2"
          style={{ top: snappedY }}
        />
        {/* End Squares — Top */}
        <motion.div
          className="fixed w-[8px] h-[8px] bg-black/60 top-0 -translate-x-1/2"
          style={{ left: snappedX }}
        />
        {/* End Squares — Bottom */}
        <motion.div
          className="fixed w-[8px] h-[8px] bg-black/60 bottom-0 -translate-x-1/2"
          style={{ left: snappedX }}
        />
      </motion.div>

      {/* Hover Label Pill — default style */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center transform-gpu"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <AnimatePresence mode="wait">
          {hovered && label && !isButtonCursor && (
            <motion.div
              key="default-label"
              initial={{ width: 0, height: 0, opacity: 0 }}
              animate={{
                width: label.length > 8 ? 160 : 110,
                height: 36,
                scale: isPressed ? 0.92 : 1,
                opacity: 1,
              }}
              exit={{ width: 0, height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-none bg-black flex items-center justify-center shadow-2xl overflow-hidden pointer-events-none"
            >
              <motion.span
                key={label}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.12 }}
                className="text-[9px] text-white font-black tracking-[0.3em] uppercase text-center px-5 leading-none pointer-events-none select-none"
              >
                {label}
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Social Button Cursor — small button style */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10001] flex items-center justify-center transform-gpu"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <AnimatePresence mode="wait">
          {hovered && label && isButtonCursor && (
            <motion.div
              key="social-btn-label"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{
                scale: isPressed ? 0.92 : 1,
                opacity: 1,
              }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="bg-black rounded-none flex items-center justify-center shadow-2xl pointer-events-none"
              style={{
                paddingTop: "8px",
                paddingBottom: "8px",
                paddingLeft: "16px",
                paddingRight: "16px",
              }}
            >
              <motion.span
                key={label}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.12 }}
                className="text-[12px] text-white font-semibold tracking-tight whitespace-nowrap leading-none pointer-events-none select-none"
              >
                {label}
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Precision Center "+" — hides on social hover */}
      <motion.div
        animate={{
          scale:
            isButtonCursor
              ? 0
              : isPressed
                ? 0.6
                : hovered
                  ? 1.5
                  : 1,
          rotate: hovered ? 45 : 0,
          backgroundColor: hovered ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, 0.6)",
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
        className="fixed top-0 left-0 pointer-events-none z-[10000] w-[8px] h-[8px]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </div>
  );
}
