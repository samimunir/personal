import { motion } from "framer-motion";
import ProjectCard from "../components/cards/ProjectCard";
import Button from "../components/ui/Button";
import Section from "../components/ui/Section";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* subtle radial glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          aria-hidden
        >
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[70rem] h-[70rem] rounded-full bg-[#22D3EE]/20 blur-3xl" />
        </div>
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
            data‑driven approach. Dive into case studies to see architecture,
            trade‑offs, and outcomes.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex gap-4"
          >
            <Button size="lg" onClick={() => location.assign("/work")}>
              View Work
            </Button>
            <Button
              size="lg"
              variant="ghost"
              onClick={() => location.assign("/contact")}
            >
              Contact
            </Button>
          </motion.div>
        </div>
      </section>

      {/* FEATURED */}
      <Section>
        <h2 className="text-2xl md:text-3xl font-semibold mb-8">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ProjectCard
            title="CareerNest"
            blurb="Job‑tracking SaaS with analytics, subscriptions, and dashboards."
            tags={["MERN", "Stripe", "Charts"]}
          />
          <ProjectCard
            title="Vectra"
            blurb="Analytics‑heavy platform with KPI routes and micro‑service patterns."
            tags={["MERN", "Workers", "Caching"]}
          />
          <ProjectCard
            title="ATC Simulator"
            blurb="Ultra‑realistic air‑traffic control sim with heat‑map trails."
            tags={["Python", "Sim", "WebGL"]}
          />
        </div>
      </Section>

      {/* HIGHLIGHTS */}
      <Section className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/[.05] p-6">
            <p className="text-3xl font-semibold">95%+</p>
            <p className="text-white/70">Lighthouse on launch targets</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[.05] p-6">
            <p className="text-3xl font-semibold">2.5s</p>
            <p className="text-white/70">LCP budget for hero</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[.05] p-6">
            <p className="text-3xl font-semibold">200ms</p>
            <p className="text-white/70">INP target for interactions</p>
          </div>
        </div>
      </Section>
    </>
  );
}
