// Cloudflare image host that has Transformations enabled.
const IMAGE_HOST = 'img.elliniafairy.space';

// Default thumbnail width for list covers (blog list / gallery list).
const DEFAULT_THUMBNAIL_WIDTH = 1000;

/**
 * Build a Cloudflare Transformations URL for a remote image.
 *
 * Turns:
 *   https://img.elliniafairy.space/foo.jpg
 * into:
 *   https://img.elliniafairy.space/cdn-cgi/image/width=1000,format=auto/foo.jpg
 *
 * URLs that are not hosted on IMAGE_HOST (e.g. local assets) are returned
 * unchanged, so this is safe to call on any image source.
 */
export function thumbnailUrl(
	src: string,
	width: number = DEFAULT_THUMBNAIL_WIDTH,
): string {
	if (!src) return src;

	let url: URL;
	try {
		url = new URL(src);
	} catch {
		// Relative/local path — leave as-is.
		return src;
	}

	if (url.hostname !== IMAGE_HOST) {
		return src;
	}

	// Already a transformation URL — don't double-wrap.
	if (url.pathname.startsWith('/cdn-cgi/image/')) {
		return src;
	}

	const options = `width=${width},format=auto`;
	return `${url.origin}/cdn-cgi/image/${options}${url.pathname}${url.search}`;
}
