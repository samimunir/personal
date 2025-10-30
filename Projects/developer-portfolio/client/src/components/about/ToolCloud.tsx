export default function ToolCloud({ tools }: { tools: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tools.map((t) => (
        <span
          key={t}
          className="rounded-full border border-white/10 bg-white/[.05] px-2.5 py-1 text-xs text-white/80"
        >
          {t}
        </span>
      ))}
    </div>
  );
}
