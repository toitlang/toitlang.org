// Copyright (C) 2026 Toit contributors.
import { readBlogAsset } from '$lib/server/blog'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params }) {
  // A rest parameter can be empty; let the article page handle that URL.
  if (!params.asset) return
  // The old prerenderer also adds a trailing slash to image requests.
  const asset = await readBlogAsset(params.slug, params.asset.replace(/\/$/, ''))
  if (!asset) return { status: 404 }
  return {
    headers: { 'content-type': asset.type, 'x-content-type-options': 'nosniff' },
    body: asset.body,
  }
}
