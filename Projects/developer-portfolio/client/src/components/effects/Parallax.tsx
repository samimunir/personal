import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ParallaxHero({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.6]);
  return (
    <section ref={ref} className="relative overflow-hidden">
      <motion.div
        style={{ y, opacity }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[80rem] h-[80rem] rounded-full bg-[#22D3EE]/20 blur-3xl" />
      </motion.div>
      {children}
    </section>
  );
}
