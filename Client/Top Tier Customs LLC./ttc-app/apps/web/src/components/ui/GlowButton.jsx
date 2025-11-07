import { clsx } from "clsx";

export default function GlowButton({
  as: Comp = "button",
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const base =
    "relative inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-300 select-none";
  const styles = {
    primary:
      "text-black bg-white shadow-[0_0_0_0_rgba(255,255,255,0.25)] hover:shadow-[0_0_0_10px_rgba(255,255,255,0.08)] active:translate-y-[1px]",
    ghost: "text-white border border-white/15 hover:bg-white/10",
    neon: "text-black bg-gradient-to-r from-[#B8FF5C] to-[#00E7FF] hover:brightness-110 active:translate-y-[1px]",
  };
  return (
    <Comp className={clsx(base, styles[variant], className)} {...props}>
      {children}
    </Comp>
  );
}
