import { useMemo, useRef, useState } from "react";
import Section from "../components/ui/Section";
import { InputField, TextAreaField } from "../components/contact/Field";
import CopyButton from "../components/contact/CopyButton";
import { sendContact } from "../lib/contact";
import { toast } from "../components/ui/Toast";

function validateEmail(v: string) {
  return /.+@.+\..+/.test(v);
}
function useRateLimit(limit = 3, windowMs = 60000) {
  const [hits, setHits] = useState<number[]>([]);
  function check() {
    const now = Date.now();
    const fresh = hits.filter((h) => now - h < windowMs);
    if (fresh.length >= limit) return false;
    setHits([...fresh, now]);
    return true;
  }
  return check;
}

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const honeypot = useRef(""); // bots will fill this hidden field
  const canSend = useRateLimit(3, 60000);

  const valid = useMemo(() => {
    const e: { [k: string]: string } = {};
    if (!name.trim()) e.name = "Please enter your name.";
    if (!validateEmail(email)) e.email = "Enter a valid email.";
    if (!subject.trim()) e.subject = "Please add a subject.";
    if (message.trim().length < 20)
      e.message = "Message should be at least 20 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, email, subject, message]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (honeypot.current) return; // spam bot
    if (!valid) return;
    if (!canSend()) {
      toast({
        title: "Slow down",
        body: "Please wait a minute before sending more.",
      });
      return;
    }
    try {
      setBusy(true);
      await sendContact({ name, email, subject, message });
      toast({
        title: "Message sent",
        body: "Thanks for reaching out — I will reply soon.",
      });
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      toast({
        title: "Something went wrong",
        body: "Try again or email directly.",
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <Section>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8">
        {/* INFO */}
        <aside className="rounded-2xl border border-white/10 bg-white/[.05] p-6 h-max">
          <h1 className="text-2xl md:text-3xl font-semibold mb-2">Contact</h1>
          <p className="text-white/70 text-sm mb-4">
            Have a project, role, or collaboration in mind? Send a note. I
            typically respond within 24–48 hours.
          </p>

          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-white/70">Email</span>
              <CopyButton value="hello@zephiron.dev">Copy</CopyButton>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70">GitHub</span>
              <a
                className="rounded-lg px-2.5 py-1.5 text-xs bg-white/10 hover:bg-white/15"
                href="https://github.com/"
                target="_blank"
              >
                Open
              </a>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70">LinkedIn</span>
              <a
                className="rounded-lg px-2.5 py-1.5 text-xs bg-white/10 hover:bg-white/15"
                href="https://www.linkedin.com/"
                target="_blank"
              >
                Open
              </a>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-white/10 bg-white/[.04] p-4">
            <div className="text-sm font-semibold mb-1">Availability</div>
            <p className="text-xs text-white/70">
              Open to full‑time and select consulting engagements via Zephiron.
            </p>
          </div>
        </aside>

        {/* FORM */}
        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-white/10 bg-white/[.05] p-6 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Name"
              value={name}
              onChange={setName}
              error={errors.name}
              required
            />
            <InputField
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              error={errors.email}
              required
            />
          </div>
          <InputField
            label="Subject"
            value={subject}
            onChange={setSubject}
            error={errors.subject}
            required
          />
          <TextAreaField
            label="Message"
            value={message}
            onChange={setMessage}
            error={errors.message}
            required
            placeholder="Tell me about the problem, scope, constraints, and timeline…"
          />

          {/* Honeypot (hidden) */}
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
            onChange={(e) => {
              honeypot.current = e.target.value;
            }}
          />

          <div className="flex items-center justify-between gap-3 pt-2">
            <div className="text-xs text-white/50">
              This form is protected by a simple rate limit & honeypot.
            </div>
            <button
              disabled={busy || !valid}
              className={
                (busy || !valid ? "opacity-50 " : "") +
                " rounded-xl px-5 py-2 text-sm bg-[#22D3EE]/20 hover:bg-[#22D3EE]/30 transition-colors"
              }
            >
              {busy ? "Sending…" : "Send message"}
            </button>
          </div>
        </form>
      </div>
    </Section>
  );
}

// ──────────────────────────────────────────────────────────────
// OPTIONAL SERVER (drop-in example)
// server/routes/contact.js
// import express from 'express'
// import nodemailer from 'nodemailer'
// export const router = express.Router()
// router.post('/contact', async (req, res) => {
//   const { name, email, subject, message } = req.body || {}
//   if(!name || !email || !subject || !message) return res.status(400).json({ ok:false })
//   // TODO: validate and rate-limit properly; send email via transporter
//   return res.json({ ok:true })
// })
// export default router
//
// Then mount in server/index.ts:
// app.use('/api', contactRouter)
