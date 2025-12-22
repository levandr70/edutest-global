"use client";

import { useState, useEffect, FormEvent } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import Button from "@/components/Button";
import {
  listTestDates,
  createSingleTestDate,
  createBulkTestDates,
  updateTestDateSessions,
  toggleTestDateActive,
  softDeleteTestDate,
  TestDate,
  ExamType,
} from "@/lib/firebase/testDates";

function formatDate(dateString: string): string {
  if (!dateString) return "";
  try {
    const date = new Date(dateString + "T00:00:00");
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
}

interface TestDatesManagerProps {
  exam: ExamType;
  examLabel: string;
}

export default function TestDatesManager({ exam, examLabel }: TestDatesManagerProps) {
  const [user, setUser] = useState<User | null>(null);
  const [testDates, setTestDates] = useState<TestDate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // Bulk generation form
  const [bulkFormData, setBulkFormData] = useState({
    startDate: "",
    endDate: "",
    sessions: 1 as 1 | 2,
    note: "",
  });
  const [bulkLoading, setBulkLoading] = useState(false);
  
  // Single date form
  const [singleFormData, setSingleFormData] = useState({
    date: "",
    sessions: 1 as 1 | 2,
    note: "",
  });
  const [singleLoading, setSingleLoading] = useState(false);

  // Set default date range (today to +6 months)
  useEffect(() => {
    const today = new Date();
    const sixMonthsLater = new Date();
    sixMonthsLater.setMonth(today.getMonth() + 6);
    
    const formatDateInput = (d: Date) => {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };
    
    if (!bulkFormData.startDate) {
      setBulkFormData(prev => ({
        ...prev,
        startDate: formatDateInput(today),
        endDate: formatDateInput(sixMonthsLater),
      }));
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    loadTestDates();
  }, [exam]);

  const loadTestDates = async () => {
    try {
      setLoading(true);
      const today = new Date().toISOString().split("T")[0];
      const data = await listTestDates(exam, today, undefined, false, true);
      setTestDates(data);
      setError("");
    } catch (err: any) {
      setError("Failed to load test dates: " + (err.message || "Unknown error"));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBulkGenerate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setBulkLoading(true);

    if (!bulkFormData.startDate || !bulkFormData.endDate) {
      setError("Please select both start and end dates.");
      setBulkLoading(false);
      return;
    }

    if (bulkFormData.startDate > bulkFormData.endDate) {
      setError("Start date must be before or equal to end date.");
      setBulkLoading(false);
      return;
    }

    try {
      const userEmail = user?.email || user?.uid || undefined;
      const result = await createBulkTestDates(
        exam,
        bulkFormData.startDate,
        bulkFormData.endDate,
        bulkFormData.sessions,
        bulkFormData.note.trim() || undefined,
        userEmail
      );

      await loadTestDates();
      
      let message = `Created ${result.created} test date${result.created !== 1 ? "s" : ""}.`;
      if (result.skipped > 0) {
        message += ` ${result.skipped} duplicate${result.skipped !== 1 ? "s" : ""} skipped.`;
      }
      if (result.pastSkipped > 0) {
        message += ` ${result.pastSkipped} past date${result.pastSkipped !== 1 ? "s" : ""} skipped.`;
      }
      
      setSuccess(message);
      setBulkFormData(prev => ({ ...prev, note: "" }));
    } catch (err: any) {
      setError("Failed to generate test dates: " + (err.message || "Unknown error"));
      console.error(err);
    } finally {
      setBulkLoading(false);
    }
  };

  const handleSingleAdd = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSingleLoading(true);

    if (!singleFormData.date) {
      setError("Please select a date.");
      setSingleLoading(false);
      return;
    }

    // Check if date is in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(singleFormData.date + "T00:00:00");
    selectedDate.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      setError("Cannot create test dates in the past.");
      setSingleLoading(false);
      return;
    }

    try {
      const userEmail = user?.email || user?.uid || undefined;
      const created = await createSingleTestDate(
        exam,
        singleFormData.date,
        singleFormData.sessions,
        singleFormData.note.trim() || undefined,
        userEmail
      );

      if (!created) {
        setError("A test date already exists for this date.");
        setSingleLoading(false);
        return;
      }

      await loadTestDates();
      setSuccess("Test date created successfully!");
      setSingleFormData({
        date: "",
        sessions: 1,
        note: "",
      });
    } catch (err: any) {
      setError("Failed to create test date: " + (err.message || "Unknown error"));
      console.error(err);
    } finally {
      setSingleLoading(false);
    }
  };

  const handleUpdateSessions = async (dateISO: string, sessions: 1 | 2) => {
    try {
      const userEmail = user?.email || user?.uid || undefined;
      await updateTestDateSessions(exam, dateISO, sessions, userEmail);
      await loadTestDates();
      setSuccess("Sessions updated successfully!");
      setError("");
    } catch (err: any) {
      setError("Failed to update sessions: " + (err.message || "Unknown error"));
      console.error(err);
    }
  };

  const handleToggleActive = async (dateISO: string, currentActive: boolean) => {
    try {
      const userEmail = user?.email || user?.uid || undefined;
      await toggleTestDateActive(exam, dateISO, !currentActive, userEmail);
      await loadTestDates();
      setSuccess(`Test date ${!currentActive ? "announced" : "hidden"} successfully!`);
      setError("");
    } catch (err: any) {
      setError("Failed to update status: " + (err.message || "Unknown error"));
      console.error(err);
    }
  };

  const handleDelete = async (dateISO: string) => {
    if (!window.confirm("Are you sure you want to delete this test date?")) {
      return;
    }

    try {
      const userEmail = user?.email || user?.uid || undefined;
      await softDeleteTestDate(exam, dateISO, userEmail);
      await loadTestDates();
      setSuccess("Test date deleted successfully!");
      setError("");
    } catch (err: any) {
      setError("Failed to delete test date: " + (err.message || "Unknown error"));
      console.error(err);
    }
  };

  return (
    <AdminLayout>
      <h1 className="mb-8">{examLabel} Test Dates</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
          {success}
        </div>
      )}

      {/* Bulk Generation */}
      <section className="mb-12 p-6 bg-neutral-50 rounded-lg border border-neutral-200">
        <h2 className="text-2xl font-semibold mb-4">Generate Dates for Range</h2>
        <form onSubmit={handleBulkGenerate} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                Start Date *
              </label>
              <input
                id="startDate"
                type="date"
                value={bulkFormData.startDate}
                onChange={(e) =>
                  setBulkFormData({ ...bulkFormData, startDate: e.target.value })
                }
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                End Date * (max 6 months from start)
              </label>
              <input
                id="endDate"
                type="date"
                value={bulkFormData.endDate}
                onChange={(e) =>
                  setBulkFormData({ ...bulkFormData, endDate: e.target.value })
                }
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label htmlFor="bulkSessions" className="block text-sm font-medium text-gray-700 mb-2">
                Sessions *
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="bulkSessions"
                    value={1}
                    checked={bulkFormData.sessions === 1}
                    onChange={() => setBulkFormData({ ...bulkFormData, sessions: 1 })}
                    className="mr-2 h-4 w-4 text-primary focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">Morning session</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="bulkSessions"
                    value={2}
                    checked={bulkFormData.sessions === 2}
                    onChange={() => setBulkFormData({ ...bulkFormData, sessions: 2 })}
                    className="mr-2 h-4 w-4 text-primary focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">Morning + Afternoon</span>
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="bulkNote" className="block text-sm font-medium text-gray-700 mb-2">
                Note (optional)
              </label>
              <input
                id="bulkNote"
                type="text"
                value={bulkFormData.note}
                onChange={(e) =>
                  setBulkFormData({ ...bulkFormData, note: e.target.value })
                }
                placeholder="Optional note for all dates"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              variant="primary"
              disabled={bulkLoading}
            >
              {bulkLoading ? "Generating..." : "Generate Dates"}
            </Button>
          </div>
        </form>
      </section>

      {/* Single Date Add */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Add Single Test Date</h2>
        <form onSubmit={handleSingleAdd} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                Date *
              </label>
              <input
                id="date"
                type="date"
                value={singleFormData.date}
                onChange={(e) => setSingleFormData({ ...singleFormData, date: e.target.value })}
                required
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sessions *
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sessions"
                    value={1}
                    checked={singleFormData.sessions === 1}
                    onChange={() => setSingleFormData({ ...singleFormData, sessions: 1 })}
                    className="mr-2 h-4 w-4 text-primary focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">Morning session</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sessions"
                    value={2}
                    checked={singleFormData.sessions === 2}
                    onChange={() => setSingleFormData({ ...singleFormData, sessions: 2 })}
                    className="mr-2 h-4 w-4 text-primary focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">Morning + Afternoon</span>
                </label>
              </div>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-2">
                Note (optional)
              </label>
              <input
                id="note"
                type="text"
                value={singleFormData.note}
                onChange={(e) => setSingleFormData({ ...singleFormData, note: e.target.value })}
                placeholder="Optional note about this test date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          <div>
            <Button type="submit" variant="primary" disabled={singleLoading}>
              {singleLoading ? "Adding..." : "Add Date"}
            </Button>
          </div>
        </form>
      </section>

      {/* Date List Table */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Test Dates</h2>
        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : testDates.length === 0 ? (
          <p className="text-gray-600">No test dates found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                    Date
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                    Sessions
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                    Active
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {testDates.map((testDate) => (
                  <tr key={testDate.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">
                      {formatDate(testDate.date)}
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      <select
                        value={testDate.sessions}
                        onChange={(e) =>
                          handleUpdateSessions(
                            testDate.date,
                            Number(e.target.value) as 1 | 2
                          )
                        }
                        className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value={1}>Morning</option>
                        <option value={2}>Morning + Afternoon</option>
                      </select>
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      <button
                        onClick={() => handleToggleActive(testDate.date, testDate.isActive)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          testDate.isActive
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        }`}
                      >
                        {testDate.isActive ? "Announced" : "Hidden"}
                      </button>
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      <button
                        onClick={() => handleDelete(testDate.date)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Delete
                      </button>
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

