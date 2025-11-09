import { useEffect, useState } from "react";
import {
  Wrench,
  Trophy,
  Shield,
  Truck,
  Star,
  CheckCircle2,
  ArrowRight,
  PlayCircle,
  Sparkles,
  Users,
  Factory,
} from "lucide-react";

export default function About() {
  // tiny stat “counter up” effect
  const [stats, setStats] = useState({ years: 0, projects: 0, rating: 0 });
  useEffect(() => {
    let f = 0;
    const i = setInterval(() => {
      f += 1;
      setStats({
        years: Math.min(7, Math.floor(f * 0.25)),
        projects: Math.min(1200, Math.floor(f * 40)),
        rating: Math.min(4.9, Number((f * 0.05).toFixed(1))),
      });
      if (f > 100) clearInterval(i);
    }, 16);
    return () => clearInterval(i);
  }, []);

  const pillars = [
    {
      icon: <Wrench className="w-6 h-6 text-red-500" />,
      title: "Craft over compromise",
      desc: "Every build is approached like a one-off—precise fitment, clean wiring, and OEM-plus finishes.",
    },
    {
      icon: <Shield className="w-6 h-6 text-red-500" />,
      title: "Reliability first",
      desc: "We spec parts and calibrations that survive daily driving, track days, and long road trips.",
    },
    {
      icon: <Truck className="w-6 h-6 text-red-500" />,
      title: "From supply to install",
      desc: "One roof for sourcing, inventory, install, and post-sale support so lead times stay predictable.",
    },
    {
      icon: <Trophy className="w-6 h-6 text-red-500" />,
      title: "Pro-grade results",
      desc: "Dyno-proven gains, warranty-safe practices, and documentation with every major job.",
    },
  ];

  const timeline = [
    {
      date: "2019",
      title: "Top Tier Customs Founded",
      text: "Launched with a focus on German platforms and OEM-plus upgrades.",
    },
    {
      date: "2020",
      title: "Services Expand",
      text: "Introduced electronics retrofits, ambient lighting, and steering upgrades.",
    },
    {
      date: "2022",
      title: "Performance Division",
      text: "Added coilovers, brakes, exhaust systems, dyno-verified tunes.",
    },
    {
      date: "2024",
      title: "All-in-one Platform",
      text: "Unified shop, booking, and order tracking under one application.",
    },
  ];

  const badges = [
    {
      icon: <Shield className="w-5 h-5" />,
      label: "12-Month Workmanship Warranty",
    },
    {
      icon: <Truck className="w-5 h-5" />,
      label: "Tracked Shipping on Orders",
    },
    {
      icon: <CheckCircle2 className="w-5 h-5" />,
      label: "Genuine/Verified Parts",
    },
    { icon: <Star className="w-5 h-5" />, label: "4.9★ Avg. Customer Rating" },
  ];

  const gallery = [
    "/images/ttc-hero-1.jpg",
    "/images/ttc-hero-2.jpg",
    "/images/ttc-hero-3.jpg",
    "/images/ttc-hero-4.jpg",
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero */}
      <section className="relative border-b border-gray-800 bg-gradient-to-r from-gray-900 via-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            {/* <p className="uppercase tracking-widest text-xs text-gray-400">
              About
            </p> */}
            <h1 className="mt-3 text-4xl sm:text-5xl md:text-6xl font-black leading-tight">
              Built for <span className="text-red-600">enthusiasts</span>.
              Proven for <span className="text-red-600">everyday</span>.
            </h1>
            <p className="mt-5 text-gray-400 text-lg">
              Top Tier Customs LLC is an end-to-end automotive platform—shop
              premium parts, book professional services, and manage orders under
              one roof.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <a
                href="/shop"
                className="px-5 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition font-semibold inline-flex items-center gap-2"
              >
                Explore Products <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/services"
                className="px-5 py-3 rounded-lg border border-gray-800 hover:border-red-600 transition inline-flex items-center gap-2"
              >
                Book a Service <PlayCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
        {/* subtle glow */}
        <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-red-600/40 to-transparent" />
      </section>

      {/* Stats */}
      <section className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatCard label="Years perfecting builds" value={`${stats.years}+`} />
          <StatCard label="Projects delivered" value={`${stats.projects}+`} />
          <StatCard label="Customer rating" value={`${stats.rating}★`} />
        </div>
      </section>

      {/* Pillars */}
      <section className="border-b border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-black">
            What sets us apart
          </h2>
          <p className="text-gray-400 mt-2">
            Our approach blends motorsport rigor with daily-driver sensibility.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p) => (
              <article
                key={p.title}
                className="group rounded-xl border-2 border-gray-800 hover:border-red-600 transition-all bg-gradient-to-br from-gray-900 to-black p-6 hover:shadow-2xl hover:shadow-red-600/20"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gray-900 border border-gray-800 group-hover:border-red-600 transition">
                  {p.icon}
                </div>
                <h3 className="mt-4 font-bold text-lg group-hover:text-red-500 transition-colors">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-gray-400">{p.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery strip */}
      <section className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {gallery.map((src, i) => (
              <div
                key={i}
                className="relative aspect-[4/3] rounded-xl overflow-hidden border border-gray-800"
              >
                <img
                  src={src}
                  alt="Top Tier Customs gallery"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story + Video placeholder */}
      <section className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="uppercase tracking-widest text-xs text-gray-400">
              Our story
            </p>
            <h2 className="mt-3 text-3xl md:text-4xl font-black">
              From a single bay to a full-stack custom shop
            </h2>
            <p className="mt-4 text-gray-400">
              We started building for ourselves—then for friends—then for a
              growing community that wanted OEM-grade results with enthusiast
              detail. Today TTC combines an online storefront, live inventory,
              and a booking system with a workshop that treats every car like
              our own.
            </p>

            <ul className="mt-6 space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-red-500 mt-0.5" /> Ambient
                lighting & interior refinements
              </li>
              <li className="flex items-start gap-3">
                <Factory className="w-5 h-5 text-red-500 mt-0.5" /> OEM+
                retrofits and electronics
              </li>
              <li className="flex items-start gap-3">
                <Wrench className="w-5 h-5 text-red-500 mt-0.5" /> Coilovers,
                brakes, exhaust, aero & tuning
              </li>
            </ul>
          </div>

          <div className="relative rounded-2xl overflow-hidden border-2 border-gray-800 bg-gray-900 aspect-video">
            {/* Replace with real video/image later */}
            <div className="absolute inset-0 grid place-items-center">
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition">
                <PlayCircle className="w-5 h-5" /> Play shop reel
              </button>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-b border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-black">Milestones</h2>
          <div className="mt-8 relative">
            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 h-full w-px bg-gray-800" />
            <div className="space-y-8">
              {timeline.map((t, i) => (
                <div
                  key={i}
                  className={`grid md:grid-cols-2 gap-6 ${
                    i % 2 ? "md:text-left" : "md:text-right"
                  }`}
                >
                  <div className={`${i % 2 ? "md:order-2" : "md:order-1"}`}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-900 border border-gray-800 text-sm">
                      <Users className="w-4 h-4 text-red-500" />
                      {t.date}
                    </div>
                    <h3 className="mt-3 font-bold text-xl">{t.title}</h3>
                    <p className="mt-2 text-gray-400">{t.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Badges */}
      <section className="border-b border-gray-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((b, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-xl bg-gray-900/60 border border-gray-800 px-4 py-3"
            >
              <div className="text-red-500">{b.icon}</div>
              <p className="text-sm text-gray-300">{b.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black">
            Ready to start your build?
          </h2>
          <p className="mt-3 text-gray-400">
            Tell us your platform, goals, and budget—we’ll propose a parts list
            and timeline.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <a
              href="/services"
              className="px-5 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition font-semibold inline-flex items-center gap-2"
            >
              Book a consultation <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/contact"
              className="px-5 py-3 rounded-lg border border-gray-800 hover:border-red-600 transition"
            >
              Contact us
            </a>
          </div>
        </div>
      </section>

      <footer className="py-10 text-center text-white/50 border-t border-gray-800">
        © {new Date().getFullYear()} Top Tier Customs LLC
      </footer>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-xl bg-gradient-to-br from-gray-900 to-black border-2 border-gray-800 hover:border-red-600 transition p-6 text-center">
      <div className="text-3xl md:text-4xl font-black text-red-600">
        {value}
      </div>
      <p className="mt-2 text-gray-400 text-sm">{label}</p>
    </div>
  );
}
