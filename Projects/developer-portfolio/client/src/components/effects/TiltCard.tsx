import { useRef } from "react";

export default function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  function onMouseMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const rx = (0.5 - y) * 8;
    const ry = (x - 0.5) * 8;
    el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  }
  function onLeave() {
    const el = ref.current;
    if (el)
      el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
  }
  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onLeave}
      className={
        "transition-transform duration-200 will-change-transform " + className
      }
    >
      {children}
    </div>
  );
}
