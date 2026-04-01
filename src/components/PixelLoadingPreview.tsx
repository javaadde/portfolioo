"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import Image, { type StaticImageData } from "next/image";

type PixelLoadingPreviewProps = {
  src: StaticImageData;
  alt: string;
  href: string;
};

const LOAD_DURATION_MS = 6000;
const PIXEL_COLUMNS = 18;
const PIXEL_ROWS = 10;
const PIXEL_COUNT = PIXEL_COLUMNS * PIXEL_ROWS;
const PIXEL_PALETTE = [
  "#eef0eb",
  "#d9ded9",
  "#c1cdc6",
  "#afc4c5",
  "#7aa98f",
  "#54755d",
];

const pixelOrder = Array.from({ length: PIXEL_COUNT }, (_, index) => {
  const row = Math.floor(index / PIXEL_COLUMNS);
  const column = index % PIXEL_COLUMNS;

  return {
    index,
    row,
    column,
    delay:
      ((index * 37 + row * 19 + column * 11) % PIXEL_COUNT) /
      (PIXEL_COUNT - 1),
    color: PIXEL_PALETTE[(index + row + column) % PIXEL_PALETTE.length],
  };
}).sort((left, right) => left.delay - right.delay);

export default function PixelLoadingPreview({
  src,
  alt,
  href,
}: PixelLoadingPreviewProps) {
  const previewRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(previewRef, { once: true, margin: "-10% 0px" });
  const [progress, setProgress] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (inView && !started) {
      setStarted(true);
    }
  }, [inView, started]);

  useEffect(() => {
    if (!started) return;

    const start = performance.now();

    const timer = window.setInterval(() => {
      const elapsed = performance.now() - start;
      const nextProgress = Math.min(
        100,
        Math.round((elapsed / LOAD_DURATION_MS) * 100),
      );

      setProgress(nextProgress);

      if (nextProgress >= 100) {
        window.clearInterval(timer);
      }
    }, 60);

    return () => window.clearInterval(timer);
  }, [started]);

  const loadingComplete = progress >= 100;

  return (
    <div
      ref={previewRef}
      className="relative mt-8 border border-black/[0.06] bg-[#f1f0ec] md:mt-14"
    >
      <span className="corner-cross tl" />
      <span className="corner-cross tr" />
      <span className="corner-cross bl" />
      <span className="corner-cross br" />

      <div className="relative aspect-[16/11] overflow-hidden md:aspect-[16/5]">
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-cover transition-opacity duration-700 ${
            loadingComplete ? "opacity-100" : "opacity-25"
          }`}
          sizes="(max-width: 768px) 100vw, 90vw"
        />

        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View project details"
          data-cursor-label="View Details"
          data-cursor-type="social-btn"
          className="absolute inset-0 z-20"
        />

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:12.5%_100%] opacity-35" />

        <div
          className="pointer-events-none absolute inset-0 grid"
          style={{
            gridTemplateColumns: `repeat(${PIXEL_COLUMNS}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${PIXEL_ROWS}, minmax(0, 1fr))`,
          }}
        >
          {pixelOrder.map((pixel) => {
            const revealAt = Math.round(pixel.delay * 100);
            const hidden = progress < revealAt;

            return (
              <div
                key={pixel.index}
                className="border border-black/[0.04] transition-all duration-300"
                style={{
                  backgroundColor: hidden ? pixel.color : "transparent",
                  opacity: hidden ? 1 : 0,
                  transform: hidden ? "scale(1)" : "scale(0.85)",
                }}
              />
            );
          })}
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/[0.06] to-transparent opacity-40" />
      </div>
    </div>
  );
}
