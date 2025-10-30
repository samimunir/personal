import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { Project } from "../../lib/projects";

export default function ProjectCardPro({ p, i }: { p: Project; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.35, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="group rounded-2xl border border-white/10 bg-white/[.05] overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.25)]"
    >
      <Link to={`/work/${p.slug}`} className="block">
        <div className="relative h-44 overflow-hidden">
          <img
            src={p.cover}
            alt="cover"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold leading-tight">{p.title}</h3>
            <span className="text-xs rounded-full border border-white/10 bg-white/[.06] px-2 py-1 text-white/70">
              {p.category}
            </span>
          </div>
          <p className="text-sm text-white/70 mt-1">{p.summary}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <span
                key={s}
                className="text-xs rounded-full border border-white/10 bg-white/[.04] px-2 py-1 text-white/70"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
