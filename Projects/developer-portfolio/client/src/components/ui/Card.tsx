import type { ReactNode } from "react";
import { motion } from "framer-motion";

export default function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={
        "rounded-2xl border border-white/10 bg-white/[.05] backdrop-blur-[2px] shadow-[0_2px_10px_rgba(0,0,0,0.25)] " +
        className
      }
    >
      {children}
    </motion.div>
  );
}
