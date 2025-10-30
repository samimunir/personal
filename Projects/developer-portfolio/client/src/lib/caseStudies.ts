// ──────────────────────────────────────────────────────────────
// CASE STUDY SYSTEM — Inline Tailwind + React Router
// Adds a reusable CaseStudy layout with sticky TOC, stats, sections, and gallery.
// Creates: /work/:slug route for deep‑dive project pages (CareerNest, Vectra, ATC).
// ──────────────────────────────────────────────────────────────

// FILE: src/lib/caseStudies.ts
export type CaseStudy = {
  slug: string;
  title: string;
  period?: string;
  role?: string;
  stack?: string[];
  links?: { live?: string; repo?: string; demo?: string };
  hero?: {
    image?: string;
    summary?: string;
    kpis?: { label: string; value: string }[];
  };
  sections: Array<{
    id: string;
    label: string;
    kind: "markdown" | "list" | "image" | "code";
    content: string | string[];
  }>;
  gallery?: Array<{ src: string; caption?: string }>;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "careernest",
    title: "CareerNest — Analytics‑heavy Job‑Tracking SaaS",
    period: "2025",
    role: "Founder, Full‑stack Engineer",
    stack: ["React", "TypeScript", "Node", "Express", "MongoDB", "Tailwind"],
    links: { live: "#", repo: "#", demo: "#" },
    hero: {
      summary:
        "Enterprise‑style SaaS with dashboards, subscriptions, and KPI tracking. Focused on time‑to‑insight and reliability.",
      kpis: [
        { label: "LCP", value: "≤2.2s" },
        { label: "INP", value: "≤180ms" },
        { label: "Uptime", value: "99.9%" },
      ],
    },
    sections: [
      {
        id: "context",
        label: "Context & Problem",
        kind: "markdown",
        content:
          "Job seekers juggle dozens of applications without visibility into funnel health. CareerNest centralizes tracking and adds real metrics so users can prioritize actions that move the needle.",
      },
      {
        id: "architecture",
        label: "Architecture",
        kind: "list",
        content: [
          "MERN app with REST API and token‑guarded admin routes",
          "Mongo models normalized for queries (Applications, Companies, Activities)",
          "Pino logging + request IDs; rate limiting on auth and webhooks",
          "Lazy‑loaded charts; SSR not required; CDN‑optimized images",
        ],
      },
      {
        id: "features",
        label: "Key Features",
        kind: "list",
        content: [
          "Dashboard KPIs: pipeline health, response rates, time‑to‑offer",
          "Rich filters/tags, saved views, and CSV import",
          "Subscription/billing stubbed (Stripe‑ready)",
        ],
      },
      {
        id: "metrics",
        label: "Performance & Metrics",
        kind: "list",
        content: [
          "Core Web Vitals budget: LCP < 2.5s, CLS < 0.1, INP < 200ms",
          "Image srcset + AVIF; route‑level code splitting",
          "Preconnect + font‑display: swap",
        ],
      },
      {
        id: "learnings",
        label: "Trade‑offs & Learnings",
        kind: "markdown",
        content:
          "Optimized for simple deployment paths over SSR. Chose file‑based content for docs to reduce operational overhead and keep focus on user outcomes.",
      },
    ],
    gallery: [
      {
        src: "https://picsum.photos/seed/cnest1/1200/800",
        caption: "Dashboard overview (placeholder)",
      },
      {
        src: "https://picsum.photos/seed/cnest2/1200/800",
        caption: "Filters & saved views (placeholder)",
      },
      {
        src: "https://picsum.photos/seed/cnest3/1200/800",
        caption: "Application detail (placeholder)",
      },
    ],
  },
  {
    slug: "vectra",
    title: "Vectra — KPI‑Driven Analytics Platform",
    period: "2025",
    role: "Founder, Full‑stack Engineer",
    stack: ["React", "TypeScript", "Node", "MongoDB", "Tailwind"],
    links: { live: "#", repo: "#", demo: "#" },
    hero: {
      summary:
        "Analytics‑first dashboard with micro‑service flavored routes and data pipelines.",
      kpis: [
        { label: "P95 API", value: "≤120ms" },
        { label: "Cache hit", value: "~85%" },
        { label: "Downtime", value: "<0.1%" },
      ],
    },
    sections: [
      {
        id: "context",
        label: "Context & Problem",
        kind: "markdown",
        content:
          "Teams struggle to quantify effort vs. outcome; Vectra aligns KPIs with strategy and execution.",
      },
      {
        id: "architecture",
        label: "Architecture",
        kind: "list",
        content: [
          "API gateway + feature routes",
          "Background workers for heavy lifts",
          "Pino logs + dashboards",
        ],
      },
      {
        id: "features",
        label: "Key Features",
        kind: "list",
        content: [
          "KPI routes with trendlines",
          "Role‑based views",
          "Export & integrations",
        ],
      },
      {
        id: "metrics",
        label: "Performance & Metrics",
        kind: "list",
        content: ["Aggressive caching", "Streaming responses for long queries"],
      },
      {
        id: "learnings",
        label: "Trade‑offs & Learnings",
        kind: "markdown",
        content:
          "Caching invalidation strategies require tight contracts and observability.",
      },
    ],
    gallery: [
      { src: "https://picsum.photos/seed/vectra1/1200/800" },
      { src: "https://picsum.photos/seed/vectra2/1200/800" },
    ],
  },
  {
    slug: "atc-sim",
    title: "ATC Simulator — Ultra‑Realistic Air‑Traffic Control",
    period: "2025",
    role: "Engineer",
    stack: ["Python", "WebGL front‑end", "Tailwind"],
    links: { demo: "#" },
    hero: {
      summary:
        "Real‑time aircraft simulation with runway logic, traffic generation, and heat‑map trails.",
    },
    sections: [
      {
        id: "context",
        label: "Context & Problem",
        kind: "markdown",
        content:
          "Most ATC sims are either toy‑like or opaque. This sim balances realism with UX.",
      },
      {
        id: "architecture",
        label: "Architecture",
        kind: "list",
        content: [
          "Physics loop + deterministic RNG",
          "Arrival/Departure runway alignment",
          "Pathfinding & separation",
        ],
      },
      {
        id: "features",
        label: "Key Features",
        kind: "list",
        content: [
          "Dynamic flight generation",
          "Heat‑map trails",
          "Scenario scripting",
        ],
      },
      {
        id: "metrics",
        label: "Performance & Metrics",
        kind: "list",
        content: ["60 FPS target", "Frame budget overlays for tuning"],
      },
      {
        id: "learnings",
        label: "Trade‑offs & Learnings",
        kind: "markdown",
        content:
          "GPU overdraw was the main bottleneck; batching and culling solved 80%.",
      },
    ],
  },
];

export function findCaseStudy(slug: string) {
  return CASE_STUDIES.find((s) => s.slug === slug);
}
