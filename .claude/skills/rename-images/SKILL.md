---
name: rename-images
description: Copy/rename images in a folder, upload them to R2, and replace image placeholders in a blog article
disable-model-invocation: true
argument-hint: <image-folder-path> <article-path>
---

Copy images into a `renamed/` subfolder, rename them, upload them to Cloudflare R2, and update the corresponding blog article by replacing `【】` placeholders with Markdown image syntax. This skill does not update gallery JSON files under [`src/content/gallery/`](src/content/gallery/).

## Steps

1. **Read the article** at the provided path (second argument). If no article path is given, check the currently opened file or ask the user.

2. **List images** in the source folder (first argument). If no folder path is given, ask the user.

3. **Determine the naming convention** from the article slug or filename. Image names follow the format `{slug}(N).{ext}` where N is a sequential number starting from 1, in order of appearance in the article. Do not change the original extension. For example, if slug is `20260321_moegi`, images become `20260321_moegi(1).jpg`, `20260321_moegi(2).jpg`, etc.

4. **Map placeholders to files**: The article contains【】placeholders that reference source image filenames. Parse each placeholder to identify which source file(s) it refers to:
   - Single reference like `【2026-03-11】` maps to one file
   - Range reference like `【2026-03-21 (0-1)】` maps to multiple files (e.g., the base file and numbered variants)
   - Range reference like `【2026-03-21 (5-7)】` maps to all files in that number range that exist in the folder

5. **Copy and rename** images into a `renamed/` subfolder within the source folder, using sequential numbering in order of appearance in the article. Keep the original files untouched.

6. **Upload renamed files to R2** from the `renamed/` subfolder using `wrangler r2 object put ... --remote`.

7. **Update the article**: Replace each `【】` placeholder with Markdown image syntax:
   - Single image: `![ALT](https://img.elliniafairy.space/{slug}(N).ext)`
   - Multiple images (from ranges): multiple `![ALT](...)` lines, one per image
   - Preserve explicit ALT notes from placeholders such as `【13-ALT 宿舍楼看到的彗星】`
   - If no explicit ALT is provided, generate a simple ALT from the article title plus image number

8. **Update the header image** in frontmatter if it's empty or has a placeholder URL.

9. **Verify** no `【】` placeholders remain in the article.

10. **Report** the mapping summary and flag any unmatched files or references.

## Notes

- Source folders are often under Windows paths like `C:\临时存储\新图\{日期}\`, which map to WSL paths like [`/mnt/c/临时存储/新图/{日期}/`](/mnt/c/临时存储/新图/{日期}/).
- Always include `--remote` in `wrangler` upload commands so files are uploaded to the real R2 bucket rather than local simulation.
- This skill is for article image replacement only; do not append entries to gallery data files.

## Working command examples

List source files:

```bash
find "/mnt/c/临时存储/新图/20200728" -maxdepth 1 -type f | sort
```

Copy and rename numbered files into [`renamed/`](/mnt/c/临时存储/新图/20200728/renamed/):

```bash
bash -lc 'set -euo pipefail; src="/mnt/c/临时存储/新图/20200728"; dst="$src/renamed"; mkdir -p "$dst"; for i in $(seq 1 47); do cp "$src/$i.webp" "$dst/20200728_lzu_dormitory($i).webp"; done'
```

Upload all renamed files to remote R2:

```bash
bash -lc 'set -euo pipefail; cd "/mnt/c/临时存储/新图/20200728/renamed"; shopt -s nullglob; for file in *.webp; do echo "Uploading $file"; npx wrangler r2 object put "elliniafairy-blog/$file" --file "$file" --remote; done'
```
