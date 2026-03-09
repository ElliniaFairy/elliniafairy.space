import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
export const prerender = true;

export async function GET(context: { site: string }) {
  const posts = (await getCollection('blog'))
  .filter(post => post.data.language === 'zh')
  .filter(post => !post.data.draft)
  .sort(
    (a, b) => new Date(b.data.publishDate).valueOf() - new Date(a.data.publishDate).valueOf(),
  );

  return rss({
    title: '魔法密林港的个人博客',
    description: "来自魔法密林港的最新技术分享和生活随笔",
    site: context.site,
    items: posts.map(post => ({
      title: post.data.title,
      pubDate: new Date(post.data.publishDate),
      link: `/blogs/${post.slug}`,
      description: post.data.description,
    })),
    customData: `<language>zh-CN</language>`,
  });
}