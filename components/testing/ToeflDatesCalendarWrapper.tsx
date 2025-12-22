"use client";

import { useState, useEffect, useCallback } from "react";
import { getTestDatesByExamAndRange, TestDate } from "@/lib/firebase/testDates";
import ToeflDatesCalendar, { TestSession } from "./ToeflDatesCalendar";

export default function ToeflDatesCalendarWrapper() {
  const [testDates, setTestDates] = useState<TestDate[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [datesCache, setDatesCache] = useState<Map<string, TestDate>>(new Map());

  // Format dates as YYYY-MM-DD using local time (not UTC) to avoid timezone issues
  const formatLocalDate = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  // Get date range: current month + next 6 months
  const getDateRange = (month: Date) => {
    const start = new Date(month.getFullYear(), month.getMonth(), 1);
    const end = new Date(month.getFullYear(), month.getMonth() + 7, 0); // Last day of month +6
    
    return {
      from: formatLocalDate(start),
      to: formatLocalDate(end),
    };
  };

  const loadTestDates = useCallback(async (month: Date) => {
    try {
      setLoading(true);
      const { from, to } = getDateRange(month);
      const data = await getTestDatesByExamAndRange("toefl", from, to);
      
      // Filter out past dates
      const today = formatLocalDate(new Date());
      const futureDates = data.filter((td) => td.date >= today);
      
      // Update cache
      const newCache = new Map(datesCache);
      futureDates.forEach((td) => {
        newCache.set(td.date, td);
      });
      setDatesCache(newCache);
      
      // Set dates for current view (current month + next 6 months)
      setTestDates(futureDates);
    } catch (err: any) {
      console.error("Failed to load test dates:", err);
    } finally {
      setLoading(false);
    }
  }, [datesCache]);

  useEffect(() => {
    loadTestDates(currentMonth);
  }, [currentMonth, loadTestDates]);

  const handleMonthChange = (newMonth: Date) => {
    setCurrentMonth(newMonth);
  };

  // Convert TestDate[] to TestSession[] and filter past dates
  const today = formatLocalDate(new Date());
  const testSessions: TestSession[] = testDates
    .filter((td) => td.date >= today)
    .map((td) => ({
      id: td.id || `toefl_${td.date}`,
      date: td.date,
      sessions: td.sessions,
      note: td.note,
    }));

  if (loading && testDates.length === 0) {
    return (
      <div className="text-center py-6 text-sm text-gray-600">Loading...</div>
    );
  }

  return (
    <>
      {testSessions.length === 0 && !loading && (
        <div className="text-center py-4 text-sm text-gray-600 mb-4">
          No announced TOEFL iBT sessions for this month yet.
        </div>
      )}
      <ToeflDatesCalendar 
        dates={testSessions} 
        onMonthChange={handleMonthChange}
        datesCache={datesCache}
      />
    </>
  );
}
