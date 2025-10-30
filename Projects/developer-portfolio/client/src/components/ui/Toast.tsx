import { useEffect, useState } from "react";

let pushToast: ((t: { title: string; body?: string }) => void) | null = null;
export function toast(t: { title: string; body?: string }) {
  pushToast && pushToast(t);
}

export default function Toasts() {
  const [items, setItems] = useState<
    Array<{ id: number; title: string; body?: string }>
  >([]);
  useEffect(() => {
    pushToast = (t) => {
      const id = Date.now();
      setItems((arr) => [...arr, { id, ...t }]);
      setTimeout(() => setItems((arr) => arr.filter((i) => i.id !== id)), 3000);
    };
    return () => {
      pushToast = null;
    };
  }, []);
  return (
    <div className="fixed z-[80] bottom-6 right-6 space-y-2">
      {items.map((i) => (
        <div
          key={i.id}
          className="rounded-xl border border-white/10 bg-white/[.08] backdrop-blur p-3 min-w-[220px] shadow-[0_6px_20px_rgba(0,0,0,0.35)]"
        >
          <div className="text-sm font-semibold">{i.title}</div>
          {i.body && <div className="text-xs text-white/70">{i.body}</div>}
        </div>
      ))}
    </div>
  );
}
