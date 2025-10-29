import Section from "../components/ui/Section";
import { posts } from "../lib/mdx";
import { Link } from "react-router-dom";
import Meta from "../components/seo/Meta";

export default function Writing() {
  return (
    <>
      <Meta
        title="Writing — Sami"
        description="Notes and case studies on engineering, design, and systems."
      />
      <Section>
        <h1 className="text-3xl md:text-4xl font-semibold mb-6">Writing</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((p) => (
            <Link
              key={p.slug}
              to={`/writing/${p.slug}`}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/8 transition-colors"
            >
              <h3 className="text-lg font-semibold mb-1">
                {p.meta.title || p.slug}
              </h3>
              {p.meta.excerpt && (
                <p className="text-sm text-white/70 mb-2">{p.meta.excerpt}</p>
              )}
              <div className="text-xs text-white/50 flex gap-3">
                {p.meta.date && (
                  <span>{new Date(p.meta.date).toLocaleDateString()}</span>
                )}
                {p.meta.tags?.length ? (
                  <span>• {p.meta.tags.join(", ")}</span>
                ) : null}
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
