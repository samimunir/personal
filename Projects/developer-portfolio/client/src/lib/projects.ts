export type Project = {
  slug: string;
  title: string;
  summary: string;
  stack: string[];
  category: "SaaS" | "Systems" | "Simulation" | "UI/UX";
  cover?: string;
  preview?: string; // optional mp4/gif for hover
};

export const PROJECTS: Project[] = [
  {
    slug: "careernest",
    title: "CareerNest",
    summary: "Job‑tracking SaaS with analytics & subscriptions.",
    stack: ["MERN", "Stripe", "Charts"],
    category: "SaaS",
    cover: "https://picsum.photos/seed/cn1/800/600",
    preview: "",
  },
  {
    slug: "vectra",
    title: "Vectra",
    summary: "KPI‑driven analytics platform and KPI routes.",
    stack: ["MERN", "Workers", "Caching"],
    category: "Systems",
    cover: "https://picsum.photos/seed/ve1/800/600",
  },
  {
    slug: "atc-sim",
    title: "ATC Simulator",
    summary: "Ultra‑realistic ATC with heat‑map trails.",
    stack: ["Python", "WebGL", "Sim"],
    category: "Simulation",
    cover: "https://picsum.photos/seed/atc1/800/600",
  },
  {
    slug: "ui-kit",
    title: "UI Kit",
    summary: "Design system & motion primitives.",
    stack: ["React", "Tailwind", "Motion"],
    category: "UI/UX",
    cover: "https://picsum.photos/seed/ui1/800/600",
  },
];
