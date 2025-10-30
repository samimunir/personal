export default function GradientBeams() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen"
      aria-hidden
    >
      <div className="absolute -top-40 -left-20 w-[50rem] h-[50rem] bg-[radial-gradient(circle_at_center,_#22D3EE_0%,_transparent_60%)] blur-3xl" />
      <div className="absolute top-1/2 -right-40 w-[45rem] h-[45rem] bg-[radial-gradient(circle_at_center,_#7C3AED_0%,_transparent_60%)] blur-3xl" />
    </div>
  );
}
