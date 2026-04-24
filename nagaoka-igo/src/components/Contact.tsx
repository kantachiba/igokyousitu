"use client";
import { useState } from "react";
import { SectionHeading } from "./News";
import { Send, CheckCircle } from "lucide-react";
import { FaInstagram } from "react-icons/fa";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  }

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#f7f4ef]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <SectionHeading en="Contact" ja="SNS・お問い合わせ" />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* SNS section */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="bg-white/80 border border-[#e5ddd0] rounded-md p-6">
              <h3
                className="text-base font-medium text-[#1a1a1a] mb-4"
                style={{ fontFamily: "var(--font-noto-serif)" }}
              >
                公式 SNS
              </h3>
              <a
                href="https://www.instagram.com/nagaokaigokenkyukai"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 rounded-md border border-[#e5ddd0] bg-gradient-to-r from-[#833ab4]/5 via-[#fd1d1d]/5 to-[#fcb045]/5 hover:from-[#833ab4]/15 hover:via-[#fd1d1d]/15 hover:to-[#fcb045]/15 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#833ab4] via-[#fd1d1d] to-[#fcb045] flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  <FaInstagram size={22} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1a1a1a]">
                    @nagaokaigokenkyukai
                  </p>
                  <p className="text-xs text-[#8b7355] mt-0.5">
                    活動写真・イベント情報を発信中
                  </p>
                </div>
              </a>
            </div>

            {/* Info note */}
            <div className="bg-[#f0f7f0] border border-[#5a7a5a]/20 rounded-md p-5">
              <p className="text-sm text-[#2d4a35] leading-relaxed">
                <span className="font-medium">お気軽にご参加ください。</span>
                <br />
                初めての方でも大歓迎です。
                ご質問はフォームまたはInstagramのDMからお気軽にどうぞ。
              </p>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3">
            <div className="bg-white/80 border border-[#e5ddd0] rounded-md p-6 sm:p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
                  <CheckCircle size={48} className="text-[#5a7a5a]" strokeWidth={1.5} />
                  <h3
                    className="text-xl font-medium text-[#1a1a1a]"
                    style={{ fontFamily: "var(--font-noto-serif)" }}
                  >
                    送信完了しました
                  </h3>
                  <p className="text-sm text-[#666]">
                    お問い合わせありがとうございます。
                    <br />
                    3営業日以内にご返信いたします。
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-[#2c2c2c] mb-1.5"
                    >
                      お名前 <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="山田 太郎"
                      className="w-full px-4 py-2.5 text-sm border border-[#d5cbbf] rounded-sm bg-[#faf8f5] focus:outline-none focus:border-[#5a7a5a] focus:ring-1 focus:ring-[#5a7a5a]/30 transition-colors placeholder:text-[#ccc]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-[#2c2c2c] mb-1.5"
                    >
                      メールアドレス <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="example@email.com"
                      className="w-full px-4 py-2.5 text-sm border border-[#d5cbbf] rounded-sm bg-[#faf8f5] focus:outline-none focus:border-[#5a7a5a] focus:ring-1 focus:ring-[#5a7a5a]/30 transition-colors placeholder:text-[#ccc]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-[#2c2c2c] mb-1.5"
                    >
                      お問い合わせ内容 <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="ご質問・参加希望など、お気軽にどうぞ。"
                      className="w-full px-4 py-2.5 text-sm border border-[#d5cbbf] rounded-sm bg-[#faf8f5] focus:outline-none focus:border-[#5a7a5a] focus:ring-1 focus:ring-[#5a7a5a]/30 transition-colors resize-none placeholder:text-[#ccc]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#2d4a35] text-white text-sm font-medium rounded-sm hover:bg-[#1a1a1a] disabled:opacity-60 transition-colors duration-300"
                    style={{ fontFamily: "var(--font-noto-serif)" }}
                  >
                    {loading ? (
                      <span className="animate-spin inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                    ) : (
                      <Send size={15} />
                    )}
                    {loading ? "送信中..." : "送信する"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
