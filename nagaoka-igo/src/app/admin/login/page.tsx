"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin/news/new");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error ?? "ログインに失敗しました");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f4ef]">
      <div className="w-full max-w-sm mx-4">
        {/* Card */}
        <div className="bg-white/80 border border-[#e5ddd0] rounded-sm px-8 py-10 shadow-sm">
          {/* Heading */}
          <div className="text-center mb-8">
            <p className="text-xs tracking-[0.3em] text-[#5a7a5a] uppercase mb-2">
              Admin
            </p>
            <h1
              className="text-xl font-light text-[#1a1a1a]"
              style={{ fontFamily: "var(--font-noto-serif)" }}
            >
              管理者ログイン
            </h1>
            <div className="brush-divider mt-3 w-10 mx-auto" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="password"
                className="block text-xs text-[#8b7355] mb-1.5 tracking-wide"
              >
                パスワード
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full px-3 py-2.5 border border-[#e5ddd0] rounded-sm bg-white text-sm focus:outline-none focus:ring-1 focus:ring-[#5a7a5a] focus:border-[#5a7a5a] transition-colors"
                placeholder="パスワードを入力"
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
              className="w-full py-2.5 bg-[#5a7a5a] text-white text-sm rounded-sm hover:bg-[#4a6a4a] active:bg-[#3d5a3d] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "ログイン中..." : "ログイン"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
