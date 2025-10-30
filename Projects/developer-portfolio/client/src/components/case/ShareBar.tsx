import { toast } from "../ui/Toast";
export default function ShareBar() {
  function copy() {
    try {
      navigator.clipboard.writeText(window.location.href);
      toast({ title: "Link copied", body: "URL saved to clipboard." });
    } catch {}
  }
  return (
    <div className="flex items-center gap-3 text-xs text-white/60">
      <button
        onClick={copy}
        className="rounded-lg px-2.5 py-1.5 bg-white/10 hover:bg-white/15"
      >
        Copy link
      </button>
      <a
        className="rounded-lg px-2.5 py-1.5 bg-white/10 hover:bg-white/15"
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
          window.location.href
        )}`}
        target="_blank"
      >
        Share
      </a>
    </div>
  );
}
