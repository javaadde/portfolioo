export interface ExperienceProduct {
  name: string;
  tagline?: string;
  description: string;
  role: string;
  link?: string;
  logo?: string;
  type: "Shipped Product" | "Contributed Product";
}

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
  products: ExperienceProduct[];
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
    role: "Software Developer",
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
        name: "Papr",
        tagline: "Financial paperwork, tracked",
        description:
          "Who owes you. Who you owe. What's in the bank. Paperwork tracking for small companies without an accountant. Ledger, invoices, expense tracking & PDF storage.",
        role: "Full-Stack Development",
        link: "https://papr.work/",
        logo: "/papr.png",
        type: "Shipped Product",
      },
      {
        name: "remain.fit",
        tagline: "The real challenge isn't getting fit. It's remaining fit.",
        description:
          "Small, single-purpose tools for the hard part of fitness: remaining fit. Fasting, weight, streaks, and hydration with one account and a quiet design language.",
        role: "Frontend & Web Engineering",
        link: "https://remain.fit/",
        logo: "/remain.png",
        type: "Contributed Product",
      },
      {
        name: "SmileOX",
        tagline: "Consumer gateway before clinical care begins",
        description:
          "Complete growth operating system for dental clinics. Automated patient communications, AI-driven enquiry actions, marketing pipelines, and actionable practice analytics.",
        role: "Frontend & Feature Engineering",
        link: "https://smileox.com.au/",
        logo: "/smileox.png",
        type: "Contributed Product",
      },
    ],
    techStack: ["Next.js", "TypeScript", "React", "Node.js", "PostgreSQL", "Tailwind CSS", "Docker"],
    accentColor: "#7c3aed",
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
        name: "Hayon",
        tagline: "All-in-one social planning & workspace platform",
        description:
          "Streamlined social media workspace featuring an intuitive mobile-first landing experience and a full functional scheduling dashboard.",
        role: "Core Frontend & Interactions",
        link: "https://hayon.site",
        logo: "/hayon.webp",
        type: "Shipped Product",
      },
      {
        name: "DevX Component Guild",
        tagline: "Modular accessible component kit",
        description:
          "Modular accessible UI component library and prototyping kit authoring interactive GSAP micro-interactions.",
        role: "Design System & UI Engineering",
        link: "https://github.com/devxtra-community/hayon",
        type: "Contributed Product",
      },
    ],
    techStack: ["React", "TypeScript", "GSAP", "Tailwind CSS", "Framer Motion", "Next.js", "Zustand"],
    accentColor: "#16a34a",
    metrics: [
      { label: "EXPERIENCE", value: "8 MOS" },
      { label: "PRODUCTS", value: "3 SHIPPED" },
      { label: "COMMUNITY", value: "KOCHI" },
    ],
  },
];
