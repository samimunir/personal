export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const USE_FORMSPREE = false; // set true if you prefer Formspree without your server
const FORMSPREE_ENDPOINT = "https://formspree.io/f/yourid"; // replace when USE_FORMSPREE=true

export async function sendContact(payload: ContactPayload) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    const res = await fetch(
      USE_FORMSPREE ? FORMSPREE_ENDPOINT : "/api/contact",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      }
    );
    clearTimeout(timer);
    if (!res.ok) throw new Error("Request failed");
    return await res.json().catch(() => ({ ok: true }));
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
}
