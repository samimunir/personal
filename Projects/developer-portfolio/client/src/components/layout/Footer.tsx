import Container from "./Container";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10">
      <Container className="py-10 text-sm text-white/70">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p>© {new Date().getFullYear()} Sami · All rights reserved.</p>
          <div className="flex gap-4">
            <a
              className="hover:text-white"
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              className="hover:text-white"
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a className="hover:text-white" href="mailto:hello@example.com">
              Email
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
