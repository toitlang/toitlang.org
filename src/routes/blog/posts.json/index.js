// Copyright (C) 2026 Toit contributors.
// A directory endpoint accepts the slash added by this version's prerenderer.
import { readBlog } from '$lib/server/blog'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get() {
  return { body: { posts: await readBlog() } }
}
