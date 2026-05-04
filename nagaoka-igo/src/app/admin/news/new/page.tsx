"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import type { NewsCategory } from "@/data/news";

const categories: NewsCategory[] = ["大会情報", "活動日", "その他"];

const categoryStyles: Record<NewsCategory, string> = {
  大会情報: "bg-[#f0e8d0] text-[#8b6914]",
  活動日: "bg-[#e8f0e8] text-[#2d4a35]",
  その他: "bg-[#f0ebe0] text-[#8b7355]",
};

interface NewsItem {
  id: number;
  title: string;
  category: NewsCategory;
  date: string;
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function formatDate(d: string) {
  const [y, m, day] = d.split("-").map(Number);
  return `${y}年${m}月${day}日`;
}

export default function NewNewsPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState<NewsCategory>("その他");
  const [date, setDate] = useState(todayISO());
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [posted, setPosted] = useState(false);

  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [listLoading, setListLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setListLoading(true);
    fetch("/api/news")
      .then((r) => r.json())
      .then((data) => setNewsList(Array.isArray(data) ? data : []))
      .catch(() => setNewsList([]))
      .finally(() => setListLoading(false));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/news", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content: body, category, date }),
    });

    if (res.ok) {
      const newItem = await res.json();
      setNewsList((prev) => [newItem, ...prev]);
      setPosted(true);
      setTitle("");
      setBody("");
      setCategory("その他");
      setDate(todayISO());
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error ?? "投稿に失敗しました");
    }
    setLoading(false);
  }

  async function handleDelete(id: number) {
    if (!confirm("このお知らせを削除しますか？")) return;
    const res = await fetch(`/api/news/${id}`, { method: "DELETE" });
    if (res.ok) {
      setNewsList((prev) => prev.filter((n) => n.id !== id));
    }
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#f7f4ef] py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header bar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs tracking-[0.3em] text-[#5a7a5a] uppercase mb-1">
              Admin
            </p>
            <h1
              className="text-xl font-light text-[#1a1a1a]"
              style={{ fontFamily: "var(--font-noto-serif)" }}
            >
              お知らせ管理
            </h1>
          </div>
          <div className="flex items-center gap-5 text-sm">
            <Link
              href="/admin/schedule"
              className="text-[#8b7355] hover:text-[#5a7a5a] transition-colors"
            >
              スケジュール管理
            </Link>
            <Link
              href="/"
              className="text-[#8b7355] hover:text-[#5a7a5a] transition-colors"
            >
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

        {/* Success banner */}
        {posted && (
          <div className="mb-6 px-4 py-3 bg-green-50 border border-green-200 rounded-sm text-sm text-green-700">
            投稿しました。
            <Link href="/#news" className="ml-2 underline hover:text-green-900">
              サイトで確認する →
            </Link>
          </div>
        )}

        {/* Post form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 border border-[#e5ddd0] rounded-sm p-8 space-y-6"
        >
          <p
            className="text-sm font-medium text-[#1a1a1a] border-b border-[#e5ddd0] pb-4"
            style={{ fontFamily: "var(--font-noto-serif)" }}
          >
            新規投稿
          </p>

          <div>
            <label className="block text-xs text-[#8b7355] mb-1.5 tracking-wide">
              タイトル <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2.5 border border-[#e5ddd0] rounded-sm bg-white text-sm focus:outline-none focus:ring-1 focus:ring-[#5a7a5a] focus:border-[#5a7a5a] transition-colors"
              placeholder="お知らせのタイトルを入力"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#8b7355] mb-1.5 tracking-wide">
                カテゴリ <span className="text-red-400">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as NewsCategory)}
                className="w-full px-3 py-2.5 border border-[#e5ddd0] rounded-sm bg-white text-sm focus:outline-none focus:ring-1 focus:ring-[#5a7a5a] focus:border-[#5a7a5a] transition-colors"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-[#8b7355] mb-1.5 tracking-wide">
                公開日 <span className="text-red-400">*</span>
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full px-3 py-2.5 border border-[#e5ddd0] rounded-sm bg-white text-sm focus:outline-none focus:ring-1 focus:ring-[#5a7a5a] focus:border-[#5a7a5a] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-[#8b7355] mb-1.5 tracking-wide">
              本文 <span className="text-red-400">*</span>
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              rows={10}
              className="w-full px-3 py-2.5 border border-[#e5ddd0] rounded-sm bg-white text-sm focus:outline-none focus:ring-1 focus:ring-[#5a7a5a] focus:border-[#5a7a5a] transition-colors resize-y leading-relaxed"
              placeholder="本文を入力してください。空白行で段落を分けられます。"
            />
          </div>

          {error && (
            <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-sm border border-red-100">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#5a7a5a] text-white text-sm rounded-sm hover:bg-[#4a6a4a] active:bg-[#3d5a3d] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "投稿中..." : "投稿する"}
          </button>
        </form>

        {/* News list */}
        <div className="mt-8 bg-white/80 border border-[#e5ddd0] rounded-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-[#e5ddd0] bg-[#f7f4ef]/60">
            <p
              className="text-sm font-medium text-[#1a1a1a]"
              style={{ fontFamily: "var(--font-noto-serif)" }}
            >
              投稿済みのお知らせ
            </p>
          </div>
          {listLoading ? (
            <p className="text-sm text-[#8b7355] px-5 py-4">読み込み中...</p>
          ) : newsList.length === 0 ? (
            <p className="text-sm text-[#8b7355] px-5 py-4">投稿はありません</p>
          ) : (
            <ul className="divide-y divide-[#ede8e0]">
              {newsList.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-[#f7f4ef]/60 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium flex-shrink-0 ${categoryStyles[item.category]}`}
                      >
                        {item.category}
                      </span>
                      <span className="text-xs text-[#8b7355] flex-shrink-0">
                        {formatDate(item.date)}
                      </span>
                    </div>
                    <p className="text-sm text-[#1a1a1a] mt-0.5 truncate">{item.title}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-[#c0392b]/40 hover:text-[#c0392b] transition-colors flex-shrink-0"
                    aria-label="削除"
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
