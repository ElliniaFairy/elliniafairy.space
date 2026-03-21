---
name: rename-images
description: Rename images in a folder and replace image placeholders in a blog article
disable-model-invocation: true
argument-hint: <image-folder-path> <article-path>
---

Rename images in a source folder and update the corresponding blog article, replacing【】placeholders with proper image URLs.

## Steps

1. **Read the article** at the provided path (second argument). If no article path is given, check the currently opened file or ask the user.

2. **List images** in the source folder (first argument). If no folder path is given, ask the user.

3. **Determine the naming convention** from the article's slug in frontmatter. Image names follow the format: `{slug}(N).{ext}` where N is a sequential number starting from 1, in order of appearance in the article. For example, if slug is `20260321_moegi`, images become `20260321_moegi(1).jpg`, `20260321_moegi(2).jpg`, etc.

4. **Map placeholders to files**: The article contains【】placeholders that reference source image filenames. Parse each placeholder to identify which source file(s) it refers to:
   - Single reference like `【2026-03-11】` maps to one file
   - Range reference like `【2026-03-21 (0-1)】` maps to multiple files (e.g., the base file and numbered variants)
   - Range reference like `【2026-03-21 (5-7)】` maps to all files in that number range that exist in the folder

5. **Copy and rename** images into a `renamed/` subfolder within the source folder, using sequential numbering in order of appearance in the article.

6. **Update the article**: Replace each【】placeholder with markdown image syntax:
   - Single image: `![](https://img.elliniafairy.space/{slug}(N).jpg)`
   - Multiple images (from ranges): multiple `![]()` lines, one per image

7. **Update the header image** in frontmatter if it's empty or has a placeholder URL.

8. **Verify** no【】placeholders remain in the article.

9. **Report** the mapping summary and flag any unmatched files or references.
