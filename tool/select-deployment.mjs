// Copyright (C) 2026 Toit contributors.
import { readFile, appendFile } from 'node:fs/promises'
import { deploymentTarget, publishedCommit } from './deployment.mjs'

const event = JSON.parse(await readFile(process.env.GITHUB_EVENT_PATH, 'utf8'))
const target = deploymentTarget(
  process.env.GITHUB_EVENT_NAME,
  event,
  process.env.GITHUB_REF,
  process.env.PUBLIC_ENABLED === 'true'
)
let ref = process.env.GITHUB_SHA
if (process.env.GITHUB_EVENT_NAME === 'release') ref = `refs/tags/${event.release.tag_name}`
const project = target === 'public' ? process.env.PUBLIC_PROJECT : process.env.PREVIEW_PROJECT
if (target !== 'none') {
  if (!/^[a-z0-9][a-z0-9-]*$/.test(project || ''))
    throw new Error('Invalid Cloudflare project name')
  if (!process.env.CLOUDFLARE_ACCOUNT_ID || !process.env.CLOUDFLARE_API_TOKEN) {
    throw new Error(
      'Configure CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN secrets before deploying.'
    )
  }
  const base = `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/pages/projects`
  const headers = {
    Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
    'Content-Type': 'application/json',
  }
  const expectedBranch = target === 'public' ? 'production' : 'main'
  let response = await fetch(`${base}/${project}`, { headers })
  // Provision only the selected Direct Upload project, without attaching domains.
  // A language dispatch must find an existing public deployment.
  if (response.status === 404 && process.env.GITHUB_EVENT_NAME !== 'repository_dispatch') {
    response = await fetch(base, {
      method: 'POST',
      headers,
      body: JSON.stringify({ name: project, production_branch: expectedBranch }),
    })
    console.log(`Creating Cloudflare Pages project ${project}`)
  }
  if (!response.ok) throw new Error(`Cloudflare project lookup failed: HTTP ${response.status}`)
  const data = await response.json()
  if (!data.success) throw new Error('Cloudflare project lookup failed')
  if (data.result.production_branch !== expectedBranch) {
    throw new Error(`Configure ${project}'s production branch as ${expectedBranch}.`)
  }
  if (process.env.GITHUB_EVENT_NAME === 'repository_dispatch') ref = publishedCommit(data.result)
}
await appendFile(
  process.env.GITHUB_OUTPUT,
  `target=${target}\nref=${ref}\nproject=${project || ''}\n`
)
console.log(`Build ${ref}; deployment target: ${target}`)
