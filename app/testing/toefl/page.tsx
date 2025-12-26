import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import TestDatesCalendarWrapper from "@/components/testing/TestDatesCalendarWrapper";
import ScrollAnimation from "@/components/ScrollAnimation";
import StaggerAnimation from "@/components/StaggerAnimation";

export const metadata: Metadata = {
  title: "TOEFL Testing",
  description:
    "Take the TOEFL test at EduTest Global. Official testing center for TOEFL iBT in Yerevan, Armenia. Book your exam and prepare for academic success.",
};

export default function TOEFLPage() {
  return (
    <div className="py-12 md:py-20 pb-24 md:pb-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <ScrollAnimation direction="up" className="mb-12 sm:mb-16">
            <div className="bg-neutral-50 rounded-lg p-6 sm:p-8 md:p-12 border border-neutral-200">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
                TOEFL iBT Testing
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-neutral-600 leading-relaxed max-w-3xl mx-auto">
                EduTest Global delivers the TOEFL Internet-Based Test (iBT) at our testing center in Yerevan, Armenia. We provide a secure, professional environment for your English proficiency assessment.
              </p>
            </div>
          </ScrollAnimation>

          {/* About TOEFL iBT® Section */}
          <section className="mb-16">
            <ScrollAnimation direction="up" delay={0.1}>
              <SectionHeading>
                <div>
                  <div className="text-3xl md:text-4xl font-bold mb-2">About TOEFL iBT®</div>
                </div>
              </SectionHeading>
            </ScrollAnimation>
            
            <ScrollAnimation direction="up" delay={0.2}>
              <div className="space-y-6 text-neutral-700 mb-8">
              <p>
                The TOEFL iBT evaluates all four language skills essential for effective communication: Reading, Listening, Speaking, and Writing. The test is administered via computer at our testing center and is accepted by more than 11,000 universities and institutions worldwide.
              </p>
              </div>
            </ScrollAnimation>

            <StaggerAnimation className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-8" staggerDelay={0.1}>
              {/* Test Structure & Timing Card */}
              <div className="bg-white border border-neutral-200 rounded-lg p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-primary">Test Structure & Timing</h3>
                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                  <p className="font-medium text-neutral-900">Total time: The test takes just under 2 hours to complete, but plan for about 2.5 hours total including ~30 minutes for check-in.</p>
                  <div className="space-y-1.5 sm:space-y-2">
                    <p className="font-medium text-neutral-900">Four sections:</p>
                    <ul className="space-y-1.5 sm:space-y-2 ml-4 list-disc">
                      <li><span className="font-medium">Reading:</span> 35 minutes, 20 questions</li>
                      <li><span className="font-medium">Listening:</span> 36 minutes, 28 questions</li>
                      <li><span className="font-medium">Speaking:</span> 16 minutes, 4 tasks</li>
                      <li><span className="font-medium">Writing:</span> 29 minutes, 2 tasks</li>
                    </ul>
                  </div>
                  <p className="text-xs text-neutral-500 mt-2 sm:mt-3">No scheduled breaks in the TOEFL iBT test.</p>
                </div>
              </div>

              {/* Scores & Validity Card */}
              <div className="bg-white border border-neutral-200 rounded-lg p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-primary">Scores & Validity</h3>
                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                  <div>
                    <p className="font-medium text-neutral-900 mb-1">Score Availability:</p>
                    <p>Scores are available in your ETS account 4–8 days after your test date.</p>
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900 mb-1">Score Validity:</p>
                    <p>Scores are valid for 2 years.</p>
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900 mb-1">PDF Score Reports:</p>
                    <p>PDF score reports are available 1 day after you receive electronic scores.</p>
                  </div>
                </div>
              </div>

              {/* Retakes Card */}
              <div className="bg-white border border-neutral-200 rounded-lg p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-primary">Retakes</h3>
                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                  <div>
                    <p className="font-medium text-neutral-900 mb-1">Retake Policy:</p>
                    <p>No limit to how many times you can take the TOEFL iBT, but you cannot take it more than once in a 3-day period.</p>
                  </div>
                </div>
              </div>

              {/* Test Day Essentials Card */}
              <div className="bg-white border border-neutral-200 rounded-lg p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-primary">Test Day Essentials</h3>
                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                  <div>
                    <p className="font-medium text-neutral-900 mb-1">ID Requirements:</p>
                    <p>ETS ID requirements vary by location and citizenship. ETS recommends bringing two forms of ID. Please confirm your acceptable ID on the ETS site.</p>
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900 mb-1">Arrival:</p>
                    <p>Arrive at least 30 minutes before your scheduled test time for check-in.</p>
                  </div>
                </div>
              </div>

              {/* Fees Card */}
              <div className="bg-white border border-neutral-200 rounded-lg p-4 sm:p-6 md:col-span-2">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-primary">Fees</h3>
                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                  <p>TOEFL iBT fee varies by location. Please check the ETS website for current fees in your area.</p>
                </div>
              </div>
            </StaggerAnimation>

            {/* Official ETS Links */}
            <ScrollAnimation direction="up" delay={0.2}>
              <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-primary">Official ETS Links</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                <a
                  href="https://www.ets.org/toefl/test-takers/ibt/about/content.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white bg-primary hover:bg-primary-800 rounded-lg transition-colors"
                >
                  Content/Structure
                </a>
                <a
                  href="https://www.ets.org/toefl/test-takers/ibt/scores/get-scores.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white bg-primary hover:bg-primary-800 rounded-lg transition-colors"
                >
                  Get Scores
                </a>
                <a
                  href="https://www.ets.org/toefl/test-takers/ibt/register/id.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white bg-primary hover:bg-primary-800 rounded-lg transition-colors"
                >
                  ID Requirements
                </a>
                <a
                  href="https://www.ets.org/toefl/test-takers/ibt/register/fees.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white bg-primary hover:bg-primary-800 rounded-lg transition-colors"
                >
                  Fees
                </a>
                <a
                  href="https://www.ets.org/toefl/test-takers/ibt/test-day/test-center-test-day.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white bg-primary hover:bg-primary-800 rounded-lg transition-colors sm:col-span-2 lg:col-span-1"
                >
                  Test Day Info
                </a>
              </div>
              </div>
            </ScrollAnimation>
          </section>

          {/* Announced Test Dates Section */}
          <section className="mb-16 pt-16 border-t border-neutral-200">
            <ScrollAnimation direction="up" delay={0.1}>
              <SectionHeading>
                <div>
                  <div className="text-3xl md:text-4xl font-bold mb-2">Announced TOEFL iBT Test Dates</div>
                  <div className="text-base md:text-lg font-normal text-neutral-600 mt-2">
                    Announced sessions at our testing center. Registration is completed through ETS.
                  </div>
                </div>
              </SectionHeading>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={0.2}>
              <div className="max-w-xl mx-auto">
                <TestDatesCalendarWrapper exam="toefl" />
              </div>
            </ScrollAnimation>
          </section>

          {/* Test Content and Structure Section */}
          <section className="mb-16 pt-16 border-t border-neutral-200">
            <ScrollAnimation direction="up" delay={0.1}>
              <SectionHeading>Test Content and Structure</SectionHeading>
            </ScrollAnimation>
            <div className="space-y-6 text-neutral-700">
              {/* Update Cards */}
              <StaggerAnimation className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6" staggerDelay={0.1}>
                <div className="bg-white border border-neutral-200 rounded-lg p-4">
                  <p className="font-semibold text-gray-900 mb-2">Content students can relate to</p>
                  <p className="text-sm text-neutral-700">
                    Traditional academic topics are supplemented with relevant, real-life content from modern academic life and student experience.
                  </p>
                </div>
                <div className="bg-white border border-neutral-200 rounded-lg p-4">
                  <p className="font-semibold text-gray-900 mb-2">Materials that reflect today's world</p>
                  <p className="text-sm text-neutral-700">
                    Reading materials can include websites, articles, and media that mirror real student reading habits, alongside academic content.
                  </p>
                </div>
                <div className="bg-white border border-neutral-200 rounded-lg p-4">
                  <p className="font-semibold text-gray-900 mb-2">Adaptive testing</p>
                  <p className="text-sm text-neutral-700">
                    Reading and Listening include adaptive design (multistage), adjusting based on performance to better reflect proficiency.
                  </p>
                </div>
                <div className="bg-white border border-neutral-200 rounded-lg p-4">
                  <p className="font-semibold text-gray-900 mb-2">Simplified experience</p>
                  <p className="text-sm text-neutral-700">
                    A more streamlined booking-to-scoring experience designed to reduce confusion and improve the overall test experience.
                  </p>
                </div>
              </StaggerAnimation>
              
              {/* Compliance Note */}
              <ScrollAnimation direction="fade" delay={0.2}>
                <p className="text-sm text-neutral-500 italic mt-6 pt-4 border-t border-neutral-200">
                  Test format, content, registration, fees, and scoring are determined by ETS.
                </p>
              </ScrollAnimation>
            </div>
          </section>

          {/* Test Section and Timing Overview */}
          <section className="mb-16 pt-16 border-t border-neutral-200">
            <ScrollAnimation direction="up" delay={0.1}>
              <SectionHeading>Test Section and Timing Overview</SectionHeading>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={0.2}>
              <div className="space-y-4 text-neutral-700">
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="inline-block min-w-full align-middle">
                  <div className="overflow-hidden border border-neutral-200 rounded-lg">
                    <table className="min-w-full divide-y divide-neutral-200">
                      <thead className="bg-neutral-50">
                        <tr>
                          <th className="px-3 py-3 sm:px-4 text-left text-xs sm:text-sm font-semibold text-gray-900 whitespace-nowrap">
                            Section
                          </th>
                          <th className="px-3 py-3 sm:px-4 text-left text-xs sm:text-sm font-semibold text-gray-900">
                            What you do
                          </th>
                          <th className="px-3 py-3 sm:px-4 text-left text-xs sm:text-sm font-semibold text-gray-900 whitespace-nowrap">
                            Approx. base time
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-neutral-200">
                        <tr className="hover:bg-neutral-50">
                          <td className="px-3 py-3 sm:px-4 text-xs sm:text-sm font-medium text-gray-900 whitespace-nowrap">
                            Reading
                          </td>
                          <td className="px-3 py-3 sm:px-4 text-xs sm:text-sm">
                            Read passages and answer questions
                          </td>
                          <td className="px-3 py-3 sm:px-4 text-xs sm:text-sm whitespace-nowrap">
                            35 minutes
                          </td>
                        </tr>
                        <tr className="hover:bg-neutral-50 bg-white">
                          <td className="px-3 py-3 sm:px-4 text-xs sm:text-sm font-medium text-gray-900 whitespace-nowrap">
                            Listening
                          </td>
                          <td className="px-3 py-3 sm:px-4 text-xs sm:text-sm">
                            Listen to lectures and conversations, answer questions
                          </td>
                          <td className="px-3 py-3 sm:px-4 text-xs sm:text-sm whitespace-nowrap">
                            36 minutes
                          </td>
                        </tr>
                        <tr className="hover:bg-neutral-50">
                          <td className="px-3 py-3 sm:px-4 text-xs sm:text-sm font-medium text-gray-900 whitespace-nowrap">
                            Speaking
                          </td>
                          <td className="px-3 py-3 sm:px-4 text-xs sm:text-sm">
                            Express opinions and respond to tasks
                          </td>
                          <td className="px-3 py-3 sm:px-4 text-xs sm:text-sm whitespace-nowrap">
                            16 minutes
                          </td>
                        </tr>
                        <tr className="hover:bg-neutral-50 bg-white">
                          <td className="px-3 py-3 sm:px-4 text-xs sm:text-sm font-medium text-gray-900 whitespace-nowrap">
                            Writing
                          </td>
                          <td className="px-3 py-3 sm:px-4 text-xs sm:text-sm">
                            Write responses to tasks
                          </td>
                          <td className="px-3 py-3 sm:px-4 text-xs sm:text-sm whitespace-nowrap">
                            29 minutes
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <p className="text-sm text-neutral-500 italic mt-4">
                As the test adapts, test time and items may vary.
              </p>
              </div>
            </ScrollAnimation>
          </section>

          {/* Registration Section */}
          <section className="mb-16 pt-16 border-t border-neutral-200">
            <ScrollAnimation direction="up" delay={0.1}>
              <SectionHeading>Registration</SectionHeading>
            </ScrollAnimation>
            <div className="space-y-4 text-neutral-700">
              <ScrollAnimation direction="up" delay={0.2}>
                <p>To register for the TOEFL iBT:</p>
              </ScrollAnimation>
              <StaggerAnimation className="space-y-3 mt-4" staggerDelay={0.1}>
                <div className="bg-white border border-neutral-200 rounded-lg p-4">
                  <p className="font-semibold text-gray-900 mb-1">1. Create an account</p>
                  <p className="text-sm">Create an account on the official ETS website</p>
                </div>
                <div className="bg-white border border-neutral-200 rounded-lg p-4">
                  <p className="font-semibold text-gray-900 mb-1">2. Select testing center</p>
                  <p className="text-sm">Select EduTest Global as your testing center</p>
                </div>
                <div className="bg-white border border-neutral-200 rounded-lg p-4">
                  <p className="font-semibold text-gray-900 mb-1">3. Choose date and time</p>
                  <p className="text-sm">Choose your preferred test date and time</p>
                </div>
                <div className="bg-white border border-neutral-200 rounded-lg p-4">
                  <p className="font-semibold text-gray-900 mb-1">4. Complete payment</p>
                  <p className="text-sm">Complete payment and registration</p>
                </div>
                <div className="bg-white border border-neutral-200 rounded-lg p-4">
                  <p className="font-semibold text-gray-900 mb-1">5. Receive confirmation</p>
                  <p className="text-sm">Receive confirmation with test day instructions</p>
                </div>
              </StaggerAnimation>
              <ScrollAnimation direction="fade" delay={0.2}>
                <p className="text-sm text-neutral-500 italic mt-6 pt-4 border-t border-neutral-200">
                  Registration, fees, and scheduling are managed by ETS. Please follow official instructions in your ETS account.
                </p>
              </ScrollAnimation>
            </div>
          </section>

          {/* Before You Come Section */}
          <section className="mb-16 pt-16 border-t border-neutral-200">
            <ScrollAnimation direction="up" delay={0.1}>
              <SectionHeading>Before You Come</SectionHeading>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={0.2}>
              <div className="space-y-4 text-neutral-700">
              <p className="text-sm text-neutral-600 font-medium mb-3">
                Bring acceptable identification as required by ETS.
              </p>
              <p className="text-sm text-neutral-600 mb-3">
                ETS ID requirements vary by location and citizenship—please confirm your acceptable ID on the ETS site.
              </p>
              <ul className="space-y-3 list-disc list-inside ml-4">
                <li>Bring a valid, government-issued photo ID (passport or national ID)</li>
                <li>ETS recommends bringing two forms of ID</li>
                <li>Arrive at least 30 minutes before your scheduled test time</li>
                <li>Review the ETS TOEFL test day policies and requirements</li>
                <li>Ensure you know your ETS account login credentials</li>
                <li>Do not bring personal items; lockers are provided for storage</li>
              </ul>
              </div>
            </ScrollAnimation>
          </section>

          {/* What to Expect on Test Day Section */}
          <section className="mb-16 pt-16 border-t border-neutral-200">
            <ScrollAnimation direction="up" delay={0.1}>
              <SectionHeading>What to Expect on Test Day</SectionHeading>
            </ScrollAnimation>
            <div className="space-y-6 text-neutral-700">
              {/* Test Day Timeline */}
              <StaggerAnimation className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6" staggerDelay={0.1}>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Check-in</p>
                  <p className="text-sm">ID verification and photo capture</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Testing environment</p>
                  <p className="text-sm">Secure individual workstations with headphones</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Test administration</p>
                  <p className="text-sm">Computer-based test (no scheduled breaks)</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Results</p>
                  <p className="text-sm">Scores available in ETS account 4–8 days after test date</p>
                </div>
              </StaggerAnimation>
              
              {/* Additional details */}
              <ScrollAnimation direction="fade" delay={0.2}>
                <ul className="space-y-3 list-disc list-inside ml-4 mt-6">
                  <li>Professional staff available for assistance throughout the test</li>
                </ul>
              </ScrollAnimation>
            </div>
          </section>

          {/* Location & Contact Section */}
          <section className="mb-16 pt-16 border-t border-neutral-200">
            <ScrollAnimation direction="up" delay={0.1}>
              <SectionHeading>Location & Contact</SectionHeading>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={0.2}>
              <div className="bg-neutral-50 rounded-lg p-4 sm:p-6 md:p-8 border border-neutral-200">
              <div className="space-y-4 sm:space-y-6 text-sm sm:text-base text-neutral-700">
                <div>
                  <p className="font-semibold mb-1 sm:mb-2 text-gray-900">Address</p>
                  <p>67/1 Baghramyan Ave., Yerevan, Armenia</p>
                </div>
                <div>
                  <p className="font-semibold mb-1 sm:mb-2 text-gray-900">Hours</p>
                  <p>10:00–18:00</p>
                </div>
                <div>
                  <p className="font-semibold mb-1 sm:mb-2 text-gray-900">Phone</p>
                  <p>
                    <a href="tel:+37460509709" className="text-primary hover:underline">
                      +374 60 509-709
                    </a>
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-3 sm:pt-4">
                  <Button href="tel:+37460509709" variant="primary">
                    Call
                  </Button>
                  <Button href="/contact" variant="secondary">
                    Contact Us
                  </Button>
                </div>
              </div>
              </div>
            </ScrollAnimation>
          </section>
        </div>
      </Container>

      {/* Mobile-only Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 shadow-lg md:hidden z-50 safe-area-inset-bottom">
        <div className="container mx-auto px-4 py-3">
          <div className="flex gap-2 sm:gap-3">
            <a
              href="tel:+37460509709"
              className="flex-1 inline-flex items-center justify-center px-3 sm:px-4 py-2 sm:py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-primary-800 transition-colors text-xs sm:text-sm"
            >
              Call
            </a>
            <a
              href="/contact"
              className="flex-1 inline-flex items-center justify-center px-3 sm:px-4 py-2 sm:py-2.5 bg-neutral-700 text-white rounded-lg font-semibold hover:bg-neutral-800 transition-colors text-xs sm:text-sm"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
