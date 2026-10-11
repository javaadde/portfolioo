"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sound } from "@/lib/SoundSystem";

export default function NavBar() {
  const pathname = usePathname();

  if (pathname === "/experience") {
    return null;
  }

  const navItems = [
    { label: "About", href: "/about" },
    { label: "Experiances", href: "/experience" },
    { label: "Works", href: "/projects" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] px-6 sm:px-10 md:px-14 py-6 w-full pointer-events-none">
      <nav className="pointer-events-auto flex items-center gap-3 sm:gap-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => sound.playClick(800)}
              className={`min-w-[100px] sm:min-w-[120px] md:min-w-[130px] h-[42px] px-6 rounded-full flex items-center justify-center font-grotesk text-sm sm:text-[15px] font-medium tracking-tight text-[#0d150e] transition-all duration-200 select-none ${
                isActive
                  ? "bg-white/90 shadow-[0_8px_30px_rgba(0,0,0,0.04),inset_0_1.5px_2px_rgba(255,255,255,1)] border border-white scale-[1.02]"
                  : "bg-white/[0.45] hover:bg-white/[0.72] active:scale-95 border border-white/80 shadow-[0_8px_24px_rgba(0,0,0,0.02),inset_0_1.5px_2px_rgba(255,255,255,0.9)]"
              } backdrop-blur-2xl`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

