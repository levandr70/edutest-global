"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import type { EventInput, DatesSetArg } from "@fullcalendar/core";
import type { TestDate } from "@/lib/firebase/testDates";

export type TestSession = {
  id: string;
  date: string; // YYYY-MM-DD
  sessions: number; // 1 or 2
  note?: string;
};

interface ToeflDatesCalendarProps {
  dates: TestSession[];
  onMonthChange?: (month: Date) => void;
  datesCache?: Map<string, TestDate>;
}

export default function ToeflDatesCalendar({ 
  dates, 
  onMonthChange,
  datesCache 
}: ToeflDatesCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [popoverPosition, setPopoverPosition] = useState<{ x: number; y: number } | null>(null);
  const calendarRef = useRef<FullCalendar>(null);
  const clickHandlersRef = useRef<Map<HTMLElement, () => void>>(new Map());

  const events = useMemo<EventInput[]>(() => {
    return dates.map((testSession) => ({
      id: testSession.id,
      start: testSession.date,
      display: "background" as const,
      className: "announced-date",
      extendedProps: {
        sessions: testSession.sessions,
        note: testSession.note,
      },
    }));
  }, [dates]);

  // Create a Map of date strings to test sessions for quick lookup
  const datesMap = useMemo(() => {
    const map = new Map<string, TestSession>();
    dates.forEach((d) => {
      map.set(d.date, d);
    });
    return map;
  }, [dates]);

  const handleDatesSet = (arg: DatesSetArg) => {
    if (onMonthChange && arg.view.type === "dayGridMonth") {
      // Use a date from the middle of the visible range to reliably get the displayed month
      // This avoids issues when the first few days shown are from the previous month
      const midRangeTime = arg.start.getTime() + (arg.end.getTime() - arg.start.getTime()) / 2;
      const midRangeDate = new Date(midRangeTime);
      
      // Extract year and month in local time
      const year = midRangeDate.getFullYear();
      const month = midRangeDate.getMonth();
      
      // Create a new Date object for the first day of the displayed month in local time
      // This ensures we're always working with local time, not UTC
      const firstDayOfMonth = new Date(year, month, 1);
      onMonthChange(firstDayOfMonth);
    }
  };

  // Handle clicks via dayCellDidMount
  const handleDayCellDidMount = (arg: { date: Date; el: HTMLElement }) => {
    // Format date as YYYY-MM-DD using local time
    const year = arg.date.getFullYear();
    const month = String(arg.date.getMonth() + 1).padStart(2, "0");
    const day = String(arg.date.getDate()).padStart(2, "0");
    const dateStr = `${year}-${month}-${day}`;

    const testSession = datesMap.get(dateStr);
    
    // Remove old listener if exists
    const oldHandler = clickHandlersRef.current.get(arg.el);
    if (oldHandler) {
      arg.el.removeEventListener("click", oldHandler);
    }
    
    if (testSession) {
      // Make cell clickable
      arg.el.style.cursor = "pointer";
      const clickHandler = () => {
        const rect = arg.el.getBoundingClientRect();
        setPopoverPosition({
          x: rect.left + rect.width / 2,
          y: rect.bottom + 10,
        });
        setSelectedDate(dateStr);
      };
      arg.el.addEventListener("click", clickHandler);
      clickHandlersRef.current.set(arg.el, clickHandler);
    } else {
      arg.el.style.cursor = "default";
    }
  };

  // Cleanup listeners on unmount
  useEffect(() => {
    return () => {
      clickHandlersRef.current.forEach((handler, el) => {
        el.removeEventListener("click", handler);
      });
      clickHandlersRef.current.clear();
    };
  }, []);

  const selectedSession = selectedDate ? datesMap.get(selectedDate) : null;

  // Format date for display
  const formatDisplayDate = (dateStr: string) => {
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="relative">
      <div className="toefl-calendar-wrapper">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          firstDay={1} // Monday
          headerToolbar={{
            left: "prev",
            center: "title",
            right: "next",
          }}
          events={events}
          height="auto"
          aspectRatio={1.35}
          dayMaxEvents={false}
          eventDisplay="background"
          datesSet={handleDatesSet}
          dayCellDidMount={handleDayCellDidMount}
          dayCellClassNames={(arg) => {
            // Format date as YYYY-MM-DD using local time (not UTC)
            const year = arg.date.getFullYear();
            const month = String(arg.date.getMonth() + 1).padStart(2, "0");
            const day = String(arg.date.getDate()).padStart(2, "0");
            const dateStr = `${year}-${month}-${day}`;
            
            // Hide past dates
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const cellDate = new Date(arg.date);
            cellDate.setHours(0, 0, 0, 0);
            
            if (cellDate < today) {
              return "fc-day-past";
            }
            
            if (datesMap.has(dateStr)) {
              return "announced-date";
            }
            return "";
          }}
          eventClassNames="announced-date"
          dayHeaderFormat={{ weekday: "short" }}
          titleFormat={{ month: "long", year: "numeric" }}
          buttonText={{
            today: "Today",
            month: "Month",
            week: "Week",
            day: "Day",
          }}
        />
      </div>

      {/* Popover for date details */}
      {selectedSession && popoverPosition && (
        <div
          className="fixed z-50 bg-white border border-neutral-200 rounded-lg shadow-lg p-4 max-w-xs"
          style={{
            left: `${popoverPosition.x}px`,
            top: `${popoverPosition.y}px`,
            transform: "translateX(-50%)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => {
              setSelectedDate(null);
              setPopoverPosition(null);
            }}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">
            {formatDisplayDate(selectedSession.date)}
          </h4>
          <div className="space-y-1.5 text-sm text-gray-700">
            <div>
              <span className="font-medium">Morning session</span>
            </div>
            {selectedSession.sessions === 2 && (
              <div>
                <span className="font-medium">Afternoon session</span>
              </div>
            )}
            {selectedSession.note && (
              <div className="mt-2 pt-2 border-t border-neutral-200">
                <p className="text-gray-600 text-sm">{selectedSession.note}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Click outside to close popover */}
      {selectedDate && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setSelectedDate(null);
            setPopoverPosition(null);
          }}
        />
      )}
    </div>
  );
}

