"use client";

import React, { useState, useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";

const SHUFFLE_TIME = 150; // Much slower for clarity
const CHARS = "ΣΩΨΦΛΓΔΘΞ%&$#@!/*?αβγδεζηθικλμνξοπρστυφχψω0";

interface ScrambleCharProps {
  char: string;
}

const ScrambleChar = ({ char }: ScrambleCharProps) => {
  const [displayChar, setDisplayChar] = useState(char);
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimationControls();

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isHovered && char !== " ") {
      // Professional "Captcha" glitch - less chaotic, more deliberate
      controls.start({
        opacity: [1, 0.7, 1, 0.8, 1],
        x: [0, -1, 1, -0.5, 0],
        transition: { duration: 0.4, repeat: Infinity, ease: "linear" },
      });

      interval = setInterval(() => {
        // Only swap if it's not a space
        setDisplayChar(CHARS[Math.floor(Math.random() * CHARS.length)]);
      }, SHUFFLE_TIME);
    } else {
      setDisplayChar(char);
      controls.stop();
      controls.set({ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 });
    }

    return () => {
      if (interval) clearInterval(interval);
      controls.stop();
    };
  }, [isHovered, char, controls]);

  return (
    <motion.span
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={controls}
      className="inline-block cursor-default select-none relative"
      style={{
        width: char === " " ? "0.3em" : "1ch", // Fixed width to prevent "disappearing" feel
        textAlign: "center",
      }}
    >
      {displayChar}
    </motion.span>
  );
};

export const ScrambleText = ({ text }: { text: string }) => {
  return (
    <span className="inline-flex">
      {text.split("").map((char, i) => (
        <ScrambleChar key={`${char}-${i}`} char={char} />
      ))}
    </span>
  );
};
