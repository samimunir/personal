export default function Gallery({
  items = [] as Array<{ src: string; caption?: string }>,
}) {
  if (!items.length) return null;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((g, i) => (
        <figure
          key={i}
          className="rounded-2xl overflow-hidden border border-white/10 bg-white/[.04]"
        >
          <img
            src={g.src}
            alt={g.caption || "Screenshot"}
            className="w-full h-auto block"
          />
          {g.caption && (
            <figcaption className="p-3 text-xs text-white/60">
              {g.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
