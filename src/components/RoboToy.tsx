"use client";

import {
  type FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type Position = {
  x: number;
  y: number;
};

type ChatMessage = {
  from: "bot" | "user";
  text: string;
};

type RoboMode = "standing" | "walking" | "dragging";

const ROBOT_SIZE = 136;
const MOBILE_ROBOT_SIZE = 104;
const EDGE_PADDING = 12;
const DROP_PAUSE_MS = 11000;
const SCROLL_MESSAGE_COOLDOWN_MS = 12000;
const INTRO_MESSAGE = "How can I help you, sir?";
const SCROLL_MESSAGE = "hey where you going i think you realy need my help";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getRobotSize() {
  if (typeof window === "undefined") return ROBOT_SIZE;
  return window.innerWidth < 640 ? MOBILE_ROBOT_SIZE : ROBOT_SIZE;
}

function getRobotHeight(size: number) {
  return size * 1.28;
}

function getBounds(size: number) {
  const height = getRobotHeight(size);

  return {
    maxX: Math.max(EDGE_PADDING, window.innerWidth - size - EDGE_PADDING),
    maxY: Math.max(EDGE_PADDING, window.innerHeight - height - EDGE_PADDING),
  };
}

function getBottomRightPosition(size: number): Position {
  const { maxX, maxY } = getBounds(size);
  const bottomGap = window.innerWidth < 640 ? 12 : 20;
  const sideGap = window.innerWidth < 640 ? 10 : 22;

  return {
    x: clamp(window.innerWidth - size - sideGap, EDGE_PADDING, maxX),
    y: clamp(
      window.innerHeight - getRobotHeight(size) - bottomGap,
      EDGE_PADDING,
      maxY,
    ),
  };
}

function getRandomWalkTarget(size: number): Position {
  const { maxX, maxY } = getBounds(size);
  const topLimit = window.innerWidth < 640 ? 72 : 88;

  return {
    x: clamp(EDGE_PADDING + Math.random() * maxX, EDGE_PADDING, maxX),
    y: clamp(
      topLimit + Math.random() * (maxY - topLimit),
      EDGE_PADDING,
      maxY,
    ),
  };
}

function createPortfolioAnswer(question: string) {
  const q = question.toLowerCase();

  if (/(hello|hi|hey|help)/.test(q)) {
    return "I can help with Javad's portfolio, projects, skills, contact, and availability.";
  }

  if (/(who|owner|javad|about|bio|profile)/.test(q)) {
    return "This portfolio belongs to Javad, a full-stack developer based in Kochi, Kerala, focused on clean architecture, thoughtful UX, and modern web products.";
  }

  if (/(skill|stack|technology|tools|tech)/.test(q)) {
    return "Javad works with React, Next.js, TypeScript, Tailwind CSS, Framer Motion, Node.js, Express, MongoDB, PostgreSQL, Prisma, Docker, Git, Figma, VS Code, and Linux.";
  }

  if (/(project|work|case|portfolio)/.test(q)) {
    return "Highlighted projects include Hayon, Trendzy, Lumiere Jewels, and Kido. They cover social media planning, ecommerce, product showcases, admin panels, UI/UX, and full-stack development.";
  }

  if (/(hayon|social|planning)/.test(q)) {
    return "Hayon is an all-in-one social media planning platform for teams to plan, organize, and publish from one clean workspace.";
  }

  if (/(trendzy|fashion|dress|ecommerce)/.test(q)) {
    return "Trendzy is a modern ecommerce website for a men's dress shop, focused on clean shopping flow, product presentation, and polished UI/UX.";
  }

  if (/(lumiere|jewel|jewellery|whatsapp)/.test(q)) {
    return "Lumiere Jewels is an ecommerce showcase for jewellery collections with direct WhatsApp enquiry flow.";
  }

  if (/(kido|kids|admin)/.test(q)) {
    return "Kido is a kids fashion ecommerce website with an integrated admin panel for products, collections, and store content.";
  }

  if (/(contact|email|hire|freelance|available|availability|job)/.test(q)) {
    return "You can contact Javad at javaadde@gmail.com. He is open for freelance and full-time opportunities worldwide.";
  }

  if (/(location|where|based)/.test(q)) {
    return "Javad is based in Kochi, Kerala, India.";
  }

  return "I can only answer about this portfolio and Javad. Ask me about projects, skills, contact, location, or availability.";
}

export default function RoboToy() {
  const [position, setPosition] = useState<Position | null>(null);
  const [mode, setMode] = useState<RoboMode>("standing");
  const [facing, setFacing] = useState(-1);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { from: "bot", text: INTRO_MESSAGE },
  ]);
  const [chatInput, setChatInput] = useState("");
  const modeRef = useRef<RoboMode>("standing");
  const positionRef = useRef<Position | null>(null);
  const dragOffsetRef = useRef<Position>({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);
  const roamTimerRef = useRef<number | null>(null);
  const pausedUntilRef = useRef(0);
  const lastScrollMessageRef = useRef(0);

  const speak = useCallback((text: string) => {
    setMessages((current) => [
      ...current.slice(-4),
      {
        from: "bot",
        text,
      },
    ]);
  }, []);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  useEffect(() => {
    const size = getRobotSize();
    const initialPosition = getBottomRightPosition(size);
    let initialFrame = 0;

    positionRef.current = initialPosition;
    initialFrame = window.requestAnimationFrame(() => {
      setPosition(initialPosition);
    });

    const updateMode = (nextMode: RoboMode) => {
      modeRef.current = nextMode;
      setMode(nextMode);
    };

    const scheduleWalk = (delay = 2400 + Math.random() * 2600) => {
      if (roamTimerRef.current) window.clearTimeout(roamTimerRef.current);

      roamTimerRef.current = window.setTimeout(() => {
        if (modeRef.current === "dragging") {
          scheduleWalk(1200);
          return;
        }

        const pauseLeft = pausedUntilRef.current - Date.now();
        if (pauseLeft > 0) {
          scheduleWalk(pauseLeft + 300);
          return;
        }

        const currentSize = getRobotSize();
        const start = positionRef.current ?? getBottomRightPosition(currentSize);
        const target = getRandomWalkTarget(currentSize);
        const distance = Math.hypot(target.x - start.x, target.y - start.y);
        const duration = clamp(distance * 14, 2800, 8200);
        const startedAt = performance.now();

        if (animationRef.current) {
          window.cancelAnimationFrame(animationRef.current);
        }

        setFacing(target.x >= start.x ? 1 : -1);
        updateMode("walking");

        const frame = (now: number) => {
          if (modeRef.current === "dragging") return;

          const progress = clamp((now - startedAt) / duration, 0, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const nextPosition = {
            x: start.x + (target.x - start.x) * eased,
            y: start.y + (target.y - start.y) * eased,
          };

          positionRef.current = nextPosition;
          setPosition(nextPosition);

          if (progress < 1) {
            animationRef.current = window.requestAnimationFrame(frame);
            return;
          }

          updateMode("standing");
          scheduleWalk(2800 + Math.random() * 4200);
        };

        animationRef.current = window.requestAnimationFrame(frame);
      }, delay);
    };

    const handleScroll = () => {
      const now = Date.now();
      if (now - lastScrollMessageRef.current < SCROLL_MESSAGE_COOLDOWN_MS) {
        return;
      }

      lastScrollMessageRef.current = now;
      speak(SCROLL_MESSAGE);
    };

    const handleResize = () => {
      const current = positionRef.current;
      if (!current) return;

      const currentSize = getRobotSize();
      const { maxX, maxY } = getBounds(currentSize);
      const nextPosition = {
        x: clamp(current.x, EDGE_PADDING, maxX),
        y: clamp(current.y, EDGE_PADDING, maxY),
      };

      positionRef.current = nextPosition;
      setPosition(nextPosition);
    };

    scheduleWalk(1800);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      if (initialFrame) window.cancelAnimationFrame(initialFrame);
      if (animationRef.current) window.cancelAnimationFrame(animationRef.current);
      if (roamTimerRef.current) window.clearTimeout(roamTimerRef.current);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [speak]);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (modeRef.current !== "dragging") return;

      const size = getRobotSize();
      const { maxX, maxY } = getBounds(size);
      const nextPosition = {
        x: clamp(event.clientX - dragOffsetRef.current.x, EDGE_PADDING, maxX),
        y: clamp(event.clientY - dragOffsetRef.current.y, EDGE_PADDING, maxY),
      };

      positionRef.current = nextPosition;
      setPosition(nextPosition);
    };

    const handlePointerUp = () => {
      if (modeRef.current !== "dragging") return;
      pausedUntilRef.current = Date.now() + DROP_PAUSE_MS;
      modeRef.current = "standing";
      setMode("standing");
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, []);

  const handleChatSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const question = chatInput.trim();
    if (!question) return;

    setMessages((current) => [
      ...current.slice(-3),
      { from: "user", text: question },
      { from: "bot", text: createPortfolioAnswer(question) },
    ]);
    setChatInput("");
    pausedUntilRef.current = Date.now() + DROP_PAUSE_MS;
  };

  if (!position) return null;

  const robotSize = getRobotSize();
  const isWalking = mode === "walking";
  const isDragging = mode === "dragging";
  const chatAlignLeft = position.x < 190;

  return (
    <div
      className={`robo-assistant fixed left-0 top-0 z-[80] ${
        chatAlignLeft ? "chat-left" : ""
      }`}
      style={{
        width: robotSize,
        height: getRobotHeight(robotSize),
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      <div className="robo-chat" aria-live="polite">
        <div className="robo-chat-log">
          {messages.slice(-4).map((message, index) => (
            <p
              key={`${message.from}-${index}-${message.text}`}
              className={message.from === "user" ? "from-user" : "from-bot"}
            >
              {message.text}
            </p>
          ))}
        </div>
        <form onSubmit={handleChatSubmit} className="robo-chat-form">
          <input
            value={chatInput}
            onChange={(event) => setChatInput(event.target.value)}
            placeholder="Ask about Javad..."
            aria-label="Ask the portfolio assistant"
          />
          <button type="submit">Ask</button>
        </form>
      </div>

      <div
        role="button"
        aria-label="Drag the little chibi character"
        tabIndex={0}
        data-cursor-label={isDragging ? "Drop Me" : "Grab Me"}
        data-cursor-type="social-btn"
        onPointerDown={(event) => {
          const target = event.currentTarget;
          const rect = target.getBoundingClientRect();

          event.preventDefault();
          target.setPointerCapture(event.pointerId);
          dragOffsetRef.current = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
          };

          if (animationRef.current) {
            window.cancelAnimationFrame(animationRef.current);
          }
          if (roamTimerRef.current) {
            window.clearTimeout(roamTimerRef.current);
          }

          modeRef.current = "dragging";
          setMode("dragging");
        }}
        onKeyDown={(event) => {
          const current = positionRef.current;
          if (!current) return;

          const step = event.shiftKey ? 32 : 16;
          const size = getRobotSize();
          const { maxX, maxY } = getBounds(size);
          const nextPosition = { ...current };

          if (event.key === "ArrowLeft") nextPosition.x -= step;
          if (event.key === "ArrowRight") nextPosition.x += step;
          if (event.key === "ArrowUp") nextPosition.y -= step;
          if (event.key === "ArrowDown") nextPosition.y += step;

          if (
            ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(
              event.key,
            )
          ) {
            event.preventDefault();
            positionRef.current = {
              x: clamp(nextPosition.x, EDGE_PADDING, maxX),
              y: clamp(nextPosition.y, EDGE_PADDING, maxY),
            };
            setPosition(positionRef.current);
            pausedUntilRef.current = Date.now() + DROP_PAUSE_MS;
          }
        }}
        className="robo-toy touch-none outline-none transition-[filter] duration-300 focus-visible:drop-shadow-[0_0_0.75rem_rgba(0,96,84,0.45)]"
        style={{
          width: robotSize,
          height: getRobotHeight(robotSize),
          cursor: isDragging ? "grabbing" : "grab",
          transform: `scaleX(${facing})`,
        }}
      >
        <svg
          viewBox="0 0 180 230"
          aria-hidden="true"
          className={`h-full w-full overflow-visible drop-shadow-[0_10px_14px_rgba(0,0,0,0.16)] ${
            isWalking ? "robo-toy-walk" : ""
          } ${isDragging ? "robo-toy-held" : ""}`}
        >
          <defs>
            <linearGradient id="mascot-hair" x1="0.1" x2="0.9" y1="0" y2="1">
              <stop offset="0%" stopColor="#263b46" />
              <stop offset="45%" stopColor="#0d0d0d" />
              <stop offset="100%" stopColor="#111921" />
            </linearGradient>
            <linearGradient id="mascot-robe" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#273047" />
              <stop offset="100%" stopColor="#121525" />
            </linearGradient>
            <linearGradient id="mascot-panel" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#21422f" />
              <stop offset="100%" stopColor="#0e2d22" />
            </linearGradient>
            <linearGradient id="mascot-eye" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#6d5731" />
              <stop offset="100%" stopColor="#21170e" />
            </linearGradient>
          </defs>

          <g className="robo-toy-body" vectorEffect="non-scaling-stroke">
            <ellipse cx="91" cy="218" rx="42" ry="7" fill="rgba(0,0,0,0.12)" />

            <path
              d="M43 92 C29 116 28 139 42 153 C30 159 24 169 18 181 C33 178 47 170 58 158 L54 108 Z"
              fill="#0d0d0d"
              stroke="#070707"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <path
              d="M135 91 C153 114 153 139 138 154 C153 161 161 173 166 186 C147 181 132 170 121 157 L126 108 Z"
              fill="#0d0d0d"
              stroke="#070707"
              strokeWidth="4"
              strokeLinejoin="round"
            />

            <g
              className="robo-toy-legs"
              fill="#171a2b"
              stroke="#070707"
              strokeWidth="4"
              strokeLinejoin="round"
            >
              <path
                className="robo-leg-left"
                d="M65 174 C58 186 57 204 65 211 C74 216 85 210 84 198 L82 174 Z"
              />
              <path
                className="robo-leg-right"
                d="M95 174 C105 187 107 204 99 211 C90 216 79 210 81 198 L82 174 Z"
              />
            </g>
            <path
              d="M64 207 C55 211 52 216 58 220 C70 222 82 218 86 211"
              fill="#f8f5ee"
              stroke="#070707"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <path
              d="M95 207 C105 211 109 216 103 220 C91 222 80 218 77 211"
              fill="#f8f5ee"
              stroke="#070707"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <path
              d="M58 218 C66 213 75 213 83 216"
              fill="none"
              stroke="#8d2921"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M79 216 C88 213 97 214 104 218"
              fill="none"
              stroke="#8d2921"
              strokeWidth="3"
              strokeLinecap="round"
            />

            <path
              d="M53 124 C43 140 44 163 55 179 C66 185 94 186 112 179 C123 162 122 139 108 124 Z"
              fill="url(#mascot-robe)"
              stroke="#070707"
              strokeWidth="4.4"
              strokeLinejoin="round"
            />
            <path
              d="M70 122 L93 142 L74 179 L54 165 C53 150 58 135 70 122 Z"
              fill="#222944"
              stroke="#070707"
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            <path
              d="M96 123 L78 143 L106 178 L119 164 C119 147 112 133 96 123 Z"
              fill="#171b31"
              stroke="#070707"
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            <path
              d="M70 126 C76 135 85 141 95 144"
              fill="none"
              stroke="#65708f"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.9"
            />
            <path
              d="M74 152 C83 159 92 163 104 163"
              fill="none"
              stroke="#65708f"
              strokeWidth="2.7"
              strokeLinecap="round"
              opacity="0.8"
            />

            <path
              d="M91 139 L123 139 L123 181 L72 181 L72 151 Z"
              fill="url(#mascot-panel)"
              stroke="#a17925"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <path
              d="M91 139 V181"
              stroke="#a17925"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M72 158 H123"
              stroke="#a17925"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M103 144 L114 177"
              stroke="#b9d4bd"
              strokeWidth="7"
              strokeLinecap="round"
              opacity="0.55"
            />
            <path
              d="M122 151 C132 149 139 151 146 156"
              fill="none"
              stroke="#a17925"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M144 151 L150 145"
              stroke="#a17925"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M145 157 L152 162"
              stroke="#a17925"
              strokeWidth="3"
              strokeLinecap="round"
            />

            <path
              d="M48 136 C38 149 38 169 49 177 C58 176 61 165 58 154 L60 136 Z"
              fill="#1e243c"
              stroke="#070707"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <path
              d="M50 174 C53 181 61 181 64 174 C61 168 54 166 50 174 Z"
              fill="#f5d6cc"
              stroke="#070707"
              strokeWidth="2.8"
              strokeLinejoin="round"
            />
            <path
              d="M112 134 C128 146 132 165 121 176 C110 176 104 167 106 155 Z"
              fill="#1e243c"
              stroke="#070707"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <path
              d="M77 142 C83 137 91 139 94 147 C90 153 80 154 75 148 C73 145 74 143 77 142 Z"
              fill="#f5d6cc"
              stroke="#070707"
              strokeWidth="2.8"
              strokeLinejoin="round"
            />
            <path
              d="M82 144 C86 144 90 146 92 149"
              fill="none"
              stroke="#d99b93"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <g className="robo-head">
              <path
                d="M82 10 C94 0 115 3 123 16 C130 28 124 43 110 47 C94 51 79 43 76 30 C74 21 76 14 82 10 Z"
                fill="url(#mascot-hair)"
                stroke="#070707"
                strokeWidth="4.2"
                strokeLinejoin="round"
              />
              <path
                d="M22 76 C17 49 29 29 53 19 C77 9 114 15 133 36 C150 55 150 90 132 110 C115 128 75 132 47 119 C28 110 20 94 22 76 Z"
                fill="#f4d6c9"
                stroke="#070707"
                strokeWidth="4.5"
                strokeLinejoin="round"
              />
              <path
                d="M30 77 C25 53 35 33 56 24 C82 13 120 20 139 45 C130 36 116 31 99 30 C76 29 57 36 46 51 L40 80 C35 80 32 79 30 77 Z"
                fill="url(#mascot-hair)"
                stroke="#070707"
                strokeWidth="4.4"
                strokeLinejoin="round"
              />
              <path
                d="M136 67 C144 62 153 68 152 80 C151 92 142 101 134 98 C129 95 130 75 136 67 Z"
                fill="#f4d6c9"
                stroke="#070707"
                strokeWidth="3.8"
                strokeLinejoin="round"
              />
              <circle cx="142" cy="94" r="4.3" fill="#222050" />
              <path
                d="M123 38 C137 51 139 75 131 97 C124 114 111 124 95 129 C105 109 108 86 104 65 C101 50 95 41 87 35 Z"
                fill="#0d0d0d"
                stroke="#070707"
                strokeWidth="4.2"
                strokeLinejoin="round"
              />
              <path
                d="M106 30 C109 50 108 72 102 91"
                fill="none"
                stroke="#344852"
                strokeWidth="4.5"
                strokeLinecap="round"
                opacity="0.8"
              />
              <path
                d="M75 25 C72 42 72 58 76 73"
                fill="none"
                stroke="#344852"
                strokeWidth="3.6"
                strokeLinecap="round"
                opacity="0.75"
              />
              <path
                d="M91 23 C91 42 89 59 84 77"
                fill="none"
                stroke="#344852"
                strokeWidth="3.6"
                strokeLinecap="round"
                opacity="0.75"
              />
              <path
                d="M52 27 C48 43 47 58 50 72"
                fill="none"
                stroke="#344852"
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.7"
              />
              <path
                d="M32 98 C24 110 15 116 5 119 C19 122 35 116 47 103 Z"
                fill="#0d0d0d"
                stroke="#070707"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              <path
                d="M129 98 C139 111 149 117 163 120 C145 124 130 117 118 103 Z"
                fill="#0d0d0d"
                stroke="#070707"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              <path
                d="M116 36 C113 60 109 85 99 105"
                fill="none"
                stroke="#5d7780"
                strokeWidth="5"
                strokeLinecap="round"
                opacity="0.65"
              />

              <path
                d="M48 88 C59 81 72 80 84 84"
                fill="none"
                stroke="#070707"
                strokeWidth="3.6"
                strokeLinecap="round"
              />
              <path
                d="M96 84 C108 80 121 82 132 88"
                fill="none"
                stroke="#070707"
                strokeWidth="3.6"
                strokeLinecap="round"
              />
              <path
                d="M48 94 C59 90 74 90 83 95 C78 104 67 109 55 106 C49 103 47 99 48 94 Z"
                fill="#f7f3ed"
                stroke="#070707"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <path
                d="M97 95 C108 90 123 91 132 96 C127 105 115 109 104 106 C99 103 96 99 97 95 Z"
                fill="#f7f3ed"
                stroke="#070707"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <path
                d="M59 94 C65 92 75 93 80 96 C75 101 67 103 59 101 Z"
                fill="url(#mascot-eye)"
              />
              <path
                d="M107 95 C115 92 124 94 129 97 C124 102 115 103 108 101 Z"
                fill="url(#mascot-eye)"
              />
              <path
                d="M49 91 C59 90 71 91 84 95"
                fill="none"
                stroke="#070707"
                strokeWidth="2.6"
                strokeLinecap="round"
              />
              <path
                d="M97 95 C108 91 121 92 133 96"
                fill="none"
                stroke="#070707"
                strokeWidth="2.6"
                strokeLinecap="round"
              />
              <path
                d="M76 114 C85 119 96 119 104 114"
                fill="none"
                stroke="#6d3a35"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <circle cx="37" cy="94" r="3.2" fill="#222050" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
