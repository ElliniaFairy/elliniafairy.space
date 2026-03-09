// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://elliniafairy.space',
	output: 'server',
	integrations: [mdx(), sitemap()],
	adapter: node({
		mode: 'standalone',
	}),
});
