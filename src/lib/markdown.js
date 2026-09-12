import MarkdownIt from 'markdown-it'

// Release notes are remote content. Do not allow embedded HTML or images.
// markdown-it also rejects unsafe link protocols, such as javascript:.
const markdown = new MarkdownIt({ html: false, linkify: true })
markdown.disable('image')

/** Render release notes without executable HTML.
 * @param {string | null} source
 */
export function renderMarkdown(source) {
  return markdown.render(source || '')
}

/** Keep the homepage excerpt on complete Markdown block boundaries.
 * @param {string | null} source
 */
export function releaseExcerpt(source) {
  const tokens = markdown.parse(source || '', {})
  let end = 0
  for (const token of tokens) {
    if (token.level !== 0 || !token.map) continue
    end = token.map[1]
    if (end >= 8) break
  }
  return markdown.render((source || '').split('\n').slice(0, end).join('\n'))
}
