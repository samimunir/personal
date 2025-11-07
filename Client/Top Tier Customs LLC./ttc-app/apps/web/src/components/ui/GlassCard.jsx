export default function GlassCard({ className = "", children }) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  );
}
