import { MetadataRoute } from 'next';


const SITE_URL = 'https://nagaokaigo.com';

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
