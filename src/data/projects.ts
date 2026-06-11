export interface Project {
    id: number;
    name: string;
    slug: string;
    category: string;
    rating: string;
    image: string;
    description: string;
    technologies: string[];
    githubUrl?: string;
    demoUrl?: string;
    features: string[];
}

export const projects: Project[] = [
    {
        id: 1,
        name: "Hayon",
        slug: "hayon",
        category: "Social Media Platform",
        rating: "9.4",
        image: "/abstract_tech.png",
        description: "An all-in-one social media planning platform featuring a streamlined landing page and a functional dashboard. The navigation bar design facilitates seamless movement between these core views for an optimized mobile-first experience.",
        technologies: ["Web App", "Responsive UI", "Content Planning", "Publishing Flow"],
        githubUrl: "https://github.com/devxtra-community/hayon",
        demoUrl: "https://hayon.site",
        features: [
            "Unified social media planning workflow",
            "Clean mobile-first landing experience",
            "Streamlined content organization",
            "Publishing-focused interface design",
            "Responsive layout across devices"
        ]
    },
    {
        id: 2,
        name: "GitHub Contribution Widget",
        slug: "github-contribution-widget",
        category: "Desktop App",
        rating: "9.2",
        image: "/projects/github-widget.png",
        description: "A customizable desktop widget that displays GitHub contribution graphs. Built with Electron for cross-platform compatibility and auto-start on system boot.",
        technologies: ["Electron", "TypeScript", "HTML", "CSS"],
        githubUrl: "https://github.com/javaadde",
        features: [
            "Change GitHub username in settings",
            "Adjustable widget size",
            "Auto-start on system boot",
            "Draggable widget interface",
            "Real-time contribution graph updates"
        ]
    },
    {
        id: 3,
        name: "Viewly",
        slug: "viewly",
        category: "Testing",
        rating: "7.7",
        image: "/projects/viewly.png",
        description: "A beautiful weather dashboard providing real-time weather data, forecasts, and interactive maps.",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
        githubUrl: "https://github.com/javaadde/viewly",
        demoUrl: "https://viewly-two.vercel.app",
        features: [
            "Real-time weather updates",
            "7-day forecast",
            "Interactive weather maps",
            "Location-based detection",
            "Weather alerts and notifications"
        ]
    },
    {
        id: 4,
        name: "Kido",
        slug: "kido",
        category: "Kids Fashion Ecommerce",
        rating: "9.1",
        image: "/projects/project-4.png",
        description: "A kids fashion ecommerce website with an integrated admin panel for managing products, collections, and store content from one clean dashboard.",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Admin Panel"],
        githubUrl: "https://github.com/javaadde/kids-wearing-ecom",
        demoUrl: "https://kids-wearing-ecom.vercel.app/",
        features: [
            "Kids fashion storefront",
            "Integrated admin dashboard",
            "Product and collection management",
            "Responsive shopping experience"
        ]
    },
    {
        id: 5,
        name: "UIfry design clone",
        slug: "uifry-design-clone",
        category: "Design",
        rating: "8.9",
        image: "/projects/design-clone2.png",
        description: "A Fully-Responsive Landing page desing of panto which is cloned for purpose of studying",
        technologies: ["html", "javaScript", "tailwindcss",],
        githubUrl: "https://github.com/javaadde/FigmaDesign",
        demoUrl: "https://javaadde.github.io/FigmaDesign/one/design.html",
        features: [
            "User authentication and profiles",
            "Post creation with media upload",
            "Real-time chat messaging",
            "Like, comment, and share functionality",
            "Follow/unfollow system"
        ]
    },

];
