export default function TrustStrip() {
  const brands = [
    "Brembo",
    "HKS",
    "Bilstein",
    "Ohlins",
    "Akrapovic",
    "AP Racing",
  ];
  return (
    <section className="py-10 border-y border-white/10 bg-neutral-950/50">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-white/50 text-xs uppercase tracking-widest">
          {brands.map((b) => (
            <span key={b} className="hover:text-white/70 transition">
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
