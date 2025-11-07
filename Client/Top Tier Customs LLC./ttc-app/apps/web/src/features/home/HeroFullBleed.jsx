import { motion } from "framer-motion";

export default function HeroFullBleed() {
  // Swap with your real hero image/video later:
  const bg =
    "https://images.unsplash.com/photo-1518306727298-4c7e87f1bfcd?q=80&w=2000&auto=format&fit=crop";
  return (
    <section className="relative">
      <div className="relative h-[62vh] min-h-[420px] w-full overflow-hidden">
        <img
          src={bg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60 dark:from-black/55 dark:via-black/45 dark:to-black/70" />
        {/* center CTA */}
        <div className="relative z-10 flex h-full items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center px-6"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide text-white drop-shadow">
              ARE YOU READY TO BE{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-lime-300">
                TOP TIER?
              </span>
            </h1>
            <div className="mt-6 inline-flex items-center gap-3">
              <a
                href="#new"
                className="rounded-xl bg-white text-black px-6 py-3 text-sm font-semibold hover:bg-white/90 active:translate-y-[1px]"
              >
                SHOP NOW
              </a>
              <a
                href="#services"
                className="rounded-xl border border-white/30 px-6 py-3 text-sm text-white/90 hover:bg-white/10"
              >
                BOOK SERVICES
              </a>
            </div>
            <div className="mt-10 text-white/70 animate-bounce">↓</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
