// Copyright (C) 2026 Toit contributors.
import { writeFile } from 'node:fs/promises'

const headers = { Accept: 'application/vnd.github+json' }
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
const response = await fetch('https://api.github.com/repos/toitlang/toit/releases?per_page=30', {
  headers,
  signal: AbortSignal.timeout(30000),
})
if (!response.ok) throw new Error(`Release fetch failed: HTTP ${response.status}`)
const releases = await response.json()
if (
  !Array.isArray(releases) ||
  !releases.length ||
  releases.some(
    (release) =>
      typeof release.tag_name !== 'string' ||
      typeof release.html_url !== 'string' ||
      !release.html_url.startsWith('https://github.com/toitlang/toit/releases/') ||
      !Number.isFinite(Date.parse(release.published_at || release.created_at))
  )
) {
  throw new Error('Invalid release response; refusing to replace release data')
}
await writeFile(
  process.argv[2] || 'src/lib/releases.json',
  JSON.stringify(releases, null, 2) + '\n'
)
console.log(`Fetched ${releases.length} releases`)
