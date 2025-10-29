import { useParams, Link } from "react-router-dom";
import Section from "../components/ui/Section";
import { getPost } from "../lib/mdx";
import Meta from "../components/seo/Meta";
import { mdxComponents } from "../components/mdx/MDXProvider"; // ← import the map

export default function PostPage() {
  const { slug = "" } = useParams();
  const hit = getPost(slug);

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
      <Section>
        <article className="max-w-3xl">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-semibold mb-2">
              {meta.title || slug}
            </h1>
            <div className="text-sm text-white/60">
              {meta.date && new Date(meta.date).toLocaleDateString()}{" "}
              {meta.tags?.length ? <>· {meta.tags.join(" · ")}</> : null}
            </div>
          </header>

          {/* KEY LINE: pass components so <Callout/> and <CodeBlock/> are defined */}
          <Component components={mdxComponents as any} />
        </article>
      </Section>
    </>
  );
}
