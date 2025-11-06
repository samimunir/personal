import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { stripePromise } from "../lib/stripe";
import { useNavigate } from "react-router-dom";

const USER = "demo";

function CheckoutInner() {
  const stripe = useStripe();
  const elements = useElements();
  const nav = useNavigate();
  const [clientSecret, setClientSecret] = useState(null);
  const cartQ = useQuery({
    queryKey: ["cart", USER],
    queryFn: async () =>
      (await api.get("/cart", { params: { userId: USER } })).data,
  });

  useEffect(() => {
    if (!cartQ.data) return;
    const amount = cartQ.data.subtotal || 0;
    if (amount <= 0) return;
    // Create PI (frontend-ready; redirects allowed)
    api
      .post("/payments/intent", {
        amount,
        currency: "usd",
        metadata: {
          type: "catalog",
          userId: USER,
          itemsJson: JSON.stringify(cartQ.data.items || []),
        },
      })
      .then((r) => setClientSecret(r.data.clientSecret));
  }, [cartQ.data]);

  async function handlePay(e) {
    e.preventDefault();
    if (!stripe || !elements) return;
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/checkout/result",
      },
      redirect: "if_required",
    });
    if (!error) {
      // If no redirect is required, we still land here; go check result page
      window.location.assign("/checkout/result");
    } else {
      alert(error.message || "Payment failed");
    }
  }

  if (!clientSecret) return <div>Preparing checkout…</div>;
  return (
    <form onSubmit={handlePay} className="max-w-md space-y-4">
      <PaymentElement />
      <button className="rounded-xl px-4 py-2 bg-white text-black">Pay</button>
    </form>
  );
}

export default function Checkout() {
  return (
    <section>
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <Elements
        stripe={stripePromise}
        options={{ appearance: { theme: "night" } }}
      >
        <CheckoutInner />
      </Elements>
    </section>
  );
}
