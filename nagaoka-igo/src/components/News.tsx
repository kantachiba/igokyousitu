import { newsData, type NewsCategory } from "@/data/news";
import { Newspaper } from "lucide-react";

function SectionHeading({
  en,
  ja,
}: {
  en: string;
  ja: string;
}) {
  return (
    <div className="text-center mb-12">
      <p className="text-xs tracking-[0.35em] text-[#5a7a5a] uppercase mb-2">
        {en}
      </p>
      <h2
        className="text-3xl sm:text-4xl font-light text-[#1a1a1a]"
        style={{ fontFamily: "var(--font-noto-serif)" }}
      >
        {ja}
      </h2>
      <div className="brush-divider mt-4 w-16 mx-auto" />
    </div>
  );
}

const categoryStyles: Record<NewsCategory, string> = {
  大会情報: "tag-tournament",
  活動日: "tag-activity",
  その他: "tag-other",
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

export default function News() {
  return (
    <section id="news" className="py-20 sm:py-28 bg-white/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <SectionHeading en="News" ja="お知らせ" />

        <div className="space-y-0 divide-y divide-[#e5ddd0]">
          {newsData.map((item, i) => (
            <article
              key={item.id}
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
            </article>
          ))}
        </div>

        {/* Empty state fallback */}
        {newsData.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-16 text-[#8b7355]">
            <Newspaper size={36} strokeWidth={1} />
            <p className="text-sm">お知らせはまだありません</p>
          </div>
        )}
      </div>
    </section>
  );
}

export { SectionHeading };
