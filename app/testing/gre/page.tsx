import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import TestDatesCalendarWrapper from "@/components/testing/TestDatesCalendarWrapper";

export const metadata: Metadata = {
  title: "GRE Testing",
  description:
    "Take the GRE at EduTest Global. Official testing center for GRE General Test in Yerevan, Armenia. Prepare for graduate school admissions with our testing services.",
};

export default function GREPage() {
  return (
    <div className="py-12 md:py-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="mb-6">GRE Testing</h1>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Official GRE General Test testing center in Yerevan, Armenia. Take the Graduate Record Examinations in a secure, professional environment.
            </p>
          </div>

          {/* About the GRE General Test Section */}
          <section className="mb-16">
            <SectionHeading>
              <div>
                <div className="text-3xl md:text-4xl font-bold mb-2">About the GRE® General Test</div>
              </div>
            </SectionHeading>
            
            <div className="space-y-6 text-neutral-700 mb-8">
              <p>
                The GRE General Test measures skills that are essential for success in graduate and business school programs: Verbal Reasoning, Quantitative Reasoning, and Analytical Writing. The test is designed to assess your readiness for graduate-level academic work.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Test Structure & Timing Card */}
              <div className="bg-white border border-neutral-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-primary">Test Structure & Timing</h3>
                <div className="space-y-3 text-sm">
                  <p className="font-medium text-neutral-900">Overall test time: about 1 hour 58 minutes</p>
                  <div className="space-y-2">
                    <p className="font-medium text-neutral-900">Five sections:</p>
                    <ul className="space-y-2 ml-4 list-disc">
                      <li><span className="font-medium">Analytical Writing:</span> One "Analyze an Issue" task — 30 minutes</li>
                      <li><span className="font-medium">Verbal Reasoning:</span> Section 1 (12 questions, 18 minutes), Section 2 (15 questions, 23 minutes)</li>
                      <li><span className="font-medium">Quantitative Reasoning:</span> Section 1 (12 questions, 21 minutes), Section 2 (15 questions, 26 minutes)</li>
                    </ul>
                  </div>
                  <p className="text-xs text-neutral-500 mt-3">Structure effective beginning September 22, 2023</p>
                </div>
              </div>

              {/* Scores & Validity Card */}
              <div className="bg-white border border-neutral-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-primary">Scores & Validity</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-neutral-900 mb-1">Score Availability:</p>
                    <p>Scores are available approximately 8–10 days after the test date.</p>
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900 mb-1">Score Validity:</p>
                    <p>Scores are reportable for 5 years following the test date.</p>
                  </div>
                </div>
              </div>

              {/* Scheduling & Retakes Card */}
              <div className="bg-white border border-neutral-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-primary">Scheduling & Retakes</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-neutral-900 mb-1">Retake Policy:</p>
                    <p>You can take the GRE General Test once every 21 days, up to 5 times within any continuous rolling 12-month period (365 days).</p>
                  </div>
                </div>
              </div>

              {/* Fees Card */}
              <div className="bg-white border border-neutral-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-primary">Fees</h3>
                <div className="space-y-3 text-sm">
                  <p>ETS lists the GRE General Test fee as $220 for most areas of the world (subject to change).</p>
                  <p className="text-xs text-neutral-500">Effective July 1, 2024; subject to change</p>
                </div>
              </div>
            </div>

            {/* Official ETS Links */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-primary">Official ETS Links</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                <a
                  href="https://www.ets.org/gre/test-takers/general-test/prepare/test-structure.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-800 rounded-lg transition-colors"
                >
                  Test Structure
                </a>
                <a
                  href="https://www.ets.org/gre/test-takers/general-test/register.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-800 rounded-lg transition-colors"
                >
                  Registration / Retakes
                </a>
                <a
                  href="https://www.ets.org/gre/test-takers/general-test/scores/get-scores.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-800 rounded-lg transition-colors"
                >
                  Getting Scores
                </a>
                <a
                  href="https://www.ets.org/gre/test-takers/general-test/register/fees.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-800 rounded-lg transition-colors"
                >
                  Fees
                </a>
              </div>
            </div>
          </section>

          {/* Announced GRE Test Dates Section */}
          <section className="mb-16 pt-16 border-t border-neutral-200">
            <SectionHeading>
              <div>
                <div className="text-3xl md:text-4xl font-bold mb-2">Announced GRE Test Dates</div>
                <div className="text-base md:text-lg font-normal text-neutral-600 mt-2">
                  Announced sessions at our testing center. Registration is completed through ETS.
                </div>
              </div>
            </SectionHeading>
            <div className="max-w-xl mx-auto">
              <TestDatesCalendarWrapper exam="gre" />
            </div>
          </section>

          {/* Overview Section */}
          <section className="mb-12">
            <SectionHeading>Overview</SectionHeading>
            <div className="space-y-4 text-neutral-700">
              <p>
                The Graduate Record Examinations (GRE) is a standardized test that is an admissions requirement for many graduate schools in the United States and Canada, as well as for some business schools.
              </p>
              <p>
                The GRE General Test is administered via computer at our testing center. Overall test time is about 1 hour 58 minutes. The GRE is accepted by thousands of graduate and business schools worldwide and provides a common measure for comparing candidates as part of the admissions process.
              </p>
            </div>
          </section>

          {/* Registration Section */}
          <section className="mb-12">
            <SectionHeading>Registration</SectionHeading>
            <div className="space-y-3 text-neutral-700">
              <p>To register for the GRE General Test:</p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Create an account on the official ETS website</li>
                <li>Select EduTest Global as your testing center</li>
                <li>Choose your preferred test date and time</li>
                <li>Complete payment and registration</li>
                <li>Receive confirmation with test day instructions</li>
              </ol>
            </div>
          </section>

          {/* Before You Come Section */}
          <section className="mb-12">
            <SectionHeading>Before You Come</SectionHeading>
            <ul className="space-y-3 text-neutral-700 list-disc list-inside ml-4">
              <li>Bring a valid, government-issued photo ID (passport or national ID)</li>
              <li>Arrive at least 30 minutes before your scheduled test time</li>
              <li>Review the ETS GRE test day policies and requirements</li>
              <li>Ensure you know your ETS account login credentials</li>
              <li>Do not bring personal items; lockers are provided for storage</li>
            </ul>
          </section>

          {/* What to Expect on Test Day Section */}
          <section className="mb-12">
            <SectionHeading>What to Expect on Test Day</SectionHeading>
            <ul className="space-y-3 text-neutral-700 list-disc list-inside ml-4">
              <li>Check-in process with ID verification and photo capture</li>
              <li>Secure testing environment with individual workstations</li>
              <li>Computer-based test administration with on-screen calculator provided</li>
              <li>Breaks scheduled between test sections</li>
              <li>Professional staff available for assistance throughout the test</li>
              <li>Scores are available approximately 8–10 days after the test date</li>
            </ul>
          </section>

          {/* Location & Contact Section */}
          <section className="bg-neutral-50 p-8 rounded-lg border border-neutral-200">
            <h2 className="text-2xl font-semibold mb-6 text-primary">Location & Contact</h2>
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
        </div>
      </Container>
    </div>
  );
}
