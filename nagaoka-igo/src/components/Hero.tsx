import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 min-h-[600px] flex flex-col items-center justify-center overflow-hidden goban-pattern"
    >
      {/* Decorative go stones background */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Large decorative stone - top right */}
        <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full bg-[#1a1a1a] opacity-5" />
        {/* Small stone - bottom left */}
        <div className="absolute bottom-32 -left-10 w-32 h-32 rounded-full border-4 border-[#8b7355] opacity-10" />
        {/* Medium white stone */}
        <div className="absolute top-1/3 -right-4 w-24 h-24 rounded-full bg-[#f0ebe0] border-2 border-[#8b7355] opacity-30" />
        {/* Tiny stones scattered */}
        <div className="absolute top-1/4 left-16 w-6 h-6 rounded-full bg-[#1a1a1a] opacity-10" />
        <div className="absolute bottom-1/4 right-24 w-4 h-4 rounded-full bg-[#f0ebe0] border border-[#8b7355] opacity-20" />
        <div className="absolute top-2/3 left-1/4 w-8 h-8 rounded-full border-2 border-[#5a7a5a] opacity-15" />

        {/* Subtle ink brush stroke decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8b7355]/30 to-transparent" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">
        {/* Logo */}
        <div className="mb-8">
          <div className="relative w-28 h-28 mx-auto mb-6 ink-border rounded-sm overflow-hidden shadow-lg">
            <Image
              src="/logo.jpg"
              alt="ながおか囲碁研究会ロゴ"
              fill
              className="object-cover"
              priority
              sizes="112px"
            />
          </div>
          <p className="text-xs tracking-[0.3em] text-[#8b7355] uppercase font-light">
            Nagaoka Igo Workshop
          </p>
        </div>

        {/* Main catchphrase */}
        <div>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-light text-[#1a1a1a] leading-relaxed mb-4"
            style={{ fontFamily: "var(--font-noto-serif)" }}
          >
            長岡で囲碁を、
            <br className="sm:hidden" />
            <span className="text-[#5a7a5a]">もっと身近に。</span>
          </h1>
          <div className="brush-divider my-6 w-32 mx-auto" />
          <p className="text-base sm:text-lg text-[#555] leading-relaxed max-w-xl mx-auto text-center font-light">
            未経験者から有段者まで、どなたでも歓迎。
            <br />
            こども向けの囲碁教室や大会を開催しています。
          </p>
        </div>

        {/* CTA Buttons */}
        <div
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="https://x.com/QWXRuoXHUvdP8BH"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#1a1a1a] text-[#f7f4ef] text-sm tracking-wider hover:bg-[#2d4a35] transition-colors duration-300 rounded-sm font-medium"
          >
            <FaXTwitter size={15} />
            X (Twitter)
          </Link>
          <Link
            href="https://www.instagram.com/nagaokaigokenkyukai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-[#1a1a1a] text-[#1a1a1a] text-sm tracking-wider hover:bg-[#1a1a1a] hover:text-[#f7f4ef] transition-all duration-300 rounded-sm"
          >
            <FaInstagram size={16} />
            Instagram
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#8b7355] animate-bounce">
        <span className="text-xs tracking-widest opacity-70">SCROLL</span>
        <ChevronDown size={16} strokeWidth={1.5} />
      </div>
    </section>
  );
}
