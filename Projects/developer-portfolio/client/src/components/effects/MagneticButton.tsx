import { useRef } from "react";

export default function MagneticButton({
  children,
  className = "",
  ...rest
}: any) {
  const ref = useRef<HTMLButtonElement>(null);
  function onMouseMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
  }
  function onLeave() {
    const el = ref.current;
    if (el) el.style.transform = "translate(0,0)";
  }
  return (
    <button
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onLeave}
      className={
        "inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-medium bg-[#22D3EE]/20 hover:bg-[#22D3EE]/30 transition-[transform,background] duration-200 ease-[cubic-bezier(.22,1,.36,1)] focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/60 " +
        className
      }
      {...rest}
    >
      {children}
    </button>
  );
}
