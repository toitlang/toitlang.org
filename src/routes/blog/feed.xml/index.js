// Copyright (C) 2026 Toit contributors.
// A directory endpoint accepts the slash added by this version's prerenderer.
import { readBlog, blogFeed } from '$lib/server/blog'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get() {
  return {
    headers: { 'content-type': 'application/rss+xml; charset=utf-8' },
    body: blogFeed(await readBlog()),
  }
}
