import type { Metadata } from "next";
import { Noto_Serif_JP, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const SITE_URL = "https://nagaokaigo.com";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsClub",
  name: "ながおか囲碁研究会",
  description: "新潟県長岡市で活動する囲碁サークル。日曜日を中心にカフェ囲碁会・級の認定会・交流試合などを開催。初心者から有段者まで大歓迎です。",
  url: SITE_URL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "長岡市",
    addressRegion: "新潟県",
    addressCountry: "JP",
  },
  sameAs: [
    "https://www.instagram.com/nagaoka_igo/",
    "https://twitter.com/QWXRuoXHUvdP8BH",
  ],
};

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
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
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
  verification: {
    // TODO: Google Search Consoleで発行された「HTMLタグ」内の content="..." の文字列をここに貼り付けてください
    google: "9ZhP6G27nS5pDggYWClbdteYG9v3s-1hgx3vR3Dxfiw",
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#f7f4ef] text-[#1a1a1a]">
        {children}
      </body>
    </html>
  );
}
