import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useRef } from "react";

export function ParallaxHero({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -40]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.8]);
  return (
    <section
      ref={ref}
      className="relative overflow-hidden will-change-transform"
    >
      {/* GPU‑friendly gradient background (no blur!) */}
      <motion.div
        style={{ y, opacity }}
        className="pointer-events-none absolute inset-0"
        aria-hidden
      >
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[70rem] h-[70rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.18)_0%,_transparent_60%)]" />
      </motion.div>
      {children}
    </section>
  );
}
