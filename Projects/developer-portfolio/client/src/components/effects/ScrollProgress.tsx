import { useEffect, useRef } from "react";

type Props = {
  /** If your app scrolls inside a container (e.g., #app-scroll), pass its selector */
  targetSelector?: string;
};

export default function ScrollProgress({ targetSelector }: Props) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Resolve the scroll container
    const target =
      (targetSelector
        ? (document.querySelector(targetSelector) as HTMLElement | null)
        : null) ||
      (document.scrollingElement as HTMLElement) ||
      document.documentElement;

    let last = -1;
    let raf = 0;

    const compute = () => {
      // total scrollable distance
      const max = target.scrollHeight - target.clientHeight;
      const cur = (target as any).scrollTop ?? window.scrollY ?? 0;
      const pct = max > 0 ? Math.min(1, Math.max(0, cur / max)) : 0;

      // write directly to style for zero React churn
      if (barRef.current && Math.abs(pct - last) > 0.001) {
        barRef.current.style.transform = `scaleX(${pct})`;
        last = pct;
      }
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        compute();
        raf = 0;
      });
    };

    // Keep in sync on resizes and content changes
    const ro =
      "ResizeObserver" in window ? new ResizeObserver(() => onScroll()) : null;

    compute();
    target.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    ro?.observe(target === document.documentElement ? document.body : target);

    // Also recompute after route transitions/images load
    const onLoad = () => onScroll();
    window.addEventListener("load", onLoad);

    return () => {
      target.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("load", onLoad);
      ro?.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [targetSelector]);

  return (
    <div className="pointer-events-none fixed top-0 left-0 right-0 z-70 h-1.5">
      <div
        ref={barRef}
        className="h-full"
        style={{
          transformOrigin: "left",
          transform: "scaleX(0)",
          background:
            "linear-gradient(90deg, rgba(34,211,238,1) 0%, rgba(124,58,237,1) 100%)",
          boxShadow: "0 0 8px rgba(34,211,238,0.65)",
          willChange: "transform",
        }}
      />
    </div>
  );
}
