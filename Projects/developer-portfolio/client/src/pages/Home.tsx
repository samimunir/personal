import { motion } from "framer-motion";
import { ParallaxHero } from "../components/effects/Parallax";
import Section from "../components/ui/Section";
import TiltCard from "../components/effects/TiltCard";

function ZephironBadge() {
  return (
    <a
      id="zephiron"
      href="#contact"
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.05] px-3 py-1 text-xs text-white/80 hover:text-white transition-colors"
    >
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#22D3EE] shadow-[0_0_12px_rgba(34,211,238,.9)]" />{" "}
      Zephiron — Software & Design
    </a>
  );
}

export default function Home() {
  return (
    <>
      {/* HERO */}
      <ParallaxHero>
        <div className="relative">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            aria-hidden
          >
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[80rem] h-[80rem] rounded-full bg-[#22D3EE]/20 blur-3xl" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 md:pt-32 md:pb-24">
            <div className="mb-4">
              <ZephironBadge />
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
            >
              Building thoughtful products that scale — with a design‑first
              lens.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-white/70 max-w-2xl mb-8"
            >
              I’m Sami, a full‑stack engineer crafting production‑grade MERN
              apps and simulations. Explore deep‑dive case studies and see how I
              approach architecture, metrics, and UX.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="/work"
                className="rounded-xl px-5 py-3 text-sm bg-[#22D3EE]/20 hover:bg-[#22D3EE]/30 transition-colors"
              >
                View Work
              </a>
              <a
                href="/contact"
                className="rounded-xl px-5 py-3 text-sm bg-white/10 hover:bg-white/15"
              >
                Contact
              </a>
              <a
                href="#writing"
                className="rounded-xl px-5 py-3 text-sm border border-white/10 text-white/80 hover:text-white"
              >
                Read Writing
              </a>
            </motion.div>

            {/* Social proof ribbon (placeholder logos) */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 opacity-80">
              {["React", "TypeScript", "MongoDB", "Vite"].map((x) => (
                <div
                  key={x}
                  className="flex items-center gap-2 text-sm text-white/60"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#22D3EE]" />
                  {x}
                </div>
              ))}
            </div>
          </div>
        </div>
      </ParallaxHero>

      {/* VALUE STRIP */}
      <Section className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              h: "Design × Engineering",
              p: "Polished UI with measurable performance.",
            },
            {
              h: "Systems Thinking",
              p: "Clear architectures, trade‑offs, and metrics.",
            },
            { h: "Velocity", p: "Ship fast with discipline and quality." },
          ].map((b, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/[.05] p-6"
            >
              <div className="text-lg font-semibold mb-1">{b.h}</div>
              <p className="text-sm text-white/70">{b.p}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FEATURED */}
      <Section>
        <h2 className="text-2xl md:text-3xl font-semibold mb-8">
          Featured Work
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <TiltCard key={i}>
              <div className="rounded-2xl border border-white/10 bg-white/[.05] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
                <div className="h-32 rounded-xl bg-white/[.06] mb-4" />
                <h3 className="font-semibold mb-1">Project {i}</h3>
                <p className="text-sm text-white/70">
                  Outcome-focused blurb with stack tags.
                </p>
              </div>
            </TiltCard>
          ))}
        </div>
      </Section>

      {/* CTA STRIP */}
      <Section className="pt-0">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-[#22D3EE]/20 via-transparent to-[#7C3AED]/20 p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="text-xl font-semibold">
                Let’s build something together.
              </div>
              <p className="text-white/70 text-sm">
                Available for select collaborations via{" "}
                <span className="text-[#22D3EE]">Zephiron</span>.
              </p>
            </div>
            <a
              href="/contact"
              className="rounded-xl px-5 py-3 text-sm bg-[#22D3EE]/20 hover:bg-[#22D3EE]/30"
            >
              Get in touch
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
