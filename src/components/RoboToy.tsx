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
type RoboVariant = "home" | "peek";

const ROBOT_SIZE = 96;
const MOBILE_ROBOT_SIZE = 78;
const EDGE_PADDING = 12;
const DROP_PAUSE_MS = 12000;
const MIN_STAND_MS = 10000;
const MAX_STAND_MS = 15000;
const COMMENT_DURATION_MS = 5000;
const SCROLL_MESSAGE_COOLDOWN_MS = 12000;
const INTRO_MESSAGE =
  "Hey, Kuttu here to help. What do you need to know about Javad?";
const SCROLL_MESSAGE = "hey where you going i think you realy need my help";
const PEEK_MESSAGE = "shhhhh! did you need my help?";
const PEEK_DELAY_MS = 5000;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getRobotSize() {
  if (typeof window === "undefined") return ROBOT_SIZE;
  return window.innerWidth < 640 ? MOBILE_ROBOT_SIZE : ROBOT_SIZE;
}

function getRobotHeight(size: number) {
  return size * 1.16;
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
  const bottomGap = window.innerWidth < 640 ? 14 : 24;
  const sideGap = window.innerWidth < 640 ? 12 : 24;

  return {
    x: clamp(window.innerWidth - size - sideGap, EDGE_PADDING, maxX),
    y: clamp(
      window.innerHeight - getRobotHeight(size) - bottomGap,
      EDGE_PADDING,
      maxY,
    ),
  };
}

function getLowerLeftPosition(size: number): Position {
  const { maxX, maxY } = getBounds(size);
  const bottomLift = window.innerWidth < 640 ? 70 : 92;

  return {
    x: clamp(window.innerWidth < 640 ? 20 : 42, EDGE_PADDING, maxX),
    y: clamp(maxY - bottomLift, EDGE_PADDING, maxY),
  };
}

function getRandomWalkTarget(size: number): Position {
  const { maxX, maxY } = getBounds(size);
  const topLimit = window.innerWidth < 640 ? 82 : 98;

  return {
    x: clamp(EDGE_PADDING + Math.random() * maxX, EDGE_PADDING, maxX),
    y: clamp(
      topLimit + Math.random() * (maxY - topLimit),
      EDGE_PADDING,
      maxY,
    ),
  };
}

function getRandomPeekPosition(size: number): Position {
  const height = getRobotHeight(size);
  const side = Math.random() > 0.5 ? "right" : "left";
  const verticalSlots = [
    EDGE_PADDING + 72,
    window.innerHeight * 0.46 - height * 0.5,
    window.innerHeight - height - 72,
  ];
  const y = verticalSlots[Math.floor(Math.random() * verticalSlots.length)];

  return {
    x:
      side === "right"
        ? window.innerWidth - size * 0.7
        : -size * 0.3,
    y: clamp(y, EDGE_PADDING + 64, window.innerHeight - height - EDGE_PADDING),
  };
}

function getStandDelay() {
  return MIN_STAND_MS + Math.random() * (MAX_STAND_MS - MIN_STAND_MS);
}

function createPortfolioAnswer(question: string) {
  const q = question.toLowerCase();

  if (/(hide|hiding|hidden|peek|peeking|sneak|paali|pali|nokkuka)/.test(q)) {
    return "Shhh... don't talk loudly. Javad's gonna see me.";
  }

  if (
    /(kuttu|your name|ur name|robot name|assistant name|who are you|what are you)/.test(
      q,
    )
  ) {
    return "My name is Kuttu. I'm Javad's little robo pet, here to help you explore his portfolio.";
  }

  if (/\b(thanks|thank you|thank u|appreciate it|good|nice|great|awesome|well done)\b/.test(q)) {
    return "You're welcome. Glad I could help.";
  }

  if (
    /(phone|number|mobile|whatsapp)/.test(q)
  ) {
    return "7902937442";
  }

  if (/(insta|instagram|instegram)/.test(q)) {
    return "@javaadde";
  }

  if (/\b(x|twitter)\b/.test(q)) {
    return "javaaddee";
  }

  if (/linkedin/.test(q)) {
    return "javaadde";
  }

  if (/github/.test(q)) {
    return "javaadde";
  }

  if (/(email|mail)/.test(q)) {
    return "javaadde@gmail.com";
  }

  if (
    /(contact|connect|hire|freelance|available|availability|job|dm|social (media )?(id|handle|link|profile|account))/.test(
      q,
    )
  ) {
    return "Click the Connect button in the menu and choose the channel you prefer.";
  }

  if (/\b(hello|hi|hey|help)\b/.test(q)) {
    return "Hey, Kuttu here. I can help with Javad's portfolio, projects, skills, contact, and availability.";
  }

  if (/(who|owner|javad|about|bio|profile)/.test(q)) {
    return "This portfolio belongs to Javad, a full-stack developer based in Kochi, Kerala, focused on clean architecture, thoughtful UX, and modern web products.";
  }

  if (/(skill|stack|technology|tools|tech)/.test(q)) {
    return "Javad works with React, Next.js, TypeScript, Tailwind CSS, Framer Motion, Node.js, Express, MongoDB, PostgreSQL, Prisma, Docker, Git, Figma, VS Code, and Linux.";
  }

  if (/(project|work|case|portfolio)/.test(q)) {
    return "Highlighted projects include Hayon, Trendzy, Lumiere Jewels, and Kido: social media planning, ecommerce, product showcases, admin panels, UI/UX, and full-stack development.";
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

  if (/(location|where|based)/.test(q)) {
    return "Javad is based in Kochi, Kerala, India.";
  }

  return "I can only answer about this portfolio and Javad. Ask me about projects, skills, contact, location, or availability.";
}

export default function RoboToy({ variant = "home" }: { variant?: RoboVariant }) {
  const [position, setPosition] = useState<Position | null>(null);
  const [mode, setMode] = useState<RoboMode>("standing");
  const [facing, setFacing] = useState(1);
  const [comment, setComment] = useState<string | null>(
    variant === "home" ? INTRO_MESSAGE : null,
  );
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { from: "bot", text: INTRO_MESSAGE },
  ]);
  const [chatInput, setChatInput] = useState("");
  const modeRef = useRef<RoboMode>("standing");
  const positionRef = useRef<Position | null>(null);
  const dragOffsetRef = useRef<Position>({ x: 0, y: 0 });
  const pointerStartRef = useRef<Position | null>(null);
  const animationRef = useRef<number | null>(null);
  const roamTimerRef = useRef<number | null>(null);
  const peekTimerRef = useRef<number | null>(null);
  const commentTimerRef = useRef<number | null>(null);
  const pausedUntilRef = useRef(0);
  const firstWalkRef = useRef(true);
  const lastScrollMessageRef = useRef(0);
  const scheduleWalkRef = useRef<(delay?: number) => void>(() => {});

  const showComment = useCallback((text: string) => {
    setComment(text);

    if (commentTimerRef.current) {
      window.clearTimeout(commentTimerRef.current);
    }

    commentTimerRef.current = window.setTimeout(() => {
      setComment(null);
    }, COMMENT_DURATION_MS);
  }, []);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  useEffect(() => {
    if (variant === "peek") {
      const size = getRobotSize();
      const hiddenPosition = {
        x: window.innerWidth + size,
        y: window.innerHeight * 0.5,
      };

      positionRef.current = hiddenPosition;

      peekTimerRef.current = window.setTimeout(() => {
        const nextPosition = getRandomPeekPosition(getRobotSize());
        positionRef.current = nextPosition;
        setPosition(nextPosition);
        setFacing(nextPosition.x < 0 ? 1 : -1);
        showComment(PEEK_MESSAGE);
      }, PEEK_DELAY_MS);

      const handleResize = () => {
        const nextPosition = getRandomPeekPosition(getRobotSize());
        positionRef.current = nextPosition;
        setPosition(nextPosition);
        setFacing(nextPosition.x < 0 ? 1 : -1);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        if (peekTimerRef.current) window.clearTimeout(peekTimerRef.current);
        if (commentTimerRef.current) window.clearTimeout(commentTimerRef.current);
        window.removeEventListener("resize", handleResize);
      };
    }

    const size = getRobotSize();
    const initialPosition = getBottomRightPosition(size);
    let initialFrame = 0;

    positionRef.current = initialPosition;
    initialFrame = window.requestAnimationFrame(() => {
      setPosition(initialPosition);
      showComment(INTRO_MESSAGE);
    });

    const updateMode = (nextMode: RoboMode) => {
      modeRef.current = nextMode;
      setMode(nextMode);
    };

    const scheduleWalk = (delay = getStandDelay()) => {
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
        const target = firstWalkRef.current
          ? getLowerLeftPosition(currentSize)
          : getRandomWalkTarget(currentSize);

        firstWalkRef.current = false;

        const distance = Math.hypot(target.x - start.x, target.y - start.y);
        const duration = clamp(distance * 15, 3000, 9000);
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
          scheduleWalk(getStandDelay());
        };

        animationRef.current = window.requestAnimationFrame(frame);
      }, delay);
    };

    scheduleWalkRef.current = scheduleWalk;

    const handleScroll = () => {
      const now = Date.now();
      if (now - lastScrollMessageRef.current < SCROLL_MESSAGE_COOLDOWN_MS) {
        return;
      }

      lastScrollMessageRef.current = now;
      showComment(SCROLL_MESSAGE);
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

    scheduleWalk(getStandDelay());
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      if (initialFrame) window.cancelAnimationFrame(initialFrame);
      if (animationRef.current) window.cancelAnimationFrame(animationRef.current);
      if (roamTimerRef.current) window.clearTimeout(roamTimerRef.current);
      if (commentTimerRef.current) window.clearTimeout(commentTimerRef.current);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [showComment, variant]);

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

    const handlePointerUp = (event: PointerEvent) => {
      if (modeRef.current !== "dragging") return;

      const pointerStart = pointerStartRef.current;
      const moved = pointerStart
        ? Math.hypot(event.clientX - pointerStart.x, event.clientY - pointerStart.y)
        : 0;

      pausedUntilRef.current = Date.now() + DROP_PAUSE_MS;
      modeRef.current = "standing";
      setMode("standing");

      if (moved < 7) {
        setChatOpen((current) => !current);
      }

      if (variant === "home") {
        scheduleWalkRef.current(DROP_PAUSE_MS + 300);
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [variant]);

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
    if (variant === "home") {
      scheduleWalkRef.current(DROP_PAUSE_MS + 300);
    }
  };

  if (!position) return null;

  const robotSize = getRobotSize();
  const isWalking = mode === "walking";
  const isDragging = mode === "dragging";
  const chatAlignLeft = position.x < 200;
  const isPeek = variant === "peek";
  const chatAlignBelow = isPeek && position.y < 230;

  return (
    <div
      className={`robo-assistant fixed left-0 top-0 z-[80] ${
        chatAlignLeft ? "chat-left" : ""
      } ${chatAlignBelow ? "chat-below" : ""} ${isPeek ? "robo-peek" : ""}`}
      style={{
        width: robotSize,
        height: getRobotHeight(robotSize),
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      {!chatOpen && comment ? (
        <div className="robo-comment" aria-live="polite">
          {comment}
        </div>
      ) : null}

      {chatOpen ? (
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
      ) : null}

      <div
        role="button"
        aria-label="Open or drag Kuttu, the pixel robot assistant"
        tabIndex={0}
        data-cursor-label={isDragging ? "Drop Me" : "Ask Me"}
        data-cursor-type="social-btn"
        onPointerDown={(event) => {
          const target = event.currentTarget;
          const rect = target.getBoundingClientRect();

          event.preventDefault();
          target.setPointerCapture(event.pointerId);
          pointerStartRef.current = { x: event.clientX, y: event.clientY };
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

          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setChatOpen((currentValue) => !currentValue);
            return;
          }

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
            if (variant === "home") {
              scheduleWalkRef.current(DROP_PAUSE_MS + 300);
            }
          }
        }}
        className={`robo-toy pixel-robo-toy touch-none outline-none transition-[filter] duration-300 focus-visible:drop-shadow-[0_0_0.75rem_rgba(0,96,84,0.45)] ${
          isWalking && facing > 0 ? "walk-right" : ""
        } ${isWalking && facing < 0 ? "walk-left" : ""}`}
        style={{
          width: robotSize,
          height: getRobotHeight(robotSize),
          cursor: isDragging ? "grabbing" : "grab",
          transform: `scaleX(${isWalking ? facing : 1})`,
        }}
      >
        <svg
          viewBox="0 0 96 112"
          aria-hidden="true"
          shapeRendering="crispEdges"
          className={`pixel-robot h-full w-full overflow-visible drop-shadow-[0_12px_0_rgba(0,0,0,0.08)] ${
            isWalking ? "robo-toy-walk" : ""
          } ${isDragging ? "robo-toy-held" : ""}`}
        >
          <g className="pixel-robot-core">
            <rect x="37" y="71" width="25" height="24" fill="#111111" />
            <rect x="43" y="77" width="18" height="13" fill="#b9ad82" />
            <rect x="47" y="78" width="16" height="12" fill="#fff8b9" />

            <rect
              className="pixel-leg-left"
              x="42"
              y="94"
              width="6"
              height="12"
              fill="#121212"
            />
            <rect
              className="pixel-leg-right"
              x="58"
              y="94"
              width="6"
              height="12"
              fill="#121212"
            />
            <rect x="38" y="102" width="8" height="5" fill="#101010" />
            <rect x="58" y="102" width="8" height="5" fill="#101010" />

            <rect x="13" y="25" width="20" height="42" fill="#101010" />
            <rect x="18" y="16" width="25" height="54" fill="#b7ad83" />
            <rect x="18" y="16" width="11" height="54" fill="#d8cea1" />
            <rect x="18" y="16" width="25" height="8" fill="#cfc494" />
            <rect x="10" y="36" width="8" height="23" fill="#101010" />
            <rect x="18" y="39" width="12" height="17" fill="#ede8bd" />

            <rect x="31" y="12" width="56" height="56" fill="#101010" />
            <rect x="38" y="20" width="41" height="40" fill="#2d6b5d" />
            <rect x="38" y="20" width="41" height="7" fill="#3e8372" />
            <rect x="39" y="54" width="39" height="6" fill="#245a4d" />
            <rect x="46" y="39" width="7" height="7" fill="#e6e779" />
            <rect x="70" y="39" width="7" height="7" fill="#e6e779" />
            <rect x="40" y="24" width="35" height="4" fill="#0c2e29" />
            <rect x="78" y="21" width="3" height="37" fill="#8fb9a5" />
            <rect x="39" y="58" width="38" height="3" fill="#8fb9a5" />
            <rect x="54" y="54" width="17" height="4" fill="#e6e779" />
          </g>
        </svg>
      </div>
    </div>
  );
}
