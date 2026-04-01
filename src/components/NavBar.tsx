"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { name: "File", items: [{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: "separator" }, { label: "Exit", href: "#" }] },
  { name: "View", items: [{ label: "Projects", href: "/projects" }, { label: "Contact", href: "/contact" }] },
  { name: "Help", items: [{ label: "GitHub", href: "https://github.com/javaadde", ext: true }, { label: "LinkedIn", href: "https://linkedin.com/in/javaadde", ext: true }] },
];

const NavBar = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const close = () => setActiveMenu(null);
    if (activeMenu) document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [activeMenu]);

  return (
    <>
      {/* Window chrome wrapper — fixed at top */}
      <div
        className="fixed top-0 left-0 z-[1000] w-full"
        style={{ padding: "8px 8px 0 8px" }}
      >
        <div className="win-window" style={{ maxWidth: "100%" }}>
          {/* Title Bar */}
          <div className="win-titlebar">
            <div className="flex items-center gap-1.5">
              {/* App icon */}
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" style={{ flexShrink: 0 }}>
                <rect x="0" y="0" width="6" height="6" fill="#f00" />
                <rect x="8" y="0" width="6" height="6" fill="#0a0" />
                <rect x="0" y="8" width="6" height="6" fill="#00f" />
                <rect x="8" y="8" width="6" height="6" fill="#ff0" />
              </svg>
              <span style={{ fontFamily: '"MS Sans Serif", "Tahoma", sans-serif', fontSize: 11, fontWeight: "bold" }}>
                Javad.dev — Portfolio — [Full Stack Developer]
              </span>
            </div>
            {/* Window control buttons */}
            <div className="flex items-center gap-0.5">
              <button className="win-titlebar-btn" aria-label="Minimize" title="Minimize">
                <span style={{ fontSize: 9, lineHeight: 1, marginTop: 4, display: "block" }}>_</span>
              </button>
              <button className="win-titlebar-btn" aria-label="Maximize" title="Maximize">
                <span style={{ fontSize: 9, lineHeight: 1, border: "1px solid #000", width: 8, height: 8, display: "block" }} />
              </button>
              <button className="win-titlebar-btn" aria-label="Close" title="Close" style={{ fontWeight: "bold", fontSize: 11 }}>
                ✕
              </button>
            </div>
          </div>

          {/* Menu Bar */}
          <div className="win-menubar" role="menubar">
            {navLinks.map((menu) => (
              <div key={menu.name} className="relative">
                <button
                  role="menuitem"
                  aria-haspopup="true"
                  aria-expanded={activeMenu === menu.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveMenu(activeMenu === menu.name ? null : menu.name);
                  }}
                  className="win-menuitem"
                >
                  <u>{menu.name[0]}</u>{menu.name.slice(1)}
                </button>
                <AnimatePresence>
                  {activeMenu === menu.name && (
                    <motion.div
                      initial={{ opacity: 0, y: -2 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -2 }}
                      transition={{ duration: 0.05 }}
                      className="win-window absolute left-0 top-full z-[2000]"
                      style={{ minWidth: 160 }}
                      role="menu"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {menu.items.map((item, i) => {
                        if ("label" in item && item.label === "separator") {
                          return <div key={i} className="section-divider mx-1 my-0.5" />;
                        }
                        return (
                          <Link
                            key={i}
                            href={"href" in item ? item.href : "#"}
                            target={"ext" in item && item.ext ? "_blank" : undefined}
                            rel={"ext" in item && item.ext ? "noopener noreferrer" : undefined}
                            role="menuitem"
                            onClick={() => setActiveMenu(null)}
                            className="flex items-center px-6 py-0.5 hover:bg-[#0a246a] hover:text-white"
                            style={{ fontFamily: '"MS Sans Serif","Tahoma",sans-serif', fontSize: 11, color: "inherit", whiteSpace: "nowrap" }}
                          >
                            {"label" in item ? item.label : ""}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            <div className="flex-1" />

            <Link
              href="mailto:javaadde@gmail.com"
              className="win-menuitem"
              style={{ fontFamily: '"MS Sans Serif","Tahoma",sans-serif', fontSize: 11, color: "inherit", padding: "3px 10px" }}
            >
              Contact Me
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] win-window p-4 pt-24"
          >
            <div className="flex flex-col gap-2">
              {navLinks.flatMap((menu) =>
                menu.items
                  .filter((i) => "label" in i && i.label !== "separator")
                  .map((item, j) => (
                    <Link
                      key={`${menu.name}-${j}`}
                      href={"href" in item ? item.href : "#"}
                      onClick={() => setMobileOpen(false)}
                      className="win-btn text-left"
                    >
                      {"label" in item ? item.label : ""}
                    </Link>
                  ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
