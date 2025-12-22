"use client";

import { useState, useEffect, FormEvent } from "react";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import AdminLayout from "@/components/admin/AdminLayout";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import {
  listCeltaCourses,
  createCeltaCourse,
  updateCeltaCourse,
  deleteCeltaCourse,
  CeltaCourse,
  CeltaCourseInput,
} from "@/lib/firebase/celtaCourses";

export const dynamic = "force-dynamic";

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

function CeltaCoursesManager() {
  const [courses, setCourses] = useState<CeltaCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<CeltaCourseInput>({
    format: "Full-time",
    startDate: "",
    endDate: "",
    schedule: "",
    priceAMD: 0,
    applicationDeadline: "",
    status: "Applications open soon",
    seats: undefined,
    earlyBirdDeadline: undefined,
    earlyBirdApplicationDeadline: undefined,
    earlyBirdDiscountAMD: undefined,
    paymentDeadline: undefined,
    earlyBirdPaymentDeadline: undefined,
  });

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const data = await listCeltaCourses();
      setCourses(data);
      setError("");
    } catch (err: any) {
      setError("Failed to load courses: " + (err.message || "Unknown error"));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.startDate || !formData.endDate || !formData.schedule || !formData.applicationDeadline) {
      setError("Please fill in all required fields.");
      return;
    }

    if (formData.priceAMD <= 0) {
      setError("Price must be greater than 0.");
      return;
    }

    // Early-bird validation: earlyBirdApplicationDeadline and earlyBirdDiscountAMD must be set together or both empty
    const hasEarlyBirdApplicationDeadline = formData.earlyBirdApplicationDeadline && formData.earlyBirdApplicationDeadline.trim() !== "";
    const hasEarlyBirdDiscount = formData.earlyBirdDiscountAMD !== undefined && formData.earlyBirdDiscountAMD !== null;
    
    if (hasEarlyBirdApplicationDeadline && !hasEarlyBirdDiscount) {
      setError("If early-bird application deadline is set, early-bird discount must also be set.");
      return;
    }
    
    if (hasEarlyBirdDiscount && !hasEarlyBirdApplicationDeadline) {
      setError("If early-bird discount is set, early-bird application deadline must also be set.");
      return;
    }
    
    if (hasEarlyBirdDiscount && formData.earlyBirdDiscountAMD !== undefined && formData.earlyBirdDiscountAMD < 0) {
      setError("Early-bird discount must be greater than or equal to 0.");
      return;
    }

    // Early-bird payment deadline validation: requires early-bird bundle (application deadline + discount)
    const hasEarlyBirdPaymentDeadline = formData.earlyBirdPaymentDeadline && formData.earlyBirdPaymentDeadline.trim() !== "";
    if (hasEarlyBirdPaymentDeadline && (!hasEarlyBirdApplicationDeadline || !hasEarlyBirdDiscount)) {
      setError("If early-bird payment deadline is set, early-bird application deadline and discount must also be set.");
      return;
    }

    try {
      if (editingId) {
        await updateCeltaCourse(editingId, formData);
      } else {
        await createCeltaCourse(formData);
      }
      await loadCourses();
      resetForm();
      setError("");
    } catch (err: any) {
      setError("Failed to save course: " + (err.message || "Unknown error"));
      console.error(err);
    }
  };

  const handleEdit = (course: CeltaCourse) => {
    setEditingId(course.id || null);
    setFormData({
      format: course.format,
      startDate: course.startDate,
      endDate: course.endDate,
      schedule: course.schedule,
      priceAMD: course.priceAMD,
      applicationDeadline: course.applicationDeadline,
      status: course.status,
      seats: course.seats,
      earlyBirdDeadline: course.earlyBirdDeadline,
      earlyBirdApplicationDeadline: course.earlyBirdApplicationDeadline || course.earlyBirdDeadline, // Fallback to old field for backward compatibility
      earlyBirdDiscountAMD: course.earlyBirdDiscountAMD,
      paymentDeadline: course.paymentDeadline,
      earlyBirdPaymentDeadline: course.earlyBirdPaymentDeadline,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this course?")) {
      return;
    }

    try {
      await deleteCeltaCourse(id);
      await loadCourses();
      setError("");
    } catch (err: any) {
      setError("Failed to delete course: " + (err.message || "Unknown error"));
      console.error(err);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      format: "Full-time",
      startDate: "",
      endDate: "",
      schedule: "",
      priceAMD: 0,
      applicationDeadline: "",
      status: "Applications open soon",
      seats: undefined,
      earlyBirdDeadline: undefined,
      earlyBirdApplicationDeadline: undefined,
      earlyBirdDiscountAMD: undefined,
      paymentDeadline: undefined,
      earlyBirdPaymentDeadline: undefined,
    });
  };

  return (
    <AdminLayout>
      <h1 className="mb-8">Manage CELTA Courses</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Create/Edit Form */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          {editingId ? "Edit Course" : "Add New Course"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="format" className="block text-sm font-medium text-gray-700 mb-2">
                Format *
              </label>
              <select
                id="format"
                value={formData.format}
                onChange={(e) =>
                  setFormData({ ...formData, format: e.target.value as "Full-time" | "Part-time" })
                }
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
              </select>
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Status *
              </label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as "Open" | "Closed" | "Applications open soon",
                  })
                }
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
                <option value="Applications open soon">Applications open soon</option>
              </select>
            </div>

            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                Start Date * (YYYY-MM-DD)
              </label>
              <input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                End Date * (YYYY-MM-DD)
              </label>
              <input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label htmlFor="applicationDeadline" className="block text-sm font-medium text-gray-700 mb-2">
                Application Deadline * (YYYY-MM-DD)
              </label>
              <input
                id="applicationDeadline"
                type="date"
                value={formData.applicationDeadline}
                onChange={(e) => setFormData({ ...formData, applicationDeadline: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label htmlFor="priceAMD" className="block text-sm font-medium text-gray-700 mb-2">
                Price (AMD) *
              </label>
              <input
                id="priceAMD"
                type="number"
                min="0"
                value={formData.priceAMD || ""}
                onChange={(e) => setFormData({ ...formData, priceAMD: Number(e.target.value) })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label htmlFor="seats" className="block text-sm font-medium text-gray-700 mb-2">
                Seats (optional)
              </label>
              <input
                id="seats"
                type="number"
                min="0"
                value={formData.seats || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    seats: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label htmlFor="earlyBirdApplicationDeadline" className="block text-sm font-medium text-gray-700 mb-2">
                Early-bird Application Deadline (optional)
              </label>
              <input
                id="earlyBirdApplicationDeadline"
                type="date"
                value={formData.earlyBirdApplicationDeadline || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    earlyBirdApplicationDeadline: e.target.value || undefined,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <p className="text-xs text-gray-500 mt-1">Optional (used only if early-bird discount is offered)</p>
            </div>

            <div>
              <label htmlFor="earlyBirdDiscountAMD" className="block text-sm font-medium text-gray-700 mb-2">
                Early-bird Discount (AMD) (optional)
              </label>
              <input
                id="earlyBirdDiscountAMD"
                type="number"
                min="0"
                value={formData.earlyBirdDiscountAMD || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    earlyBirdDiscountAMD: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label htmlFor="paymentDeadline" className="block text-sm font-medium text-gray-700 mb-2">
                Payment Deadline (optional)
              </label>
              <input
                id="paymentDeadline"
                type="date"
                value={formData.paymentDeadline || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    paymentDeadline: e.target.value || undefined,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <p className="text-xs text-gray-500 mt-1">Payment deadline (optional)</p>
            </div>

            <div>
              <label htmlFor="earlyBirdPaymentDeadline" className="block text-sm font-medium text-gray-700 mb-2">
                Early-bird Payment Deadline (optional)
              </label>
              <input
                id="earlyBirdPaymentDeadline"
                type="date"
                value={formData.earlyBirdPaymentDeadline || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    earlyBirdPaymentDeadline: e.target.value || undefined,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <p className="text-xs text-gray-500 mt-1">Early-bird payment deadline (optional)</p>
            </div>
          </div>

          <div>
            <label htmlFor="schedule" className="block text-sm font-medium text-gray-700 mb-2">
              Schedule *
            </label>
            <input
              id="schedule"
              type="text"
              value={formData.schedule}
              onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
              required
              placeholder="e.g., Mon–Fri (daytime)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" variant="primary">
              {editingId ? "Save Changes" : "Add Course"}
            </Button>
            {editingId && (
              <Button type="button" onClick={resetForm} variant="secondary">
                Cancel
              </Button>
            )}
          </div>
        </form>
      </section>

      {/* Courses List */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">All Courses</h2>
        {loading ? (
          <p className="text-gray-600">Loading courses...</p>
        ) : courses.length === 0 ? (
          <p className="text-gray-600">No courses found. Add your first course above.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                    Format
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                    Dates
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                    Schedule
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                    Price
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                    Deadline
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                    Seats
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                    Early-bird
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">
                      {course.format}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">
                      {formatDate(course.startDate)} - {formatDate(course.endDate)}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">
                      {course.schedule}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">
                      {formatPrice(course.priceAMD)}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">
                      {formatDate(course.applicationDeadline)}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">
                      {course.status}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">
                      {course.seats || "—"}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">
                      {(course.earlyBirdApplicationDeadline || course.earlyBirdDeadline) && course.earlyBirdDiscountAMD !== undefined ? (
                        <div className="text-sm">
                          <div>Discount: {formatPrice(course.earlyBirdDiscountAMD)}</div>
                          {course.earlyBirdApplicationDeadline && (
                            <div className="mt-1">Early-bird application deadline: {formatDate(course.earlyBirdApplicationDeadline)}</div>
                          )}
                          {!course.earlyBirdApplicationDeadline && course.earlyBirdDeadline && (
                            <div className="mt-1">Early-bird application deadline: {formatDate(course.earlyBirdDeadline)}</div>
                          )}
                          {course.earlyBirdPaymentDeadline && (
                            <div className="mt-1">Early-bird payment deadline: {formatDate(course.earlyBirdPaymentDeadline)}</div>
                          )}
                        </div>
                      ) : (
                        <div className="text-sm">
                          {course.paymentDeadline && (
                            <div>Payment deadline: {formatDate(course.paymentDeadline)}</div>
                          )}
                          {!course.paymentDeadline && "—"}
                        </div>
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(course)}
                          className="text-primary hover:text-primary-800 text-sm font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => course.id && handleDelete(course.id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </AdminLayout>
  );
}

export default function AdminCeltaPage() {
  return (
    <AdminAuthGuard>
      <CeltaCoursesManager />
    </AdminAuthGuard>
  );
}

