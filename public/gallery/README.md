# Gallery Images

This directory contains images for your gallery albums.

## Creating New Albums

To create a new album:

1. Add a new JSON file in `/src/content/gallery/` (e.g., `my-album.json`)
2. Follow this structure:

```json
{
  "title": "Album Title",
  "description": "Album description",
  "coverImage": "/gallery/cover.jpg",
  "publishDate": "2025-10-10",
  "images": [
    {
      "src": "/gallery/image1.jpg",
      "alt": "Image description",
      "description": "Optional detailed description shown in lightbox"
    }
  ]
}
```

3. Add your images to this directory (`/public/gallery/`)
4. The album will automatically appear on the gallery page!

## Notes

- Images should be in JPG, PNG, or WebP format
- Recommended size: 1920x1080 or similar aspect ratio
- The cover image will be displayed on the gallery home page
- Each image can have an optional description that shows in the lightbox view
