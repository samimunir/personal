export default function Footer() {
  return (
    <footer className="mt-12 border-t border-black/10 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-10 text-center text-black/60 dark:text-white/60">
        © {new Date().getFullYear()} Top Tier Customs • Engineered for
        performance
      </div>
    </footer>
  );
}
