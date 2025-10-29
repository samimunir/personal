import Section from "../components/ui/Section";
import Button from "../components/ui/Button";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + "/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <Section>
      <h1 className="text-3xl md:text-4xl font-semibold mb-6">Contact</h1>
      <form onSubmit={submit} className="max-w-xl space-y-4">
        <input
          className="w-full rounded-xl bg-white/[.06] border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-[#22D3EE]/60"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm((v) => ({ ...v, name: e.target.value }))}
          required
        />
        <input
          className="w-full rounded-xl bg-white/[.06] border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-[#22D3EE]/60"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm((v) => ({ ...v, email: e.target.value }))}
          required
        />
        <textarea
          className="w-full rounded-xl bg-white/[.06] border border-white/10 px-4 py-3 min-h-40 outline-none focus:ring-2 focus:ring-[#22D3EE]/60"
          placeholder="Message"
          value={form.message}
          onChange={(e) => setForm((v) => ({ ...v, message: e.target.value }))}
          required
        />
        <div className="flex items-center gap-3">
          <Button disabled={status === "loading"} size="lg">
            {status === "loading" ? "Sending…" : "Send Message"}
          </Button>
          {status === "success" && (
            <span className="text-sm text-[#10B981]">
              Thanks! I’ll get back to you.
            </span>
          )}
          {status === "error" && (
            <span className="text-sm text-[#EF4444]">
              Something went wrong. Try again.
            </span>
          )}
        </div>
      </form>
    </Section>
  );
}
