"use client";

import { useState, useEffect, FormEvent } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import Button from "@/components/Button";
import {
  listCeltaCourses,
  createCeltaCourse,
  updateCeltaCourse,
  deleteCeltaCourse,
  CeltaCourse,
  CeltaCourseInput,
} from "@/lib/firebase/celtaCourses";

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

export default function CeltaCoursesManager() {
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

    try {
      if (editingId) {
        await updateCeltaCourse(editingId, formData);
      } else {
        await createCeltaCourse(formData);
      }
      await loadCourses();
      resetForm();
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
      earlyBirdApplicationDeadline: course.earlyBirdApplicationDeadline,
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
                onChange={(e) => setFormData({ ...formData, format: e.target.value as "Full-time" | "Part-time" })}
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
                onChange={(e) => setFormData({ ...formData, status: e.target.value as "Open" | "Closed" | "Applications open soon" })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="Applications open soon">Applications open soon</option>
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                Start Date *
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
                End Date *
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
              <label htmlFor="schedule" className="block text-sm font-medium text-gray-700 mb-2">
                Schedule *
              </label>
              <input
                id="schedule"
                type="text"
                value={formData.schedule}
                onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                placeholder="e.g., Monday-Friday, 9:00-17:00"
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
                value={formData.priceAMD}
                onChange={(e) => setFormData({ ...formData, priceAMD: Number(e.target.value) })}
                required
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label htmlFor="applicationDeadline" className="block text-sm font-medium text-gray-700 mb-2">
                Application Deadline *
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
              <label htmlFor="seats" className="block text-sm font-medium text-gray-700 mb-2">
                Seats (optional)
              </label>
              <input
                id="seats"
                type="number"
                value={formData.seats || ""}
                onChange={(e) => setFormData({ ...formData, seats: e.target.value ? Number(e.target.value) : undefined })}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label htmlFor="earlyBirdApplicationDeadline" className="block text-sm font-medium text-gray-700 mb-2">
                Early Bird Application Deadline (optional)
              </label>
              <input
                id="earlyBirdApplicationDeadline"
                type="date"
                value={formData.earlyBirdApplicationDeadline || ""}
                onChange={(e) => setFormData({ ...formData, earlyBirdApplicationDeadline: e.target.value || undefined })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label htmlFor="earlyBirdDiscountAMD" className="block text-sm font-medium text-gray-700 mb-2">
                Early Bird Discount (AMD) (optional)
              </label>
              <input
                id="earlyBirdDiscountAMD"
                type="number"
                value={formData.earlyBirdDiscountAMD || ""}
                onChange={(e) => setFormData({ ...formData, earlyBirdDiscountAMD: e.target.value ? Number(e.target.value) : undefined })}
                min="0"
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
                onChange={(e) => setFormData({ ...formData, paymentDeadline: e.target.value || undefined })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label htmlFor="earlyBirdPaymentDeadline" className="block text-sm font-medium text-gray-700 mb-2">
                Early Bird Payment Deadline (optional)
              </label>
              <input
                id="earlyBirdPaymentDeadline"
                type="date"
                value={formData.earlyBirdPaymentDeadline || ""}
                onChange={(e) => setFormData({ ...formData, earlyBirdPaymentDeadline: e.target.value || undefined })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="submit" variant="primary">
              {editingId ? "Update Course" : "Create Course"}
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
          <p className="text-gray-600">Loading...</p>
        ) : courses.length === 0 ? (
          <p className="text-gray-600">No courses found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                    Format
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                    Start Date
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                    End Date
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                    Schedule
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                    Price
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">{course.format}</td>
                    <td className="border border-gray-300 px-4 py-3">{formatDate(course.startDate)}</td>
                    <td className="border border-gray-300 px-4 py-3">{formatDate(course.endDate)}</td>
                    <td className="border border-gray-300 px-4 py-3">{course.schedule}</td>
                    <td className="border border-gray-300 px-4 py-3">{formatPrice(course.priceAMD)}</td>
                    <td className="border border-gray-300 px-4 py-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {course.status}
                      </span>
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

