// Copyright (C) 2026 Toit contributors.
// A directory endpoint accepts the slash added by this version's prerenderer.
import { readBlog } from '$lib/server/blog'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get() {
  const paths = ['/', '/scripting/', '/embedded/', '/project/', '/releases/', '/blog/']
  for (const post of await readBlog()) paths.push(`/blog/${post.slug}/`)
  return {
    headers: { 'content-type': 'application/xml; charset=utf-8' },
    body: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((path) => `  <url><loc>https://toit.io${path}</loc></url>`).join('\n')}
</urlset>`,
  }
}
