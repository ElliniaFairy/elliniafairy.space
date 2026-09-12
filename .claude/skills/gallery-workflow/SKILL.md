---
name: gallery-workflow
description: Create a new photo gallery album (one JSON per requested language), rename images by capture time, upload to R2, and write descriptions with the user step by step
---

Create a new gallery album end-to-end: per-language JSON data files, image renaming by capture time, R2 upload, and collaborative description writing. This complements the `rename-images` skill (which is for blog articles only).

## Overview

A gallery album consists of:
- One JSON file per requested language: `src/content/gallery/{slug}-{lang}.json` (e.g. `-zh`, `-ja`, `-en`). The user specifies which languages to create — do NOT assume; ask if unclear. Existing albums use zh/ja, but any language code is valid.
- Images uploaded to R2 bucket `elliniafairy-blog`, served at `https://img.elliniafairy.space/{filename}`
- Schema (in `src/content.config.ts`): `title`, `description`, `coverImage`, `publishDate` (coerced to date), `language` (must match the file's lang suffix), `images[]` with `src`/`alt`/`description`

## Workflow

### 1. Create skeleton JSON files first

Create one file per requested language with empty `images: []` and empty `coverImage: ""`. Fill in title/description with the user (each in its own language). Do NOT rush to fill image URLs — the user usually wants to go step by step.

### 2. Rename images by capture time

Source folders are usually under Windows paths `C:\临时存储\新图\{日期}\{子文件夹}\` → WSL `/mnt/c/临时存储/新图/{日期}/{子文件夹}/`.

- Pixel photos (`PXL_YYYYMMDD_HHMMSS...`): the filename itself contains the capture time (UTC). Sort by filename — no EXIF parsing needed. Japan local time = UTC + 9h.
- Camera files (`0C2A0082.jpg` etc.) or stripped files: need EXIF DateTimeOriginal. Tools often unavailable (`exiftool`, ImageMagick, PIL all missing); ask the user before installing anything (they may decline pip installs).
- Copy (never move) into a `renamed/` subfolder, named `{YYYYMMDD}{slug}(N).{ext}` in chronological order. Keep the original extension.
- Write a `mapping.tsv` (number → original name → new name) in the source folder — the user relies on it later for descriptions.

```bash
bash -lc 'set -euo pipefail
src="/mnt/c/临时存储/新图/20260912/東北大学"
dst="$src/renamed"; mkdir -p "$dst"
map="$src/mapping.tsv"; : > "$map"
i=0
while IFS= read -r f; do
  i=$((i+1)); ext="${f##*.}"
  new="20260912tohoku($i).${ext}"
  cp "$src/$f" "$dst/$new"
  printf "%s\t%s\t%s\n" "$i" "$f" "$new" >> "$map"
done < <(ls -1 "$src" | grep -v "^renamed$" | grep -v "^mapping.tsv$" | sort)'
```

### 3. Write descriptions one image at a time

This is the core collaborative step. For each image, in order:

1. **View the image** with the image-viewing tool and describe what you see.
2. The user tells you the story/context (often just a short phrase).
3. Write the description in the user's primary language (usually Chinese), then translate into every other requested language. Append the entry to ALL language JSON files in the same edit round.
4. **The user frequently edits the primary-language text themselves** — always re-read that file before the next edit, and sync their edits to the other language files when asked.

Description style (learned from user feedback):
- Include the date and a short scene + feeling. Keep it simple and natural.
- Japanese must sound natural, not translated: avoid Chinese-style literary words (「青翠の」「西望」), avoid stiff constructions. Prefer plain sentences like 「〜が見渡せた」「〜と思えなかった」. When unsure, offer 2-3 alternatives and let the user pick.
- Use official/local proper nouns: 青葉山コモンズ, 理学研究科合同棟, 杜の都 (Sendai's nickname), 奥羽山脈の稜線, 入道雲 (summer cumulonimbus), 木のぬくもり (warm wood feel). Tohoku University's inter-campus shuttle is officially「シャトルバス」; the Aobayama internal loop bus is「青葉山連絡バス」— ask the user which one if unclear.
- The user may ask what a word means (e.g. シルエット) — explain briefly and offer plainer alternatives.

### 4. Upload to R2

```bash
bash -lc 'set -euo pipefail
cd "{src}/renamed"
for file in *; do
  echo "Uploading $file"
  npx wrangler r2 object put "elliniafairy-blog/$file" --file "$file" --remote
done
echo "ALL DONE"'
```

- First `npx wrangler` run asks `Ok to proceed? (y)` — answer y via send_to_terminal.
- Uploads take ~10-20s per file; a 21-file batch runs several minutes. Run with a generous timeout and wait for completion; do NOT poll aggressively.
- **Never run `sleep` or any other command in the same terminal while an upload loop is running** — it interrupts the loop (Ctrl+C) and leaves an unknown subset uploaded. If interrupted, re-run the FULL loop (R2 put is idempotent) rather than guessing which files succeeded.
- Verify by counting "Upload complete" lines, or spot-check a URL in the browser.

### 5. Finish up

- Set `coverImage` to the user's chosen image URL (ask; scenic shots work well).
- `publishDate`: default to today (the upload date) — the user prefers this so the album sorts newest.
- URL format in JSON: `https://img.elliniafairy.space/{slug}(N).{ext}` — parentheses in filenames work fine unescaped in the JSON and in browsers.

## Pitfalls

- **JSON formatting drifts when the user hand-edits**: closing `}` can end up stuck at the end of the previous line. Re-read the file before every edit; if structure is broken, rewrite the whole file cleanly.
- **Language files drift apart**: the user edits the primary-language file directly. When they say "同步一下", diff the files and update the others to match the new meaning (not word-for-word).
- **Don't assume photo content**: e.g. what looks like "Aobayama out the window" may be a different view. Describe what you see, then let the user correct the facts.
- **Don't install packages without asking** (pip install Pillow was declined once).
- **Never use `sleep` in the shared terminal** (see step 4).
