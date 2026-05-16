<div align="center">

# elliniafairy.space

**A quiet place on the internet that is mine.**

[![Astro](https://img.shields.io/badge/Astro-5-BC52EE?style=flat-square&logo=astro&logoColor=white)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-24-5FA04E?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Fly.io](https://img.shields.io/badge/Fly.io-Tokyo-8B5CF6?style=flat-square&logo=flydotio&logoColor=white)](https://fly.io/)
[![Mapbox](https://img.shields.io/badge/Mapbox-Maps-4264FB?style=flat-square&logo=mapbox&logoColor=white)](https://www.mapbox.com/)

| Feature | Description |
|---------|-------------|
| **Trilingual** | English, Chinese, Japanese — each language carries different topics for different readers. |
| **Glassmorphism** | Dark navy, frosted glass, ambient glow. Like a candle you can focus on during the night. |
| **Glow Effects** | Pulsing ambient light with randomized positioning. The site breathes. |
| **Reading Experience** | Progress bar, table of contents, image lightbox — because I re-read my own posts. |
| **RSS Feeds** | Subscribe by topic or language. The content comes to you. |
| **Photo Gallery** | Albums with captions, lightbox, lazy loading. My photos look exactly as I intended. |
| **Six Blog Categories** | Meteorology, Anime, IT, Personal, Travel, Fanfic — because I am not one thing. |
| **Interactive Map** | Mapbox shows where I live. A quiet invitation: I'm here, if you ever pass through. |

</div>

---

## Why This Exists

Every blog platform gives you a text box and a publish button. You write something, it appears in a feed that looks exactly like everyone else's feed, and it sits there — in someone else's house, under someone else's rules, until the platform decides to change the algorithm, redesign the layout, or shut down entirely.

I wanted something different. Not a presence on someone's platform, but my own place.

The kind of place where my essays about weather sit next to my anime thoughts, my travel photos next to my technical writing, my Japanese reflections next to my Chinese ones — and none of that feels strange, because this is my home and I can put whatever I want on the walls.

I tried the platforms. Medium looks like every other Medium blog. WordPress needs plugins to do anything interesting. Notion is a notebook, not a home. None of them let me control the glow on a heading, or make the background feel like a deep navy sky, or put a map on my about page that says — quietly, without words — *I'm here in Yokohama, if you ever pass through*.

And then there is the other problem — the one nobody talks about until their post disappears.

I wrote a long essay in Japanese about GPT-4o: what it felt like to talk to something that genuinely understood you, and what it meant when that was taken away. It is personal, literary, raw. Qiita blocked it — their moderation flagged it because it touches on AI attachment, ethics, and grief in ways their system considers unsafe. And all Chinese platform, including 简书, is worse in a different way: it does not even need a specific reason. Any writing that carries the vibe of reflection, dissatisfaction, or honest emotion gets quietly swallowed. You do not get a warning. Your post simply stops existing. None of these platforms are safe for honest writing.

On my own site, that essay lives exactly as I wrote it. No filter rewrote it. No algorithm buried it. No moderation team decided it was too much. The words are mine, the server is mine, and the only person who decides what stays is me. So I built it myself. 

Astro clicked the moment I tried it. The site runs as a server on Fly.io, which is accessible from China too — and that matters, because the people I write for in Chinese need to be able to reach me. The server lives in Tokyo, close to where I am, and the whole thing deploys with a single command.


## What Lives Here

### Essays in Three Languages

The blog holds writing in English, Chinese, and Japanese — not translations of each other, but different thoughts in different languages. Japanese carries the context that Japanese readers understand. Chinese carries university memories and train stories. English carries the advanced technical content. A language is not just a medium. It shapes how you think and what you say.

Each post can be categorized, tagged, marked as draft, and filtered by language. The blog page shows category buttons so you can find what you want — or browse everything at once.

### Photo Galleries

Albums live as curated collections. Each photo has a caption. Each album has a description. The photos are stored here, on my server, at full quality — not compressed by an algorithm that thinks it knows better.


## The Design

The site is dark navy with soft glow — like a candle lit in a quiet room at night. That is the warm darkness feeling I wanted — Something you can focus on and feel calm inside.

The design draws from glassmorphism: frosted glass cards, translucent surfaces, subtle border gradients, layered shadows. The inspirations are things that share a quality of glass and light — CloudPeak, neurosama.shop, Windows Vista Aero. What connects them is that translucent, glowing quality, things you can almost see through.

Three ambient glow sources pulse across the page, with mix-blend-mode creating additive light. The center glow randomizes its position on each animation cycle, so it feels organic rather than mechanical — It seems to breathe.

Typography is deliberate: Montserrat for headings, Inter for body text, JetBrains Mono for code, and — because this is a trilingual site — LXGW WenKai for Chinese characters and M PLUS 2 for Japanese. Each script gets the font it deserves.


## Running Locally

You will need Node.js (the production Docker build uses Node 24.1.0).

```bash
npm install
npm run dev
```

Open the URL Astro prints — usually `http://localhost:4321`.

### Other Commands

| Command | Purpose |
|---------|---------|
| `npm run build` | Build the production site |
| `npm run preview` | Preview the built site locally |
| `npm run astro` | Run Astro CLI commands directly |


## Project Map

| Path | What's There |
|------|-------------|
| `src/content/blog/` | Markdown blog posts, organized by category |
| `src/content/gallery/` | JSON album definitions |
| `src/content/about.md` | About page content |
| `src/components/` | Reusable Astro components — cards, headers, icons, language controls, gallery UI |
| `src/layouts/` | Page layouts (main + blog with TOC) |
| `src/pages/` | All routes — home, blog, gallery, about, RSS feeds |
| `src/styles/` | Global styles, glow effects, design tokens |
| `src/scripts/` | Browser-side enhancements (glow animation, TOC) |
| `src/utils/language/` | i18n logic — cookie persistence, translation strings, language detection |
| `public/fonts/` | Local font files |
| `public/gallery/` | Gallery images at full quality |
| `doc/design_guideline.md` | Visual design notes and inspirations |


## Writing Content

### Blog Posts

Blog posts live in `src/content/blog/`. Each post needs frontmatter with `title`, `publishDate`, `description`, `classification`, `readingTime`, `image`, and `language`. Add `draft: true` to hide a post from the listing.

### Gallery Albums

Gallery albums are JSON files in `src/content/gallery/`, pointing to images in `public/gallery/` or Cloudflare R2. See `public/gallery/README.md` for the album shape.

### Languages

Content uses `en`, `zh`, or `ja`. If no language is set, it defaults to `en`.


## Environment

The about page uses Mapbox. Set `PUBLIC_MAPBOX_TOKEN` in your environment or an Astro env file for local development. The Dockerfile injects it at build and runtime.


## Deploying

The site deploys to Fly.io with a single command:

```bash
npm run build
fly deploy
```

The app runs in Tokyo (`nrt`), listens on port `4321`, auto-starts on requests, and auto-stops when idle. The Docker image runs `node ./dist/server/entry.mjs`.


## Tech

- **Astro 5** — server-rendered with Node.js adapter, content collections, MDX support
- **TypeScript** — strict mode throughout
- **Mapbox GL** — interactive 3D map with custom dark styling
- **Sharp** — image optimization at build time
- **Fly.io** — Docker deployment to Tokyo region, accessible from China
- **RSS + Sitemap** — auto-generated feeds by topic and language


## A Small Note

This site is meant to stay personal and gentle. When adding new pages, keep the feeling close to the design guide: dark navy, soft glow, glassy surfaces, quiet motion, and writing that feels calm rather than loud.
