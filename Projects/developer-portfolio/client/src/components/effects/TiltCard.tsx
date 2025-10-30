import { useEffect, useRef } from "react";
export default function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let rx = 0,
      ry = 0;
    function onMove(e: MouseEvent) {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      rx = (0.5 - y) * 6;
      ry = (x - 0.5) * 6;
      if (!raf) {
        raf = requestAnimationFrame(apply);
      }
    }
    function apply() {
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
      raf = 0;
    }
    function onLeave() {
      el.style.transform =
        "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)";
    }
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);
  return (
    <div
      ref={ref}
      className={
        "transition-transform duration-150 will-change-transform " + className
      }
    >
      {children}
    </div>
  );
}
