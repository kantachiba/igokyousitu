import type { Metadata } from "next";
import { Noto_Serif_JP, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSerif = Noto_Serif_JP({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const notoSans = Noto_Sans_JP({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ながおか囲碁研究会 | 長岡で囲碁を、もっと身近に。",
  description:
    "新潟県長岡市で活動する囲碁サークル。日曜日を中心にカフェ囲碁会・級の認定会・交流試合などを開催。初心者から有段者まで大歓迎です。",
  keywords: ["囲碁", "長岡", "ながおか囲碁研究会", "新潟", "囲碁サークル", "初心者", "カフェ囲碁"],
  openGraph: {
    title: "ながおか囲碁研究会",
    description: "長岡で囲碁を、もっと身近に。",
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${notoSerif.variable} ${notoSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f7f4ef] text-[#1a1a1a]">
        {children}
      </body>
    </html>
  );
}
