import { useParams, Link } from "react-router-dom";
import { findCaseStudy } from "../lib/caseStudies";
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
  return <CaseLayout {...cs} />;
}
