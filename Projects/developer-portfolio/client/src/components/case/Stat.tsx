export function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[.05] p-4">
      <div className="text-2xl font-semibold">{value}</div>
      <div className="text-xs text-white/60">{label}</div>
    </div>
  );
}
