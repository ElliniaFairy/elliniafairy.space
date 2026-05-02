# ElliniaFairy Website

Welcome to the little home for `elliniafairy.space`.

This is a personal Astro website for essays, memories, galleries, language-switching pages, and small glowing details. It is built to feel quiet, soft, and a little magical, while still staying easy to run and maintain.

## What Lives Here

The site is made with Astro 5 and runs as a server-rendered app through the Astro Node standalone adapter.

It has a multilingual home page, a blog, photo galleries, RSS feeds, a sitemap, local fonts, Mapbox support for the about page, and deployment files for Fly.io.

## Before You Start

You will need Node.js and npm.

The production Docker build currently uses Node `24.1.0`, so using a recent Node version locally is the safest choice.

Dependencies are locked with `package-lock.json`, which means npm should install the same package versions each time.

## Running Locally

1. Install everything first.

```bash
npm install
```

2. Start the development server.

```bash
npm run dev
```

3. Open the local URL that Astro prints in the terminal.

Most of the time, it will be:

```text
http://localhost:4321
```

## Useful Commands

Use this while writing or changing the site:

```bash
npm run dev
```

Use this before deploying or checking that the project still builds:

```bash
npm run build
```

Use this to preview the built version locally:

```bash
npm run preview
```

Use this when you want to call Astro CLI commands directly:

```bash
npm run astro
```

## A Small Map Of The Project

`src/components/` contains reusable Astro pieces, including cards, headers, icons, language controls, and gallery/blog UI.

`src/content/` is where the heart of the site lives. Blog posts are Markdown files, gallery albums are JSON files, and about-page content lives here too.

`src/layouts/` contains the shared page layouts.

`src/pages/` contains the actual site routes, including the home page, blog pages, gallery pages, about pages, and RSS feeds.

`src/scripts/` contains small browser-side enhancements.

`src/styles/` contains global styles and special effects.

`public/fonts/` stores local font files.

`public/gallery/` stores gallery images.

`doc/design_guideline.md` keeps the visual mood notes for the site.

## Writing Blog Posts

Blog posts live inside `src/content/blog/`.

Each post should include the fields expected by `src/content.config.ts`: `title`, `publishDate`, `description`, `classification`, `readingTime`, `image`, and `language`.

You can also add `tags` when a post needs them.

If a post is not ready to appear on the blog page, add:

```yaml
draft: true
```

Draft posts are hidden from the blog listing.

## Making Gallery Albums

Gallery albums live inside `src/content/gallery/` as JSON files.

The album data points to images under `public/gallery/`.

For a friendly example of the album shape, see:

```text
public/gallery/README.md
```

When you add a new album JSON file and place the images in `public/gallery/`, Astro can pick it up through the gallery content collection.

## Language Notes

The site filters blog posts and gallery albums by language.

Content can use `en`, `zh`, or `ja` depending on which language version it belongs to.

If no language is provided for a blog post or gallery album, the content schema defaults it to `en`.

## Mapbox Token

The about page uses Mapbox.

The app reads the token from:

```text
PUBLIC_MAPBOX_TOKEN
```

The Dockerfile currently provides this token during both build time and runtime, so Astro and Vite can read it through `import.meta.env.PUBLIC_MAPBOX_TOKEN`.

For local development, you can provide the same variable from your shell or an Astro-supported environment file when needed.

## Deploying

This project is ready for Fly.io.

The Fly app is named:

```text
elliniafairywebsite
```

The primary region is Tokyo:

```text
nrt
```

The app listens internally on:

```text
4321
```

A normal deployment flow is:

```bash
npm run build
fly deploy
```

Inside the Docker image, the built server starts with:

```bash
node ./dist/server/entry.mjs
```

## Final Little Note

The site is meant to stay personal and gentle.

When adding new pages or content, try to keep the feeling close to the design guide: dark navy, soft glow, glassy surfaces, quiet motion, and writing that feels calm rather than loud.
