import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Section from "../components/ui/Section";
import { getPost, getPrevNext } from "../lib/mdx";
import Meta from "../components/seo/Meta";
import { mdxComponents } from "../components/mdx/MDXProvider";

function LocalTOC({ root }: { root: HTMLElement | null }) {
  const [anchors, setAnchors] = useState<Array<{ id: string; text: string }>>(
    []
  );
  const [active, setActive] = useState("");
  useEffect(() => {
    if (!root) return;
    const hs = Array.from(root.querySelectorAll("h2, h3")) as HTMLElement[];
    const out: Array<{ id: string; text: string }> = [];
    hs.forEach((h) => {
      if (!h.id) {
        h.id =
          h.textContent
            ?.toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "") || "";
      }
      if (h.id) out.push({ id: h.id, text: h.textContent || "" });
    });
    setAnchors(out);

    const obs = new IntersectionObserver(
      (entries) => {
        const first = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (first) setActive((first.target as HTMLElement).id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    hs.forEach((h) => obs.observe(h));
    return () => obs.disconnect();
  }, [root]);

  if (!anchors.length) return null;
  return (
    <nav
      className="hidden lg:block sticky top-24 self-start w-[260px] shrink-0 pr-4 max-h-[calc(100vh-7rem)] overflow-auto"
      aria-label="On this page"
    >
      <ul className="space-y-2">
        {anchors.map((a) => (
          <li key={a.id}>
            <a
              href={`#${a.id}`}
              className={
                (active === a.id
                  ? "text-[#22D3EE]"
                  : "text-white/70 hover:text-white") +
                " text-sm transition-colors"
              }
            >
              {a.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function PostPage() {
  const { slug = "" } = useParams();
  const hit = getPost(slug);
  const { prev, next } = getPrevNext(slug);

  const [rootEl, setRootEl] = useState<HTMLElement | null>(null);

  if (!hit) {
    return (
      <Section>
        <p className="text-white/70">
          Post not found.{" "}
          <Link to="/writing" className="text-[#22D3EE] underline">
            Go back
          </Link>
        </p>
      </Section>
    );
  }

  const { Component, meta } = hit;

  return (
    <>
      <Meta title={`${meta.title || slug} — Sami`} description={meta.excerpt} />

      {/* HERO */}
      <Section>
        <div className="flex items-start justify-between gap-6">
          <div>
            <Link
              to="/writing"
              className="text-xs text-white/60 hover:text-white"
            >
              ← Writing
            </Link>
            <h1 className="text-3xl md:text-4xl font-semibold mt-2">
              {meta.title || slug}
            </h1>
            <div className="text-sm text-white/60 mt-1 flex flex-wrap gap-3">
              {meta.date && (
                <span>{new Date(meta.date).toLocaleDateString()}</span>
              )}
              {meta.readingTime && <span>• {meta.readingTime}</span>}
              {meta.tags?.length ? <span>• {meta.tags.join(", ")}</span> : null}
            </div>
          </div>
          <div className="hidden md:block text-xs text-white/60">
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
              }}
              className="rounded-lg px-2.5 py-1.5 bg-white/10 hover:bg-white/15"
            >
              Copy link
            </button>
          </div>
        </div>
      </Section>

      {/* BODY: two-column with local TOC */}
      <section className="py-2 md:py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[280px_minmax(0,1fr)] gap-12 lg:items-start">
          <LocalTOC root={rootEl} />

          <article
            ref={(el) => setRootEl(el)}
            className="space-y-6 min-w-0 prose prose-invert max-w-3xl"
          >
            <Component components={mdxComponents as any} />
          </article>
        </div>
      </section>

      {/* Prev/Next */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {prev ? (
              <Link
                to={`/writing/${prev.slug}`}
                className="rounded-xl border border-white/10 bg-white/[.05] p-4 hover:bg-white/[.08] transition-colors"
              >
                ← {prev.meta.title}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                to={`/writing/${next.slug}`}
                className="rounded-xl border border-white/10 bg-white/[.05] p-4 hover:bg-white/[.08] transition-colors text-right"
              >
                {next.meta.title} →
              </Link>
            ) : (
              <span />
            )}
          </div>
        </div>
      </section>
    </>
  );
}

// ──────────────────────────────────────────────────────────────
// SAMPLE UPDATE: src/content/posts/hello-world.mdx (add featured & readingTime)
// export const meta = {
//   title: 'Hello, MDX World',
//   date: '2025-10-29',
//   tags: ['mdx','portfolio'],
//   excerpt: 'A quick test post that mixes Markdown and React components.',
//   readingTime: '4 min',
//   featured: true,
// }
//
// # Writing With MDX
// ...
