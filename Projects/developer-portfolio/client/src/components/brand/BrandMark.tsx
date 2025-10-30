export default function BrandMark({ className = "" }: { className?: string }) {
  // Minimal Z monogram made from two paths. Crisp at small sizes.
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className}>
      <defs>
        <linearGradient id="zg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
      <rect
        x="2"
        y="2"
        width="28"
        height="28"
        rx="6"
        fill="url(#zg)"
        opacity=".25"
      />
      <path
        d="M8 10h16l-16 12h16"
        fill="none"
        stroke="#22D3EE"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
