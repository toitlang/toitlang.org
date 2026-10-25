// Copyright (C) 2026 Toit contributors.
import assert from 'node:assert/strict'
import { readFile, access } from 'node:fs/promises'
import { readBlog } from '../src/lib/server/blog.js'

const posts = await readBlog()
for (const route of [
  '',
  'scripting/',
  'embedded/',
  'project/',
  'releases/',
  'blog/',
  ...posts.map((post) => `blog/${post.slug}/`),
  'product/fleet-management/',
]) {
  const html = await readFile(`build/${route}index.html`, 'utf8')
  assert.ok(html.includes('<h1'), `Missing prerendered content: ${route}`)
  assert.ok(html.includes(`https://toit.io/${route}`), `Missing canonical URL: ${route}`)
  assert.ok(!html.includes('designed specifically for microcontrollers'))
  assert.ok(!html.includes('<script'), `Unexpected client runtime: ${route}`)
  // All internal page links must resolve in the static output.
  for (const [, href] of html.matchAll(/href="(\/[^"#?]*)[^"]*"/g)) {
    const path = href.endsWith('/') ? `${href}index.html` : href
    await access(`build${decodeURIComponent(path)}`)
  }
  for (const [, src] of html.matchAll(/src="(\/[^"#?]*)[^"]*"/g)) {
    await access(`build${decodeURIComponent(src)}`)
  }
}
const feed = await readFile('build/blog/feed.xml', 'utf8')
const sitemap = await readFile('build/sitemap.xml', 'utf8')
assert.ok(feed.includes('<rss version="2.0"'))
assert.ok(sitemap.includes('https://toit.io/blog/'))
for (const post of posts) {
  const url = `https://toit.io/blog/${post.slug}/`
  assert.ok(feed.includes(url), `Missing feed item: ${post.slug}`)
  assert.ok(sitemap.includes(url), `Missing sitemap entry: ${post.slug}`)
}
const schemaPath = 'schemas/artemis/pod-specification/v1.json'
assert.deepEqual(await readFile(`build/${schemaPath}`), await readFile(`static/${schemaPath}`))
assert.equal(
  JSON.parse(await readFile(`build/${schemaPath}`, 'utf8')).$id,
  `https://toit.io/${schemaPath}`
)
await access('build/404.html')
await access('build/_redirects')
await access('build/_headers')
console.log('Static pages, internal links, canonical URLs, 404, and schema verified.')
