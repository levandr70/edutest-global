"use client";

import { useState, useEffect } from "react";
import SectionHeading from "@/components/SectionHeading";
import { listCeltaCourses, CeltaCourse } from "@/lib/firebase/celtaCourses";
import { getLatestResources, LatestResources } from "@/lib/firebase/celtaResources";

function formatDate(dateString: string): string {
  if (!dateString || dateString === "TBD") return dateString;
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
}

function formatPrice(price: number | string): string {
  if (typeof price === "string" || !price) return String(price || "TBD");
  return new Intl.NumberFormat("en-US").format(price) + " AMD";
}

// Helper to parse ISO date "YYYY-MM-DD" and create Date at end of day (23:59:59) local time
function parseDeadlineDate(isoString: string): Date | null {
  if (!isoString || isoString === "TBD") return null;
  try {
    const parts = isoString.split("-").map(Number);
    if (parts.length !== 3 || parts.some(isNaN)) return null;
    const [year, month, day] = parts;
    // Create date at end of day (23:59:59) in local time
    return new Date(year, month - 1, day, 23, 59, 59);
  } catch {
    return null;
  }
}

// Calculate display status based on application deadline
function getDisplayStatus(
  storedStatus: string | undefined,
  applicationDeadline: string | undefined
): string {
  // If no application deadline, use stored status or default
  if (!applicationDeadline || applicationDeadline === "TBD") {
    return storedStatus || "Applications open soon";
  }

  const deadlineDate = parseDeadlineDate(applicationDeadline);
  if (!deadlineDate) {
    return storedStatus || "Applications open soon";
  }

  const now = new Date();

  // Rule 1: If today is AFTER the deadline (end of day), show "Closed"
  if (now > deadlineDate) {
    return "Closed";
  }

  // Rule 2: If within 7 days before deadline, show "Closing soon"
  const daysUntilDeadline = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (daysUntilDeadline <= 7 && daysUntilDeadline > 0) {
    return "Closing soon";
  }

  // Rule 3: Otherwise use stored status or default
  return storedStatus || "Applications open soon";
}

// Collapsible "How to apply" component for each course card
function HowToApplyPanel({ 
  resources, 
  courseId,
  resourcesLoading
}: { 
  resources: LatestResources; 
  courseId: string;
  resourcesLoading: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const panelId = `how-to-apply-${courseId}`;

  return (
    <div className="pt-2">
      {/* Collapsed Header */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-controls={panelId}
        className="w-full flex items-center justify-between px-4 py-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
      >
        <span className="font-medium text-gray-900">How to apply</span>
        <span className="text-xl font-light text-gray-600 flex-shrink-0 ml-4">
          {isExpanded ? "−" : "+"}
        </span>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div id={panelId} className="mt-3">
          <div className="bg-primary rounded-lg p-6 text-white space-y-4">
            {/* Numbered Steps */}
            <ol className="text-sm leading-relaxed space-y-2.5 list-decimal list-inside">
              <li>Download the Application Form and the Pre-interview Task.</li>
              <li>Complete both documents.</li>
              <li>
                Email them to:{" "}
                <a
                  href="mailto:esolarm@hotmail.com"
                  className="underline hover:text-primary-100 transition-colors"
                >
                  esolarm@hotmail.com
                </a>
              </li>
              <li>
                If successful, you will be invited to an online interview with a CELTA trainer (Interview fee: 36 EUR).
              </li>
              <li>If the interview is successful, you will be offered a place on the course.</li>
              <li>To secure your place, you will be required to pay a deposit.</li>
              <li>The remaining balance is due before the start of the course.</li>
            </ol>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-3">
              {resources.applicationForm?.fileUrl ? (
                <a
                  href={resources.applicationForm.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 bg-white text-primary hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
                >
                  Application Form
                </a>
              ) : (
                <button
                  disabled
                  className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold rounded-lg bg-white/20 text-white/60 cursor-not-allowed"
                >
                  {resourcesLoading ? "Loading…" : "Application Form"}
                </button>
              )}

              {resources.preInterviewTask?.fileUrl ? (
                <a
                  href={resources.preInterviewTask.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 bg-white text-primary hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
                >
                  Pre-interview Task
                </a>
              ) : (
                <button
                  disabled
                  className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold rounded-lg bg-white/20 text-white/60 cursor-not-allowed"
                >
                  {resourcesLoading ? "Loading…" : "Pre-interview Task"}
                </button>
              )}
            </div>

            {/* Fallback message if both resources are missing */}
            {!resources.applicationForm?.fileUrl && !resources.preInterviewTask?.fileUrl && (
              <p className="text-sm text-white/90 italic pt-1">
                Documents will be available soon.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function UpcomingCourses() {
  const [courses, setCourses] = useState<CeltaCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [resources, setResources] = useState<LatestResources>({});
  const [resourcesLoading, setResourcesLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setResourcesLoading(true);
        const [coursesData, resourcesData] = await Promise.all([
          listCeltaCourses(),
          getLatestResources(),
        ]);
        setCourses(coursesData);
        setResources(resourcesData);
        setError(null);
      } catch (err: any) {
        console.error("Error loading data:", err);
        setError("Failed to load courses");
        setCourses([]);
      } finally {
        setLoading(false);
        setResourcesLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <section className="mb-16">
        <SectionHeading>Upcoming Courses</SectionHeading>
        <p className="text-gray-600 text-center">Loading courses...</p>
      </section>
    );
  }

  if (error || courses.length === 0) {
    return (
      <section className="mb-16">
        <SectionHeading>Upcoming Courses</SectionHeading>
        <p className="text-gray-600 text-center">
          Upcoming course dates will be published here. Please contact us to apply.
        </p>
      </section>
    );
  }

  return (
    <section className="mb-16">
      <SectionHeading>Upcoming Courses</SectionHeading>
      <div className="bg-neutral-50 rounded-lg p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course) => {
            // Use earlyBirdApplicationDeadline, fallback to earlyBirdDeadline for backward compatibility
            const earlyBirdApplicationDeadline = course.earlyBirdApplicationDeadline || course.earlyBirdDeadline;
            const hasEarlyBird = earlyBirdApplicationDeadline && course.earlyBirdDiscountAMD !== undefined;
            const earlyBirdPrice = hasEarlyBird
              ? Math.max(0, course.priceAMD - (course.earlyBirdDiscountAMD || 0))
              : null;
            const saveAmount = hasEarlyBird ? (course.earlyBirdDiscountAMD || 0) : 0;

            // Calculate display status (display-only, doesn't change Firestore data)
            const displayStatus = getDisplayStatus(course.status, course.applicationDeadline);

            return (
              <div
                key={course.id}
                className="bg-white border border-gray-200 rounded-lg p-6 space-y-4"
              >
                {/* Header row with badges */}
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                    {course.format}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                    {displayStatus}
                  </span>
                </div>

                {/* Dates */}
                <div>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatDate(course.startDate)} – {formatDate(course.endDate)}
                  </p>
                </div>

                {/* Schedule */}
                <div>
                  <p className="text-gray-700">{course.schedule}</p>
                </div>

                {/* Pricing */}
                <div className="space-y-2">
                  <p className="text-gray-900 font-semibold">
                    Course fee: {formatPrice(course.priceAMD)}
                  </p>
                  {hasEarlyBird && earlyBirdPrice !== null && (
                    <>
                      <p className="text-primary font-semibold">
                        Early-bird: {formatPrice(earlyBirdPrice)}
                      </p>
                      <p className="text-sm text-gray-600">
                        Save {formatPrice(saveAmount)}
                      </p>
                    </>
                  )}
                </div>

                {/* Deadlines */}
                {(course.applicationDeadline || course.paymentDeadline || earlyBirdApplicationDeadline || course.earlyBirdPaymentDeadline) && (
                  <div className="space-y-1 pt-2 border-t border-gray-200">
                    <p className="text-sm font-medium text-gray-600 mb-2">Deadlines</p>
                    <div className="space-y-1 text-sm text-gray-600">
                      {course.applicationDeadline && (
                        <p>Apply by: {formatDate(course.applicationDeadline)}</p>
                      )}
                      {course.paymentDeadline && (
                        <p>Payment deadline: {formatDate(course.paymentDeadline)}</p>
                      )}
                      {earlyBirdApplicationDeadline && (
                        <p>Early-bird apply by: {formatDate(earlyBirdApplicationDeadline)}</p>
                      )}
                      {course.earlyBirdPaymentDeadline && (
                        <p>Early-bird payment deadline: {formatDate(course.earlyBirdPaymentDeadline)}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* How to Apply Panel */}
                <HowToApplyPanel 
                  resources={resources} 
                  courseId={course.id || `course-${Math.random()}`}
                  resourcesLoading={resourcesLoading}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

