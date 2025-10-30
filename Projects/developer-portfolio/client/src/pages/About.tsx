import { motion } from "framer-motion";
import Section from "../components/ui/Section";
import Pill from "../components/about/Pill";
import { SkillBar } from "../components/about/SkillBar";
import Timeline from "../components/about/Timeline";
import FAQ from "../components/about/FAQ";
import { Stat } from "../components/about/Stat";
import ToolCloud from "../components/about/ToolCloud";

export default function About() {
  return (
    <>
      {/* HERO */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_.9fr] gap-8 items-center">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Pill>Zephiron</Pill>
              <Pill>Design × Engineering</Pill>
              <Pill>Performance‑minded</Pill>
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-semibold mb-4"
            >
              I’m Sami — a full‑stack engineer who crafts polished products with
              measurable outcomes.
            </motion.h1>
            <p className="text-white/70 leading-relaxed mb-5 max-w-2xl">
              I run <span className="text-[#22D3EE]">Zephiron</span>, a
              developer studio focused on clean architecture and refined UX. I
              love turning complex systems into intuitive, high‑performance
              products.
            </p>
            <div className="grid grid-cols-3 gap-3 max-w-md">
              <Stat value="5+ yrs" label="Building UIs & APIs" />
              <Stat value=">95%" label="Lighthouse targets" />
              <Stat value="200ms" label="INP interaction budget" />
            </div>
            <div className="mt-6 flex gap-3">
              <a
                href="/work"
                className="rounded-xl px-4 py-2 text-sm bg-[#22D3EE]/20 hover:bg-[#22D3EE]/30"
              >
                View Work
              </a>
              <a
                href="/contact"
                className="rounded-xl px-4 py-2 text-sm bg-white/10 hover:bg-white/15"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Portrait / card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-white/10 bg-white/[.04] p-5"
          >
            <div className="aspect-[4/3] rounded-lg bg-white/[.06] mb-4" />
            <div className="text-sm text-white/80">
              Currently building: CareerNest, Vectra, and an ATC Simulator.
            </div>
          </motion.div>
        </div>
      </Section>

      {/* PRINCIPLES */}
      <Section className="pt-0">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">Principles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              h: "Design × Engineering",
              p: "UI quality is a feature. I integrate design decisions into the build, not after.",
            },
            {
              h: "Systems thinking",
              p: "Architecture choices are explicit; logs, metrics, and budgets guide trade‑offs.",
            },
            {
              h: "Velocity with quality",
              p: "Ship fast, but never sloppy. Tooling, patterns, and tests where they matter most.",
            },
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

      {/* SKILLS */}
      <Section className="pt-0">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <SkillBar label="React + TypeScript" value={92} />
            <SkillBar label="Node + Express" value={88} />
            <SkillBar label="MongoDB (Modeling & Querying)" value={84} />
            <SkillBar label="Tailwind (Inline)" value={90} />
            <SkillBar label="Framer Motion (Micro‑interactions)" value={82} />
          </div>
          <div className="space-y-4">
            <SkillBar label="Accessibility (a11y)" value={80} />
            <SkillBar label="Performance (CWV)" value={86} />
            <SkillBar label="Design Systems" value={78} />
            <SkillBar label="Observability (logs/metrics)" value={74} />
            <SkillBar label="Product Strategy & Writing" value={76} />
          </div>
        </div>
      </Section>

      {/* EXPERIENCE TIMELINE */}
      <Section className="pt-0">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">Experience</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Timeline
            items={[
              {
                when: "2025 — Present",
                title: "Founder / Engineer",
                org: "Zephiron",
                points: [
                  "Portfolio SaaS products (CareerNest, Vectra)",
                  "Client work: dashboards, internal tools",
                  "Design systems, performance budgets",
                ],
              },
              {
                when: "2023 — 2025",
                title: "Software Engineer",
                org: "Top Tier Customs LLC",
                points: [
                  "E‑commerce + booking platform",
                  "Analytics dashboards",
                  "Automations & integrations",
                ],
              },
            ]}
          />
          <div className="rounded-2xl border border-white/10 bg-white/[.05] p-6">
            <div className="text-sm text-white/80 mb-2">Highlight</div>
            <p className="text-sm text-white/70">
              Led multiple end‑to‑end builds from brief → design →
              implementation → launch, with strong focus on UX and measurable
              performance outcomes.
            </p>
            <div className="mt-4 text-xs text-white/60">
              References available upon request.
            </div>
          </div>
        </div>
      </Section>

      {/* TOOLSTACK */}
      <Section className="pt-0">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">Toolstack</h2>
        <ToolCloud
          tools={[
            "React",
            "TypeScript",
            "Vite",
            "Node",
            "Express",
            "MongoDB",
            "Mongoose",
            "Tailwind",
            "Framer Motion",
            "Stripe",
            "Render",
            "Railway",
            "Vercel",
            "Netlify",
            "GitHub Actions",
          ]}
        />
      </Section>

      {/* STRIP: awards / certs (placeholder) */}
      <Section className="pt-0">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-[#22D3EE]/15 via-transparent to-[#7C3AED]/15 p-6 md:p-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-white/70">
            <div>95%+ Lighthouse</div>
            <div>${"INP < 200ms"}</div>
            <div>Stripe Ready</div>
            <div>Design Systems</div>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="pt-0">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">FAQ</h2>
        <FAQ
          items={[
            {
              q: "Are you available for consulting?",
              a: "Yes — for the right problem. Send a note via the contact page with scope, timeline, and constraints.",
            },
            {
              q: "What’s your process?",
              a: "Discovery → wireframes → interactive prototype → implementation → observability + perf pass → launch.",
            },
            {
              q: "Why inline Tailwind only?",
              a: "Portability. It keeps styles colocated and avoids config churn, ideal for rapid, high‑quality builds.",
            },
          ]}
        />
      </Section>

      {/* CTA */}
      <Section className="pt-0">
        <div className="rounded-2xl border border-white/10 bg-white/[.05] p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="text-xl font-semibold">
              Let’s build something thoughtful.
            </div>
            <p className="text-white/70 text-sm">
              I take on select collaborations via{" "}
              <span className="text-[#22D3EE]">Zephiron</span>.
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href="/contact"
              className="rounded-xl px-5 py-3 text-sm bg-[#22D3EE]/20 hover:bg-[#22D3EE]/30"
            >
              Start a conversation
            </a>
            <a
              href="/writing"
              className="rounded-xl px-5 py-3 text-sm bg-white/10 hover:bg-white/15"
            >
              Read my notes
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
