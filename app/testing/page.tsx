import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import ScrollAnimation from "@/components/ScrollAnimation";
import StaggerAnimation from "@/components/StaggerAnimation";

export const metadata: Metadata = {
  title: "Professional Testing",
  description:
    "EduTest Global is an official testing center for professional certification and licensure exams in Yerevan, Armenia. Take global certification exams with Pearson VUE, Kryterion, PSI, and Meazure Learning.",
};

export default function TestingPage() {
  return (
    <div className="py-12 md:py-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <ScrollAnimation direction="up" className="text-center mb-16">
            <h1 className="mb-6">Professional Testing</h1>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Take global certification and licensure exams at EduTest Global in Yerevan.
            </p>
          </ScrollAnimation>

          {/* Our Testing Partners Section */}
          <section className="mb-16">
            <ScrollAnimation direction="up" delay={0.1}>
              <SectionHeading>Our Testing Partners</SectionHeading>
            </ScrollAnimation>
            <StaggerAnimation className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-8" staggerDelay={0.1}>
              {/* Pearson VUE Card */}
              <div className="bg-white border border-neutral-200 rounded-lg p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-primary">Pearson VUE</h3>
                <p className="text-xs sm:text-sm text-neutral-700 mb-3 sm:mb-4">
                  Secure exam delivery for certification and licensure programs.
                </p>
                <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                  <p className="text-xs font-medium text-neutral-900">What to expect:</p>
                  <ul className="text-xs sm:text-sm text-neutral-700 space-y-1 ml-4 list-disc">
                    <li>Computer-based testing in a controlled test-center environment</li>
                    <li>Program-specific rules (ID, allowed items, timing) vary by exam sponsor</li>
                    <li>Some programs may offer online proctoring (if offered by the sponsor)</li>
                  </ul>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:mt-4">
                  <a
                    href="https://www.pearsonvue.com/us/en/about.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-primary hover:bg-primary-800 rounded-lg transition-colors"
                  >
                    Official Website
                  </a>
                  <a
                    href="https://www.pearsonvue.com/us/en/test-takers/a-to-z-program-list.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
                  >
                    Find Your Program
                  </a>
                </div>
              </div>

              {/* Kryterion Card */}
              <div className="bg-white border border-neutral-200 rounded-lg p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-primary">Kryterion</h3>
                <p className="text-xs sm:text-sm text-neutral-700 mb-3 sm:mb-4">
                  Online testing solutions supporting secure exam delivery.
                </p>
                <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                  <p className="text-xs font-medium text-neutral-900">What to expect:</p>
                  <ul className="text-xs sm:text-sm text-neutral-700 space-y-1 ml-4 list-disc">
                    <li>Delivery method depends on the program (in-center and/or online)</li>
                    <li>Follow sponsor instructions for system checks and test rules</li>
                    <li>Identity verification and exam security controls may apply</li>
                  </ul>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:mt-4">
                  <a
                    href="https://www.kryterion.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-primary hover:bg-primary-800 rounded-lg transition-colors"
                  >
                    Official Website
                  </a>
                  <a
                    href="https://www.kryterion.com/about-kryterion/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
                  >
                    About
                  </a>
                </div>
              </div>

              {/* PSI Card */}
              <div className="bg-white border border-neutral-200 rounded-lg p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-primary">PSI</h3>
                <p className="text-xs sm:text-sm text-neutral-700 mb-3 sm:mb-4">
                  Secure certification and licensure testing with a focus on test integrity.
                </p>
                <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                  <p className="text-xs font-medium text-neutral-900">What to expect:</p>
                  <ul className="text-xs sm:text-sm text-neutral-700 space-y-1 ml-4 list-disc">
                    <li>In-person testing and/or remote proctoring depending on program</li>
                    <li>Program rules vary by sponsor; follow your confirmation email</li>
                    <li>Arrive early with valid ID matching your registration</li>
                  </ul>
                </div>
                <div className="mt-3 sm:mt-4">
                  <a
                    href="https://www.psiexams.com/certification/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-primary hover:bg-primary-800 rounded-lg transition-colors"
                  >
                    Official Website
                  </a>
                </div>
              </div>

              {/* Meazure Learning Card */}
              <div className="bg-white border border-neutral-200 rounded-lg p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-primary">Meazure Learning</h3>
                <p className="text-xs sm:text-sm text-neutral-700 mb-3 sm:mb-4">
                  End-to-end exam development, delivery, and proctoring solutions.
                </p>
                <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                  <p className="text-xs font-medium text-neutral-900">What to expect:</p>
                  <ul className="text-xs sm:text-sm text-neutral-700 space-y-1 ml-4 list-disc">
                    <li>Supports credentialing and higher-education style assessments (program-specific)</li>
                    <li>Secure delivery and proctoring models may vary by sponsor</li>
                    <li>Always follow sponsor communications for exam-day requirements</li>
                  </ul>
                </div>
                <div className="mt-3 sm:mt-4">
                  <a
                    href="https://www.meazurelearning.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-primary hover:bg-primary-800 rounded-lg transition-colors"
                  >
                    Official Website
                  </a>
                </div>
              </div>
            </StaggerAnimation>
            <ScrollAnimation direction="fade" delay={0.2}>
              <p className="text-sm text-neutral-500 text-center max-w-2xl mx-auto mt-6">
                Programs and delivery options vary by exam sponsor. Availability depends on provider schedules and seat availability.
              </p>
            </ScrollAnimation>
          </section>

          {/* How Professional Testing Works Section */}
          <section className="mb-16 pt-16 border-t border-neutral-200">
            <ScrollAnimation direction="up" delay={0.1}>
              <SectionHeading>How Professional Testing Works</SectionHeading>
            </ScrollAnimation>
            <StaggerAnimation className="grid md:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6" staggerDelay={0.1}>
              <div className="bg-white border border-neutral-200 rounded-lg p-4 sm:p-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-1.5 sm:mb-2">Identify Your Exam</h3>
                    <p className="text-xs sm:text-sm text-neutral-700">
                      Identify your exam sponsor and program. Check which testing partner delivers your specific certification or licensure exam.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-neutral-200 rounded-lg p-4 sm:p-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-1.5 sm:mb-2">Register on Official Portal</h3>
                    <p className="text-xs sm:text-sm text-neutral-700">
                      Register on the official partner/sponsor portal. Complete your registration and payment through the exam sponsor's website.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-neutral-200 rounded-lg p-4 sm:p-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-1.5 sm:mb-2">Choose Test Center</h3>
                    <p className="text-xs sm:text-sm text-neutral-700">
                      Choose EduTest Global as your test center (if applicable). Select our location during registration when the option is available.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-neutral-200 rounded-lg p-4 sm:p-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-1.5 sm:mb-2">Test Day</h3>
                    <p className="text-xs sm:text-sm text-neutral-700">
                      Arrive with required ID and follow test-day instructions. Bring acceptable identification and follow the rules provided in your confirmation email.
                    </p>
                  </div>
                </div>
              </div>
            </StaggerAnimation>
          </section>

          {/* Before You Come Section */}
          <section className="mb-16 pt-16 border-t border-neutral-200">
            <ScrollAnimation direction="up" delay={0.1}>
              <SectionHeading>Before You Come</SectionHeading>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={0.2}>
              <div className="bg-white border border-neutral-200 rounded-lg p-4 sm:p-6 mt-4 sm:mt-6">
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-neutral-700 list-disc list-inside ml-4">
                <li>Bring acceptable ID that matches your registration profile exactly</li>
                <li>Arrive 30 minutes early unless your confirmation says otherwise</li>
                <li>Personal items are not allowed in the test room; lockers may be available for storage</li>
                <li>Rules vary by sponsor/program; follow your confirmation email</li>
              </ul>
              </div>
            </ScrollAnimation>
          </section>

          {/* Need Help Section */}
          <section className="mb-16 pt-16 border-t border-neutral-200">
            <ScrollAnimation direction="up" delay={0.1}>
              <SectionHeading>Need Help?</SectionHeading>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={0.2}>
              <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 sm:p-6 md:p-8 mt-4 sm:mt-6">
              <p className="text-sm sm:text-base text-neutral-700 mb-4 sm:mb-6">
                Not sure which partner delivers your exam? Contact us and we'll guide you.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a
                  href="tel:+37460509709"
                  className="inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 bg-primary text-white rounded-lg text-sm sm:text-base font-semibold hover:bg-primary-800 transition-colors"
                >
                  Call
                </a>
                <Button href="/contact" variant="secondary">
                  Contact Us
                </Button>
              </div>
              </div>
            </ScrollAnimation>
          </section>

          {/* Location & Contact Section */}
          <section className="mb-16 pt-16 border-t border-neutral-200">
            <ScrollAnimation direction="up" delay={0.1}>
              <SectionHeading>Location & Contact</SectionHeading>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={0.2}>
              <div className="bg-neutral-50 rounded-lg p-4 sm:p-6 border border-neutral-200 mt-4 sm:mt-6">
              <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-neutral-700">
                <div>
                  <p className="font-semibold mb-1 text-gray-900">Address</p>
                  <p>67/1 Baghramyan Ave., Yerevan, Armenia</p>
                </div>
                <div>
                  <p className="font-semibold mb-1 text-gray-900">Hours</p>
                  <p>10:00–18:00</p>
                </div>
                <div>
                  <p className="font-semibold mb-1 text-gray-900">Phone</p>
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
              </div>
              </div>
            </ScrollAnimation>
          </section>
        </div>
      </Container>
    </div>
  );
}
