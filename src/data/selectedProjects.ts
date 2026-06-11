import type { StaticImageData } from "next/image";
import projectOnePreview from "@/assets/project-images/project-1.png";
import projectTwoPreview from "@/assets/project-images/project-2.png";
import projectThreePreview from "@/assets/project-images/project-3.png";
import projectFourPreview from "@/assets/project-images/project-4.png";
import mobileViewHayon from "@/assets/project-images/mobile-view-hayon.png";

export type SelectedProject = {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  year: string;
  previewImage: StaticImageData;
  mobilePreviewImage?: StaticImageData;
  mobilePreviewDescription?: string;
  liveUrl?: string;
  githubUrl?: string;
  timeline: string;
  projectType: string;
  tools: string[];
  role: string;
  overview: string;
  challenge: string;
  solution: string;
  highlights: string[];
};

export const selectedProjects: SelectedProject[] = [
  {
    id: "002",
    slug: "hayon",
    title: "Hayon",
    category: "WEB APP · INTERFACE",
    description:
      "An all-in-one social media planning platform featuring a streamlined landing page and a functional dashboard, designed with a focus on seamless mobile navigation.",
    year: "2026",
    liveUrl: "https://hayon.site",
    githubUrl: "https://github.com/devxtra-community/hayon",
    previewImage: projectOnePreview,
    mobilePreviewImage: mobileViewHayon,
    mobilePreviewDescription:
      "The dashboard and navigation system showcase a refined UI/UX approach, prioritizing clarity and ease of use on smaller screens. The navigation bar is designed for thumb-friendly interaction, allowing users to switch contexts without friction, while the dashboard layout organizes complex data into digestible, visually balanced modules that maintain high readability and engagement.",
    timeline: "2026",
    projectType: "Social media web app",
    tools: ["Next.js", "TypeScript", "Responsive UI"],
    role: "Full-stack developer",
    overview:
      "Hayon brings content planning and publishing into a focused workspace for teams that need to move quickly without scattering their ideas across tools.",
    challenge:
      "The product needed to make social media planning feel organized and approachable while still supporting a professional publishing workflow.",
    solution:
      "I shaped the experience around a clean mobile-first interface, featuring a streamlined landing page and a functional dashboard. The navigation bar design facilitates seamless movement between these core views, ensuring a cohesive user journey.",
    highlights: [
      "Unified planning workspace",
      "Mobile-first interface direction",
      "Content and publishing flow",
      "Clean landing experience",
    ],
  },
  {
    id: "003",
    slug: "trendzy",
    title: "Trendzy",
    category: "ECOMMERCE · UI/UX",
    description:
      "A modern ecommerce website for a men's dress shop, designed with a clean shopping flow, polished product presentation, and sharp UI/UX details.",
    year: "2026",
    liveUrl: "https://trendzy-javad.vercel.app/",
    githubUrl: "https://github.com/javaadde/trendzy.frontend",
    previewImage: projectTwoPreview,
    timeline: "2026",
    projectType: "Fashion ecommerce",
    tools: ["Responsive UI", "Product pages", "Checkout flow"],
    role: "UI/UX designer and developer",
    overview:
      "Trendzy is a modern shopping experience for a men's fashion store, built around strong product visuals, minimal browsing friction, and a premium editorial feel.",
    challenge:
      "The store needed to look fashion-forward while keeping the path from discovery to product details simple and familiar for shoppers.",
    solution:
      "I focused the interface on large visual product moments, clean category navigation, and a polished product layout that keeps sizing, details, and actions easy to scan.",
    highlights: [
      "Modern menswear storefront",
      "Product-focused visual system",
      "Clean category browsing",
      "Responsive ecommerce experience",
    ],
  },
  {
    id: "004",
    slug: "lumiere-jewels",
    title: "Lumiere Jewels",
    category: "ECOMMERCE · PRODUCT SHOWCASE",
    description:
      "An ecommerce showcase website for a jewellery company, built to present their product collections clearly and let customers send enquiries directly through WhatsApp.",
    year: "2026",
    previewImage: projectThreePreview,
    timeline: "2026",
    projectType: "Jewellery showcase",
    tools: ["Product catalogue", "WhatsApp enquiry", "Responsive UI"],
    role: "Designer and developer",
    overview:
      "Lumiere Jewels gives the company a refined digital catalogue where customers can explore collections and quickly start a WhatsApp enquiry.",
    challenge:
      "The company needed a site that felt elegant and trustworthy without forcing customers through a full checkout system before asking about availability or custom details.",
    solution:
      "I built the experience around product discovery, collection clarity, and direct enquiry actions so interested buyers can move from browsing to WhatsApp smoothly.",
    highlights: [
      "Jewellery collection showcase",
      "Direct WhatsApp enquiry flow",
      "Company-focused product presentation",
      "Elegant responsive layout",
    ],
  },
  {
    id: "005",
    slug: "kido",
    title: "Kido",
    category: "ECOMMERCE · ADMIN PANEL",
    description:
      "A kids fashion ecommerce website with an integrated admin panel for managing products, collections, and store content from one clean dashboard.",
    year: "2026",
    liveUrl: "https://kids-wearing-ecom.vercel.app/",
    githubUrl: "https://github.com/javaadde/kids-wearing-ecom",
    previewImage: projectFourPreview,
    timeline: "2026",
    projectType: "Kids fashion ecommerce",
    tools: ["Admin panel", "Product management", "Responsive UI"],
    role: "Full-stack developer",
    overview:
      "Kido is a playful but practical ecommerce platform for kids fashion, paired with an admin panel that keeps store management straightforward.",
    challenge:
      "The project needed to balance a friendly shopping experience for customers with reliable product and content controls for the store team.",
    solution:
      "I connected the storefront with admin workflows for products, collections, and store content, keeping the customer side polished and the management side efficient.",
    highlights: [
      "Kids fashion storefront",
      "Integrated admin dashboard",
      "Product and collection management",
      "Responsive shopping experience",
    ],
  },
];

export function getSelectedProject(slug: string) {
  return selectedProjects.find((project) => project.slug === slug);
}
