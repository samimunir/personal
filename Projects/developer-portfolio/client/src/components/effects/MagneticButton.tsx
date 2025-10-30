import { useEffect, useRef } from "react";
export default function MagneticButton({
  children,
  className = "",
  ...rest
}: any) {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let mx = 0,
      my = 0;
    function onMove(e: MouseEvent) {
      const r = el.getBoundingClientRect();
      mx = (e.clientX - (r.left + r.width / 2)) * 0.1;
      my = (e.clientY - (r.top + r.height / 2)) * 0.1;
      if (!raf) {
        raf = requestAnimationFrame(apply);
      }
    }
    function apply() {
      el.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      raf = 0;
    }
    function onLeave() {
      el.style.transform = "translate3d(0,0,0)";
    }
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);
  return (
    <button
      ref={ref}
      className={
        "inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-medium bg-[#22D3EE]/20 hover:bg-[#22D3EE]/30 transition-[background] duration-200 ease-[cubic-bezier(.22,1,.36,1)] focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/60 will-change-transform " +
        className
      }
      {...rest}
    >
      {children}
    </button>
  );
}
