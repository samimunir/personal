export default function Callout({
  type = "info",
  children,
}: {
  type?: "info" | "success" | "warn" | "error";
  children: React.ReactNode;
}) {
  const styles = {
    info: "bg-white/[.05] border-white/10",
    success: "bg-[#10B981]/10 border-[#10B981]/30",
    warn: "bg-[#F59E0B]/10 border-[#F59E0B]/30",
    error: "bg-[#EF4444]/10 border-[#EF4444]/30",
  }[type];
  return (
    <div className={"rounded-2xl border p-4 text-white/90 " + styles}>
      {children}
    </div>
  );
}
