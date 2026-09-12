// Copyright (C) 2026 Toit contributors.

/** Select a target without ever promoting main during a language release. */
export function deploymentTarget(eventName, event, ref, publicEnabled = false) {
  if (!publicEnabled && (eventName === 'release' || eventName === 'repository_dispatch'))
    return 'none'
  if (eventName === 'repository_dispatch' && event.action === 'new-release') return 'public'
  if (eventName === 'release' && !event.release.draft && !event.release.prerelease) return 'public'
  if (eventName === 'push' && ref === 'refs/heads/main') return 'preview'
  if (eventName === 'workflow_dispatch' && ref === 'refs/heads/main') return 'preview'
  return 'none'
}

/** Cloudflare records the source SHA with the successful public deployment. */
export function publishedCommit(project) {
  const deployment = project.production_deployment
  const sha = deployment?.deployment_trigger?.metadata?.commit_hash
  if (deployment?.latest_stage?.status !== 'success' || !/^[a-f0-9]{40}$/.test(sha || '')) {
    throw new Error(
      'No successful public deployment with a source SHA. Publish a website release first; refusing to use main.'
    )
  }
  return sha
}
