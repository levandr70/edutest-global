import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import ScrollAnimation from "@/components/ScrollAnimation";

export const metadata: Metadata = {
  title: "About EduTest Global",
  description:
    "EduTest Global is an international testing center in Yerevan, Armenia. Official testing center for TOEFL, GRE, ACT, and professional assessments. Cambridge CELTA teacher training.",
};

export default function AboutPage() {
  return (
    <div className="py-12 md:py-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <ScrollAnimation direction="up" className="text-center mb-12">
            <h1 className="mb-6">About EduTest Global</h1>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              International Testing Center in Yerevan, Armenia. We provide professional administration and candidate support for official international exams.
            </p>
          </ScrollAnimation>

          {/* What We Do Section */}
          <section className="mb-12">
            <ScrollAnimation direction="up" delay={0.1}>
              <SectionHeading>What We Do</SectionHeading>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={0.2}>
              <div className="space-y-4 text-neutral-700">
                <p>
                  EduTest Global delivers official international exams including TOEFL iBT, GRE, and ACT. We operate as an authorized testing center with secure administration protocols and professional staff.
                </p>
                <p>
                  We also deliver professional assessments on behalf of leading testing providers including Pearson VUE, Kryterion, PSI, and Meazure Learning. Exam availability and scheduling are determined by each provider.
                </p>
                <p>
                  In addition to testing services, we provide Cambridge CELTA teacher training programs. CELTA is an internationally recognized English language teaching qualification.
                </p>
              </div>
            </ScrollAnimation>
          </section>

          {/* Our Standards Section */}
          <section className="mb-12">
            <ScrollAnimation direction="up" delay={0.1}>
              <SectionHeading>Our Standards</SectionHeading>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={0.2}>
              <ul className="space-y-3 text-neutral-700 list-disc list-inside ml-4">
                <li>Security and integrity: Strict protocols to ensure test validity and fairness</li>
                <li>Professional administration: Trained staff following standardized procedures</li>
                <li>Candidate support and clear communication: Assistance throughout the testing process</li>
                <li>Comfortable testing environment: Modern facilities designed for optimal testing conditions</li>
              </ul>
            </ScrollAnimation>
          </section>

          {/* Visit Us Section */}
          <ScrollAnimation direction="up" delay={0.2}>
            <section className="bg-neutral-50 p-6 sm:p-8 rounded-lg border border-neutral-200">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-primary">Visit Us</h2>
            <div className="space-y-4 text-neutral-700">
              <div>
                <p className="font-semibold mb-1">Address:</p>
                <p>67/1 Baghramyan Ave., Yerevan, Armenia</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Hours:</p>
                <p>10:00–18:00</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Phone:</p>
                <div className="space-y-1">
                  <p>
                    <a href="tel:+37460509709" className="text-primary hover:underline">
                      +374 60 509-709
                    </a>
                  </p>
                  <p>
                    <a href="tel:+37499166599" className="text-primary hover:underline">
                      +374 99 166-599
                    </a>
                  </p>
                </div>
              </div>
              <div className="pt-4">
                <Button href="/contact" variant="primary">
                  Contact Us
                </Button>
              </div>
            </div>
            </section>
          </ScrollAnimation>
        </div>
      </Container>
    </div>
  );
}
