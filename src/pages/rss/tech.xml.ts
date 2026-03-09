import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
export const prerender = true;

export async function GET(context: { site: string }) {
  const posts = (await getCollection('blog'))
  .filter(post => post.data.classification === 'Technology')
  .filter(post => !post.data.draft)
  .sort(
    (a, b) => new Date(b.data.publishDate).valueOf() - new Date(a.data.publishDate).valueOf(),
  );

  return rss({
    title: 'Ellinia Fairy\'s Tech Blog',
    description: "Latest technology shares from Ellinia Fairy",
    site: context.site,
    items: posts.map(post => ({
      title: post.data.title,
      pubDate: new Date(post.data.publishDate),
      link: `/blogs/${post.slug}`,
      description: post.data.description,
    })),
    customData: `<language>en-US</language>`,
  });
}