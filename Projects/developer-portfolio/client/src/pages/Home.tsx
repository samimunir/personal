import { motion, useReducedMotion } from "framer-motion";
import { ParallaxHero } from "../components/effects/Parallax";
import MagneticButton from "../components/effects/MagneticButton";
import TiltCard from "../components/effects/TiltCard";
import Section from "../components/ui/Section";

export default function Home() {
  const reduce = useReducedMotion();
  return (
    <>
      {/* HERO */}
      <ParallaxHero>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 md:pt-32 md:pb-24">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={reduce ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-[#22D3EE] text-sm font-medium mb-3 will-change-transform"
          >
            Full‑stack Software Engineer
          </motion.p>
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={reduce ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6 will-change-transform"
          >
            I build elegant, performant software that ships.
          </motion.h1>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={reduce ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-white/70 max-w-2xl mb-8 will-change-transform"
          >
            MERN apps, simulations, and developer tooling — with a design‑first,
            data‑driven approach.
          </motion.p>
          <div className="flex gap-4 will-change-transform">
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

      {/* VALUE STRIP */}
      <Section className="pt-0">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 will-change-transform">
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

      {/* CTA STRIP */}
      <Section className="pt-0">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-[#22D3EE]/20 via-transparent to-[#7C3AED]/20 p-6 md:p-8 will-change-transform">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="text-xl font-semibold">
                Let’s build something together.
              </div>
              <p className="text-white/70 text-sm">
                Available for select collaborations via Zephiron.
              </p>
            </div>
            <MagneticButton onClick={() => location.assign("/contact")}>
              Get in touch
            </MagneticButton>
          </div>
        </div>
      </Section>
    </>
  );
}

// ──────────────────────────────────────────────────────────────
// NOTES:
// 1) Avoid backdrop-blur on large fixed elements; keep it in Navbar only.
// 2) Keep glow sizes reasonable (<= 70rem) and remove CSS blur filters on them.
// 3) Use translate3d/scale transforms, never animating width/left/top for perf.
// 4) Honors prefers-reduced-motion via useReducedMotion in key spots.
