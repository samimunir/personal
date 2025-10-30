import { useEffect, useRef } from "react";
export default function CursorFollower() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let x = 0,
      y = 0,
      tx = 0,
      ty = 0;
    let raf = 0;
    function move(e: MouseEvent) {
      x = e.clientX;
      y = e.clientY;
    }
    function loop() {
      tx += (x - tx) * 0.18;
      ty += (y - ty) * 0.18;
      if (dot.current)
        dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (ring.current)
        ring.current.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      raf = requestAnimationFrame(loop);
    }
    window.addEventListener("mousemove", move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <>
      <div
        ref={dot}
        className="pointer-events-none fixed z-[70] left-0 top-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/90 will-change-transform"
      />
      <div
        ref={ring}
        className="pointer-events-none fixed z-[69] left-0 top-0 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-white/30 will-change-transform"
      />
    </>
  );
}
