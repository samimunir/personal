export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium bg-white/[.06] border border-white/10 text-white/80">
      {children}
    </span>
  );
}
