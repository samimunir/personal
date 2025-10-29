import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export default function Button({
  className,
  leftIcon,
  rightIcon,
  variant = "primary",
  size = "md",
  children,
  ...rest
}: Props) {
  const base =
    "inline-flex items-center gap-2 rounded-xl font-medium transition-[transform,background,box-shadow] duration-200 ease-[cubic-bezier(.22,1,.36,1)] focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/60";
  const sizes = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-5 py-3",
  }[size];
  const styles = {
    primary:
      "bg-[#22D3EE]/20 hover:bg-[#22D3EE]/30 text-white hover:-translate-y-0.5 shadow-[0_2px_10px_rgba(0,0,0,0.25)]",
    secondary: "bg-white/10 hover:bg-white/15 text-white",
    ghost: "bg-transparent text-white/80 hover:text-white",
  }[variant];
  return (
    <button className={cn(base, sizes, styles, className)} {...rest}>
      {leftIcon}
      <span>{children}</span>
      {rightIcon}
    </button>
  );
}
