import { SectionHeading } from "./News";
import { Users, Award, Sword, Coffee } from "lucide-react";

const features = [
  {
    icon: Coffee,
    title: "カフェ囲碁会",
    desc: "毎月日曜日にカフェで気軽に囲碁を楽しめる会を開催。初心者でも安心してご参加いただけます。",
  },
  {
    icon: Award,
    title: "級の認定会",
    desc: "定期的に実力を測る認定会を実施。自分の棋力を公式に証明できる機会を提供しています。",
  },
  {
    icon: Sword,
    title: "交流試合",
    desc: "他のサークルや地域のプレイヤーとの交流試合を定期開催。切磋琢磨できる環境があります。",
  },
  {
    icon: Users,
    title: "アットホームな雰囲気",
    desc: "初心者から有段者まで、年齢・経験問わず歓迎。囲碁を通じた新しいつながりが生まれる場所。",
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-28 washi-bg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <SectionHeading en="About" ja="研究会について" />

        {/* Lead text */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p
            className="text-lg sm:text-xl text-[#1a1a1a] leading-loose font-light"
            style={{ fontFamily: "var(--font-noto-serif)" }}
          >
            「勝負とアソビの部屋」として、
            <br />
            囲碁の楽しさを長岡から広げています。
          </p>
          <p className="mt-4 text-sm sm:text-base text-[#555] leading-relaxed">
            ながおか囲碁研究会は、新潟県長岡市を拠点に活動する囲碁愛好家のサークルです。
            敷居を低くして、誰でも気軽に囲碁と出会えるよう、
            様々なイベントを企画・運営しています。
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="bg-white/70 border border-[#e5ddd0] rounded-md p-6 hover-lift animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-11 h-11 rounded-full bg-[#f0ebe0] border border-[#5a7a5a]/30 flex items-center justify-center">
                  <f.icon size={20} className="text-[#5a7a5a]" strokeWidth={1.5} />
                </div>
                <div>
                  <h3
                    className="text-base font-medium text-[#1a1a1a] mb-2"
                    style={{ fontFamily: "var(--font-noto-serif)" }}
                  >
                    {f.title}
                  </h3>
                  <p className="text-sm text-[#666] leading-relaxed">{f.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative go stone divider */}
        <div className="mt-16 flex items-center gap-4 justify-center opacity-30">
          <div className="w-4 h-4 rounded-full bg-[#1a1a1a]" />
          <div className="flex-1 max-w-32 h-px bg-[#8b7355]" />
          <div className="w-4 h-4 rounded-full border-2 border-[#8b7355] bg-transparent" />
          <div className="flex-1 max-w-32 h-px bg-[#8b7355]" />
          <div className="w-4 h-4 rounded-full bg-[#1a1a1a]" />
        </div>
      </div>
    </section>
  );
}
