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

test('changelog rebuild selects the successful public SHA and never falls back to main', () => {
  const sha = 'a'.repeat(40)
  const deployment = {
    latest_stage: { status: 'success' },
    deployment_trigger: { metadata: { commit_hash: sha } },
  }
  assert.equal(publishedCommit({ production_deployment: deployment }), sha)
  assert.throws(() => publishedCommit({}), /refusing to use main/)
  deployment.latest_stage.status = 'failure'
  assert.throws(() => publishedCommit({ production_deployment: deployment }))
  deployment.latest_stage.status = 'success'
  deployment.deployment_trigger.metadata.commit_hash = 'main'
  assert.throws(() => publishedCommit({ production_deployment: deployment }))
})
