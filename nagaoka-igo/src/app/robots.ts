import { MetadataRoute } from 'next';


const SITE_URL = 'https://backend1--homepage-58f46.asia-east1.hosted.app/';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
