import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/api";

export default function FeaturedGrid() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => (await api.get("/products")).data,
  });
  return (
    <section className="relative py-14">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="mb-6 flex items-end justify-between">
          <h3 className="text-2xl md:text-3xl font-bold">All Products</h3>
          <a
            href="/shop"
            className="text-sm text-black/70 dark:text-white/70 hover:text-inherit"
          >
            View all →
          </a>
        </div>

        {error && <div className="text-red-500">Failed to load.</div>}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {(isLoading ? Array.from({ length: 6 }) : data || []).map((p, i) =>
            isLoading ? (
              <div
                key={i}
                className="h-64 rounded-2xl bg-black/5 dark:bg-white/10 shimmer"
              />
            ) : (
              <div key={p._id || i} className="gb">
                <div className="inner rounded-2xl p-4 group transition-colors">
                  <div className="aspect-video rounded-xl bg-gradient-to-br from-cyan-400/20 to-lime-300/20 dark:from-white/10 dark:to-white/5 mb-3 group-hover:scale-[1.02] transition-transform" />
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold">{p.title}</div>
                      <div className="text-xs text-black/60 dark:text-white/60 line-clamp-2">
                        {p.description}
                      </div>
                    </div>
                    <span className="text-xs rounded-md px-2 py-1 border border-black/10 dark:border-white/15">
                      NEW
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-mono text-sm">
                      ${((p.price || 0) / 100).toFixed(2)}
                    </span>
                    <button className="text-sm rounded-lg border border-black/10 dark:border-white/15 px-3 py-1.5 hover:bg-black/5 dark:hover:bg-white/10">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
