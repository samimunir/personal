import { useMemo, useState } from "react";
import Section from "../components/ui/Section";
import Filters, { type Filter, type SortKey } from "../components/work/Filters";
import ProjectCardPro from "../components/work/ProjectCardPro";
import QuickView from "../components/work/QuickView";
import { PROJECTS } from "../lib/projects";

export default function Work() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Filter>("All");
  const [sort, setSort] = useState<SortKey>("title-asc");
  const [quick, setQuick] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const qlc = q.trim().toLowerCase();
    let arr = PROJECTS.filter(
      (p) =>
        (filter === "All" || p.category === filter) &&
        (!qlc ||
          p.title.toLowerCase().includes(qlc) ||
          p.summary.toLowerCase().includes(qlc) ||
          p.stack.join(" ").toLowerCase().includes(qlc))
    );
    if (sort === "title-asc")
      arr.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "title-desc")
      arr.sort((a, b) => b.title.localeCompare(a.title));
    return arr;
  }, [q, filter, sort]);

  const active = filtered.find((p) => p.slug === quick);

  return (
    <Section>
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl md:text-4xl font-semibold">Work</h1>
        <div className="text-xs text-white/50">
          Press <span className="rounded bg-white/10 px-1">/</span> to search
        </div>
      </div>

      <div className="mb-6">
        <Filters
          q={q}
          setQ={setQ}
          filter={filter}
          setFilter={setFilter}
          sort={sort}
          setSort={setSort}
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p, i) => (
          <div key={p.slug} className="relative">
            <ProjectCardPro p={p} i={i} />
            <button
              onClick={() => setQuick(p.slug)}
              className="absolute right-3 top-3 rounded-lg bg-black/40 backdrop-blur px-2 py-1 text-xs border border-white/10 text-white/80 hover:text-white"
            >
              Quick view
            </button>
          </div>
        ))}
      </div>

      {/* Quick View Modal */}
      <QuickView
        open={!!quick}
        onClose={() => setQuick(null)}
        p={active || undefined}
      />
    </Section>
  );
}
