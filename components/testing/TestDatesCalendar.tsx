"use client";

import { useState, useEffect } from "react";
import { listTestDates, TestDate } from "@/lib/firebase/testDates";

interface TestDatesCalendarProps {
  exam: "toefl" | "gre" | "act";
}

export default function TestDatesCalendar({ exam }: TestDatesCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [testDates, setTestDates] = useState<TestDate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Get first and last day of current month
  const getMonthRange = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Format dates as YYYY-MM-DD using local time (not UTC) to avoid timezone issues
    const formatLocalDate = (d: Date) => {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${y}-${m}-${day}`;
    };
    
    return {
      from: formatLocalDate(firstDay),
      to: formatLocalDate(lastDay),
    };
  };

  useEffect(() => {
    loadTestDates();
  }, [exam, currentMonth]);

  const loadTestDates = async () => {
    try {
      setLoading(true);
      const { from, to } = getMonthRange(currentMonth);
      const data = await listTestDates(exam, from, to, true);
      setTestDates(data);
    } catch (err: any) {
      console.error("Failed to load test dates:", err);
    } finally {
      setLoading(false);
    }
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
    setSelectedDate(null);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    // Get day of week: 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    // Convert to Monday-start: Monday = 0, Tuesday = 1, ..., Sunday = 6
    const firstDayOfWeek = firstDay.getDay();
    const mondayStartOffset = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

    const days: (number | null)[] = [];
    
    // Add empty cells for days before the first day of the month (Monday-start)
    for (let i = 0; i < mondayStartOffset; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  const formatDateKey = (day: number) => {
    const year = currentMonth.getFullYear();
    const month = String(currentMonth.getMonth() + 1).padStart(2, "0");
    const dayStr = String(day).padStart(2, "0");
    return `${year}-${month}-${dayStr}`;
  };

  const getTestDateForDay = (day: number | null): TestDate | undefined => {
    if (day === null) return undefined;
    const dateKey = formatDateKey(day);
    return testDates.find((td) => td.date === dateKey);
  };

  const handleDateClick = (day: number | null) => {
    if (day === null) return;
    const testDate = getTestDateForDay(day);
    if (testDate) {
      const dateKey = formatDateKey(day);
      setSelectedDate(selectedDate === dateKey ? null : dateKey);
    }
  };

  const selectedTestDate = selectedDate
    ? testDates.find((td) => td.date === selectedDate)
    : null;

  const days = getDaysInMonth(currentMonth);
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white border border-neutral-200 rounded-lg p-4 md:p-6">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigateMonth("prev")}
            className="px-3 py-1.5 text-sm text-gray-700 hover:bg-neutral-100 rounded-lg transition-colors font-medium"
          >
            Prev
          </button>
          <h3 className="text-lg font-semibold text-gray-900">
            {formatMonthYear(currentMonth)}
          </h3>
          <button
            onClick={() => navigateMonth("next")}
            className="px-3 py-1.5 text-sm text-gray-700 hover:bg-neutral-100 rounded-lg transition-colors font-medium"
          >
            Next
          </button>
        </div>

        {loading ? (
          <div className="text-center py-6 text-sm text-gray-600">Loading...</div>
        ) : (
          <>
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-0.5 mb-4">
              {/* Week day headers */}
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-semibold text-gray-700 py-1.5"
                >
                  {day}
                </div>
              ))}

              {/* Calendar days */}
              {days.map((day, index) => {
                const testDate = getTestDateForDay(day);
                const dateKey = day !== null ? formatDateKey(day) : null;
                const isSelected = selectedDate === dateKey;
                const isToday =
                  day !== null &&
                  dateKey === new Date().toISOString().split("T")[0];
                const hasSessions = testDate !== undefined;

                return (
                  <div
                    key={index}
                    className={`
                      min-h-[3.5rem] border rounded-md p-1 flex flex-col
                      ${day === null ? "bg-transparent border-transparent" : "bg-white"}
                      ${hasSessions
                        ? "cursor-pointer border-primary/30 bg-primary/10 hover:bg-primary/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
                        : "border-neutral-200 cursor-default focus:outline-none focus-visible:ring-0"
                      }
                      ${isSelected && hasSessions ? "ring-2 ring-primary-500 ring-offset-1" : ""}
                    `}
                    onClick={() => handleDateClick(day)}
                    tabIndex={hasSessions ? 0 : -1}
                  >
                    {day !== null && (
                      <>
                        <div
                          className={`text-sm font-medium ${
                            hasSessions ? "text-gray-900" : "text-gray-700"
                          }`}
                        >
                          {day}
                        </div>
                        {hasSessions && testDate && (
                          <div className="mt-0.5 flex-shrink-0">
                            <span className="inline-block px-1 py-0.5 text-xs font-medium rounded bg-primary-600 text-white">
                              {testDate.sessions === 1 ? "AM" : "AM/PM"}
                            </span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Selected Date Details */}
            {selectedTestDate && (
              <div className="mt-4 pt-4 border-t border-neutral-200">
                <div className="bg-neutral-50 rounded-lg p-3 border border-neutral-200">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                    {new Date(selectedTestDate.date + "T00:00:00").toLocaleDateString(
                      "en-US",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </h4>
                  <div className="space-y-1.5 text-sm text-gray-700">
                    <div>
                      <span className="font-medium">Morning session</span>
                    </div>
                    {selectedTestDate.sessions === 2 && (
                      <div>
                        <span className="font-medium">Afternoon session</span>
                      </div>
                    )}
                    {selectedTestDate.note && (
                      <div className="mt-2 pt-2 border-t border-neutral-200">
                        <p className="text-gray-600 text-sm">{selectedTestDate.note}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* No dates message */}
            {!loading && testDates.length === 0 && (
              <div className="text-center py-6 text-sm text-gray-600">
                No announced sessions for this month yet.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
