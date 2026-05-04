import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getNewsById } from "@/lib/news-store";
import type { NewsCategory } from "@/data/news";

export const dynamic = "force-dynamic";

const categoryStyles: Record<NewsCategory, string> = {
  大会情報: "tag-tournament",
  活動日: "tag-activity",
  その他: "tag-other",
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getNewsById(Number(id));

  if (!item) {
    notFound();
  }

  const paragraphs = item.body.split("\n").filter((p) => p.trim() !== "");

  return (
    <div className="min-h-screen bg-[#f7f4ef]">
      {/* Minimal header */}
      <header className="border-b border-[#e5ddd0] bg-[#f7f4ef]/95 backdrop-blur-md">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 overflow-hidden rounded-sm border border-[#1a1a1a]/20 group-hover:border-[#5a7a5a] transition-colors">
              <Image
                src="/logo.jpg"
                alt="ながおか囲碁研究会"
                fill
                className="object-cover"
                sizes="32px"
              />
            </div>
            <span
              className="text-sm font-medium tracking-wider text-[#1a1a1a] group-hover:text-[#5a7a5a] transition-colors"
              style={{ fontFamily: "var(--font-noto-serif)" }}
            >
              ながおか囲碁研究会
            </span>
          </Link>
          <Link
            href="/#news"
            className="text-xs text-[#8b7355] hover:text-[#5a7a5a] transition-colors tracking-wide"
          >
            ← お知らせ一覧
          </Link>
        </div>
      </header>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* Meta */}
        <div className="flex items-center gap-3 mb-5">
          <time
            dateTime={item.date}
            className="text-sm text-[#8b7355] font-light tracking-wide"
          >
            {formatDate(item.date)}
          </time>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryStyles[item.category]}`}
          >
            {item.category}
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-2xl sm:text-3xl font-light text-[#1a1a1a] leading-relaxed mb-8"
          style={{ fontFamily: "var(--font-noto-serif)" }}
        >
          {item.title}
        </h1>

        <div className="brush-divider w-12 mb-8" />

        {/* Body */}
        <div className="space-y-5">
          {paragraphs.map((para, i) => (
            <p key={i} className="text-[#2c2c2c] leading-loose text-base">
              {para}
            </p>
          ))}
        </div>

        {/* Back link */}
        <div className="mt-14 pt-8 border-t border-[#e5ddd0]">
          <Link
            href="/#news"
            className="inline-flex items-center gap-2 text-sm text-[#8b7355] hover:text-[#5a7a5a] transition-colors"
          >
            ← お知らせ一覧へ戻る
          </Link>
        </div>
      </article>
    </div>
  );
}
