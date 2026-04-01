"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";
import Image, { type StaticImageData } from "next/image";

type PixelLoadingPreviewProps = {
  src: StaticImageData;
  alt: string;
  href: string;
};

const LOAD_DURATION_MS = 3000;
const TARGET_PIXEL_SIZE = 20;
const PIXEL_PALETTE = [
  "#eef0eb",
  "#d9ded9",
  "#c1cdc6",
  "#afc4c5",
  "#7aa98f",
  "#54755d",
];

function createPixelOrder(columns: number, rows: number) {
  const count = columns * rows;

  return Array.from({ length: count }, (_, index) => {
    const row = Math.floor(index / columns);
    const column = index % columns;

    return {
      index,
      row,
      column,
      delay:
        count <= 1
          ? 0
          : ((index * 37 + row * 19 + column * 11) % count) / (count - 1),
      color: PIXEL_PALETTE[(index + row + column) % PIXEL_PALETTE.length],
    };
  }).sort((left, right) => left.delay - right.delay);
}

export default function PixelLoadingPreview({
  src,
  alt,
  href,
}: PixelLoadingPreviewProps) {
  const previewRef = useRef<HTMLDivElement | null>(null);
  const imageFrameRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(previewRef, { once: true, margin: "-10% 0px" });
  const [progress, setProgress] = useState(0);
  const [started, setStarted] = useState(false);
  const [grid, setGrid] = useState({ columns: 24, rows: 14 });

  const pixelOrder = useMemo(
    () => createPixelOrder(grid.columns, grid.rows),
    [grid.columns, grid.rows],
  );

  useEffect(() => {
    const element = imageFrameRef.current;
    if (!element) return;

    const updateGrid = () => {
      const { width, height } = element.getBoundingClientRect();
      if (!width || !height) return;

      const targetSize = width < 640 ? 18 : TARGET_PIXEL_SIZE;
      const columns = Math.max(12, Math.round(width / targetSize));
      const squareSize = width / columns;
      const rows = Math.max(8, Math.round(height / squareSize));

      setGrid((current) =>
        current.columns === columns && current.rows === rows
          ? current
          : { columns, rows },
      );
    };

    updateGrid();

    const observer = new ResizeObserver(updateGrid);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (inView && !started) {
      setStarted(true);
    }
  }, [inView, started]);

  useEffect(() => {
    if (!started) return;

    let animationFrame = 0;
    const start = performance.now();

    const tick = (currentTime: number) => {
      const elapsed = currentTime - start;
      const linearProgress = Math.min(1, elapsed / LOAD_DURATION_MS);

      setProgress(linearProgress);

      if (linearProgress < 1) {
        animationFrame = window.requestAnimationFrame(tick);
      }
    };

    animationFrame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(animationFrame);
  }, [started]);

  const loadingComplete = progress >= 1;

  return (
    <div
      ref={previewRef}
      className="relative mt-8 border border-black/[0.06] bg-[#f1f0ec] md:mt-14"
    >
      <span className="corner-cross tl" />
      <span className="corner-cross tr" />
      <span className="corner-cross bl" />
      <span className="corner-cross br" />

      <div
        ref={imageFrameRef}
        className="relative aspect-[16/11] overflow-hidden md:aspect-[16/5]"
      >
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
            gridTemplateColumns: `repeat(${grid.columns}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${grid.rows}, minmax(0, 1fr))`,
          }}
        >
          {pixelOrder.map((pixel) => {
            const hidden = progress < pixel.delay;

            return (
              <div
                key={pixel.index}
                className="border border-black/[0.025] transition-[opacity,transform] duration-300 ease-out"
                style={{
                  backgroundColor: hidden ? pixel.color : "transparent",
                  opacity: hidden ? 0.98 : 0,
                  transform: hidden ? "scale(1)" : "scale(0.84)",
                  willChange: "opacity, transform",
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
