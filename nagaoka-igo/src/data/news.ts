export type NewsCategory = "大会情報" | "活動日" | "その他";

export interface NewsItem {
  id: number;
  date: string;
  category: NewsCategory;
  title: string;
}

export const newsData: NewsItem[] = [
  {
    id: 1,
    date: "2025-04-20",
    category: "大会情報",
    title: "第12回 ながおか囲碁交流試合のお知らせ（5月開催予定）",
  },
  {
    id: 2,
    date: "2025-04-13",
    category: "活動日",
    title: "4月・5月のカフェ囲碁会 日程を更新しました",
  },
  {
    id: 3,
    date: "2025-03-30",
    category: "大会情報",
    title: "春季 級の認定会を実施しました。結果はInstagramをご覧ください",
  },
  {
    id: 4,
    date: "2025-03-16",
    category: "活動日",
    title: "3月第3日曜日のカフェ囲碁会 参加者募集中",
  },
  {
    id: 5,
    date: "2025-02-23",
    category: "その他",
    title: "囲碁初心者向け「入門講座」開催のご案内",
  },
  {
    id: 6,
    date: "2025-02-09",
    category: "活動日",
    title: "2月のカフェ囲碁会 無事終了しました。ご参加ありがとうございました",
  },
];
