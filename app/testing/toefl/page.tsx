import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import TestDatesCalendarWrapper from "@/components/testing/TestDatesCalendarWrapper";

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
          <div className="mb-16">
            <div className="bg-neutral-50 rounded-lg p-8 md:p-12 border border-neutral-200">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
                TOEFL iBT Testing
              </h1>
              <p className="text-xl text-neutral-600 leading-relaxed max-w-3xl">
                EduTest Global delivers the TOEFL Internet-Based Test (iBT) at our testing center in Yerevan, Armenia. We provide a secure, professional environment for your English proficiency assessment.
              </p>
            </div>
          </div>

          {/* About TOEFL iBT® Section */}
          <section className="mb-16">
            <SectionHeading>
              <div>
                <div className="text-3xl md:text-4xl font-bold mb-2">About TOEFL iBT®</div>
              </div>
            </SectionHeading>
            
            <div className="space-y-6 text-neutral-700 mb-8">
              <p>
                The TOEFL iBT evaluates all four language skills essential for effective communication: Reading, Listening, Speaking, and Writing. The test is administered via computer at our testing center and is accepted by more than 11,000 universities and institutions worldwide.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Test Structure & Timing Card */}
              <div className="bg-white border border-neutral-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-primary">Test Structure & Timing</h3>
                <div className="space-y-3 text-sm">
                  <p className="font-medium text-neutral-900">Total time: The test takes just under 2 hours to complete, but plan for about 2.5 hours total including ~30 minutes for check-in.</p>
                  <div className="space-y-2">
                    <p className="font-medium text-neutral-900">Four sections:</p>
                    <ul className="space-y-2 ml-4 list-disc">
                      <li><span className="font-medium">Reading:</span> 35 minutes, 20 questions</li>
                      <li><span className="font-medium">Listening:</span> 36 minutes, 28 questions</li>
                      <li><span className="font-medium">Speaking:</span> 16 minutes, 4 tasks</li>
                      <li><span className="font-medium">Writing:</span> 29 minutes, 2 tasks</li>
                    </ul>
                  </div>
                  <p className="text-xs text-neutral-500 mt-3">No scheduled breaks in the TOEFL iBT test.</p>
                </div>
              </div>

              {/* Scores & Validity Card */}
              <div className="bg-white border border-neutral-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-primary">Scores & Validity</h3>
                <div className="space-y-3 text-sm">
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
              <div className="bg-white border border-neutral-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-primary">Retakes</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-neutral-900 mb-1">Retake Policy:</p>
                    <p>No limit to how many times you can take the TOEFL iBT, but you cannot take it more than once in a 3-day period.</p>
                  </div>
                </div>
              </div>

              {/* Test Day Essentials Card */}
              <div className="bg-white border border-neutral-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-primary">Test Day Essentials</h3>
                <div className="space-y-3 text-sm">
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
              <div className="bg-white border border-neutral-200 rounded-lg p-6 md:col-span-2">
                <h3 className="text-xl font-semibold mb-4 text-primary">Fees</h3>
                <div className="space-y-3 text-sm">
                  <p>TOEFL iBT fee varies by location. Please check the ETS website for current fees in your area.</p>
                </div>
              </div>
            </div>

            {/* Official ETS Links */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-primary">Official ETS Links</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <a
                  href="https://www.ets.org/toefl/test-takers/ibt/about/content.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-800 rounded-lg transition-colors"
                >
                  Content/Structure
                </a>
                <a
                  href="https://www.ets.org/toefl/test-takers/ibt/scores/get-scores.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-800 rounded-lg transition-colors"
                >
                  Get Scores
                </a>
                <a
                  href="https://www.ets.org/toefl/test-takers/ibt/register/id.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-800 rounded-lg transition-colors"
                >
                  ID Requirements
                </a>
                <a
                  href="https://www.ets.org/toefl/test-takers/ibt/register/fees.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-800 rounded-lg transition-colors"
                >
                  Fees
                </a>
                <a
                  href="https://www.ets.org/toefl/test-takers/ibt/test-day/test-center-test-day.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-800 rounded-lg transition-colors"
                >
                  Test Day Info
                </a>
              </div>
            </div>
          </section>

          {/* Announced Test Dates Section */}
          <section className="mb-16 pt-16 border-t border-neutral-200">
            <SectionHeading>
              <div>
                <div className="text-3xl md:text-4xl font-bold mb-2">Announced TOEFL iBT Test Dates</div>
                <div className="text-base md:text-lg font-normal text-neutral-600 mt-2">
                  Announced sessions at our testing center. Registration is completed through ETS.
                </div>
              </div>
            </SectionHeading>
            <div className="max-w-xl mx-auto">
              <TestDatesCalendarWrapper exam="toefl" />
            </div>
          </section>

          {/* Test Content and Structure Section */}
          <section className="mb-16 pt-16 border-t border-neutral-200">
            <SectionHeading>Test Content and Structure</SectionHeading>
            <div className="space-y-6 text-neutral-700">
              {/* Update Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
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
              </div>
              
              {/* Compliance Note */}
              <p className="text-sm text-neutral-500 italic mt-6 pt-4 border-t border-neutral-200">
                Test format, content, registration, fees, and scoring are determined by ETS.
              </p>
            </div>
          </section>

          {/* Test Section and Timing Overview */}
          <section className="mb-16 pt-16 border-t border-neutral-200">
            <SectionHeading>Test Section and Timing Overview</SectionHeading>
            <div className="space-y-4 text-neutral-700">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-neutral-200">
                  <thead>
                    <tr className="bg-neutral-50">
                      <th className="border border-neutral-200 px-4 py-3 text-left font-semibold text-gray-900">
                        Section
                      </th>
                      <th className="border border-neutral-200 px-4 py-3 text-left font-semibold text-gray-900">
                        What you do
                      </th>
                      <th className="border border-neutral-200 px-4 py-3 text-left font-semibold text-gray-900">
                        Approx. base time
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-neutral-50">
                      <td className="border border-neutral-200 px-4 py-3 font-medium text-gray-900">
                        Reading
                      </td>
                      <td className="border border-neutral-200 px-4 py-3 text-sm">
                        Read passages and answer questions
                      </td>
                      <td className="border border-neutral-200 px-4 py-3 text-sm">
                        35 minutes
                      </td>
                    </tr>
                    <tr className="hover:bg-neutral-50 bg-white">
                      <td className="border border-neutral-200 px-4 py-3 font-medium text-gray-900">
                        Listening
                      </td>
                      <td className="border border-neutral-200 px-4 py-3 text-sm">
                        Listen to lectures and conversations, answer questions
                      </td>
                      <td className="border border-neutral-200 px-4 py-3 text-sm">
                        36 minutes
                      </td>
                    </tr>
                    <tr className="hover:bg-neutral-50">
                      <td className="border border-neutral-200 px-4 py-3 font-medium text-gray-900">
                        Speaking
                      </td>
                      <td className="border border-neutral-200 px-4 py-3 text-sm">
                        Express opinions and respond to tasks
                      </td>
                      <td className="border border-neutral-200 px-4 py-3 text-sm">
                        16 minutes
                      </td>
                    </tr>
                    <tr className="hover:bg-neutral-50 bg-white">
                      <td className="border border-neutral-200 px-4 py-3 font-medium text-gray-900">
                        Writing
                      </td>
                      <td className="border border-neutral-200 px-4 py-3 text-sm">
                        Write responses to tasks
                      </td>
                      <td className="border border-neutral-200 px-4 py-3 text-sm">
                        29 minutes
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-neutral-500 italic mt-4">
                As the test adapts, test time and items may vary.
              </p>
            </div>
          </section>

          {/* Registration Section */}
          <section className="mb-16 pt-16 border-t border-neutral-200">
            <SectionHeading>Registration</SectionHeading>
            <div className="space-y-4 text-neutral-700">
              <p>To register for the TOEFL iBT:</p>
              <div className="space-y-3 mt-4">
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
              </div>
              <p className="text-sm text-neutral-500 italic mt-6 pt-4 border-t border-neutral-200">
                Registration, fees, and scheduling are managed by ETS. Please follow official instructions in your ETS account.
              </p>
            </div>
          </section>

          {/* Before You Come Section */}
          <section className="mb-16 pt-16 border-t border-neutral-200">
            <SectionHeading>Before You Come</SectionHeading>
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
          </section>

          {/* What to Expect on Test Day Section */}
          <section className="mb-16 pt-16 border-t border-neutral-200">
            <SectionHeading>What to Expect on Test Day</SectionHeading>
            <div className="space-y-6 text-neutral-700">
              {/* Test Day Timeline */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
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
              </div>
              
              {/* Additional details */}
              <ul className="space-y-3 list-disc list-inside ml-4 mt-6">
                <li>Professional staff available for assistance throughout the test</li>
              </ul>
            </div>
          </section>

          {/* Location & Contact Section */}
          <section className="mb-16 pt-16 border-t border-neutral-200">
            <SectionHeading>Location & Contact</SectionHeading>
            <div className="bg-neutral-50 rounded-lg p-8 border border-neutral-200">
              <div className="space-y-6 text-neutral-700">
                <div>
                  <p className="font-semibold mb-2 text-gray-900">Address</p>
                  <p>67/1 Baghramyan Ave., Yerevan, Armenia</p>
                </div>
                <div>
                  <p className="font-semibold mb-2 text-gray-900">Hours</p>
                  <p>10:00–18:00</p>
                </div>
                <div>
                  <p className="font-semibold mb-2 text-gray-900">Phone</p>
                  <p>
                    <a href="tel:+37460509709" className="text-primary hover:underline">
                      +374 60 509-709
                    </a>
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button href="tel:+37460509709" variant="primary">
                    Call
                  </Button>
                  <Button href="/contact" variant="secondary">
                    Contact Us
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Container>

      {/* Mobile-only Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 shadow-lg md:hidden z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex gap-3">
            <a
              href="tel:+37460509709"
              className="flex-1 inline-flex items-center justify-center px-4 py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-primary-800 transition-colors text-sm"
            >
              Call
            </a>
            <a
              href="/contact"
              className="flex-1 inline-flex items-center justify-center px-4 py-2.5 bg-neutral-700 text-white rounded-lg font-semibold hover:bg-neutral-800 transition-colors text-sm"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
