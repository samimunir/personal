import { useEffect } from "react";
import type { Project } from "../../lib/projects";

export default function QuickView({
  open,
  onClose,
  p,
}: {
  open: boolean;
  onClose: () => void;
  p?: Project;
}) {
  useEffect(() => {
    function esc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", esc);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", esc);
    };
  }, [open, onClose]);

  if (!open || !p) return null;
  return (
    <div className="fixed inset-0 z-[90]">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(92vw,900px)] rounded-2xl border border-white/10 bg-[#0B0E11] shadow-[0_10px_40px_rgba(0,0,0,0.6)] overflow-hidden">
        <div className="relative h-64">
          {p.preview ? (
            <video
              src={p.preview}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={p.cover}
              alt="cover"
              className="w-full h-full object-cover"
            />
          )}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 rounded-lg bg-white/10 hover:bg-white/15 px-2 py-1 text-sm"
          >
            Close
          </button>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-xl font-semibold">{p.title}</h3>
            <a
              href={`/work/${p.slug}`}
              className="rounded-xl px-3 py-1.5 text-sm bg-[#22D3EE]/20 hover:bg-[#22D3EE]/30"
            >
              Open case study
            </a>
          </div>
          <p className="text-white/70 mt-2">{p.summary}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <span
                key={s}
                className="text-xs rounded-full border border-white/10 bg-white/[.04] px-2 py-1 text-white/70"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
