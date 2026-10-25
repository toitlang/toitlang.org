import assert from 'node:assert/strict'
import { test } from 'node:test'
import { deploymentTarget, publishedCommit } from '../tool/deployment.mjs'

test('main goes to preview; other branches and PRs do not deploy', () => {
  assert.equal(deploymentTarget('push', {}, 'refs/heads/main'), 'preview')
  assert.equal(deploymentTarget('pull_request', {}, 'refs/pull/1/merge'), 'none')
  assert.equal(deploymentTarget('push', {}, 'refs/heads/experiment'), 'none')
  assert.equal(deploymentTarget('workflow_dispatch', {}, 'refs/heads/main'), 'preview')
})

test('public deployment is disabled by default, including language release dispatches', () => {
  assert.equal(deploymentTarget('release', { release: { prerelease: false } }), 'none')
  assert.equal(deploymentTarget('repository_dispatch', { action: 'new-release' }), 'none')
})

test('public opt-in enables website releases and language release refreshes', () => {
  const target = (name, event) => deploymentTarget(name, event, undefined, true)
  assert.equal(target('release', { release: { prerelease: false } }), 'public')
  assert.equal(target('release', { release: { prerelease: true } }), 'none')
  assert.equal(target('release', { release: { draft: true } }), 'none')
  assert.equal(target('repository_dispatch', { action: 'new-release' }), 'public')
  assert.equal(target('repository_dispatch', { action: 'anything-else' }), 'none')
})

test('changelog rebuild reads the successful canonical deployment from the Cloudflare API', () => {
  const sha = 'a'.repeat(40)
  // https://developers.cloudflare.com/api/resources/pages/subresources/projects/methods/get/
  const deployment = {
    environment: 'production',
    latest_stage: { name: 'deploy', status: 'success' },
    deployment_trigger: { type: 'ad_hoc', metadata: { branch: 'production', commit_hash: sha } },
  }
  assert.equal(publishedCommit({ canonical_deployment: deployment }), sha)
  assert.throws(() => publishedCommit({}), /refusing to use main/)
  assert.throws(() => publishedCommit({ canonical_deployment: null }), /refusing to use main/)
  deployment.latest_stage.status = 'failure'
  assert.throws(() => publishedCommit({ canonical_deployment: deployment }))
  deployment.latest_stage.status = 'success'
  deployment.deployment_trigger.metadata.commit_hash = 'main'
  assert.throws(() => publishedCommit({ canonical_deployment: deployment }))
})

test('newer deployments cannot override the canonical source, including after a rollback', () => {
  const canonical = {
    environment: 'production',
    latest_stage: { status: 'success' },
    deployment_trigger: { metadata: { commit_hash: 'a'.repeat(40) } },
  }
  for (const environment of ['preview', 'production']) {
    const latest = {
      environment,
      latest_stage: { status: 'success' },
      deployment_trigger: { metadata: { commit_hash: 'b'.repeat(40) } },
    }
    assert.equal(
      publishedCommit({ canonical_deployment: canonical, latest_deployment: latest }),
      'a'.repeat(40)
    )
    assert.throws(() => publishedCommit({ latest_deployment: latest }), /refusing to use main/)
  }
})
