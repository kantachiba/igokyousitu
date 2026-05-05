"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Plus, Trash2, X } from "lucide-react";

interface ScheduleEvent {
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

export default function AdminSchedulePage() {
  const router = useRouter();
  const today = new Date();
  const [current, setCurrent] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [form, setForm] = useState({ startTime: "19:00", title: "", description: "" });
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");

  const { year, month } = current;
  const daysInMonth = getDaysInMonth(year, month);
  const firstDow = getFirstDayOfWeek(year, month);

  const fetchEvents = useCallback(() => {
    setLoading(true);
    fetch(`/api/schedule?year=${year}&month=${month + 1}`)
      .then((r) => r.json())
      .then((data) => setEvents(Array.isArray(data) ? data : []))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, [year, month]);

  useEffect(() => {
    fetchEvents();
    setSelectedDate(null);
    setForm({ startTime: "19:00", title: "", description: "" });
    setError("");
  }, [fetchEvents]);

  const eventsByDate = useMemo(() => {
    const map: Record<string, ScheduleEvent[]> = {};
    for (const e of events) {
      if (!map[e.date]) map[e.date] = [];
      map[e.date].push(e);
    }
    return map;
  }, [events]);

  const toDateStr = (day: number) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const prevMonth = () =>
    setCurrent((c) =>
      c.month === 0 ? { year: c.year - 1, month: 11 } : { year: c.year, month: c.month - 1 }
    );
  const nextMonth = () =>
    setCurrent((c) =>
      c.month === 11 ? { year: c.year + 1, month: 0 } : { year: c.year, month: c.month + 1 }
    );

  const handleSelectDate = (dateStr: string) => {
    setSelectedDate(dateStr === selectedDate ? null : dateStr);
    setError("");
  };

  const handleAddEvent = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedDate || !form.title || !form.startTime) return;
    setPosting(true);
    setError("");

    try {
      const res = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: selectedDate,
          startTime: form.startTime,
          title: form.title,
          description: form.description || undefined,
        }),
      });

      if (res.ok) {
        const newEvent = await res.json();
        setEvents((prev) =>
          [...prev, newEvent].sort((a, b) => {
            if (a.date !== b.date) return a.date.localeCompare(b.date);
            return a.startTime.localeCompare(b.startTime);
          })
        );
        setForm({ startTime: "19:00", title: "", description: "" });
        setSelectedDate(null);
      } else {
        const data = await res.json().catch(() => ({}));
        setError((data as { error?: string }).error ?? "登録に失敗しました");
      }
    } catch {
      setError("通信エラーが発生しました");
    } finally {
      setPosting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("この活動日を削除しますか？")) return;
    const res = await fetch(`/api/schedule/${id}`, { method: "DELETE" });
    if (res.ok) {
      setEvents((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const cells: (number | null)[] = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const fmtSelectedDate = (ds: string) => {
    const [y, m, d] = ds.split("-").map(Number);
    const dow = new Date(y, m - 1, d).getDay();
    return `${y}年${m}月${d}日（${WEEK_LABELS[dow]}）`;
  };

  return (
    <div className="min-h-screen bg-[#f7f4ef] py-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs tracking-[0.3em] text-[#5a7a5a] uppercase mb-1">Admin</p>
            <h1
              className="text-xl font-light text-[#1a1a1a]"
              style={{ fontFamily: "var(--font-noto-serif)" }}
            >
              スケジュール管理
            </h1>
          </div>
          <div className="flex items-center gap-5 text-sm">
            <Link
              href="/admin/news/new"
              className="text-[#8b7355] hover:text-[#5a7a5a] transition-colors"
            >
              お知らせ管理
            </Link>
            <Link href="/" className="text-[#8b7355] hover:text-[#5a7a5a] transition-colors">
              サイトへ戻る
            </Link>
            <button
              onClick={handleLogout}
              className="text-[#8b7355] hover:text-[#5a7a5a] transition-colors"
            >
              ログアウト
            </button>
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-white/80 border border-[#e5ddd0] rounded-sm shadow-sm overflow-hidden">
          {/* Month nav */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#e5ddd0] bg-[#f7f4ef]/60">
            <button
              onClick={prevMonth}
              className="p-1.5 rounded-sm text-[#5a7a5a] hover:bg-[#5a7a5a]/10 transition-colors"
              aria-label="前の月"
            >
              <ChevronLeft size={20} strokeWidth={1.5} />
            </button>
            <h2
              className="text-base font-medium text-[#1a1a1a] tracking-wider"
              style={{ fontFamily: "var(--font-noto-serif)" }}
            >
              {year}年{month + 1}月
            </h2>
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
                className={`py-2 text-center text-xs font-medium ${
                  i === 0 ? "text-[#c0392b]" : i === 6 ? "text-[#2d6abf]" : "text-[#8b7355]"
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
                    key={`e-${idx}`}
                    className="min-h-[72px] sm:min-h-[88px] bg-[#faf8f5] border-b border-r border-[#ede8e0]"
                  />
                );
              }

              const dow = new Date(year, month, day).getDay();
              const dateStr = toDateStr(day);
              const dayEvents = eventsByDate[dateStr] ?? [];
              const isSelected = selectedDate === dateStr;
              const isToday =
                today.getFullYear() === year &&
                today.getMonth() === month &&
                today.getDate() === day;
              const isSun = dow === 0;
              const isSat = dow === 6;

              return (
                <div
                  key={day}
                  className={`min-h-[72px] sm:min-h-[88px] p-1 sm:p-1.5 border-b border-r border-[#ede8e0] flex flex-col gap-0.5 cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-[#e8f0e8] ring-2 ring-inset ring-[#5a7a5a]"
                      : dayEvents.length > 0
                      ? "bg-white hover:bg-[#f0f7f0]"
                      : "bg-[#faf8f5] hover:bg-[#f0f7f0]"
                  } ${(idx + 1) % 7 === 0 ? "border-r-0" : ""}`}
                  onClick={() => handleSelectDate(dateStr)}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-medium w-6 h-6 flex items-center justify-center rounded-full ${
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
                    {isSelected && <Plus size={11} className="text-[#5a7a5a] flex-shrink-0" />}
                  </div>

                  {dayEvents.map((ev) => (
                    <div
                      key={ev.id}
                      className="hidden sm:flex items-center gap-0.5 bg-[#2d4a35] rounded-sm px-1 py-0.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="text-[9px] text-white leading-tight truncate flex-1">
                        {ev.startTime}〜 {ev.title}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(ev.id);
                        }}
                        className="text-white/70 hover:text-white flex-shrink-0 ml-0.5"
                        aria-label="削除"
                      >
                        <X size={10} />
                      </button>
                    </div>
                  ))}
                  {dayEvents.length > 0 && (
                    <span className="sm:hidden mx-auto w-1.5 h-1.5 rounded-full bg-[#2d4a35] flex-shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Add form */}
        {selectedDate && (
          <div className="mt-4 bg-white/80 border border-[#5a7a5a]/30 rounded-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3
                className="text-sm font-medium text-[#1a1a1a]"
                style={{ fontFamily: "var(--font-noto-serif)" }}
              >
                {fmtSelectedDate(selectedDate)} の活動を追加
              </h3>
              <button
                onClick={() => setSelectedDate(null)}
                className="text-[#8b7355] hover:text-[#5a7a5a] transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAddEvent} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#8b7355] mb-1.5 tracking-wide">
                    開始時間 <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="time"
                    value={form.startTime}
                    onChange={(e) => setForm((f) => ({ ...f, startTime: e.target.value }))}
                    required
                    className="w-full px-3 py-2.5 border border-[#e5ddd0] rounded-sm bg-white text-sm focus:outline-none focus:ring-1 focus:ring-[#5a7a5a] focus:border-[#5a7a5a] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#8b7355] mb-1.5 tracking-wide">
                    内容 <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                    required
                    placeholder="通常対局・子ども囲碁教室など"
                    className="w-full px-3 py-2.5 border border-[#e5ddd0] rounded-sm bg-white text-sm focus:outline-none focus:ring-1 focus:ring-[#5a7a5a] focus:border-[#5a7a5a] transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-[#8b7355] mb-1.5 tracking-wide">
                  備考（省略可）
                </label>
                <input
                  type="text"
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="場所、持ち物など"
                  className="w-full px-3 py-2.5 border border-[#e5ddd0] rounded-sm bg-white text-sm focus:outline-none focus:ring-1 focus:ring-[#5a7a5a] focus:border-[#5a7a5a] transition-colors"
                />
              </div>

              {error && (
                <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-sm border border-red-100">
                  {error}
                </p>
              )}

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={posting}
                  className="flex-1 py-2.5 bg-[#5a7a5a] text-white text-sm rounded-sm hover:bg-[#4a6a4a] active:bg-[#3d5a3d] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {posting ? "登録中..." : "活動日を登録"}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedDate(null)}
                  className="px-5 py-2.5 border border-[#e5ddd0] text-sm text-[#555] rounded-sm hover:bg-[#f7f4ef] transition-colors"
                >
                  キャンセル
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Event list */}
        <div className="mt-4 bg-white/80 border border-[#e5ddd0] rounded-sm overflow-hidden">
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
            <p className="text-sm text-[#8b7355] px-5 py-4">
              活動日はありません。カレンダーの日付をクリックして追加してください。
            </p>
          ) : (
            <ul className="divide-y divide-[#ede8e0]">
              {events.map((ev) => {
                const d = new Date(ev.date + "T00:00:00");
                const dowLabel = WEEK_LABELS[d.getDay()];
                const [, m, day] = ev.date.split("-").map(Number);
                return (
                  <li key={ev.id} className="flex items-center gap-4 px-5 py-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium text-[#1a1a1a]">
                          {m}月{day}日（{dowLabel}）
                        </span>
                        <span className="text-sm text-[#5a7a5a]">{ev.startTime}〜</span>
                      </div>
                      <p className="text-xs text-[#333] mt-0.5">{ev.title}</p>
                      {ev.description && (
                        <p className="text-xs text-[#8b7355] mt-0.5">{ev.description}</p>
                      )}
                    </div>
                    <button
                      onClick={() => handleDelete(ev.id)}
                      className="text-[#c0392b]/40 hover:text-[#c0392b] transition-colors flex-shrink-0"
                      aria-label="削除"
                    >
                      <Trash2 size={16} />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <p className="mt-4 text-xs text-center text-[#8b7355]">
          カレンダーの日付をクリックして活動日を追加できます。
        </p>
      </div>
    </div>
  );
}
