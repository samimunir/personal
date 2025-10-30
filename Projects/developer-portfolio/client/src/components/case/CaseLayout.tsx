// ──────────────────────────────────────────────────────────────
// DROP‑IN REPLACEMENTS: CaseLayout.tsx + TOC.tsx
// Ensures sticky TOC never overlaps content by reserving a real column.
// Keeps left‑rail layout; see comments to flip TOC to the right if desired.
// ──────────────────────────────────────────────────────────────

// FILE: src/components/case/CaseLayout.tsx
import Meta from "../../components/seo/Meta";
import { Stat } from "./Stat";
import Gallery from "./Gallery";
import TOC from "./TOC";
import ReadingProgress from "./ReadingProgress";
import ShareBar from "./ShareBar";
import BeforeAfter from "./BeforeAfter";
import RenderSection from "./RenderSection";

export default function CaseLayout({
  title,
  period,
  role,
  stack = [],
  links = {},
  hero,
  sections,
  gallery,
}: {
  title: string;
  period?: string;
  role?: string;
  stack?: string[];
  links?: { live?: string; repo?: string; demo?: string };
  hero?: { summary?: string; kpis?: { label: string; value: string }[] };
  sections: Array<{ id: string; label: string; kind: any; content: any }>;
  gallery?: Array<{ src: string; caption?: string }>;
}) {
  return (
    <>
      <Meta title={`${title} — Case Study`} description={hero?.summary} />
      <ReadingProgress />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[70rem] h-[70rem] rounded-full bg-[#22D3EE]/20 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-6 md:pt-28 md:pb-6">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-white/60 text-sm mb-2">
                {period} · {role}
              </p>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                {title}
              </h1>
              {hero?.summary && (
                <p className="text-white/70 max-w-2xl">{hero.summary}</p>
              )}
              <div className="mt-6 flex flex-wrap gap-2 text-xs text-white/70">
                {stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/10 bg-white/[.05] px-2.5 py-1"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex gap-3 text-sm">
                {links.live && (
                  <a
                    className="rounded-xl px-4 py-2 bg-[#22D3EE]/20 hover:bg-[#22D3EE]/30 transition-colors"
                    href={links.live}
                    target="_blank"
                  >
                    Live
                  </a>
                )}
                {links.repo && (
                  <a
                    className="rounded-xl px-4 py-2 bg-white/10 hover:bg-white/15 transition-colors"
                    href={links.repo}
                    target="_blank"
                  >
                    Repo
                  </a>
                )}
                {links.demo && (
                  <a
                    className="rounded-xl px-4 py-2 bg-white/10 hover:bg-white/15 transition-colors"
                    href={links.demo}
                    target="_blank"
                  >
                    Demo
                  </a>
                )}
                <ShareBar />
              </div>
            </div>
            {/* KPIs (desktop) */}
            <div className="hidden md:grid grid-cols-3 gap-3 min-w-[360px]">
              {hero?.kpis?.map((k, i) => (
                <Stat key={i} {...k} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="py-6 md:py-10">
        {/* NOTE: real two‑column grid with reserved TOC width and larger gutter */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[280px_minmax(0,1fr)] gap-12 lg:items-start">
          {/* Left rail TOC (sticky, scrollable within viewport) */}
          <TOC sections={sections.map((s) => ({ id: s.id, label: s.label }))} />

          {/* Article stream — min-w-0 ensures no overflow into TOC lane */}
          <article className="space-y-12 min-w-0">
            {/* KPIs (mobile) */}
            {hero?.kpis && (
              <div className="grid grid-cols-3 gap-3 md:hidden">
                {hero.kpis.map((k, i) => (
                  <Stat key={i} {...k} />
                ))}
              </div>
            )}

            {sections.map((s) => (
              <section id={s.id} key={s.id}>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                  {s.label}
                </h2>
                {s.kind === "beforeafter" ? (
                  <BeforeAfter
                    before={s.content.before}
                    after={s.content.after}
                  />
                ) : (
                  <RenderSection kind={s.kind} content={s.content} />
                )}
              </section>
            ))}

            {gallery && gallery.length > 0 && (
              <section id="gallery">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                  Gallery
                </h2>
                <Gallery items={gallery} />
              </section>
            )}
          </article>
        </div>
      </section>
    </>
  );
}
