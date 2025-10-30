import { toast } from "../ui/Toast";
export default function CopyButton({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      toast({ title: "Copied", body: value });
    } catch {}
  }
  return (
    <button
      onClick={copy}
      className="rounded-lg px-2.5 py-1.5 text-xs bg-white/10 hover:bg-white/15"
    >
      {children}
    </button>
  );
}
