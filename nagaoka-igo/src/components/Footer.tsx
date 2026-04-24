import Image from "next/image";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-[#f0ebe0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div className="sm:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-9 h-9 overflow-hidden rounded-sm border border-[#f0ebe0]/20">
                <Image
                  src="/logo.jpg"
                  alt="ながおか囲碁研究会ロゴ"
                  fill
                  className="object-cover"
                  sizes="36px"
                />
              </div>
              <span
                className="text-sm font-light tracking-wider text-[#f0ebe0]"
                style={{ fontFamily: "var(--font-noto-serif)" }}
              >
                ながおか囲碁研究会
              </span>
            </div>
            <p className="text-xs text-[#8b7355] leading-relaxed">
              勝負とアソビの部屋
              <br />
              Nagaoka Igo Workshop
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="text-xs tracking-widest text-[#8b7355] uppercase mb-4"
            >
              Navigation
            </h4>
            <nav className="flex flex-col gap-2.5">
              {[
                { href: "#about", label: "研究会について" },
                { href: "#news", label: "お知らせ" },
                { href: "#schedule", label: "活動スケジュール" },
                { href: "#access", label: "アクセス" },
                { href: "#contact", label: "お問い合わせ" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[#c4b8a8] hover:text-[#f0ebe0] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact & SNS */}
          <div>
            <h4 className="text-xs tracking-widest text-[#8b7355] uppercase mb-4">
              Social
            </h4>
            <a
              href="https://www.instagram.com/nagaokaigokenkyukai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-sm text-[#c4b8a8] hover:text-[#f0ebe0] transition-colors"
            >
              <FaInstagram size={16} />
              @nagaokaigokenkyukai
            </a>
            <div className="mt-4 text-xs text-[#665544] leading-relaxed">
              〒940-0065
              <br />
              新潟県長岡市東坂之上町
              <br />
              ３丁目１−９ エクスコート今井 4階
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#f0ebe0]/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#665544]">
            © {new Date().getFullYear()} ながおか囲碁研究会. All rights reserved.
          </p>
          <div className="flex items-center gap-3 opacity-40">
            <div className="w-3 h-3 rounded-full bg-[#f0ebe0]" />
            <div className="w-3 h-3 rounded-full border border-[#f0ebe0]" />
            <div className="w-3 h-3 rounded-full bg-[#f0ebe0]" />
          </div>
        </div>
      </div>
    </footer>
  );
}
