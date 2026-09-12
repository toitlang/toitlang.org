import assert from 'node:assert/strict'
import { test } from 'node:test'
import { renderMarkdown, releaseExcerpt } from '../src/lib/markdown.js'

test('release notes render headings, lists, links, and fenced code', () => {
  const html = renderMarkdown(
    '## Changes\n\n- Fixed `foo`\n- [Details](https://github.com/toitlang/toit)\n\n```toit\nmain:\n  print "hi"\n```'
  )
  for (const fragment of [
    '<h2>Changes</h2>',
    '<ul>',
    '<code>foo</code>',
    '<a href="https://github.com/toitlang/toit">',
    '<pre><code class="language-toit">',
  ])
    assert.ok(html.includes(fragment))
})

test('untrusted release notes cannot inject HTML, scripts, or remote images', () => {
  const html = renderMarkdown(
    '<script>alert(1)</script>\n\n[x](javascript:alert(1))\n\n<img src=x onerror=alert(1)>\n\n![tracking](https://example.com/pixel)'
  )
  assert.ok(!/<script|<img|href="javascript:/i.test(html))
  assert.ok(html.includes('&lt;script&gt;'))
})

test('excerpt keeps complete fenced code and excludes following blocks', () => {
  const source = '## Fixes\n\n```\n1\n2\n3\n4\n5\n6\n```\n\nLater paragraph'
  const excerpt = releaseExcerpt(source)
  assert.ok(excerpt.includes('</code></pre>'))
  assert.ok(!excerpt.includes('Later paragraph'))
  assert.equal(releaseExcerpt(null), '')
})
