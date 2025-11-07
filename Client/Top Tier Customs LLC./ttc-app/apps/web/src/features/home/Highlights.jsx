import { motion } from "framer-motion";
import Card from "../../components/ui/Card";

const items = [
  {
    title: "Performance Parts",
    text: "Curated, high-quality components tested for real-world abuse.",
  },
  {
    title: "Expert Services",
    text: "Coilovers, aero, exhaust, ceramic coating — precision installed.",
  },
  {
    title: "Transparent Pricing",
    text: "No surprises. See parts, labor, and deposits at checkout.",
  },
];

export default function Highlights() {
  return (
    <section className="py-10">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <Card className="p-5">
              <div className="text-lg font-semibold">{it.title}</div>
              <div className="mt-1 text-white/70 text-sm">{it.text}</div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
