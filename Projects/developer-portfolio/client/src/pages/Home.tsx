import { motion } from "framer-motion";
import { ParallaxHero } from "../components/effects/Parallax";
import MagneticButton from "../components/effects/MagneticButton";
import TiltCard from "../components/effects/TiltCard";
import Section from "../components/ui/Section";

export default function Home() {
  return (
    <>
      <ParallaxHero>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 md:pt-32 md:pb-24">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[#22D3EE] text-sm font-medium mb-3"
          >
            Full‑stack Software Engineer
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
          >
            I build elegant, performant software that ships.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white/70 max-w-2xl mb-8"
          >
            MERN apps, simulations, and developer tooling — with a design‑first,
            data‑driven approach.
          </motion.p>
          <div className="flex gap-4">
            <MagneticButton onClick={() => location.assign("/work")}>
              View Work
            </MagneticButton>
            <MagneticButton
              className="bg-white/10 hover:bg-white/15"
              onClick={() => location.assign("/contact")}
            >
              Contact
            </MagneticButton>
          </div>
        </div>
      </ParallaxHero>

      <Section>
        <h2 className="text-2xl md:text-3xl font-semibold mb-8">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <TiltCard key={i}>
              <div className="rounded-2xl border border-white/10 bg-white/[.05] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
                <div className="h-32 rounded-xl bg-white/[.06] mb-4" />
                <h3 className="font-semibold mb-1">Project {i}</h3>
                <p className="text-sm text-white/70">
                  One‑line outcome and tags.
                </p>
              </div>
            </TiltCard>
          ))}
        </div>
      </Section>
    </>
  );
}
