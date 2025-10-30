import Meta from "../../components/seo/Meta";
import { Stat } from "./Stat";
import Gallery from "./Gallery";
import TOC from "./TOC";

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
  sections: Array<{
    id: string;
    label: string;
    kind: "markdown" | "list" | "image" | "code";
    content: string | string[];
  }>;
  gallery?: Array<{ src: string; caption?: string }>;
}) {
  return (
    <>
      <Meta title={`${title} — Case Study`} description={hero?.summary} />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[70rem] h-[70rem] rounded-full bg-[#22D3EE]/20 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 md:pt-28 md:pb-16">
          <p className="text-white/60 text-sm mb-2">
            {period} · {role}
          </p>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            {title}
          </h1>
          {hero?.summary && (
            <p className="text-white/70 max-w-2xl">{hero.summary}</p>
          )}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
            {hero?.kpis?.map((k, i) => (
              <Stat key={i} {...k} />
            ))}
          </div>
          {!!stack.length && (
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
          )}
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
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[240px,1fr] gap-10">
          {/* Sticky TOC */}
          <TOC sections={sections.map((s) => ({ id: s.id, label: s.label }))} />

          <article className="space-y-12">
            {sections.map((s) => (
              <section id={s.id} key={s.id}>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                  {s.label}
                </h2>
                {s.kind === "markdown" && (
                  <p className="text-white/80 leading-relaxed">
                    {s.content as string}
                  </p>
                )}
                {s.kind === "list" && (
                  <ul className="list-disc list-inside text-white/80 space-y-1">
                    {(s.content as string[]).map((li, i) => (
                      <li key={i}>{li}</li>
                    ))}
                  </ul>
                )}
                {s.kind === "image" && (
                  <img
                    src={s.content as string}
                    alt={s.label}
                    className="rounded-2xl border border-white/10 bg-white/[.04]"
                  />
                )}
                {s.kind === "code" && (
                  <pre className="rounded-2xl border border-white/10 bg-white/[.04] p-4 overflow-x-auto text-sm leading-relaxed">
                    <code>{s.content as string}</code>
                  </pre>
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
