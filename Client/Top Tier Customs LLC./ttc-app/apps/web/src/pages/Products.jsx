import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

export default function Products() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => (await api.get("/products")).data,
  });

  if (isLoading) return <div>Loading products…</div>;
  if (error) return <div className="text-red-400">Failed to load products</div>;

  const list = Array.isArray(data) ? data : [];
  return (
    <section>
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((p) => (
          <div key={p._id} className="rounded-2xl border border-white/10 p-4">
            <div className="aspect-video rounded-xl bg-white/5 mb-3" />
            <div className="font-semibold">{p.title}</div>
            <div className="text-white/60 text-sm mt-1">
              {p.description?.slice(0, 80)}
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="font-mono">${(p.price / 100).toFixed(2)}</span>
              {/* For now we’ll push to Cart page to add via API */}
              <a
                href={`/cart?sku=${encodeURIComponent(
                  p.sku || "sku"
                )}&title=${encodeURIComponent(p.title)}&price=${p.price || 0}`}
                className="px-3 py-1.5 rounded-lg bg-white text-black text-sm"
              >
                Add
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
