"use client";
import { useState } from "react";
import { SectionHeading } from "./News";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";

// 活動曜日: 0=日, 1=月, 2=火, 3=水, 4=木, 5=金, 6=土
const ACTIVITY_DAYS: Record<
  number,
  { label: string; time: string; color: string; bg: string }
> = {
  1: { label: "月", time: "16:00〜", color: "text-white", bg: "bg-[#2d4a35]" },
  5: { label: "金", time: "17:00〜", color: "text-white", bg: "bg-[#5a7a5a]" },
  6: { label: "土", time: "13:00〜", color: "text-white", bg: "bg-[#7fa87f]" },
};

const WEEK_LABELS = ["日", "月", "火", "水", "木", "金", "土"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function isSunday(year: number, month: number, day: number) {
  return new Date(year, month, day).getDay() === 0;
}

export default function Schedule() {
  const today = new Date();
  const [current, setCurrent] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });

  const { year, month } = current;
  const daysInMonth = getDaysInMonth(year, month);
  const firstDow = getFirstDayOfWeek(year, month);

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

  // カレンダーのグリッドセル（先頭の空白 + 日付）
  const cells: (number | null)[] = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  // 6行になるよう末尾を埋める
  while (cells.length % 7 !== 0) cells.push(null);

  // 活動日一覧（今月分）
  const activityList = Array.from({ length: daysInMonth }, (_, i) => i + 1)
    .map((day) => {
      const dow = new Date(year, month, day).getDay();
      return ACTIVITY_DAYS[dow] ? { day, dow, ...ACTIVITY_DAYS[dow] } : null;
    })
    .filter(Boolean) as { day: number; dow: number; label: string; time: string; color: string; bg: string }[];

  const monthLabel = `${year}年${month + 1}月`;

  return (
    <section id="schedule" className="py-20 sm:py-28 bg-[#f7f4ef]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <SectionHeading en="Schedule" ja="活動スケジュール" />

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {Object.values(ACTIVITY_DAYS).map((v) => (
            <div key={v.label} className="flex items-center gap-2 text-sm text-[#444]">
              <span className={`inline-block w-4 h-4 rounded-sm ${v.bg}`} />
              <span>{v.label}曜日</span>
              <span className="text-[#8b7355]">{v.time}</span>
            </div>
          ))}
        </div>

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
          <div className="grid grid-cols-7">
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
              const activity = ACTIVITY_DAYS[dow];
              const isToday =
                today.getFullYear() === year &&
                today.getMonth() === month &&
                today.getDate() === day;
              const isSun = dow === 0;
              const isSat = dow === 6;

              return (
                <div
                  key={day}
                  className={`min-h-[56px] sm:min-h-[72px] p-1.5 sm:p-2 border-b border-r border-[#ede8e0] last-of-type:border-r-0 flex flex-col gap-1 ${
                    activity ? "bg-white" : "bg-[#faf8f5]"
                  } ${(idx + 1) % 7 === 0 ? "border-r-0" : ""}`}
                >
                  {/* Day number */}
                  <span
                    className={`text-xs sm:text-sm font-medium w-6 h-6 flex items-center justify-center rounded-full ${
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

                  {/* Activity badge */}
                  {activity && (
                    <span
                      className={`hidden sm:block text-[10px] leading-none px-1.5 py-1 rounded-sm ${activity.bg} ${activity.color} font-medium text-center`}
                    >
                      {activity.time}
                    </span>
                  )}
                  {/* Mobile: just a dot indicator */}
                  {activity && (
                    <span
                      className={`sm:hidden mx-auto w-1.5 h-1.5 rounded-full ${activity.bg}`}
                    />
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
          {activityList.length === 0 ? (
            <p className="text-sm text-[#8b7355] px-5 py-4">活動日はありません</p>
          ) : (
            <ul className="divide-y divide-[#ede8e0]">
              {activityList.map((item) => (
                <li
                  key={item.day}
                  className="flex items-center gap-4 px-5 py-3 hover:bg-[#f7f4ef]/60 transition-colors"
                >
                  <span
                    className={`w-8 h-8 rounded-sm flex items-center justify-center text-xs font-medium flex-shrink-0 ${item.bg} ${item.color}`}
                  >
                    {item.label}
                  </span>
                  <div>
                    <span className="text-sm font-medium text-[#1a1a1a]">
                      {month + 1}月{item.day}日（{item.label}）
                    </span>
                  </div>
                  <div className="ml-auto flex items-center gap-1.5 text-sm text-[#5a7a5a]">
                    <Clock size={13} strokeWidth={1.5} />
                    {item.time}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Note */}
        <p className="mt-6 text-center text-sm text-[#8b7355] italic">
          ※ 日曜日はカフェ囲碁会・認定会・交流試合などの特別イベントも開催します。
          <br className="hidden sm:block" />
          詳細はお知らせ・Instagramをご確認ください。
        </p>
      </div>
    </section>
  );
}
