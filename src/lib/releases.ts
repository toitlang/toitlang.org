// Coming from: https://api.github.com/repos/toitlang/toit/releases
import releasesJson from '$lib/releases.json'

export type Release = {
  name: string
  tag: string
  createdAt: Date
  body: string
  url: string
}

export const releases: Release[] = releasesJson.map<Release>((release) => ({
  name: release.name,
  tag: release.tag_name,
  createdAt: new Date(release.created_at),
  body: release.body,
  url: release.html_url,
}))
