"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const Win2000Taskbar = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [startOpen, setStartOpen] = useState(false);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = now.getHours();
      const m = now.getMinutes().toString().padStart(2, "0");
      const ampm = h >= 12 ? "PM" : "AM";
      const hour = h % 12 === 0 ? 12 : h % 12;
      setTime(`${hour}:${m} ${ampm}`);
      setDate(
        now.toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "2-digit",
        })
      );
    };
    update();
    const t = setInterval(update, 10000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const close = () => setStartOpen(false);
    if (startOpen) document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [startOpen]);

  return (
    <>
      {/* Start Menu */}
      {startOpen && (
        <div
          className="fixed bottom-7 left-0 z-[10000] win-window"
          style={{ width: 200 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Sidebar strip */}
          <div className="flex" style={{ minHeight: 240 }}>
            <div
              className="flex-shrink-0 flex items-end justify-center pb-4"
              style={{
                width: 26,
                background: "linear-gradient(to top, #0a246a, #3a6ea5)",
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              <span
                style={{
                  fontFamily: '"MS Sans Serif", "Tahoma", sans-serif',
                  fontSize: 14,
                  fontWeight: "bold",
                  color: "#ffffff",
                  letterSpacing: 1,
                  textShadow: "1px 0 0 rgba(0,0,0,0.4)",
                }}
              >
                Windows
                <span style={{ fontWeight: 400 }}> 2000</span>
              </span>
            </div>
            <div className="flex-1 flex flex-col">
              {[
                { label: "My Portfolio", href: "/" },
                { label: "About Me", href: "/about" },
                { label: "Projects", href: "/projects" },
                { label: "Contact", href: "/contact" },
                { label: "separator" },
                {
                  label: "GitHub",
                  href: "https://github.com/javaadde",
                  ext: true,
                },
                {
                  label: "LinkedIn",
                  href: "https://linkedin.com/in/javaadde",
                  ext: true,
                },
                { label: "separator" },
                {
                  label: "Send Email",
                  href: "mailto:javaadde@gmail.com",
                  ext: true,
                },
              ].map((item, i) => {
                if (item.label === "separator") {
                  return (
                    <div
                      key={i}
                      className="section-divider my-1 mx-1"
                    />
                  );
                }
                return (
                  <Link
                    key={i}
                    href={item.href!}
                    target={item.ext ? "_blank" : undefined}
                    rel={item.ext ? "noopener noreferrer" : undefined}
                    onClick={() => setStartOpen(false)}
                    className="flex items-center gap-2 px-3 py-1.5 hover:bg-[#0a246a] hover:text-white"
                    style={{
                      fontFamily: '"MS Sans Serif", "Tahoma", sans-serif',
                      fontSize: 11,
                      color: "inherit",
                    }}
                  >
                    <span
                      style={{
                        width: 16,
                        height: 16,
                        flexShrink: 0,
                        background: "#d4d0c8",
                        border: "1px solid #808080",
                        display: "inline-block",
                        fontSize: 9,
                        lineHeight: "16px",
                        textAlign: "center",
                      }}
                    >
                      &#9632;
                    </span>
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Taskbar */}
      <div className="win-taskbar">
        <button
          className="win-start-btn"
          onClick={(e) => {
            e.stopPropagation();
            setStartOpen((v) => !v);
          }}
        >
          {/* Windows flag icon */}
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            <rect x="0" y="0" width="7" height="7" fill="#f00" />
            <rect x="9" y="0" width="7" height="7" fill="#0a0" />
            <rect x="0" y="9" width="7" height="7" fill="#00f" />
            <rect x="9" y="9" width="7" height="7" fill="#ff0" />
          </svg>
          <strong>Start</strong>
        </button>

        {/* Divider */}
        <div
          style={{
            width: 2,
            height: 22,
            borderLeft: "1px solid #808080",
            borderRight: "1px solid #ffffff",
          }}
        />

        {/* Active window button */}
        <button className="win-task-btn win-task-btn-active">
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
            <rect
              x="1"
              y="1"
              width="10"
              height="10"
              fill="none"
              stroke="#0a246a"
              strokeWidth="1"
            />
            <rect x="1" y="1" width="10" height="3" fill="#0a246a" />
          </svg>
          Javad.dev — Portfolio
        </button>

        {/* Tray area */}
        <div className="win-tray ml-auto">
          <span>{time}</span>
          {date && (
            <span
              style={{
                fontFamily: '"MS Sans Serif", "Tahoma", sans-serif',
                fontSize: 10,
                marginLeft: 6,
                opacity: 0.7,
              }}
            >
              {date}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default Win2000Taskbar;
