export default function PillToggle({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.04] p-1">
      {options.map((opt) => {
        const active = opt === value;
        return (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={
              (active
                ? "bg-[#22D3EE]/20 text-white "
                : "text-white/80 hover:text-white ") +
              "px-3 py-1.5 rounded-full text-xs transition-colors"
            }
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
