import { useParams, Link } from "react-router-dom";
import { findCaseStudy, findPrevNext } from "../lib/caseStudies";
import CaseLayout from "../components/case/CaseLayout";

export default function CaseStudy() {
  const { slug = "" } = useParams();
  const cs = findCaseStudy(slug);
  if (!cs) {
    return (
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-white/70">
            Case study not found.{" "}
            <Link to="/work" className="text-[#22D3EE] underline">
              Back to Work
            </Link>
          </p>
        </div>
      </section>
    );
  }
  const { prev, next } = findPrevNext(cs.slug);
  return (
    <>
      <CaseLayout {...cs} />
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {prev ? (
              <Link
                to={`/work/${prev.slug}`}
                className="rounded-xl border border-white/10 bg-white/[.05] p-4 hover:bg-white/[.08] transition-colors"
              >
                ← {prev.title}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                to={`/work/${next.slug}`}
                className="rounded-xl border border-white/10 bg-white/[.05] p-4 hover:bg-white/[.08] transition-colors text-right"
              >
                {next.title} →
              </Link>
            ) : (
              <span />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
