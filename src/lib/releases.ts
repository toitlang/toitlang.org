// Coming from: https://api.github.com/repos/toitlang/toit/releases
// This file gets updated in the CI pipeline.
import releasesJson from '$lib/releases.json'

export type Release = {
  name: string
  tag: string
  createdAt: Date
  body: string
  url: string
  prerelease: boolean
}

export const releases: Release[] = releasesJson
  .filter((release) => !release.draft)
  .map<Release>((release) => ({
    name: release.name || release.tag_name,
    tag: release.tag_name,
    createdAt: new Date(release.published_at || release.created_at),
    body: release.body || '',
    url: release.html_url,
    prerelease: release.prerelease,
  }))
  .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}
