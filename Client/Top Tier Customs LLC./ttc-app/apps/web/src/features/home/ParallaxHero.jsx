import { motion } from "framer-motion";
import GlowButton from "../../components/ui/GlowButton";

function MeshGlow({
  delay = 0,
  from = "#00E7FF22",
  to = "#B8FF5C18",
  className = "",
}) {
  return (
    <motion.div
      className={`absolute blur-3xl ${className}`}
      style={{
        background: `radial-gradient(600px 300px at 30% 30%, ${from}, transparent 60%), radial-gradient(600px 300px at 70% 70%, ${to}, transparent 60%)`,
      }}
      initial={{ opacity: 0.4, scale: 0.98 }}
      animate={{ opacity: [0.4, 0.65, 0.4], scale: [0.98, 1.02, 0.98] }}
      transition={{ duration: 8, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export default function ParallaxHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.25] pointer-events-none" />
      <MeshGlow className="-top-1/3 -left-1/4 h-[120vmax] w-[120vmax]" />
      <MeshGlow
        delay={1.5}
        from="#B8FF5C22"
        to="#00E7FF18"
        className="-bottom-1/3 -right-1/4 h-[120vmax] w-[120vmax]"
      />

      <div className="relative mx-auto max-w-7xl px-4 pt-16 md:pt-24 pb-12">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <motion.h1
              className="text-4xl md:text-6xl font-extrabold leading-tight"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              Performance parts.{" "}
              <span className="shine">Precision installs.</span>
            </motion.h1>
            <motion.p
              className="mt-5 text-white/70 max-w-prose"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              TTC brings pro-grade components and expert services into a single,
              seamless experience. Transparent pricing, blazing checkout, and a
              build you’re proud to show off.
            </motion.p>
            <motion.div
              className="mt-7 flex items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <GlowButton
                variant="neon"
                onClick={() =>
                  document
                    .getElementById("featured")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Shop Featured
              </GlowButton>
              <GlowButton variant="ghost">Explore Services</GlowButton>
            </motion.div>
            <div className="mt-8 grid grid-cols-3 gap-4 text-white/70 text-sm">
              <div>
                <div className="text-2xl font-semibold text-white">1.2k+</div>
                Orders fulfilled
              </div>
              <div>
                <div className="text-2xl font-semibold text-white">99.9%</div>
                Secure checkout
              </div>
              <div>
                <div className="text-2xl font-semibold text-white">24/7</div>
                Support response
              </div>
            </div>
          </div>

          <motion.div
            className="relative aspect-[16/10] rounded-3xl"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="gb h-full w-full">
              <div className="gb-inner h-full w-full rounded-[calc(1rem-1px)]">
                <div className="h-full w-full rounded-3xl bg-gradient-to-br from-white/10 to-white/5" />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-3xl shadow-[0_40px_120px_-40px_rgba(0,231,255,0.3)]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
