export type TimelineItem = {
  when: string;
  title: string;
  org?: string;
  points?: string[];
};
export default function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="relative ml-3">
      {items.map((it, idx) => (
        <li key={idx} className="pl-4 pb-6">
          <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-[#22D3EE]" />
          <div className="text-xs text-white/60">{it.when}</div>
          <div className="font-semibold">{it.title}</div>
          {it.org && <div className="text-sm text-white/60">{it.org}</div>}
          {it.points && (
            <ul className="list-disc list-inside text-sm text-white/80 space-y-1 mt-1">
              {it.points.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ol>
  );
}
