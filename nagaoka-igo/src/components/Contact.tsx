import SectionHeading from "./SectionHeading";
import { MessageCircle } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Contact() {
  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#f7f4ef]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <SectionHeading en="Contact" ja="お問い合わせ" />

        <p className="text-center text-sm text-[#555] mb-10 leading-relaxed">
          ご質問・見学希望は、各SNSのDMからお気軽にどうぞ。
          <br />
          初めての方も大歓迎です。
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Instagram DM */}
          <a
            href="https://www.instagram.com/nagaokaigokenkyukai"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 p-5 rounded-md border border-[#e5ddd0] bg-white/80 hover:border-[#c5bdb0] transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#833ab4] via-[#fd1d1d] to-[#fcb045] flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform">
              <FaInstagram size={24} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#1a1a1a]" style={{ fontFamily: "var(--font-noto-serif)" }}>
                Instagram
              </p>
              <p className="text-xs text-[#8b7355] mt-0.5">@nagaokaigokenkyukai</p>
              <p className="mt-2 inline-flex items-center gap-1 text-xs text-[#5a7a5a] font-medium">
                <MessageCircle size={12} />
                DMで問い合わせる
              </p>
            </div>
          </a>

          {/* Twitter / X DM */}
          <a
            href="https://x.com/QWXRuoXHUvdP8BH"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 p-5 rounded-md border border-[#e5ddd0] bg-white/80 hover:border-[#c5bdb0] transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-full bg-[#1a1a1a] flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform">
              <FaXTwitter size={22} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#1a1a1a]" style={{ fontFamily: "var(--font-noto-serif)" }}>
                X (Twitter)
              </p>
              <p className="text-xs text-[#8b7355] mt-0.5">@QWXRuoXHUvdP8BH</p>
              <p className="mt-2 inline-flex items-center gap-1 text-xs text-[#5a7a5a] font-medium">
                <MessageCircle size={12} />
                DMで問い合わせる
              </p>
            </div>
          </a>
        </div>

        {/* Info note */}
        <div className="mt-8 bg-[#f0f7f0] border border-[#5a7a5a]/20 rounded-md p-5 text-center">
          <p className="text-sm text-[#2d4a35] leading-relaxed">
            <span className="font-medium">お気軽にご参加ください。</span>
            <br />
            初めての方でも大歓迎です。見学も随時受け付けております。
          </p>
        </div>
      </div>
    </section>
  );
}
