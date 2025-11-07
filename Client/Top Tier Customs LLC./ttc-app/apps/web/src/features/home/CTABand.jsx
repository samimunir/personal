import GlowButton from "../../components/ui/GlowButton";

export default function CTABand() {
  return (
    <section className="py-14">
      <div className="mx-auto max-w-7xl px-4">
        <div className="gb rounded-3xl">
          <div className="gb-inner rounded-3xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold">
              Ready to transform your build?
            </h3>
            <p className="mt-2 text-white/70 max-w-2xl mx-auto">
              Book a consult or start with curated parts. Transparent pricing,
              expert guidance, and a premium experience.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <GlowButton variant="neon">Start Checkout</GlowButton>
              <GlowButton variant="ghost">Book a Service</GlowButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
