"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Experience", href: "#experience" },
  { name: "Linkedin", href: "https://linkedin.com" },
  { name: "SideQuests", href: "#sidequests" },
];

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full px-6 md:px-12 py-5 flex justify-between items-center z-[1000] transition-all duration-500 ${
          scrolled
            ? "bg-[#f4f3ef]/80 backdrop-blur-xl border-b border-black/[0.04]"
            : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="relative z-[1001]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="font-black text-2xl tracking-[-0.06em] text-[#1a1a1a]"
          >
            RD
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
                className="group flex items-center gap-1.5 text-[14px] font-medium tracking-tight text-[#1a1a1a]/60 hover:text-[#1a1a1a] transition-all duration-300"
              >
                {item.name}
                <ArrowUpRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
              </Link>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Link
              href="mailto:your@email.com"
              className="connect-btn flex items-center gap-3"
            >
              LET&apos;S CONNECT
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden relative z-[1001] p-2"
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[999] bg-[#f4f3ef] flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-3xl font-bold tracking-tight text-black/80 hover:text-accent transition-colors"
              >
                {item.name} ↗
              </Link>
            ))}
            <Link
              href="mailto:your@email.com"
              onClick={() => setMobileOpen(false)}
              className="connect-btn mt-4"
            >
              LET&apos;S CONNECT
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
