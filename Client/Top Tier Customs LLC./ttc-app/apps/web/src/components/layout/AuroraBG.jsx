import { motion } from "framer-motion";

export default function AuroraBG() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -top-1/3 -left-1/4 h-[120vmax] w-[120vmax] rounded-full blur-3xl opacity-20"
        style={{
          background:
            "radial-gradient(closest-side, #ffffff 0%, transparent 60%)",
        }}
        animate={{ x: [0, 60, -40, 0], y: [0, -40, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-1/3 -right-1/4 h-[120vmax] w-[120vmax] rounded-full blur-3xl opacity-15"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,255,255,0.8) 0%, transparent 60%)",
        }}
        animate={{ x: [0, -50, 40, 0], y: [0, 30, -20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
