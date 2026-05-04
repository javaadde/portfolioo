"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Twitter,
  X as CloseIcon,
} from "lucide-react";

const connectOptions = [
  {
    name: "Instagram",
    detail: "@javade.in",
    href: "https://instagram.com/javade.in",
    icon: Instagram,
  },
  {
    name: "WhatsApp",
    detail: "Start a quick chat",
    href: "https://wa.me/917902937442?text=Hi%20Javad%2C%20I%20came%20from%20your%20portfolio.",
    icon: MessageCircle,
  },
  {
    name: "LinkedIn",
    detail: "Professional connect",
    href: "https://linkedin.com/in/javaadde",
    icon: Linkedin,
  },
  {
    name: "X",
    detail: "@javaaddee",
    href: "https://x.com/javaaddee",
    icon: Twitter,
  },
  {
    name: "Email",
    detail: "javaadde@gmail.com",
    href: "mailto:javaadde@gmail.com",
    icon: Mail,
  },
];

export default function ConnectPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleTriggerClick = (event: MouseEvent) => {
      const trigger = (event.target as HTMLElement).closest(
        "[data-connect-trigger]",
      );

      if (!trigger) return;

      event.preventDefault();
      setOpen(true);
    };

    document.addEventListener("click", handleTriggerClick);
    return () => document.removeEventListener("click", handleTriggerClick);
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[10020] flex items-center justify-center bg-black/28 px-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="connect-title"
            className="relative w-full max-w-[460px] border border-black/[0.08] bg-[#f4f3ef] p-5 shadow-2xl md:p-6"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <span className="corner-plus tl" />
            <span className="corner-plus tr" />
            <span className="corner-plus bl" />
            <span className="corner-plus br" />

            <div className="flex items-start justify-between gap-6 border-b border-black/[0.06] pb-5">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-black/25">
                  Connect
                </span>
                <h2
                  id="connect-title"
                  className="mt-2 font-heading text-[2rem] font-black leading-none tracking-tight text-black/85"
                >
                  Choose a channel.
                </h2>
              </div>

              <button
                type="button"
                aria-label="Close connect options"
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center border border-black/[0.08] text-black/45 transition-colors hover:text-black"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-3">
              {connectOptions.map((option) => {
                const Icon = option.icon;

                return (
                  <a
                    key={option.name}
                    href={option.href}
                    target={option.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={
                      option.href.startsWith("mailto:")
                        ? undefined
                        : "noopener noreferrer"
                    }
                    data-cursor-label={option.name}
                    data-cursor-type="connect-option"
                    className="group flex items-center justify-between border-b border-black/[0.05] py-4 last:border-b-0"
                    onClick={() => setOpen(false)}
                  >
                    <span className="flex items-center gap-4">
                      <span className="flex h-10 w-10 items-center justify-center border border-black/[0.07] text-black/45 transition-colors group-hover:border-accent/30 group-hover:text-accent">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span>
                        <span className="block text-[16px] font-bold tracking-tight text-black/72 transition-colors group-hover:text-black">
                          {option.name}
                        </span>
                        <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.16em] text-black/28">
                          {option.detail}
                        </span>
                      </span>
                    </span>

                    <ArrowUpRight className="h-4 w-4 text-black/22 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                  </a>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
