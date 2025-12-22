"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { User, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, getAuthInstance } from "@/lib/firebase/client";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import Container from "@/components/Container";
import TestDatesManager from "@/components/admin/TestDatesManager";
import { ExamType } from "@/lib/firebase/testDates";

// Import CELTA managers
import CeltaCoursesManager from "./celta/CeltaCoursesManager";
import CeltaTrainersManager from "./celta/CeltaTrainersManager";
import CeltaResourcesManager from "./celta/CeltaResourcesManager";

export const dynamic = "force-dynamic";

type AdminSection = 
  | "dashboard"
  | "celta-courses"
  | "celta-trainers"
  | "celta-resources"
  | "test-dates";

const ADMIN_SECTIONS: { value: AdminSection; label: string; icon?: string }[] = [
  { value: "dashboard", label: "Dashboard" },
  { value: "celta-courses", label: "CELTA Courses" },
  { value: "celta-trainers", label: "CELTA Trainers" },
  { value: "celta-resources", label: "CELTA Resources" },
  { value: "test-dates", label: "Test Dates" },
];

const EXAM_OPTIONS: { value: ExamType; label: string }[] = [
  { value: "toefl", label: "TOEFL iBT" },
  { value: "act", label: "ACT" },
  { value: "gre", label: "GRE" },
];

function normalizeSection(sectionParam: string | null): AdminSection {
  const validSections: AdminSection[] = ["dashboard", "celta-courses", "celta-trainers", "celta-resources", "test-dates"];
  if (sectionParam && validSections.includes(sectionParam as AdminSection)) {
    return sectionParam as AdminSection;
  }
  return "dashboard";
}

function normalizeExam(examParam: string | null): ExamType {
  if (examParam && (examParam === "toefl" || examParam === "act" || examParam === "gre")) {
    return examParam as ExamType;
  }
  return "toefl";
}

function examTitle(exam: ExamType): string {
  return EXAM_OPTIONS.find((opt) => opt.value === exam)?.label || "TOEFL iBT";
}

function AdminPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  
  const sectionParam = searchParams.get("section");
  const examParam = searchParams.get("exam");
  const activeSection = normalizeSection(sectionParam);
  const activeExam = normalizeExam(examParam);
  const activeExamLabel = examTitle(activeExam);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      const authInstance = getAuthInstance();
      await signOut(authInstance);
      // Use window.location for a hard redirect to ensure auth state is properly cleared
      window.location.href = "/admin/login";
    } catch (error) {
      console.error("Error signing out:", error);
      // Even if there's an error, try to redirect
      window.location.href = "/admin/login";
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div>
            <h1 className="mb-4">Admin Dashboard</h1>
            {user && (
              <p className="text-gray-600 mb-8">
                Logged in as: <span className="font-semibold text-gray-900">{user.email}</span>
              </p>
            )}
            <div className="space-y-4">
              <p className="text-gray-700 mb-6">
                Welcome to the EduTest Global Admin Panel. Use the sidebar to navigate to different management sections.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-2">CELTA Management</h3>
                  <p className="text-sm text-gray-600 mb-4">Manage courses, trainers, and resources</p>
                  <Link
                    href="/admin?section=celta-courses"
                    className="text-primary hover:underline text-sm font-medium"
                  >
                    Go to CELTA →
                  </Link>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-2">Test Dates</h3>
                  <p className="text-sm text-gray-600 mb-4">Manage TOEFL, ACT, and GRE test dates</p>
                  <Link
                    href="/admin?section=test-dates"
                    className="text-primary hover:underline text-sm font-medium"
                  >
                    Go to Test Dates →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      case "celta-courses":
        return <CeltaCoursesManager />;
      case "celta-trainers":
        return <CeltaTrainersManager />;
      case "celta-resources":
        return <CeltaResourcesManager />;
      case "test-dates":
        return (
          <div>
            {/* Exam tabs for test dates */}
            <div className="mb-6 border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Exam navigation">
                {EXAM_OPTIONS.map((option) => {
                  const isActive = activeExam === option.value;
                  return (
                    <Link
                      key={option.value}
                      href={`/admin?section=test-dates&exam=${option.value}`}
                      className={`
                        py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors
                        ${
                          isActive
                            ? "border-primary-500 text-primary-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }
                      `}
                    >
                      {option.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
            <TestDatesManager exam={activeExam} examLabel={activeExamLabel} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="py-12 md:py-20">
      <Container>
        <div className="flex gap-8">
          {/* Left Sidebar - Navigation */}
          <aside className="w-56 flex-shrink-0">
            <nav className="bg-white border-r border-gray-200 pr-4 sticky top-4" aria-label="Admin navigation">
              <div className="mb-6 pb-4 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">Admin Panel</h2>
                {user && (
                  <p className="text-xs text-gray-500 mt-1">{user.email}</p>
                )}
              </div>
              <ul className="space-y-1">
                {ADMIN_SECTIONS.map((section) => {
                  const isActive = activeSection === section.value;
                  return (
                    <li key={section.value}>
                      <Link
                        href={`/admin?section=${section.value}`}
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
                        {section.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                >
                  Logout
                </button>
              </div>
            </nav>
          </aside>

          {/* Right Content Area */}
          <div className="flex-1 min-w-0">
            {renderContent()}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default function AdminPage() {
  return (
    <AdminAuthGuard>
      <Suspense fallback={
        <div className="py-12 md:py-20">
          <Container>
            <div className="text-center">
              <p className="text-gray-600">Loading...</p>
            </div>
          </Container>
        </div>
      }>
        <AdminPageContent />
      </Suspense>
    </AdminAuthGuard>
  );
}
