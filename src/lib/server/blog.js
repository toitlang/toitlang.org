// Copyright (C) 2026 Toit contributors.
import { readFile, readdir, realpath, stat } from 'node:fs/promises'
import { resolve, relative, extname, sep } from 'node:path'
import { load, JSON_SCHEMA } from 'js-yaml'
import MarkdownIt from 'markdown-it'

/** @typedef {{ slug: string, title: string, date: string, description: string, author: string, html: string }} BlogPost */
/** @typedef {{ title: string, date: string, description: string, author?: string, draft?: boolean }} BlogMetadata */

const contentRoot = resolve('content/blog')
const markdown = new MarkdownIt({ html: false, linkify: true })
const assetTypes = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.pdf': 'application/pdf',
}

/** Resolve attachments inside a post, including nested image folders.
 * @param {string} directory
 * @param {string} path
 */
async function assetPath(directory, path) {
  const candidate = resolve(directory, path)
  /** @param {string} file */
  const inside = (file) => {
    const local = relative(directory, file)
    return local && local !== '..' && !local.startsWith(`..${sep}`) && !local.startsWith(sep)
  }
  if (!inside(candidate) || !assetTypes[extname(candidate).toLowerCase()]) return null
  try {
    const actual = await realpath(candidate)
    if (!inside(actual) || !(await stat(actual)).isFile()) return null
    return actual
  } catch (error) {
    if (error.code === 'ENOENT' || error.code === 'ENOTDIR') return null
    throw error
  }
}

/** @param {string} source
 * @param {string} filename
 */
function metadata(source, filename) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(source)
  if (!match) throw new Error(`${filename}: expected YAML front matter`)
  const parsed = load(match[1], { schema: JSON_SCHEMA, filename })
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error(`${filename}: front matter must be a YAML mapping`)
  }
  const data = /** @type {BlogMetadata} */ (parsed)
  for (const field of ['title', 'date', 'description']) {
    if (typeof data?.[field] !== 'string' || !data[field].trim()) {
      throw new Error(`${filename}: ${field} must be a nonempty string`)
    }
  }
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(data.date) ||
    !Number.isFinite(Date.parse(data.date)) ||
    new Date(data.date).toISOString().slice(0, 10) !== data.date
  ) {
    throw new Error(`${filename}: date must be a valid YYYY-MM-DD date`)
  }
  if (data.draft !== undefined && typeof data.draft !== 'boolean') {
    throw new Error(`${filename}: draft must be true or false`)
  }
  if (data.author !== undefined && (typeof data.author !== 'string' || !data.author.trim())) {
    throw new Error(`${filename}: author must be a nonempty string`)
  }
  const body = source.slice(match[0].length).trim()
  if (!body && !data.draft) throw new Error(`${filename}: article body is empty`)
  return { data, body }
}

/** @param {string} body
 * @param {string} slug
 * @param {string} directory
 */
async function renderPost(body, slug, directory) {
  const tokens = markdown.parse(body, {})
  /** @param {import('markdown-it/lib/token.mjs').default[]} tokens */
  async function visit(tokens) {
    for (const token of tokens) {
      const attribute = token.type === 'image' ? 'src' : token.type === 'link_open' ? 'href' : null
      const url = attribute && token.attrGet(attribute)
      if (url && !/^(?:[a-z][a-z\d+.-]*:|\/|#|\?)/i.test(url)) {
        const target = new URL(url, `https://toit.io/blog/${slug}/`)
        const prefix = `/blog/${slug}/`
        const path = decodeURIComponent(target.pathname.slice(prefix.length))
        if (!target.pathname.startsWith(prefix) || !(await assetPath(directory, path))) {
          throw new Error(`${slug}/index.md: missing or unsupported local attachment: ${url}`)
        }
        token.attrSet(attribute, `${target.pathname}${target.search}${target.hash}`)
      }
      if (token.type === 'image') {
        token.attrSet('loading', 'lazy')
        token.attrSet('decoding', 'async')
      }
      if (token.children) await visit(token.children)
    }
  }
  await visit(tokens)
  return markdown.renderer.render(tokens, markdown.options, {})
}

/** Read and validate the content on each request; static builds need no server afterwards.
 * @returns {Promise<BlogPost[]>}
 */
export async function readBlog(root = contentRoot) {
  const posts = []
  for (const entry of await readdir(root, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    const slug = entry.name
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      throw new Error(`Invalid blog folder: ${slug}. Use lowercase words separated by hyphens.`)
    }
    const directory = resolve(root, slug)
    const filename = resolve(directory, 'index.md')
    const { data, body } = metadata(await readFile(filename, 'utf8'), filename)
    if (data.draft) continue
    posts.push({
      slug,
      title: data.title.trim(),
      date: data.date,
      description: data.description.trim(),
      author: data.author?.trim() || 'Toit contributors',
      html: await renderPost(body, slug, directory),
    })
  }
  return posts.sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug))
}

/** Draft attachments and Markdown source files are never served.
 * @param {string} slug
 * @param {string} path
 */
export async function readBlogAsset(slug, path, root = contentRoot) {
  const posts = await readBlog(root)
  if (!posts.some((post) => post.slug === slug)) return null
  const file = await assetPath(resolve(root, slug), path)
  if (!file) return null
  return { body: await readFile(file), type: assetTypes[extname(file).toLowerCase()] }
}

/** @param {string} text */
function escapeXml(text) {
  return text.replace(/[<>&"']/g, (character) => {
    return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' }[character]
  })
}

/** Summary feed; links take readers to the full articles.
 * @param {BlogPost[]} posts
 */
export function blogFeed(posts) {
  const items = posts.map((post) => {
    const url = `https://toit.io/blog/${post.slug}/`
    return `<item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.description)}</description>
    </item>`
  })
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>
  <title>Toit blog</title>
  <link>https://toit.io/blog/</link>
  <description>Articles about the Toit language, runtime, and tools.</description>
  <language>en</language>
  <atom:link href="https://toit.io/blog/feed.xml" rel="self" type="application/rss+xml" />
  ${items.join('\n')}
</channel></rss>`
}
