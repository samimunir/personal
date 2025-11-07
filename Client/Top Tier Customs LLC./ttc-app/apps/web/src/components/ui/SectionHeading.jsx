export default function SectionHeading({ kicker, title, right }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        {kicker && (
          <div className="text-xs uppercase tracking-widest text-white/60">
            {kicker}
          </div>
        )}
        <h2 className="mt-1 text-2xl md:text-3xl font-bold shine">{title}</h2>
      </div>
      {right}
    </div>
  );
}
