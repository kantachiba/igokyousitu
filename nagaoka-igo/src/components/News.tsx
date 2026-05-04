import Link from "next/link";
import { getAllNews } from "@/lib/news-store";
import type { NewsCategory } from "@/data/news";
import { Newspaper } from "lucide-react";
import SectionHeading from "./SectionHeading";

const categoryStyles: Record<NewsCategory, string> = {
  大会情報: "tag-tournament",
  活動日: "tag-activity",
  その他: "tag-other",
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

export default async function News() {
  const newsItems = await getAllNews();

  return (
    <section id="news" className="py-20 sm:py-28 bg-white/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <SectionHeading en="News" ja="お知らせ" />

        <div className="space-y-0 divide-y divide-[#e5ddd0]">
          {newsItems.map((item, i) => (
            <Link
              key={item.id}
              href={`/news/${item.id}`}
              className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 py-5 hover:bg-[#f7f4ef]/60 px-4 -mx-4 rounded-sm transition-colors duration-200 group animate-fade-in-up"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              {/* Date */}
              <time
                dateTime={item.date}
                className="text-sm text-[#8b7355] font-light whitespace-nowrap tracking-wide"
              >
                {formatDate(item.date)}
              </time>

              {/* Category tag */}
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${categoryStyles[item.category]}`}
              >
                {item.category}
              </span>

              {/* Title */}
              <p className="text-sm sm:text-base text-[#2c2c2c] group-hover:text-[#5a7a5a] transition-colors leading-relaxed">
                {item.title}
              </p>
            </Link>
          ))}
        </div>

        {newsItems.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-16 text-[#8b7355]">
            <Newspaper size={36} strokeWidth={1} />
            <p className="text-sm">お知らせはまだありません</p>
          </div>
        )}
      </div>
    </section>
  );
}

export { default as SectionHeading } from "./SectionHeading";
