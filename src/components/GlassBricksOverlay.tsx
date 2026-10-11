"use client";

import React, { useId } from "react";

interface GlassBricksOverlayProps {
  brickWidth?: number; // Width of each brick (default 48px)
  brickHeight?: number; // Height of each brick (default 48px)
  gap?: number; // Gap between bricks (default 3px)
  className?: string;
  opacity?: number;
}

export default function GlassBricksOverlay({
  brickWidth = 48,
  brickHeight = 48,
  gap = 3,
  className = "",
  opacity = 0.95,
}: GlassBricksOverlayProps) {
  const patternId = useId();
  const innerWidth = Math.max(4, brickWidth - gap);
  const innerHeight = Math.max(4, brickHeight - gap);
  const minDim = Math.min(innerWidth, innerHeight);
  const radius = Math.max(3, minDim * 0.22);
  const strokeWidth = Math.max(0.9, minDim * 0.028);
  const glintWidth = Math.max(0.8, minDim * 0.025);
  const inset = Math.max(1.2, minDim * 0.035);

  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden ${className}`}
      style={{ opacity }}
    >
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%" }}
      >
        <defs>
          {/* Surface Pillow Bevel Gradient (simulates 3D curved glass brick face) */}
          <linearGradient
            id={`${patternId}-pillow`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="35%" stopColor="#ffffff" stopOpacity="0.12" />
            <stop offset="70%" stopColor="#000000" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.15" />
          </linearGradient>

          {/* 3D Specular Rim / Bevel Stroke */}
          <linearGradient
            id={`${patternId}-rim`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.32" />
            <stop offset="85%" stopColor="#000000" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.24" />
          </linearGradient>

          {/* Mortar Grooves Pattern */}
          <pattern
            id={patternId}
            width={brickWidth}
            height={brickHeight}
            patternUnits="userSpaceOnUse"
          >
            {/* Ambient mortar groove base */}
            <rect
              width={brickWidth}
              height={brickHeight}
              fill="#000000"
              fillOpacity="0.015"
            />

            {/* Individual Glass Brick Body */}
            <rect
              x={gap / 2}
              y={gap / 2}
              width={innerWidth}
              height={innerHeight}
              rx={radius}
              ry={radius}
              fill={`url(#${patternId}-pillow)`}
              stroke={`url(#${patternId}-rim)`}
              strokeWidth={strokeWidth}
            />

            {/* Specular Glint Highlight on Top-Left Corner */}
            <path
              d={`M ${gap / 2 + inset} ${gap / 2 + radius + inset} A ${radius} ${radius} 0 0 1 ${gap / 2 + radius + inset} ${gap / 2 + inset} L ${gap / 2 + innerWidth - radius} ${gap / 2 + inset}`}
              stroke="#ffffff"
              strokeWidth={glintWidth}
              strokeLinecap="round"
              fill="none"
              opacity="0.85"
            />

            {/* Subtle Bottom-Right Bevel Shadow Accent */}
            <path
              d={`M ${gap / 2 + radius} ${gap / 2 + innerHeight - inset} L ${gap / 2 + innerWidth - radius} ${gap / 2 + innerHeight - inset} A ${radius} ${radius} 0 0 0 ${gap / 2 + innerWidth - inset} ${gap / 2 + innerHeight - radius}`}
              stroke="#000000"
              strokeWidth={glintWidth * 0.9}
              strokeLinecap="round"
              fill="none"
              opacity="0.14"
            />
          </pattern>
        </defs>

        {/* Fill the viewport with procedural glass bricks */}
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}
