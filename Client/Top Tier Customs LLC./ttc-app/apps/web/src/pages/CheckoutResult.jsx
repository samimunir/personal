import { useEffect, useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { Link } from "react-router-dom";

export default function CheckoutResult() {
  const stripe = useStripe();
  const [status, setStatus] = useState("Checking…");

  useEffect(() => {
    const secret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    if (!stripe || !secret) return;
    stripe.retrievePaymentIntent(secret).then(({ paymentIntent }) => {
      setStatus(paymentIntent?.status || "unknown");
    });
  }, [stripe]);

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">Payment Result</h1>
      <div className="text-white/80">Status: {status}</div>
      <Link to="/" className="underline">
        Back to products
      </Link>
    </section>
  );
}
