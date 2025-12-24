import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import Link from "next/link";
import ScrollAnimation from "@/components/ScrollAnimation";
import StaggerAnimation from "@/components/StaggerAnimation";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact EduTest Global in Yerevan, Armenia. Visit us at 67/1 Baghramyan Ave. or call +374 60 509-709, +374 99 166-599. Open 10:00–18:00.",
};

export default function ContactPage() {
  return (
    <div className="py-12 md:py-20">
      <Container>
        <div className="max-w-6xl mx-auto">
          <ScrollAnimation direction="up" className="text-center mb-12">
            <h1 className="mb-6">Contact Us</h1>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Get in touch with us to learn more about our testing services and
              certification programs.
            </p>
          </ScrollAnimation>

          {/* Contact Cards */}
          <StaggerAnimation className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-12" staggerDelay={0.15}>
            {/* Address Card */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-neutral-200">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary-100 flex items-center justify-center mb-3 sm:mb-4">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-primary">
                Address
              </h2>
              <div className="space-y-1 text-sm sm:text-base text-neutral-700">
                <p className="font-medium">67/1 Baghramyan Ave.</p>
                <p>Yerevan, Armenia</p>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-neutral-200">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary-100 flex items-center justify-center mb-3 sm:mb-4">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-primary">
                Phone
              </h2>
              <div className="space-y-2 text-sm sm:text-base text-neutral-700">
                <p>
                  <a
                    href="tel:+37460509709"
                    className="text-primary hover:underline font-semibold"
                  >
                    +374 60 509-709
                  </a>
                </p>
                <p>
                  <a
                    href="tel:+37499166599"
                    className="text-primary hover:underline font-semibold"
                  >
                    +374 99 166-599
                  </a>
                </p>
              </div>
            </div>

            {/* Hours Card */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-neutral-200">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary-100 flex items-center justify-center mb-3 sm:mb-4">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-primary">
                Business Hours
              </h2>
              <p className="text-neutral-700 text-base sm:text-lg font-medium">10:00–18:00</p>
            </div>
          </StaggerAnimation>

          {/* Google Map */}
          <ScrollAnimation direction="up" delay={0.2} className="mb-12">
            <div className="bg-white rounded-lg shadow-md border border-neutral-200 overflow-hidden">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src="https://www.google.com/maps?q=67%2F1+Baghramyan+Ave%2C+Yerevan%2C+Armenia&output=embed"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="EduTest Global Location"
                  className="absolute top-0 left-0 w-full h-full border-0"
                />
              </div>
            </div>
          </ScrollAnimation>

          {/* What can we help you with? Section */}
          <div className="mb-12">
            <ScrollAnimation direction="up" delay={0.1}>
              <SectionHeading>What can we help you with?</SectionHeading>
            </ScrollAnimation>
            <StaggerAnimation className="grid md:grid-cols-2 gap-4 mt-6" staggerDelay={0.1}>
              <Link
                href="/testing/toefl"
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-neutral-200 hover:border-primary group"
              >
                <h3 className="text-lg font-semibold mb-2 text-primary group-hover:text-primary-800">
                  TOEFL iBT
                </h3>
                <p className="text-sm text-neutral-600">
                  Test of English as a Foreign Language for academic purposes
                </p>
              </Link>
              <Link
                href="/testing/gre"
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-neutral-200 hover:border-primary group"
              >
                <h3 className="text-lg font-semibold mb-2 text-primary group-hover:text-primary-800">
                  GRE
                </h3>
                <p className="text-sm text-neutral-600">
                  Graduate Record Examinations for graduate school admissions
                </p>
              </Link>
              <Link
                href="/testing/act"
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-neutral-200 hover:border-primary group"
              >
                <h3 className="text-lg font-semibold mb-2 text-primary group-hover:text-primary-800">
                  ACT
                </h3>
                <p className="text-sm text-neutral-600">
                  American College Testing for undergraduate admissions
                </p>
              </Link>
              <Link
                href="/testing"
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-neutral-200 hover:border-primary group"
              >
                <h3 className="text-lg font-semibold mb-2 text-primary group-hover:text-primary-800">
                  Professional Testing
                </h3>
                <p className="text-sm text-neutral-600">
                  Certification and licensure exams through leading providers
                </p>
              </Link>
              <Link
                href="/celta"
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-neutral-200 hover:border-primary group md:col-span-2"
              >
                <h3 className="text-lg font-semibold mb-2 text-primary group-hover:text-primary-800">
                  Cambridge CELTA
                </h3>
                <p className="text-sm text-neutral-600">
                  Internationally recognized English language teaching certification
                </p>
              </Link>
            </StaggerAnimation>
          </div>

          {/* Contact Form */}
          <ScrollAnimation direction="up" delay={0.2}>
            <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md border border-neutral-200">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-primary text-center">
              Send Us a Message
            </h2>
            <ContactForm />
            </div>
          </ScrollAnimation>

          {/* Quick Actions */}
          <ScrollAnimation direction="up" delay={0.3}>
            <div className="mt-8 sm:mt-12 bg-neutral-50 p-6 sm:p-8 rounded-lg text-center">
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Prefer to Call?</h2>
            <p className="text-sm sm:text-base text-neutral-600 mb-4 sm:mb-6">
              Reach out to us directly via phone for immediate assistance.
            </p>
            <div className="flex justify-center">
              <a
                href="tel:+37460509709"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3.5 text-sm sm:text-base font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm hover:shadow-md active:scale-[0.98] bg-primary text-white hover:bg-primary-800 focus:ring-primary-500 focus:ring-offset-white"
              >
                Call Us
              </a>
            </div>
            </div>
          </ScrollAnimation>
        </div>
      </Container>
    </div>
  );
}
