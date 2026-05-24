---
description: "Workflow when adding an image to the gallery in this website"
---

# Gallery 图片处理工作流 Skill

## 概述
当用户想要添加新图片到 Gallery 图册时的标准工作流程。

## 步骤

### 1. 定位图片源目录
用户通常会把图片放在 Windows 路径 `C:\临时存储\新图\{日期}\`，在 WSL/Linux 环境下通过 `/mnt/c/临时存储/新图/{日期}/` 访问。

```bash
ls -la "/mnt/c/临时存储/新图/{日期}/"
```

### 2. 确认目标 JSON 文件
Gallery 图册的 JSON 文件位于 `src/content/gallery/` 目录下。用户一般会打开那个目标相册。

### 3. 重命名图片文件
按照项目命名规范重命名文件。不要修改文件本来的扩展名。
- 格式：`{日期}_{主题}(序号).扩展名`
- 示例：`20260524_lzu(1).webp`、`20260524_lzu(2).webp`

```bash
cd "/mnt/c/临时存储/新图/{日期}/"
mv "原始文件名.webp" "{日期}_{主题}(1).webp"
mv "原始文件名2.webp" "{日期}_{主题}(2).webp"
```

### 4. 上传到 Cloudflare R2
使用 wrangler 命令上传文件到远程 R2 bucket：

```bash
cd "/mnt/c/临时存储/新图/{日期}/"
npx wrangler r2 object put elliniafairy-blog/{文件名} --file "{文件名}" --remote
```

注意：
- 必须加 `--remote` 参数，否则文件只会上传到 Wrangler 本地模拟环境。
- 文件名中的括号在 shell 中需要转义，如 `20260524_lzu\(1\).webp`。
- 批量上传可以使用 bash 循环（必须用 `bash -lc` 包裹，因为 `shopt` 是 bash 内置命令，`/bin/sh` 不支持）：

```bash
bash -lc 'cd "/mnt/c/临时存储/新图/{日期}/" && shopt -s nullglob nocaseglob && for file in *.webp *.jpg *.jpeg *.png *.gif *.avif; do [ -f "$file" ] || continue; echo "Uploading $file"; npx wrangler r2 object put "elliniafairy-blog/$file" --file "$file" --remote; done'
```

### 5. 更新 JSON 文件
在目标 JSON 文件的 `images` 数组末尾添加新图片条目：

```json
{
  "src": "https://img.elliniafairy.space/{重命名后的文件名}",
  "alt": "{图册名称} {序号}",
  "description": ""
}
```

注意：
- URL 基础域名：`https://img.elliniafairy.space/`
- 保持 JSON 格式正确（逗号、方括号）
- alt 文本使用图册主题 + 序号

### 6. 验证上传（可选）
使用 `wrangler r2 object get` 配合 `--remote` 下载验证文件是否真正存在于远程 R2 中。

## 注意事项
- 图片存储在 Cloudflare R2，不是本地 public 目录
- 文件名中的空格需要 URL 编码（如 `%20`）
- 支持 `.webp`、`.jpg`、`.png` 等格式
