"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#about", label: "研究会について" },
  { href: "#news", label: "お知らせ" },
  { href: "#schedule", label: "活動スケジュール" },
  { href: "#access", label: "アクセス" },
  { href: "#contact", label: "お問い合わせ" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#f7f4ef]/95 backdrop-blur-md shadow-sm border-b border-[#8b7355]/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="#hero" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 overflow-hidden rounded-sm border border-[#1a1a1a]/20 group-hover:border-[#5a7a5a] transition-colors">
            <Image
              src="/logo.jpg"
              alt="ながおか囲碁研究会ロゴ"
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
          <span
            className="text-sm font-medium tracking-wider text-[#1a1a1a] group-hover:text-[#5a7a5a] transition-colors"
            style={{ fontFamily: "var(--font-noto-serif)" }}
          >
            ながおか囲碁研究会
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[#2c2c2c] hover:text-[#5a7a5a] transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#5a7a5a] group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-[#1a1a1a] hover:text-[#5a7a5a] transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="メニュー"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#f7f4ef]/98 backdrop-blur-md border-b border-[#8b7355]/20">
          <nav className="flex flex-col px-6 py-4 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base text-[#2c2c2c] hover:text-[#5a7a5a] transition-colors py-1 border-b border-[#8b7355]/10"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
