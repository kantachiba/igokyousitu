"use client";
import { useState, useEffect, useMemo } from "react";
import SectionHeading from "./SectionHeading";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";

export interface ScheduleEvent {
  id: string;
  date: string;
  startTime: string;
  title: string;
  description?: string;
}

const WEEK_LABELS = ["日", "月", "火", "水", "木", "金", "土"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function Schedule() {
  const today = new Date();
  const [current, setCurrent] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [loading, setLoading] = useState(false);

  const { year, month } = current;
  const daysInMonth = getDaysInMonth(year, month);
  const firstDow = getFirstDayOfWeek(year, month);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/schedule?year=${year}&month=${month + 1}`)
      .then((r) => r.json())
      .then((data) => setEvents(Array.isArray(data) ? data : []))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, [year, month]);

  const eventsByDate = useMemo(() => {
    const map: Record<string, ScheduleEvent[]> = {};
    for (const e of events) {
      if (!map[e.date]) map[e.date] = [];
      map[e.date].push(e);
    }
    return map;
  }, [events]);

  const prevMonth = () => {
    setCurrent((c) =>
      c.month === 0
        ? { year: c.year - 1, month: 11 }
        : { year: c.year, month: c.month - 1 }
    );
  };
  const nextMonth = () => {
    setCurrent((c) =>
      c.month === 11
        ? { year: c.year + 1, month: 0 }
        : { year: c.year, month: c.month + 1 }
    );
  };

  const toDateStr = (day: number) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const cells: (number | null)[] = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const monthLabel = `${year}年${month + 1}月`;

  return (
    <section id="schedule" className="py-20 sm:py-28 bg-[#f7f4ef]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <SectionHeading en="Schedule" ja="活動スケジュール" />

        {/* Calendar card */}
        <div className="bg-white/80 border border-[#e5ddd0] rounded-md shadow-sm overflow-hidden">
          {/* Month navigation */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#e5ddd0] bg-[#f7f4ef]/60">
            <button
              onClick={prevMonth}
              className="p-1.5 rounded-sm text-[#5a7a5a] hover:bg-[#5a7a5a]/10 transition-colors"
              aria-label="前の月"
            >
              <ChevronLeft size={20} strokeWidth={1.5} />
            </button>
            <h3
              className="text-lg font-medium text-[#1a1a1a] tracking-wider"
              style={{ fontFamily: "var(--font-noto-serif)" }}
            >
              {monthLabel}
            </h3>
            <button
              onClick={nextMonth}
              className="p-1.5 rounded-sm text-[#5a7a5a] hover:bg-[#5a7a5a]/10 transition-colors"
              aria-label="次の月"
            >
              <ChevronRight size={20} strokeWidth={1.5} />
            </button>
          </div>

          {/* Week header */}
          <div className="grid grid-cols-7 border-b border-[#e5ddd0]">
            {WEEK_LABELS.map((d, i) => (
              <div
                key={d}
                className={`py-2.5 text-center text-xs font-medium tracking-wider ${
                  i === 0
                    ? "text-[#c0392b]"
                    : i === 6
                    ? "text-[#2d6abf]"
                    : "text-[#8b7355]"
                }`}
              >
                {d}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div className={`grid grid-cols-7 transition-opacity ${loading ? "opacity-50" : ""}`}>
            {cells.map((day, idx) => {
              if (day === null) {
                return (
                  <div
                    key={`empty-${idx}`}
                    className="min-h-[56px] sm:min-h-[72px] bg-[#faf8f5] border-b border-r border-[#ede8e0] last:border-r-0"
                  />
                );
              }

              const dow = new Date(year, month, day).getDay();
              const dateStr = toDateStr(day);
              const dayEvents = eventsByDate[dateStr] ?? [];
              const hasEvents = dayEvents.length > 0;
              const isToday =
                today.getFullYear() === year &&
                today.getMonth() === month &&
                today.getDate() === day;
              const isSun = dow === 0;
              const isSat = dow === 6;

              return (
                <div
                  key={day}
                  className={`min-h-[56px] sm:min-h-[72px] p-1 sm:p-1.5 border-b border-r border-[#ede8e0] flex flex-col gap-0.5 ${
                    hasEvents ? "bg-white" : "bg-[#faf8f5]"
                  } ${(idx + 1) % 7 === 0 ? "border-r-0" : ""}`}
                >
                  <span
                    className={`text-xs sm:text-sm font-medium w-6 h-6 flex items-center justify-center rounded-full flex-shrink-0 ${
                      isToday
                        ? "bg-[#2d4a35] text-white"
                        : isSun
                        ? "text-[#c0392b]"
                        : isSat
                        ? "text-[#2d6abf]"
                        : "text-[#333]"
                    }`}
                  >
                    {day}
                  </span>

                  {dayEvents.slice(0, 2).map((ev) => (
                    <span
                      key={ev.id}
                      className="hidden sm:block text-[9px] leading-tight px-1 py-0.5 rounded-sm bg-[#2d4a35] text-white font-medium truncate"
                      title={`${ev.startTime}〜 ${ev.title}`}
                    >
                      {ev.startTime}〜 {ev.title}
                    </span>
                  ))}
                  {hasEvents && (
                    <span className="sm:hidden mx-auto w-1.5 h-1.5 rounded-full bg-[#2d4a35] flex-shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Activity list for the month */}
        <div className="mt-6 bg-white/80 border border-[#e5ddd0] rounded-md overflow-hidden">
          <div className="px-5 py-3 border-b border-[#e5ddd0] bg-[#f7f4ef]/60">
            <p
              className="text-sm font-medium text-[#1a1a1a]"
              style={{ fontFamily: "var(--font-noto-serif)" }}
            >
              {month + 1}月の活動日一覧
            </p>
          </div>
          {loading ? (
            <p className="text-sm text-[#8b7355] px-5 py-4">読み込み中...</p>
          ) : events.length === 0 ? (
            <p className="text-sm text-[#8b7355] px-5 py-4">活動日はありません</p>
          ) : (
            <ul className="divide-y divide-[#ede8e0]">
              {events.map((ev) => {
                const d = new Date(ev.date + "T00:00:00");
                const dowLabel = WEEK_LABELS[d.getDay()];
                const dayNum = d.getDate();
                return (
                  <li
                    key={ev.id}
                    className="flex items-start gap-4 px-5 py-3 hover:bg-[#f7f4ef]/60 transition-colors"
                  >
                    <span className="w-8 h-8 rounded-sm flex items-center justify-center text-xs font-medium flex-shrink-0 bg-[#2d4a35] text-white">
                      {dowLabel}
                    </span>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-medium text-[#1a1a1a]">
                        {month + 1}月{dayNum}日（{dowLabel}）
                      </span>
                      <p className="text-xs text-[#555] mt-0.5 truncate">{ev.title}</p>
                    </div>
                    <div className="ml-auto flex items-center gap-1.5 text-sm text-[#5a7a5a] flex-shrink-0">
                      <Clock size={13} strokeWidth={1.5} />
                      {ev.startTime}〜
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <p className="mt-6 text-center text-sm text-[#8b7355] italic">
          ※ 詳細はお知らせ・Instagramをご確認ください。
        </p>
      </div>
    </section>
  );
}
