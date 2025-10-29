import Section from "../components/ui/Section";

export default function About() {
  return (
    <>
      <Section>
        <h1 className="text-3xl md:text-4xl font-semibold mb-6">About</h1>
        <p className="text-white/70 max-w-3xl mb-10">
          I’m Sami — a full‑stack engineer focused on building production‑grade
          software with clean architecture and refined UI/UX. I love tackling
          complex systems and turning them into intuitive products.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/[.05] p-6">
            <h3 className="font-semibold mb-2">Frontend</h3>
            <ul className="text-white/70 text-sm space-y-1 list-disc list-inside">
              <li>React + TypeScript</li>
              <li>Tailwind (inline), Framer Motion</li>
              <li>Accessibility, perf budgets</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[.05] p-6">
            <h3 className="font-semibold mb-2">Backend</h3>
            <ul className="text-white/70 text-sm space-y-1 list-disc list-inside">
              <li>Node + Express</li>
              <li>MongoDB (Mongoose)</li>
              <li>Auth, rate‑limit, observability</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[.05] p-6">
            <h3 className="font-semibold mb-2">Ops & Design</h3>
            <ul className="text-white/70 text-sm space-y-1 list-disc list-inside">
              <li>Vercel/Netlify, Render/Railway</li>
              <li>CI, Lighthouse, analytics</li>
              <li>Design systems, micro‑interactions</li>
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}
