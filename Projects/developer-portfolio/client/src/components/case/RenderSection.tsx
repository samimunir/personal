export default function RenderSection({
  kind,
  content,
}: {
  kind: string;
  content: any;
}) {
  if (kind === "markdown")
    return <p className="text-white/80 leading-relaxed">{content}</p>;
  if (kind === "list")
    return (
      <ul className="list-disc list-inside text-white/80 space-y-1">
        {(content as string[]).map((li, i) => (
          <li key={i}>{li}</li>
        ))}
      </ul>
    );
  if (kind === "image")
    return (
      <img
        src={content}
        alt="section"
        className="rounded-2xl border border-white/10 bg-white/[.04]"
      />
    );
  if (kind === "code")
    return (
      <pre className="rounded-2xl border border-white/10 bg-white/[.04] p-4 overflow-x-auto text-sm leading-relaxed">
        <code>{content}</code>
      </pre>
    );
  if (kind === "callout")
    return (
      <div
        className={
          "rounded-2xl border p-4 " +
          {
            info: "bg-white/[.05] border-white/10",
            success: "bg-[#10B981]/10 border-[#10B981]/30",
            warn: "bg-[#F59E0B]/10 border-[#F59E0B]/30",
            error: "bg-[#EF4444]/10 border-[#EF4444]/30",
          }[content.tone || "info"]
        }
      >
        <div className="text-white/90 text-sm">{content.text}</div>
      </div>
    );
  if (kind === "metrics")
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {(content as Array<{ label: string; value: string }>).map((m, i) => (
          <div
            key={i}
            className="rounded-xl border border-white/10 bg-white/[.05] p-4"
          >
            <div className="text-2xl font-semibold">{m.value}</div>
            <div className="text-xs text-white/60">{m.label}</div>
          </div>
        ))}
      </div>
    );
  if (kind === "timeline")
    return (
      <ol className="relative ml-3 space-y-4">
        {(content as Array<{ date: string; text: string }>).map((e, i) => (
          <li key={i} className="pl-4">
            <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-[#22D3EE]" />
            <div className="text-xs text-white/60">{e.date}</div>
            <div className="text-white/80">{e.text}</div>
          </li>
        ))}
      </ol>
    );
  return null;
}
