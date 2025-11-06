import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 backdrop-blur border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-bold tracking-wide">
            Top Tier Customs
          </Link>
          <nav className="flex items-center gap-3 text-sm">
            <Link to="/" className="hover:opacity-80">
              Products
            </Link>
            <Link
              to="/cart"
              className="rounded-xl px-3 py-1.5 bg-white text-black"
            >
              Cart
            </Link>
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Outlet />
      </main>
      <footer className="py-10 text-center text-white/50">
        © {new Date().getFullYear()} Top Tier Customs
      </footer>
    </div>
  );
}
