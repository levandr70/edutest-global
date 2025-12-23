import type { Metadata } from "next";
import Container from "@/components/Container";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";
import ScrollAnimation from "@/components/ScrollAnimation";
import StaggerAnimation from "@/components/StaggerAnimation";

export const metadata: Metadata = {
  title: "EduTest Global | International Testing Center in Yerevan",
  description:
    "Official test delivery for TOEFL iBT, GRE, ACT, and professional certification exams. Cambridge CELTA teacher training in Yerevan, Armenia. Authorized testing center with secure, professional administration.",
};

const examCards = [
  {
    name: "TOEFL iBT",
    description: "Test of English as a Foreign Language - measure your English proficiency for academic purposes.",
    href: "/testing/toefl",
    secondaryLabel: "View Announced Dates",
    secondaryHref: "/testing/toefl",
  },
  {
    name: "GRE",
    description: "Graduate Record Examinations - required for admission to many graduate schools worldwide.",
    href: "/testing/gre",
    secondaryLabel: "View Announced Dates",
    secondaryHref: "/testing/gre",
  },
  {
    name: "ACT",
    description: "American College Testing - comprehensive college readiness assessment for undergraduate admissions.",
    href: "/testing/act",
    secondaryLabel: "View Announced Dates",
    secondaryHref: "/testing/act",
  },
  {
    name: "Cambridge CELTA",
    description: "Internationally recognized English language teaching certification program.",
    href: "/celta",
    secondaryLabel: "Application Process",
    secondaryHref: "/celta",
  },
  {
    name: "Professional Testing",
    description: "Certification and licensure exams through Pearson VUE, Kryterion, PSI, and Meazure Learning.",
    href: "/testing",
    secondaryLabel: "How It Works",
    secondaryHref: "/testing",
  },
];

const testingPartners = [
  { name: "Pearson VUE", href: "/testing" },
  { name: "Kryterion", href: "/testing" },
  { name: "PSI", href: "/testing" },
  { name: "Meazure Learning", href: "/testing" },
];

const trustBar = [
  { title: "Authorized Exam Delivery", description: "Official testing center for international exams" },
  { title: "Secure Administration", description: "Strict security protocols and professional oversight" },
  { title: "Comfortable Testing Lab", description: "Modern facilities designed for optimal testing conditions" },
  { title: "Candidate Support", description: "Dedicated staff assistance throughout your exam experience" },
];

const whyChooseUs = [
  {
    title: "Official Testing Center",
    description:
      "Authorized testing facility for major international examination providers with strict security protocols.",
  },
  {
    title: "Expert Support",
    description:
      "Experienced instructors and dedicated staff committed to your success throughout your journey.",
  },
  {
    title: "Proven Track Record",
    description:
      "Years of helping students and professionals achieve their academic and career goals.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white py-20 md:py-32 relative overflow-hidden">
        <Container>
          <ScrollAnimation direction="fade" duration={0.8} className="text-center max-w-4xl mx-auto relative z-10">
            <ScrollAnimation direction="down" delay={0.2} className="inline-block mb-4">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-white/20 backdrop-blur-sm border border-white/30">
                International Testing Center • Yerevan
              </span>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={0.3}>
              <h1 className="mb-6 text-white">
                Official International Exams in Yerevan
              </h1>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={0.4}>
              <p className="text-xl md:text-2xl mb-4 text-primary-100 max-w-2xl mx-auto">
                Authorized testing center for official international exams. Secure, professional administration in a comfortable testing environment.
              </p>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={0.5}>
              <p className="text-sm md:text-base mb-10 text-primary-200 max-w-2xl mx-auto">
                67/1 Baghramyan Ave • Open 10:00–18:00
              </p>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={0.6}>
              <div className="flex justify-center">
                <Button href="/contact" variant="secondary">
                  Contact Us
                </Button>
              </div>
            </ScrollAnimation>
          </ScrollAnimation>
        </Container>
      </section>

      {/* Trust Bar */}
      <section className="py-8 bg-neutral-50 border-b border-neutral-200">
        <Container>
          <StaggerAnimation className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8" staggerDelay={0.1}>
            {trustBar.map((item, index) => (
              <div
                key={index}
                className="text-center md:text-left flex flex-col md:flex-row items-center md:items-start gap-2"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900 text-sm md:text-base">
                    {item.title}
                  </h4>
                  <p className="text-xs md:text-sm text-neutral-600">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </StaggerAnimation>
        </Container>
      </section>

      {/* Official Exams Section */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <Container>
          <ScrollAnimation direction="up" delay={0.2}>
            <SectionHeading>Official Exams</SectionHeading>
          </ScrollAnimation>
          <StaggerAnimation className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8" staggerDelay={0.1}>
            {examCards.map((exam) => (
              <div
                key={exam.name}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-neutral-200"
              >
                <h3 className="text-xl font-semibold mb-3 text-primary">
                  {exam.name}
                </h3>
                <p className="text-sm text-neutral-700 mb-4">
                  {exam.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Link
                    href={exam.href}
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-800 rounded-lg transition-colors"
                  >
                    Learn More
                  </Link>
                  {exam.secondaryLabel && exam.secondaryHref && (
                    <Link
                      href={exam.secondaryHref}
                      className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
                    >
                      {exam.secondaryLabel}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </StaggerAnimation>
          
          {/* Announced Dates Quick Access */}
          <ScrollAnimation direction="up" delay={0.3}>
            <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
              <Link
                href="/testing/toefl"
                className="px-4 py-2 text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 rounded-lg border border-neutral-200 hover:border-primary transition-colors"
              >
                TOEFL Dates
              </Link>
              <Link
                href="/testing/gre"
                className="px-4 py-2 text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 rounded-lg border border-neutral-200 hover:border-primary transition-colors"
              >
                GRE Dates
              </Link>
              <Link
                href="/testing/act"
                className="px-4 py-2 text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 rounded-lg border border-neutral-200 hover:border-primary transition-colors"
              >
                ACT Dates
              </Link>
            </div>
          </ScrollAnimation>
        </Container>
      </section>

      {/* Professional Testing Partners Section */}
      <section className="py-16 md:py-24 bg-neutral-50 border-t border-neutral-200">
        <Container>
          <ScrollAnimation direction="up" className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900">
              Professional Testing Partners
            </h2>
            <p className="text-sm text-neutral-600 max-w-2xl mx-auto">
              We deliver computer-based assessments on behalf of leading international testing providers.
            </p>
          </ScrollAnimation>
          <StaggerAnimation className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto" staggerDelay={0.1}>
            {testingPartners.map((partner) => (
              <Link
                key={partner.name}
                href={partner.href}
                className="bg-white px-6 py-4 rounded-md border border-neutral-300 hover:border-primary hover:bg-neutral-50 text-center text-neutral-700 font-medium transition-colors"
              >
                {partner.name}
              </Link>
            ))}
          </StaggerAnimation>
          <ScrollAnimation direction="up" delay={0.2}>
            <div className="flex justify-center mb-6">
              <Button href="/testing" variant="primary">
                Explore Professional Tests
              </Button>
            </div>
          </ScrollAnimation>
          <ScrollAnimation direction="fade" delay={0.3}>
            <p className="text-xs text-neutral-500 text-center max-w-3xl mx-auto">
              Exam availability, scheduling, and registration processes are determined by each testing provider.
            </p>
          </ScrollAnimation>
        </Container>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-neutral-50 to-white">
        <Container>
          <ScrollAnimation direction="up" delay={0.2}>
            <SectionHeading>Why Choose Us</SectionHeading>
          </ScrollAnimation>
          <StaggerAnimation className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto" staggerDelay={0.15}>
            {whyChooseUs.map((item) => (
              <div
                key={item.title}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-neutral-200 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="mb-4 text-primary text-xl font-semibold">
                  {item.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </StaggerAnimation>
        </Container>
      </section>

      {/* Contact CTA Section */}
      <section className="py-12 md:py-16 bg-primary text-white">
        <Container>
          <ScrollAnimation direction="up" duration={0.8} className="max-w-4xl mx-auto text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/20">
            <ScrollAnimation direction="fade" delay={0.2}>
              <h2 className="mb-4 text-white">Ready to Get Started?</h2>
            </ScrollAnimation>
            <ScrollAnimation direction="fade" delay={0.3}>
              <p className="text-lg md:text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
                Contact us today to learn more about our testing services and
                certification programs. Our team is here to help you succeed.
              </p>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/contact" variant="secondary">
                  Get in Touch
                </Button>
                <a
                  href="tel:+37460509709"
                  className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold rounded-lg transition-all duration-300 bg-neutral-700 text-white hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 focus:ring-offset-white shadow-sm hover:shadow-md active:scale-[0.98]"
                >
                  Call
                </a>
              </div>
            </ScrollAnimation>
          </ScrollAnimation>
        </Container>
      </section>
    </>
  );
}

