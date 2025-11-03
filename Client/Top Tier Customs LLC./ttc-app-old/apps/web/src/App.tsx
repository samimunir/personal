export default function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="sticky top-0 z-10 backdrop-blur border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="font-bold tracking-wide">Top Tier Customs</div>
          <nav className="flex items-center gap-4 text-sm">
            <a href="#products" className="hover:opacity-80">
              Products
            </a>
            <a href="#services" className="hover:opacity-80">
              Services
            </a>
            <button className="rounded-xl px-4 py-2 bg-white text-black">
              Cart
            </button>
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        <section id="hero" className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold">
              Custom builds. Premium parts.
            </h1>
            <p className="mt-4 text-white/70">
              Book services, shop products, manage your TTC account — all in one
              place.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="#services"
                className="px-4 py-2 rounded-xl bg-white text-black"
              >
                Book a Service
              </a>
              <a
                href="#products"
                className="px-4 py-2 rounded-xl border border-white/20"
              >
                Shop Products
              </a>
            </div>
          </div>
          <div className="aspect-video rounded-2xl bg-gradient-to-br from-white/10 to-white/5" />
        </section>
      </main>
      <footer className="py-10 text-center text-white/50">
        © {new Date().getFullYear()} Top Tier Customs
      </footer>
    </div>
  );
}
