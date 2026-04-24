import { SectionHeading } from "./News";
import { MapPin, ExternalLink } from "lucide-react";

const ADDRESS = "〒940-0065 新潟県長岡市東坂之上町３丁目１−９ エクスコート今井 4階";
const GOOGLE_MAPS_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3183.5!2d138.850!3d37.450!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5ff5209f0a5d92a1%3A0x1c3a4dd6a4278901!2z5paw5r6k5biC5p2-5Z2C5LmF55S677yT5LiB55uu77yR4oiS77yZ!5e0!3m2!1sja!2sjp!4v1700000000000!5m2!1sja!2sjp";

export default function AccessMap() {
  return (
    <section id="access" className="py-20 sm:py-28 washi-bg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <SectionHeading en="Access" ja="アクセス・マップ" />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Address info card */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white/80 border border-[#e5ddd0] rounded-md p-6">
              <div className="flex items-start gap-3 mb-4">
                <MapPin
                  size={20}
                  className="text-[#5a7a5a] mt-0.5 flex-shrink-0"
                  strokeWidth={1.5}
                />
                <div>
                  <h3
                    className="text-base font-medium text-[#1a1a1a] mb-1"
                    style={{ fontFamily: "var(--font-noto-serif)" }}
                  >
                    所在地
                  </h3>
                  <address className="not-italic text-sm text-[#444] leading-relaxed">
                    {ADDRESS}
                  </address>
                </div>
              </div>

              <div className="brush-divider my-4 w-full" />

              <dl className="space-y-2 text-sm text-[#555]">
                <div className="flex gap-2">
                  <dt className="font-medium text-[#1a1a1a] whitespace-nowrap">建物</dt>
                  <dd>エクスコート今井 4階</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-medium text-[#1a1a1a] whitespace-nowrap">郵便番号</dt>
                  <dd>〒940-0065</dd>
                </div>
              </dl>

              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(ADDRESS)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm text-[#5a7a5a] hover:text-[#2d4a35] transition-colors"
              >
                <ExternalLink size={14} />
                Google マップで開く
              </a>
            </div>

            {/* Accessibility note */}
            <div className="bg-[#f0f7f0] border border-[#5a7a5a]/20 rounded-md p-4">
              <p className="text-xs text-[#2d4a35] leading-relaxed">
                🚃 JR長岡駅より車で約10分。
                <br />
                お車でのお越しの際は近隣駐車場をご利用ください。
                <br />
                詳しいアクセスはInstagramまたはお問い合わせにてご確認ください。
              </p>
            </div>
          </div>

          {/* Google Maps embed */}
          <div className="lg:col-span-3">
            <div className="relative w-full rounded-md overflow-hidden border border-[#e5ddd0] shadow-sm">
              <iframe
                src={GOOGLE_MAPS_EMBED}
                width="100%"
                height="380"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ながおか囲碁研究会 地図"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
