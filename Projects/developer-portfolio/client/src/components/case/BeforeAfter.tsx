import { useRef, useState } from "react";
export default function BeforeAfter({
  before,
  after,
}: {
  before: string;
  after: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(50);
  function move(e: React.MouseEvent) {
    const r = wrap.current?.getBoundingClientRect();
    if (!r) return;
    const pct = Math.min(
      100,
      Math.max(0, ((e.clientX - r.left) / r.width) * 100)
    );
    setX(pct);
  }
  return (
    <div
      ref={wrap}
      onMouseMove={move}
      className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden border border-white/10 bg-white/[.04]"
    >
      <img
        src={after}
        alt="after"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: x + "%" }}
      >
        <img src={before} alt="before" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-y-0" style={{ left: `calc(${x}% - 1px)` }}>
        <div className="w-0.5 h-full bg-white/70" />
      </div>
      <input
        aria-label="comparison"
        type="range"
        min={0}
        max={100}
        value={x}
        onChange={(e) => setX(Number(e.target.value))}
        className="absolute left-0 right-0 bottom-3 mx-auto w-[60%] appearance-none h-1 bg-white/20 rounded-full"
      />
    </div>
  );
}
