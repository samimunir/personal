export default function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/15 px-3 py-1 text-xs text-white/80">
      {children}
    </span>
  );
}
