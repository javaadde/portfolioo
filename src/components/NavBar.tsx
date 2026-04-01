"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import InitialsLogo from "@/components/InitialsLogo";

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Experience", href: "/#experience" },
  { name: "LinkedIn", href: "https://linkedin.com/in/javaadde" },
  { name: "SideQuests", href: "/#sidequests" },
];

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 z-[1000] flex w-full items-center justify-between px-4 py-3 transition-all duration-500 sm:px-6 md:px-12 lg:px-16 ${
          scrolled
            ? "border-b border-black/[0.04] bg-[#f4f3ef]/85 py-2.5 backdrop-blur-xl"
            : "border-b border-black/[0.05] bg-[#f4f3ef]/96 md:border-b-0 md:bg-transparent"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="relative z-[1001]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-[42px]"
          >
            <InitialsLogo />
          </motion.div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
            >
              <Link
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                className="group flex items-center gap-1.5 text-[11px] font-bold tracking-tight text-[#1a1a1a]/40 hover:text-[#1a1a1a] transition-all duration-300 uppercase"
              >
                {item.name}
                <ArrowUpRight className="w-2.5 h-2.5 opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
              </Link>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Link
              href="mailto:javaadde@gmail.com"
              className="bg-accent text-white text-[10px] font-bold tracking-[0.15em] uppercase px-4 py-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] relative overflow-hidden flex items-center gap-1.5 "
            >
              LET&apos;S CONNECT
              <ArrowUpRight className="w-3 h-3 opacity-70" />
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="relative z-[1001] text-[13px] font-semibold tracking-tight text-black md:hidden"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? "Close" : "Menu"}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex flex-col bg-[#f4f3ef]/98 px-4 pb-8 pt-24 backdrop-blur-xl sm:px-6"
          >
            <div className="mb-8">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-black/20">
                Navigate
              </span>
            </div>

            <div className="flex-1 border-t border-black/[0.06]">
              {navLinks.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ delay: 0.06 * index, duration: 0.45 }}
                >
                  <Link
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between border-b border-black/[0.06] py-5"
                  >
                    <span className="text-[clamp(2rem,10vw,3.25rem)] font-black tracking-[-0.05em] text-black/85">
                      {item.name}
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-black/35" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col gap-5 pt-8">
              <div className="flex items-start justify-between gap-4 border-t border-black/[0.06] pt-5">
                <span className="max-w-[13rem] text-[13px] leading-relaxed text-black/45">
                  Full-stack developer building sharp interfaces and resilient
                  products.
                </span>
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-black/20">
                  Kochi, IN
                </span>
              </div>

              <Link
                href="mailto:javaadde@gmail.com"
                onClick={() => setMobileOpen(false)}
                className="connect-btn flex items-center justify-between"
              >
                LET&apos;S CONNECT
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
