import { useEffect, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { api } from "../lib/api";

const USER = "demo"; // replace with auth later

export default function Cart() {
  const qc = useQueryClient();
  const nav = useNavigate();
  const [sp] = useSearchParams();

  // Add from querystring (simple UX when clicking "Add" on Products)
  useEffect(() => {
    const sku = sp.get("sku"),
      title = sp.get("title"),
      price = Number(sp.get("price") || 0);
    if (sku && title) {
      addItems.mutate([{ sku, title, qty: 1, unitPrice: price }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cartQ = useQuery({
    queryKey: ["cart", USER],
    queryFn: async () =>
      (await api.get("/cart", { params: { userId: USER } })).data,
  });

  const addItems = useMutation({
    mutationFn: async (items) =>
      (await api.put("/cart/items", { userId: USER, items })).data,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cart", USER] }),
  });

  const removeItem = useMutation({
    mutationFn: async (sku) =>
      (
        await api.delete(`/cart/items/${encodeURIComponent(sku)}`, {
          params: { userId: USER },
        })
      ).data,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cart", USER] }),
  });

  const clear = useMutation({
    mutationFn: async () =>
      (await api.post("/cart/clear", { userId: USER })).data,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cart", USER] }),
  });

  const subtotal = useMemo(() => cartQ.data?.subtotal ?? 0, [cartQ.data]);

  if (cartQ.isLoading) return <div>Loading cart…</div>;

  const items = cartQ.data?.items || [];
  return (
    <section>
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {items.length === 0 ? (
        <div className="text-white/60">
          Cart is empty.{" "}
          <Link className="underline" to="/">
            Browse products
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((it) => (
            <div
              key={it.sku}
              className="flex items-center justify-between border border-white/10 rounded-xl p-3"
            >
              <div>
                <div className="font-semibold">{it.title}</div>
                <div className="text-white/60 text-sm">
                  x{it.qty} — ${(it.unitPrice / 100).toFixed(2)}
                </div>
              </div>
              <button
                onClick={() => removeItem.mutate(it.sku)}
                className="text-sm px-3 py-1 rounded-lg border border-white/20 hover:bg-white/10"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="text-white/70">Subtotal</div>
            <div className="font-mono">${(subtotal / 100).toFixed(2)}</div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => clear.mutate()}
              className="px-3 py-2 rounded-xl border border-white/20"
            >
              Clear
            </button>
            <button
              onClick={() => nav("/checkout")}
              className="px-4 py-2 rounded-xl bg-white text-black"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
