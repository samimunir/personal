import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { api } from "../../lib/api";

function Card({ p }) {
  return (
    <div className="snap-start shrink-0 w-72">
      <div className="gb">
        <div className="inner rounded-2xl p-3">
          <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-cyan-400/20 to-lime-300/20 dark:from-white/10 dark:to-white/5 mb-3" />
          <div className="text-sm font-semibold">{p.title}</div>
          <div className="text-xs text-black/60 dark:text-white/60 line-clamp-2">
            {p.description}
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm font-mono">
              ${((p.price || 0) / 100).toFixed(2)}
            </span>
            <button className="text-xs rounded-lg border border-black/10 dark:border-white/15 px-2 py-1 hover:bg-black/5 dark:hover:bg-white/10">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NewArrivals() {
  const { data, isLoading } = useQuery({
    queryKey: ["new"],
    queryFn: async () => (await api.get("/products")).data,
  });

  return (
    <section id="new" className="py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-6 text-center">
          <div className="text-xs uppercase tracking-[0.35em] text-black/60 dark:text-white/60">
            New Arrivals
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-1">
            NOW ON SALE
          </h2>
          <div className="text-black/60 dark:text-white/60">UP TO 75% OFF</div>
        </div>

        <div className="relative">
          {/* buttons */}
          <button
            onClick={() =>
              document
                .getElementById("strip")
                ?.scrollBy({ left: -320, behavior: "smooth" })
            }
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full border border-black/10 dark:border-white/15 bg-white/70 dark:bg-neutral-900/70 backdrop-blur hover:scale-105"
          >
            ‹
          </button>
          <button
            onClick={() =>
              document
                .getElementById("strip")
                ?.scrollBy({ left: 320, behavior: "smooth" })
            }
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full border border-black/10 dark:border-white/15 bg-white/70 dark:bg-neutral-900/70 backdrop-blur hover:scale-105"
          >
            ›
          </button>

          {/* strip */}
          <motion.div
            id="strip"
            className="scrollbar-hide flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-1"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {(isLoading ? Array.from({ length: 6 }) : data || []).map((p, i) =>
              isLoading ? (
                <div
                  key={i}
                  className="snap-start shrink-0 w-72 rounded-2xl bg-black/5 dark:bg-white/10 h-60 shimmer"
                />
              ) : (
                <Card key={p._id || i} p={p} />
              )
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
