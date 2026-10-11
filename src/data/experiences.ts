export interface ExperienceItem {
  id: string;
  company: string;
  fullName: string;
  role: string;
  location: string;
  period: string;
  durationMonths: number;
  durationFormatted: string; // e.g. "1 yr 2 mos"
  durationBadge: string; // e.g. "14 MONTHS"
  tagline: string;
  summary: string;
  highlights: string[];
  products: {
    name: string;
    description: string;
    role: string;
    link?: string;
  }[];
  techStack: string[];
  accentColor: string;
  metrics: {
    label: string;
    value: string;
  }[];
}

export const experiencesData: ExperienceItem[] = [
  {
    id: "bytsolv",
    company: "Bytsolv",
    fullName: "Bytsolv Technologies",
    role: "Full-Stack Developer",
    location: "Kochi, Kerala, India",
    period: "2024 — Present",
    durationMonths: 14,
    durationFormatted: "1 yr 2 mos",
    durationBadge: "14 MONTHS",
    tagline: "High-performance enterprise software & scalable web architectures",
    summary:
      "Engineered end-to-end full-stack web applications, REST & GraphQL APIs, and performant client portals for international businesses and growing startups.",
    highlights: [
      "Architected responsive Next.js and TypeScript frontend solutions with sub-second page loads",
      "Designed and deployed scalable Node.js microservices and database schemas",
      "Collaborated closely with design and QA teams to deliver pixel-perfect user flows",
      "Optimized Core Web Vitals across production platforms, improving client conversion rates",
    ],
    products: [
      {
        name: "Enterprise Cloud Dashboard",
        description: "Real-time telemetry and resource management console for cloud deployments.",
        role: "Lead Full-Stack Architecture",
      },
      {
        name: "Client eCommerce & Commerce Flow",
        description: "Custom headless checkout portal with high availability and automated inventory sync.",
        role: "Frontend & API Integration",
      },
      {
        name: "Internal Analytics Engine",
        description: "Custom data visualization dashboard with interactive graphs and export utilities.",
        role: "Full-Stack Development",
      },
    ],
    techStack: ["Next.js", "TypeScript", "React", "Node.js", "PostgreSQL", "Tailwind CSS", "Docker"],
    accentColor: "#22b34a",
    metrics: [
      { label: "EXPERIENCE", value: "1.2 YRS" },
      { label: "SHIPPED", value: "5+ APPS" },
      { label: "LOCATION", value: "KOCHI" },
    ],
  },
  {
    id: "devxtra",
    company: "Devxtra",
    fullName: "Devxtra Community & Studio",
    role: "Frontend & Creative Technologist",
    location: "Kochi, Kerala, India",
    period: "2023 — 2024",
    durationMonths: 8,
    durationFormatted: "8 mos",
    durationBadge: "8 MONTHS",
    tagline: "Creative web engineering, developer tooling & community products",
    summary:
      "Spearheaded creative web development, interactive user interfaces, and community-driven digital platforms with an obsessive focus on motion and usability.",
    highlights: [
      "Built core modules of the Hayon social media planning platform and design system",
      "Authored interactive GSAP and Framer Motion micro-interactions across community products",
      "Created reusable UI component libraries adopted across internal teams and open-source projects",
      "Mentored junior developers on modern TypeScript and modern layout standards",
    ],
    products: [
      {
        name: "Hayon Platform",
        description: "All-in-one social planning and scheduling suite with mobile-first navigation and rich dashboards.",
        role: "Core Frontend & Interactions",
        link: "https://github.com/devxtra-community/hayon",
      },
      {
        name: "DevX Component Guild",
        description: "Modular accessible component kit designed for rapid product prototyping.",
        role: "Design System & UI Engineering",
      },
      {
        name: "Event & Hackathon Portals",
        description: "High-impact interactive landing pages with custom shaders and micro-animations.",
        role: "Creative Motion & Engineering",
      },
    ],
    techStack: ["React", "TypeScript", "GSAP", "Tailwind CSS", "Framer Motion", "Next.js", "Zustand"],
    accentColor: "#3b82f6",
    metrics: [
      { label: "EXPERIENCE", value: "8 MOS" },
      { label: "PRODUCTS", value: "3 SHIPPED" },
      { label: "COMMUNITY", value: "KOCHI" },
    ],
  },
];
