import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import UpcomingCourses from "@/components/celta/UpcomingCourses";
import Trainers from "@/components/celta/Trainers";
import Accordion from "@/components/Accordion";
import ScrollAnimation from "@/components/ScrollAnimation";
import StaggerAnimation from "@/components/StaggerAnimation";

export const metadata: Metadata = {
  title: "Cambridge CELTA in Yerevan | EduTest Global",
  description:
    "Internationally recognized CELTA teacher training qualification in Yerevan. Cambridge-certified English language teaching certification with practical teaching practice. Apply now.",
};

export default function CELTAPage() {

  return (
    <div className="py-12 md:py-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <ScrollAnimation direction="up" className="text-center mb-16">
            <h1 className="mb-4">Cambridge CELTA in Yerevan</h1>
            <p className="text-xl text-gray-600">
              Internationally recognized teacher training qualification • 2–3
              intakes per year
            </p>
          </ScrollAnimation>

          {/* Cambridge CELTA: Overview Section */}
          <section className="mb-16">
            <ScrollAnimation direction="up" delay={0.1}>
              <SectionHeading>
                <div>
                  <div className="text-3xl md:text-4xl font-bold mb-2">Cambridge CELTA: Overview</div>
                </div>
              </SectionHeading>
            </ScrollAnimation>
            
            <ScrollAnimation direction="up" delay={0.2}>
              <div className="space-y-6 text-neutral-700 mb-8">
              <p>
                CELTA (Certificate in Teaching English to Speakers of Other Languages) is a widely recognised English teaching qualification awarded by Cambridge English (Cambridge Assessment English). CELTA courses are delivered by authorised centres on behalf of Cambridge English and include at least 120 hours of contact time with tutors, teaching practice, feedback, and written assignments.
              </p>
              </div>
            </ScrollAnimation>

            <StaggerAnimation className="grid md:grid-cols-2 gap-6 mb-8" staggerDelay={0.1}>
              {/* Recognition & Careers Card */}
              <div className="bg-white border border-neutral-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-primary">Recognition & Careers</h3>
                <div className="space-y-3 text-sm">
                  <p>CELTA is a widely recognised English teaching qualification. Cambridge states that three out of four English language teaching jobs require a CELTA qualification.</p>
                  <p>The qualification is internationally recognized and suitable for new and early-career teachers seeking formal certification.</p>
                </div>
              </div>

              {/* Course Format Card */}
              <div className="bg-white border border-neutral-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-primary">Course Format</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-neutral-900 mb-1">Full-time:</p>
                    <p>Usually 4–5 weeks</p>
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900 mb-1">Part-time:</p>
                    <p>From a few months to a year</p>
                    <p className="text-xs text-neutral-500 mt-1">(varies by center schedule)</p>
                  </div>
                  <p className="text-xs text-neutral-500 mt-3">Courses include at least 120 hours of contact time with tutors, teaching practice, feedback, and written assignments.</p>
                </div>
              </div>

              {/* Entry Requirements Card */}
              <div className="bg-white border border-neutral-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-primary">Entry Requirements</h3>
                <div className="space-y-3 text-sm">
                  <ul className="space-y-2 ml-4 list-disc">
                    <li>18 or over</li>
                    <li>Education standard equivalent to entry into higher education</li>
                    <li>English: minimum high C1 level or above</li>
                  </ul>
                  <p className="text-xs text-neutral-500 mt-3">All applicants must complete an application form, pre-interview task, and interview.</p>
                </div>
              </div>

              {/* Assessment & Workload Card */}
              <div className="bg-white border border-neutral-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-primary">Assessment & Workload</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-neutral-900 mb-1">Course Components:</p>
                    <ul className="space-y-1 ml-4 list-disc">
                      <li>At least 120 hours of contact time with tutors</li>
                      <li>Teaching practice with real students</li>
                      <li>Four classroom-related written assignments</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900 mb-1">Assessment:</p>
                    <p>Two components: (1) Planning and teaching, (2) Classroom-related written assignments. Internally assessed and externally moderated.</p>
                  </div>
                </div>
              </div>
            </StaggerAnimation>

            {/* Official Cambridge Links */}
            <ScrollAnimation direction="up" delay={0.2}>
              <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-primary">Official Cambridge Links</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                <a
                  href="https://www.cambridgeenglish.org/teaching-english/teaching-qualifications/celta/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white bg-primary hover:bg-primary-800 rounded-lg transition-colors"
                >
                  Main CELTA Page
                </a>
                <a
                  href="https://www.cambridgeenglish.org/teaching-english/teaching-qualifications/celta/about-the-celta-course/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white bg-primary hover:bg-primary-800 rounded-lg transition-colors"
                >
                  About the Course
                </a>
                <a
                  href="https://www.cambridgeenglish.org/teaching-english/teaching-qualifications/celta/ways-to-take-celta/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white bg-primary hover:bg-primary-800 rounded-lg transition-colors"
                >
                  Ways to Take CELTA
                </a>
                <a
                  href="https://www.cambridgeenglish.org/teaching-english/teaching-qualifications/celta/preparing-for-your-celta/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white bg-primary hover:bg-primary-800 rounded-lg transition-colors"
                >
                  Preparing for CELTA
                </a>
                <a
                  href="https://www.cambridgeenglish.org/Images/21816-celta-syllabus.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white bg-primary hover:bg-primary-800 rounded-lg transition-colors sm:col-span-2 lg:col-span-1"
                >
                  CELTA Syllabus (PDF)
                </a>
              </div>
              </div>
            </ScrollAnimation>

            {/* Ready to Apply CTA */}
            <ScrollAnimation direction="up" delay={0.3}>
              <div className="bg-white border border-neutral-200 rounded-lg p-6 mt-6">
              <h3 className="text-xl font-semibold mb-3 text-primary">Ready to Apply?</h3>
              <p className="text-sm text-neutral-700 mb-4">
                Request the application pack and pre-interview task. Places are limited and intakes run 2–3 times per year.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button href="/contact" variant="primary">
                  Request Application Pack
                </Button>
                <Button href="#upcoming-courses" variant="secondary">
                  View Upcoming Courses
                </Button>
              </div>
              </div>
            </ScrollAnimation>
          </section>

          {/* Upcoming Courses Section */}
          <div id="upcoming-courses">
            <UpcomingCourses />
          </div>

          {/* Meet the Trainers Section */}
          <Trainers />

          {/* Accordion Sections */}
          <div className="mb-16 space-y-0">
            <Accordion title="What is CELTA?" id="what-is-celta">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 mb-6">
                  The CELTA course provides intensive, practical training for teaching English to adult learners. During the course, you will teach real students, receive detailed feedback from experienced tutors, and complete written assignments that focus on classroom practice and lesson planning.
                </p>
                <p className="text-gray-700 mb-4">
                  The course is designed for:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>New teachers starting their English language teaching career</li>
                  <li>Early-career teachers seeking formal qualification</li>
                  <li>Those looking to teach English abroad or make a career change</li>
                  <li>Anyone ready for intensive, hands-on training with real teaching practice</li>
                </ul>
              </div>
            </Accordion>

            <Accordion title="Is CELTA Right for You?" id="who-is-this-for">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">
                    This course is for you if…
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>You want to start a career in English language teaching</li>
                    <li>You are an early-career teacher seeking formal qualification</li>
                    <li>You want to teach English abroad</li>
                    <li>You are looking for a career change</li>
                    <li>You want internationally recognized certification</li>
                    <li>You are ready for intensive, practical training</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">
                    This course may not be suitable if…
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>You have extensive teaching experience and qualifications</li>
                    <li>You cannot commit to the intensive course schedule</li>
                    <li>You prefer theoretical over practical training</li>
                    <li>You are not comfortable teaching adult learners</li>
                    <li>You cannot meet the entry requirements</li>
                  </ul>
                </div>
              </div>
            </Accordion>

            <Accordion title="Course Format & Workload" id="course-format">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 mb-4">
                  The CELTA course is intensive and practical. It combines
                  theoretical input sessions with hands-on teaching practice.
                </p>
                <p className="text-gray-700 mb-4">
                  Participants should expect:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                  <li>
                    <strong>Full-time format:</strong> 4–5 weeks of intensive
                    study, typically 8–10 hours per day including teaching
                    practice, lesson planning, and assignments
                  </li>
                  <li>
                    <strong>Part-time format:</strong> 10–12 weeks with evening
                    and weekend sessions, requiring significant time commitment
                    outside of scheduled classes
                  </li>
                  <li>Teaching practice with real students</li>
                  <li>Observation of experienced teachers</li>
                  <li>Written assignments and lesson planning</li>
                  <li>Regular feedback from tutors</li>
                </ul>
                <p className="text-gray-700">
                  The course requires full commitment. Participants should be
                  prepared for a demanding schedule and should not plan other
                  significant commitments during the course period.
                </p>
              </div>
            </Accordion>

            <Accordion title="Entry Requirements" id="entry-requirements">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 mb-4">
                  To be considered for the CELTA course, applicants typically need
                  to meet the following requirements:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>
                    Minimum age: 18 or over
                  </li>
                  <li>
                    Education: Education standard equivalent to entry into higher education
                  </li>
                  <li>
                    English language proficiency: Minimum high C1 or above on the CEFR scale
                  </li>
                  <li>
                    Potential to develop the necessary skills to become an
                    effective teacher
                  </li>
                  <li>
                    Ability to complete written assignments in English at
                    university level
                  </li>
                </ul>
                <p className="text-gray-700 mt-4">
                  All applicants must complete an application form, pre-interview
                  task, and interview. Meeting the minimum requirements does not
                  guarantee acceptance.
                </p>
              </div>
            </Accordion>

            <Accordion title="Application Process" id="application-process" defaultOpen={true}>
              <div className="prose prose-lg max-w-none">
                <ol className="list-decimal list-inside space-y-4 text-gray-700">
                  <li>
                    <strong>Submit application:</strong> Contact us to request
                    the application pack. Complete and return the application form
                    with required documents.
                  </li>
                  <li>
                    <strong>Complete pre-interview task:</strong> You will receive
                    a language awareness task to complete before the interview.
                    This helps assess your potential for the course.
                  </li>
                  <li>
                    <strong>Interview:</strong> Attend an interview (in person or
                    online) with a course tutor. This is an opportunity to discuss
                    your motivation, experience, and suitability for the course.
                  </li>
                  <li>
                    <strong>Offer decision:</strong> You will receive a decision
                    within a few days of the interview. If successful, you will
                    receive an offer letter.
                  </li>
                  <li>
                    <strong>Confirm place + payment:</strong> To secure your place,
                    confirm acceptance and complete payment by the specified
                    deadline. Places are limited and allocated on a first-come,
                    first-served basis.
                  </li>
                </ol>
              </div>
            </Accordion>

            <Accordion title="Fees & What's Included" id="fees-included">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 mb-4">
                  <strong>Course fee:</strong> Please refer to the Upcoming
                  Courses section above for current pricing in AMD. Fees may vary
                  by course format and intake.
                </p>
                <div className="grid md:grid-cols-2 gap-8 mt-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-900">
                      Included in the course fee:
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li>All tuition and input sessions</li>
                      <li>Teaching practice with real students</li>
                      <li>Observation of experienced teachers</li>
                      <li>Assessment and feedback from tutors</li>
                      <li>Course materials and resources</li>
                      <li>Cambridge assessment and certification (upon successful completion)</li>
                      <li>Guidance and support throughout the course</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-900">
                      Not included:
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li>Travel to and from the training center</li>
                      <li>Accommodation (if required)</li>
                      <li>Meals and refreshments</li>
                      <li>Personal study materials beyond provided resources</li>
                      <li>Re-assessment fees (if applicable)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Accordion>
          </div>
        </div>
      </Container>
    </div>
  );
}
