export type KPI = { label: string; value: string };
export type SectionKind =
  | "markdown"
  | "list"
  | "image"
  | "code"
  | "callout"
  | "beforeafter"
  | "metrics"
  | "timeline";

export type CaseStudy = {
  slug: string;
  title: string;
  period?: string;
  role?: string;
  stack?: string[];
  links?: { live?: string; repo?: string; demo?: string };
  hero?: { image?: string; summary?: string; kpis?: KPI[] };
  sections: Array<{
    id: string;
    label: string;
    kind: SectionKind;
    // content varies by kind
    content: any;
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
          "MERN API with token‑guarded admin routes",
          "Mongo models: Applications, Companies, Activities",
          "Pino logs + request IDs; rate limiting on auth & webhooks",
        ],
      },
      {
        id: "diagram",
        label: "Architecture Diagram",
        kind: "image",
        content: "https://picsum.photos/seed/cn-diag/1200/700",
      },
      {
        id: "kpis",
        label: "Feature Metrics",
        kind: "metrics",
        content: [
          { label: "Response rate", value: "↑ 32%" },
          { label: "Time‑to‑entry", value: "↓ 45%" },
          { label: "Crash‑free", value: "99.98%" },
        ],
      },
      {
        id: "ux",
        label: "UX Choice",
        kind: "callout",
        content: {
          tone: "info",
          text: "Prioritized low‑glare cyan surfaces and calm motion for focus during triage.",
        },
      },
      {
        id: "perf",
        label: "Performance",
        kind: "code",
        content: `// route‑level code splitting
const Work = lazy(() => import('./pages/Work'))
// preconnect + font‑display swap in index.html`,
      },
      {
        id: "visual",
        label: "Before / After",
        kind: "beforeafter",
        content: {
          before: "https://picsum.photos/seed/cn-before/1200/720",
          after: "https://picsum.photos/seed/cn-after/1200/720",
        },
      },
      {
        id: "timeline",
        label: "Timeline",
        kind: "timeline",
        content: [
          { date: "2025‑06", text: "MVP dashboards & auth" },
          { date: "2025‑07", text: "Billing stub + import/export" },
          { date: "2025‑08", text: "Perf pass + charts" },
        ],
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
    ],
  },
  // Keep Vectra and ATC as in your previous file, or upgrade similarly.
];

export function findCaseStudy(slug: string) {
  return CASE_STUDIES.find((s) => s.slug === slug);
}

export function findPrevNext(slug: string) {
  const i = CASE_STUDIES.findIndex((s) => s.slug === slug);
  return { prev: CASE_STUDIES[i - 1], next: CASE_STUDIES[i + 1] };
}
