import { motion } from "framer-motion";
import Button from "../../components/ui/Button";
import AuroraBG from "../../components/layout/AuroraBG";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <AuroraBG />
      <div className="relative">
        <div className="pt-16 md:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <motion.h1
              className="text-4xl md:text-6xl font-extrabold leading-tight"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              Custom builds. Premium parts. <br />
              <span className="text-white/70">Built the TTC way.</span>
            </motion.h1>
            <motion.p
              className="mt-5 text-white/70"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Shop curated performance components and book expert
              services—seamless checkout, transparent pricing, pro-grade
              support.
            </motion.p>
            <motion.div
              className="mt-7 flex items-center justify-center gap-3"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <Button
                onClick={() =>
                  document
                    .getElementById("featured")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Shop Featured
              </Button>
              <Button variant="ghost">Book a Service</Button>
            </motion.div>
          </div>
        </div>
        <div className="mx-auto mt-12 grid w-full max-w-6xl grid-cols-2 gap-4 md:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="h-24 rounded-2xl bg-white/[0.04] border border-white/10"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.03 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
