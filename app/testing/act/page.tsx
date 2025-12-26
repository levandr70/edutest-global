import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import TestDatesCalendarWrapper from "@/components/testing/TestDatesCalendarWrapper";
import ScrollAnimation from "@/components/ScrollAnimation";
import StaggerAnimation from "@/components/StaggerAnimation";

export const metadata: Metadata = {
  title: "ACT Testing",
  description:
    "Take the ACT at EduTest Global. Official testing center for ACT college readiness assessment in Yerevan, Armenia. Book your exam for undergraduate admissions.",
};

export default function ACTPage() {
  return (
    <div className="py-12 md:py-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <ScrollAnimation direction="up" className="text-center mb-12">
            <h1 className="mb-6">ACT Testing</h1>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Official ACT testing center in Yerevan, Armenia. Take the American College Testing assessment in a secure, professional environment.
            </p>
          </ScrollAnimation>

          {/* About the ACT® Test Section */}
          <section className="mb-16">
            <ScrollAnimation direction="up" delay={0.1}>
              <SectionHeading>
                <div>
                  <div className="text-3xl md:text-4xl font-bold mb-2">About the ACT® Test</div>
                </div>
              </SectionHeading>
            </ScrollAnimation>
            
            <ScrollAnimation direction="up" delay={0.2}>
              <div className="space-y-6 text-neutral-700 mb-8">
              <p>
                The ACT is a standardized test used for college admissions in the United States. It measures what you have learned in high school and assesses your readiness for college-level work through multiple-choice sections and an optional Writing test.
              </p>
              </div>
            </ScrollAnimation>

            <StaggerAnimation className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-8" staggerDelay={0.1}>
              {/* Test Structure & Timing Card */}
              <div className="bg-white border border-neutral-200 rounded-lg p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-primary">Test Structure & Timing</h3>
                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                  <p className="font-medium text-neutral-900">Four multiple-choice sections:</p>
                  <ul className="space-y-1.5 sm:space-y-2 ml-4 list-disc">
                    <li><span className="font-medium">English:</span> 35 minutes</li>
                    <li><span className="font-medium">Mathematics:</span> 50 minutes</li>
                    <li><span className="font-medium">Reading:</span> 40 minutes</li>
                    <li><span className="font-medium">Science:</span> 40 minutes</li>
                  </ul>
                  <div className="mt-2 sm:mt-3">
                    <p className="font-medium text-neutral-900">Optional Writing:</p>
                    <p className="ml-4">40 minutes, 1 essay</p>
                  </div>
                </div>
              </div>

              {/* Scores & Reporting Card */}
              <div className="bg-white border border-neutral-200 rounded-lg p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-primary">Scores & Reporting</h3>
                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                  <div>
                    <p className="font-medium text-neutral-900 mb-1">Score Availability:</p>
                    <p>Over 97% of scores are available within a 2–4 week period after the test date.</p>
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900 mb-1">Reporting Timeline:</p>
                    <p>Multiple-choice scores are normally reported within 2–8 weeks after the test date; writing scores may follow later.</p>
                  </div>
                </div>
              </div>

              {/* Test Day Essentials Card */}
              <div className="bg-white border border-neutral-200 rounded-lg p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-primary">Test Day Essentials</h3>
                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                  <div>
                    <p className="font-medium text-neutral-900 mb-1">ID Requirements:</p>
                    <p>Bring a valid, government-issued photo ID (passport or national ID).</p>
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900 mb-1">Electronic Devices:</p>
                    <p>You may not handle or access a cell phone or electronic device at any time in the testing room or during break times.</p>
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900 mb-1">Arrival:</p>
                    <p>Arrive at least 30 minutes before your scheduled test time for check-in.</p>
                  </div>
                </div>
              </div>

              {/* Fees Card */}
              <div className="bg-white border border-neutral-200 rounded-lg p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-primary">Fees</h3>
                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                  <p>ACT fees vary by location and options. Additional fees may apply (late registration, standby testing, change fee).</p>
                </div>
              </div>
            </StaggerAnimation>

            {/* Official ACT Links */}
            <ScrollAnimation direction="up" delay={0.2}>
              <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-primary">Official ACT Links</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                <a
                  href="https://www.act.org/content/act/en/products-and-services/the-act/test-preparation/act-exam-sections-and-structure.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white bg-primary hover:bg-primary-800 rounded-lg transition-colors"
                >
                  Sections & Structure
                </a>
                <a
                  href="https://www.act.org/content/act/en/products-and-services/the-act/scores.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white bg-primary hover:bg-primary-800 rounded-lg transition-colors"
                >
                  Scores
                </a>
                <a
                  href="https://www.act.org/content/act/en/products-and-services/the-act/registration.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white bg-primary hover:bg-primary-800 rounded-lg transition-colors"
                >
                  Registration
                </a>
                <a
                  href="https://www.act.org/content/act/en/products-and-services/the-act/registration/fees.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white bg-primary hover:bg-primary-800 rounded-lg transition-colors"
                >
                  Fees
                </a>
                <a
                  href="https://www.act.org/content/act/en/products-and-services/the-act/test-day.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white bg-primary hover:bg-primary-800 rounded-lg transition-colors sm:col-span-2 lg:col-span-1"
                >
                  Test Day
                </a>
              </div>
              </div>
            </ScrollAnimation>
          </section>

          {/* Announced ACT Test Dates Section */}
          <section className="mb-16 pt-16 border-t border-neutral-200">
            <ScrollAnimation direction="up" delay={0.1}>
              <SectionHeading>
                <div>
                  <div className="text-3xl md:text-4xl font-bold mb-2">Announced ACT Test Dates</div>
                  <div className="text-base md:text-lg font-normal text-neutral-600 mt-2">
                    Announced sessions at our testing center. Registration is completed through ACT.
                  </div>
                </div>
              </SectionHeading>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={0.2}>
              <div className="max-w-xl mx-auto">
                <TestDatesCalendarWrapper exam="act" />
              </div>
            </ScrollAnimation>
          </section>

          {/* Overview Section */}
          <section className="mb-12">
            <ScrollAnimation direction="up" delay={0.1}>
              <SectionHeading>Overview</SectionHeading>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={0.2}>
              <div className="space-y-4 text-neutral-700">
              <p>
                The ACT is a standardized test used for college admissions in the United States. It measures what you have learned in high school and assesses your readiness for college-level work.
              </p>
              <p>
                The ACT consists of four multiple-choice tests: English (35 minutes), Mathematics (50 minutes), Reading (40 minutes), and Science (40 minutes). There is also an optional Writing test (40 minutes, 1 essay).
              </p>
              <p>
                The ACT is accepted by all four-year colleges and universities in the United States and is widely recognized for undergraduate admissions.
              </p>
              </div>
            </ScrollAnimation>
          </section>

          {/* Registration Section */}
          <section className="mb-12">
            <ScrollAnimation direction="up" delay={0.1}>
              <SectionHeading>Registration</SectionHeading>
            </ScrollAnimation>
            <div className="space-y-3 text-neutral-700">
              <ScrollAnimation direction="up" delay={0.2}>
                <p>To register for the ACT:</p>
              </ScrollAnimation>
              <ScrollAnimation direction="up" delay={0.3}>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Create an account on the official ACT website</li>
                <li>Select EduTest Global as your testing center</li>
                <li>Choose your preferred test date and time</li>
                <li>Indicate if you will take the optional Writing section</li>
                <li>Complete payment and registration</li>
                <li>Receive confirmation with test day instructions</li>
                </ol>
              </ScrollAnimation>
            </div>
          </section>

          {/* Before You Come Section */}
          <section className="mb-12">
            <ScrollAnimation direction="up" delay={0.1}>
              <SectionHeading>Before You Come</SectionHeading>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={0.2}>
              <ul className="space-y-3 text-neutral-700 list-disc list-inside ml-4">
              <li>Bring a valid, government-issued photo ID (passport or national ID)</li>
              <li>Arrive at least 30 minutes before your scheduled test time</li>
              <li>Review the ACT test day policies and requirements</li>
              <li>Ensure you know your ACT account login credentials</li>
              <li>Bring an approved calculator if needed for the Mathematics section</li>
              <li>Do not bring personal items; lockers are provided for storage</li>
              </ul>
            </ScrollAnimation>
          </section>

          {/* What to Expect on Test Day Section */}
          <section className="mb-12">
            <ScrollAnimation direction="up" delay={0.1}>
              <SectionHeading>What to Expect on Test Day</SectionHeading>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={0.2}>
              <ul className="space-y-3 text-neutral-700 list-disc list-inside ml-4">
              <li>Check-in process with ID verification and photo capture</li>
              <li>Secure testing environment with individual workstations</li>
              <li>Computer-based test administration with breaks between sections (no electronic devices allowed during breaks)</li>
              <li>Professional staff available for assistance throughout the test</li>
              <li>Over 97% of scores are available within 2–4 weeks after the test date, but some may take up to 8 weeks</li>
              <li>You may not handle or access a cell phone or electronic device at any time in the testing room or during break times</li>
              </ul>
            </ScrollAnimation>
          </section>

          {/* Location & Contact Section */}
          <section className="bg-neutral-50 p-4 sm:p-6 md:p-8 rounded-lg border border-neutral-200">
            <ScrollAnimation direction="up" delay={0.1}>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-primary">Location & Contact</h2>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={0.2}>
              <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-neutral-700">
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
              <div className="pt-3 sm:pt-4">
                <Button href="/contact" variant="primary">
                  Contact Us
                </Button>
              </div>
              </div>
            </ScrollAnimation>
          </section>
        </div>
      </Container>
    </div>
  );
}
