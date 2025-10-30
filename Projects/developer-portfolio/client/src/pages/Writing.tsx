import { useEffect, useMemo, useState } from "react";
import Section from "../components/ui/Section";
import { posts, getAllTags } from "../lib/mdx";
import { Link, useSearchParams } from "react-router-dom";
import Tag from "../components/writing/Tag";
import Meta from "../components/seo/Meta";

export default function Writing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const qParam = searchParams.get("q") || "";
  const tagParam = searchParams.get("tag") || "All";
  const [q, setQ] = useState(qParam);
  const [tag, setTag] = useState<string>(tagParam);
  const [sort, setSort] = useState<"new" | "old">("new");
  const [page, setPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    setSearchParams({
      ...(q ? { q } : {}),
      ...(tag && tag !== "All" ? { tag } : {}),
    });
  }, [q, tag]);

  const allTags = useMemo(() => ["All", ...getAllTags()], []);

  const filtered = useMemo(() => {
    const qlc = q.trim().toLowerCase();
    let arr = posts.filter((p) => tag === "All" || p.meta.tags?.includes(tag));
    if (qlc) {
      arr = arr.filter(
        (p) =>
          p.slug.toLowerCase().includes(qlc) ||
          (p.meta.title || "").toLowerCase().includes(qlc) ||
          (p.meta.excerpt || "").toLowerCase().includes(qlc) ||
          (p.meta.tags || []).join(" ").toLowerCase().includes(qlc)
      );
    }
    if (sort === "new")
      arr.sort((a, b) => (b.meta.date || "").localeCompare(a.meta.date || ""));
    if (sort === "old")
      arr.sort((a, b) => (a.meta.date || "").localeCompare(b.meta.date || ""));
    return arr;
  }, [q, tag, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    setPage(1);
  }, [q, tag, sort]);

  const featured = filtered.find((p) => p.meta.featured);

  return (
    <>
      <Meta
        title="Writing — Sami"
        description="Notes and case studies on engineering, design, and systems."
      />
      <Section>
        <div className="flex items-center justify-between gap-4 mb-6">
          <h1 className="text-3xl md:text-4xl font-semibold">Writing</h1>
          <div className="text-xs text-white/50">
            Use tag filters or search — press{" "}
            <span className="rounded bg-white/10 px-1">/</span> to focus
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 mb-6">
          <div className="relative">
            <input
              id="writing-search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search posts… (/ to focus)"
              className="w-full md:w-96 rounded-xl bg-white/[.06] border border-white/10 px-9 py-2 text-sm outline-none focus:ring-2 focus:ring-[#22D3EE]/60"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">
              ⌘K
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {allTags.map((t) => (
              <Tag key={t} t={t} active={tag === t} onClick={() => setTag(t)} />
            ))}
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as any)}
            className="rounded-xl bg-white/[.06] border border-white/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#22D3EE]/60"
          >
            <option value="new">Newest</option>
            <option value="old">Oldest</option>
          </select>
        </div>

        {/* Featured pin */}
        {featured && (
          <Link
            to={`/writing/${featured.slug}`}
            className="group block rounded-2xl border border-white/10 bg-gradient-to-r from-[#22D3EE]/15 via-transparent to-[#7C3AED]/15 p-6 md:p-8 mb-8"
          >
            <div className="text-xs text-white/60 mb-2">Featured</div>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold group-hover:underline decoration-white/20">
                  {featured.meta.title}
                </h3>
                {featured.meta.excerpt && (
                  <p className="text-sm text-white/70 mt-1 max-w-2xl">
                    {featured.meta.excerpt}
                  </p>
                )}
                <div className="mt-2 text-xs text-white/60 flex flex-wrap gap-3">
                  <span>
                    {new Date(featured.meta.date!).toLocaleDateString()}
                  </span>
                  {featured.meta.readingTime && (
                    <span>• {featured.meta.readingTime}</span>
                  )}
                  {featured.meta.tags?.length ? (
                    <span>• {featured.meta.tags.join(", ")}</span>
                  ) : null}
                </div>
              </div>
              <div className="hidden md:block text-sm text-white/70">
                Read →
              </div>
            </div>
          </Link>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {paged.map((p) => (
            <Link
              key={p.slug}
              to={`/writing/${p.slug}`}
              className="rounded-2xl border border-white/10 bg-white/[.05] p-6 hover:bg-white/[.08] transition-colors"
            >
              <h3 className="text-lg font-semibold">{p.meta.title}</h3>
              {p.meta.excerpt && (
                <p className="text-sm text-white/70 mt-1">{p.meta.excerpt}</p>
              )}
              <div className="text-xs text-white/50 flex flex-wrap gap-3 mt-2">
                <span>{new Date(p.meta.date!).toLocaleDateString()}</span>
                {p.meta.readingTime && <span>• {p.meta.readingTime}</span>}
                {p.meta.tags?.length ? (
                  <span>• {p.meta.tags.join(", ")}</span>
                ) : null}
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className={
                (page === 1 ? "opacity-40" : "") +
                " rounded-lg px-3 py-1.5 text-sm bg-white/10 hover:bg-white/15"
              }
            >
              Prev
            </button>
            <div className="text-sm text-white/70">
              Page {page} / {totalPages}
            </div>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className={
                (page === totalPages ? "opacity-40" : "") +
                " rounded-lg px-3 py-1.5 text-sm bg-white/10 hover:bg-white/15"
              }
            >
              Next
            </button>
          </div>
        )}
      </Section>
    </>
  );
}
