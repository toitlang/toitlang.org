// Copyright (C) 2026 Toit contributors.
import assert from 'node:assert/strict'
import { mkdtemp, mkdir, writeFile, rm, symlink } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { readBlog, readBlogAsset, blogFeed } from '../src/lib/server/blog.js'

async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), 'toit-blog-'))
  t.after(() => rm(root, { recursive: true, force: true }))
  async function post(slug, overrides = {}, body = 'An article without any images.') {
    const data = {
      title: `Article ${slug}`,
      date: '2026-10-25',
      description: 'A short description.',
      ...overrides,
    }
    await mkdir(join(root, slug), { recursive: true })
    await writeFile(
      join(root, slug, 'index.md'),
      `---\n${Object.entries(data)
        .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
        .join('\n')}\n---\n\n${body}`
    )
  }
  return { root, post }
}

test('image-free posts render, sort by date, and leave drafts out of the feed', async (t) => {
  const { root, post } = await fixture(t)
  await post('older', { date: '2026-10-24' }, '## An explanation\n\nJust **text** and `code`.')
  await post('newer', { title: 'A & B < C', author: 'A contributor' })
  await post('draft', { draft: true }, '![Not ready](missing.png)')
  const posts = await readBlog(root)
  assert.deepEqual(
    posts.map((post) => post.slug),
    ['newer', 'older']
  )
  assert.equal(posts[0].author, 'A contributor')
  assert.equal(posts[1].author, 'Toit contributors')
  assert.match(posts[1].html, /<h2>An explanation<\/h2>/)
  assert.match(posts[1].html, /<strong>text<\/strong> and <code>code<\/code>/)
  assert.ok(!posts.some((post) => post.html.includes('<img')))
  const feed = blogFeed(posts)
  assert.match(feed, /A &amp; B &lt; C/)
  assert.match(feed, /https:\/\/toit.io\/blog\/newer\//)
  assert.match(feed, /Sun, 25 Oct 2026 00:00:00 GMT/)
  assert.ok(!feed.includes('/draft/'))
  assert.match(blogFeed([]), /<channel>/)
})

test('nested images and attachments resolve and are served byte-for-byte', async (t) => {
  const { root, post } = await fixture(t)
  await post(
    'with-images',
    {},
    '![A diagram](images/my%20diagram.svg)\n\n[Download](notes.pdf#page=2)'
  )
  await mkdir(join(root, 'with-images/images'))
  const image = '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="50"></svg>'
  await writeFile(join(root, 'with-images/images/my diagram.svg'), image)
  await writeFile(join(root, 'with-images/notes.pdf'), 'example attachment')
  const [article] = await readBlog(root)
  assert.match(article.html, /src="\/blog\/with-images\/images\/my%20diagram.svg"/)
  assert.match(article.html, /loading="lazy"/)
  assert.match(article.html, /href="\/blog\/with-images\/notes.pdf#page=2"/)
  const asset = await readBlogAsset('with-images', 'images/my diagram.svg', root)
  assert.equal(asset.type, 'image/svg+xml')
  assert.equal(asset.body.toString(), image)
})

test('missing images, invalid dates, and accidental quoted draft flags fail validation', async (t) => {
  const { root, post } = await fixture(t)
  await post('invalid', {}, '![Missing](missing.png)')
  await assert.rejects(readBlog(root), /invalid\/index.md: missing.*missing.png/)
  await post('invalid', { date: '2026-02-30' })
  await assert.rejects(readBlog(root), /date must be a valid YYYY-MM-DD/)
  await post('invalid', { draft: 'false' })
  await assert.rejects(readBlog(root), /draft must be true or false/)
  await post('invalid', { title: '' })
  await assert.rejects(readBlog(root), /title must be a nonempty string/)
  await writeFile(join(root, 'invalid/index.md'), 'No metadata')
  await assert.rejects(readBlog(root), /expected YAML front matter/)
})

test('draft files, source Markdown, and paths outside a post cannot be served', async (t) => {
  const { root, post } = await fixture(t)
  await post('published')
  await post('draft', { draft: true })
  await writeFile(join(root, 'draft/private.svg'), '<svg/>')
  await writeFile(join(root, 'outside.svg'), '<svg/>')
  await symlink(join(root, 'outside.svg'), join(root, 'published/link.svg'))
  for (const [slug, path] of [
    ['draft', 'private.svg'],
    ['published', 'index.md'],
    ['published', '../outside.svg'],
    ['published', 'link.svg'],
    ['unknown', 'anything.svg'],
  ]) {
    assert.equal(await readBlogAsset(slug, path, root), null)
  }
  await post('published', {}, '![Escape](../outside.svg)')
  await assert.rejects(readBlog(root), /missing or unsupported local attachment/)
})

test('Markdown features work without allowing embedded HTML or executable URLs', async (t) => {
  const { root, post } = await fixture(t)
  await post(
    'formatting',
    {},
    '```text\nhello\n```\n\n> A quote\n\n- A list\n\n<script>alert(1)</script>\n\n[x](javascript:alert(1))'
  )
  const [article] = await readBlog(root)
  assert.match(article.html, /<pre><code class="language-text">hello/)
  assert.match(article.html, /<blockquote>/)
  assert.match(article.html, /<ul>/)
  assert.ok(!/<script|href="javascript:/i.test(article.html))
})
