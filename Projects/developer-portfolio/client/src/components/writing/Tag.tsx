export default function Tag({
  t,
  active = false,
  onClick,
}: {
  t: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={
        (active
          ? "bg-[#22D3EE] text-black"
          : "bg-white/[.06] text-white/80 hover:text-white") +
        " border border-white/10 rounded-full px-2.5 py-1 text-xs transition-colors"
      }
    >
      {t}
    </button>
  );
}
