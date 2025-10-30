import Container from "./Container";
import BrandMark from "../brand/BrandMark";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10" id="contact">
      <Container className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <BrandMark className="w-5 h-5" />
              <span className="font-semibold">Zephiron</span>
            </div>
            <p className="text-sm text-white/70">
              Engineering‑led software studio. UI polish, scalable systems, and
              measurable outcomes.
            </p>
          </div>
          <div>
            <div className="text-sm font-semibold mb-2">Site</div>
            <ul className="text-sm text-white/70 space-y-1">
              <li>
                <a className="hover:text-white" href="/">
                  Home
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="/work">
                  Work
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="/about">
                  About
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="/writing" id="writing">
                  Writing
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold mb-2">Connect</div>
            <ul className="text-sm text-white/70 space-y-1">
              <li>
                <a className="hover:text-white" href="mailto:hello@example.com">
                  Email
                </a>
              </li>
              <li>
                <a
                  className="hover:text-white"
                  href="https://github.com"
                  target="_blank"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  className="hover:text-white"
                  href="https://www.linkedin.com"
                  target="_blank"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold mb-2">Availability</div>
            <p className="text-sm text-white/70 mb-3">
              Actively exploring roles and consulting. Share your problem — I’ll
              design and ship a solution.
            </p>
            <a
              href="/contact"
              className="inline-block rounded-xl px-4 py-2 text-sm bg-[#22D3EE]/20 hover:bg-[#22D3EE]/30"
            >
              Start a conversation
            </a>
          </div>
        </div>
        <div className="mt-10 text-xs text-white/50">
          © {new Date().getFullYear()} Sami · Zephiron. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
