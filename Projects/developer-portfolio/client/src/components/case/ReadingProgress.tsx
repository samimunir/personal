import { useEffect, useState } from "react";
export default function ReadingProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const sc = h.scrollTop;
      setPct(max > 0 ? (sc / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-transparent">
      <div className="h-full bg-[#22D3EE]" style={{ width: pct + "%" }} />
    </div>
  );
}
