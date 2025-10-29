import type { ReactNode } from "react";

export default function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        "rounded-2xl border border-white/10 bg-white/[.05] backdrop-blur-[2px] shadow-[0_2px_10px_rgba(0,0,0,0.25)] " +
        className
      }
    >
      {children}
    </div>
  );
}
