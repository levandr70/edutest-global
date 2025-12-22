"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import Container from "@/components/Container";
import TestDatesManager from "@/components/admin/TestDatesManager";
import { ExamType } from "@/lib/firebase/testDates";

export const dynamic = "force-dynamic";

const EXAM_OPTIONS: { value: ExamType; label: string }[] = [
  { value: "toefl", label: "TOEFL iBT" },
  { value: "act", label: "ACT" },
  { value: "gre", label: "GRE" },
];

function normalizeExam(examParam: string | null): ExamType {
  if (examParam && (examParam === "toefl" || examParam === "act" || examParam === "gre")) {
    return examParam as ExamType;
  }
  return "toefl";
}

function examTitle(exam: ExamType): string {
  return EXAM_OPTIONS.find((opt) => opt.value === exam)?.label || "TOEFL iBT";
}

function TestDatesPageContent() {
  const searchParams = useSearchParams();
  const examParam = searchParams.get("exam");
  const activeExam = normalizeExam(examParam);
  const activeExamLabel = examTitle(activeExam);

  return (
    <div className="py-12 md:py-20">
      <Container>
        <div className="flex gap-8">
          {/* Left Sidebar - Vertical Tabs */}
          <aside className="w-56 flex-shrink-0">
            <nav className="bg-white border-r border-gray-200 pr-4 sticky top-4" aria-label="Exam navigation">
              <ul className="space-y-1">
                {EXAM_OPTIONS.map((option) => {
                  const isActive = activeExam === option.value;
                  return (
                    <li key={option.value}>
                      <Link
                        href={`/admin/test-dates?exam=${option.value}`}
                        className={`
                          block px-4 py-3 rounded-lg text-sm font-medium transition-colors
                          ${
                            isActive
                              ? "bg-primary-50 text-primary-900 font-bold border-l-4 border-primary-500"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          }
                        `}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {option.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          {/* Right Content Area */}
          <div className="flex-1 min-w-0">
            <TestDatesManager exam={activeExam} examLabel={activeExamLabel} />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default function AdminTestDatesPage() {
  return (
    <AdminAuthGuard>
      <TestDatesPageContent />
    </AdminAuthGuard>
  );
}
