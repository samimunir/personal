import { useEffect, useRef } from "react";

export default function CursorFollower() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function move(e: MouseEvent) {
      if (dot.current)
        dot.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      if (ring.current)
        ring.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    }
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <>
      <div
        ref={dot}
        className="pointer-events-none fixed z-[70] left-0 top-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/90"
      />
      <div
        ref={ring}
        className="pointer-events-none fixed z-[69] left-0 top-0 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-white/30"
      />
    </>
  );
}
