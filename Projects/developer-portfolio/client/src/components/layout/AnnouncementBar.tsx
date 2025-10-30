import { useEffect, useState } from "react";

export default function AnnouncementBar() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const v = localStorage.getItem("ab:hidden");
    setHidden(v === "1");
  }, []);
  if (hidden) return null;
  return (
    <div className="relative z-[55] bg-[#22D3EE]/10 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-center gap-2 text-xs">
        <span className="text-white/80">
          Now taking select consulting engagements via
        </span>
        <a className="text-[#22D3EE] underline" href="#contact">
          Zephiron
        </a>
        <button
          onClick={() => {
            localStorage.setItem("ab:hidden", "1");
            setHidden(true);
          }}
          className="absolute right-2 text-white/60 hover:text-white"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
