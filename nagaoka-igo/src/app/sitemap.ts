import { MetadataRoute } from 'next';


const SITE_URL = 'https://backend1--homepage-58f46.asia-east1.hosted.app/';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // 将来的にページが増えたら（例: お知らせ詳細など）ここに追加します
  ];
}
