import { clsx } from "clsx";

export default function Button({
  as: Comp = "button",
  variant = "primary",
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition-colors";
  const styles = {
    primary: "bg-white text-black hover:bg-white/90 active:bg-white",
    ghost: "border border-white/15 hover:bg-white/10",
    subtle: "bg-white/10 hover:bg-white/15",
  };
  return <Comp className={clsx(base, styles[variant], className)} {...props} />;
}
