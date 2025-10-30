import { useEffect } from "react";

export type Filter = "All" | "SaaS" | "Systems" | "Simulation" | "UI/UX";
export type SortKey = "title-asc" | "title-desc";

export default function Filters({
  q,
  setQ,
  filter,
  setFilter,
  sort,
  setSort,
}: {
  q: string;
  setQ: (s: string) => void;
  filter: Filter;
  setFilter: (f: Filter) => void;
  sort: SortKey;
  setSort: (s: SortKey) => void;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (
        e.key === "/" &&
        !/input|textarea/i.test((e.target as HTMLElement)?.tagName || "")
      ) {
        e.preventDefault();
        const el = document.getElementById(
          "work-search"
        ) as HTMLInputElement | null;
        el?.focus();
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "f") {
        e.preventDefault();
        const el = document.getElementById(
          "work-search"
        ) as HTMLInputElement | null;
        el?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const cats: Filter[] = ["All", "SaaS", "Systems", "Simulation", "UI/UX"];

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
      {/* Search */}
      <div className="relative">
        <input
          id="work-search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search projects… (/ to focus)"
          className="w-full md:w-80 rounded-xl bg-white/[.06] border border-white/10 px-9 py-2 text-sm outline-none focus:ring-2 focus:ring-[#22D3EE]/60"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">
          ⌘K
        </span>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap items-center gap-2">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            aria-pressed={filter === c}
            className={
              (filter === c
                ? "bg-[#22D3EE] text-black"
                : "bg-white/[.06] text-white/80 hover:text-white") +
              " border border-white/10 rounded-full px-3 py-1.5 text-sm transition-colors"
            }
          >
            {c}
          </button>
        ))}
      </div>

      {/* Sort */}
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value as SortKey)}
        className="rounded-xl bg-white/[.06] border border-white/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#22D3EE]/60"
      >
        <option value="title-asc">Title A–Z</option>
        <option value="title-desc">Title Z–A</option>
      </select>
    </div>
  );
}
