import { useState } from "react";
export default function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[.04]">
      {items.map((it, i) => (
        <Row key={i} {...it} />
      ))}
    </div>
  );
}
function Row({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <details
      className="group"
      open={open}
      onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
    >
      <summary className="cursor-pointer list-none select-none flex items-center justify-between px-4 py-3">
        <span className="text-sm font-medium text-white/90">{q}</span>
        <span className="text-white/60 group-open:rotate-45 transition">
          ＋
        </span>
      </summary>
      <div className="px-4 pb-4 text-sm text-white/70 leading-relaxed">{a}</div>
    </details>
  );
}
