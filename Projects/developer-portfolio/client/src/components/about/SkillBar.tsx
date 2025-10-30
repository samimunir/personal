export function SkillBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-white/80">{label}</span>
        <span className="text-white/50">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
        <div className="h-full bg-[#22D3EE]" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
