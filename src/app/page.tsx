"use client";

import HeroMonolog from "@/components/HeroMonolog";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-[#fdfefd] text-[#0d150e]">
      {/* HERO — the only section on the home page */}
      <HeroMonolog />
    </div>
  );
}
