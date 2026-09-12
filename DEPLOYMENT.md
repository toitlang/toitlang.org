# Deployment and migration

The consolidated site is built in this repository and published using Cloudflare
Pages Direct Upload. The intended canonical domain is `toit.io`. No DNS or remote
project settings are changed by the source changes in this repository.

## Environments

For now, only preview deployment is enabled. Pushes to `main` (or manual runs on
`main`) publish to the separate `toit-dev` project at `www-dev.toitlang.org` after
the custom-domain setup below. The workflow never changes DNS or attaches domains.
Leave `CLOUDFLARE_PUBLIC_ENABLED` unset: website releases and language release
dispatches will run checks but will not read, create, or deploy a public project.
The existing `toitlang.org` site remains on its current hosting. Its old deployment
is not refreshed by this replacement workflow during the preview-only phase.

The following release behavior applies **after** setting the GitHub Actions
repository variable `CLOUDFLARE_PUBLIC_ENABLED` to `true` at cutover:

| Event                                        | Website source                          | Destination                                 |
| -------------------------------------------- | --------------------------------------- | ------------------------------------------- |
| Push to `main`                               | Pushed commit                           | Preview                                     |
| Manual workflow on `main`                    | Selected main commit                    | Preview                                     |
| Published website release (not a prerelease) | Release tag                             | Public                                      |
| `repository_dispatch: new-release`           | SHA of the successful public deployment | Public, with current language release notes |
| Pull request                                 | PR merge commit                         | Checks and downloadable build artifact      |

The Toit language release dispatch remains unchanged. Both preview and public
builds fetch the latest 30 language releases, including prereleases, and render
their Markdown. API failures fail the build instead of silently publishing stale
data. Website prereleases do not promote the public site.

Public workflows share a concurrency group across source selection, build, and
deployment. A changelog update reads the Cloudflare project's
`production_deployment.deployment_trigger.metadata.commit_hash`. Every upload
explicitly records the checked-out website SHA. This also respects a Cloudflare
rollback. If there is no successful public deployment with a valid SHA, the update
fails with an explanation; it never falls back to `main`.

## One-time Cloudflare setup

The workflow creates a missing **Direct Upload** Pages project in the configured
account when first deploying to that target. It does not attach custom domains:

| Project default | Production branch | Use                                    |
| --------------- | ----------------- | -------------------------------------- |
| `toit-dev`      | `main`            | Preview at `www-dev.toitlang.org`      |
| `toit`          | `production`      | Public site, eventually `toit.io`      |

You can also create the projects beforehand. Project names must be available in
Cloudflare. To use different names, set Actions
variables `CLOUDFLARE_PREVIEW_PROJECT` and `CLOUDFLARE_PUBLIC_PROJECT`. The workflow
checks existing projects' production branches and fails if they do not match; it
does not silently deploy to a temporary branch URL.

The `toitlang` organization provides these Actions secrets to public repositories:

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN` (must have Cloudflare Pages Edit permission for the account)

No duplicate repository secrets are needed when the organization policy grants
this repository access. GitHub does not expose secret values for local tooling.

The workflow uses GitHub environments `preview` and `production`. Leave required
reviewers disabled if releases and changelog refreshes should publish automatically.
The account credentials must be repository/organization secrets: the source
selection job needs to read the public deployment before entering an environment.

There is no dependency on a separate dev repository or a personal GitHub token.
The built-in GitHub token fetches public language release notes.

### Activate the dev hostname

1. Push the workflow and site changes to `main`. Check that the **Website** Actions
   run succeeds and `https://toit-dev.pages.dev` serves the new site. You can rerun
   it with **Run workflow** on `main`.
2. In Cloudflare, open **Workers & Pages → toit-dev → Custom domains → Set up a
   domain** and enter `www-dev.toitlang.org`.
3. Confirm the CNAME Cloudflare proposes. If DNS is hosted elsewhere, add a CNAME
   for `www-dev` pointing to `toit-dev.pages.dev` at that DNS provider. Use your
   actual project's `pages.dev` hostname if you changed the project name.
4. Wait for the custom domain to become active and check HTTPS. Do not change
   the records for `toitlang.org`, `www.toitlang.org`, or `toit.io`.

Register the hostname in Pages before adding a CNAME; DNS alone is insufficient.
See Cloudflare's [custom-domain instructions](https://developers.cloudflare.com/pages/configuration/custom-domains/).
No manual build configuration or Git integration is needed: Actions uploads the
finished site. Preview responses are marked `noindex` (not password-protected).

## Cutover

1. Merge the implementation and verify the preview deployment. The old GitHub
   Pages branches remain served but will no longer be updated by this workflow.
2. Set `CLOUDFLARE_PUBLIC_ENABLED=true` in GitHub Actions repository variables, then
   publish the first website release. Check the resulting public Pages deployment
   before changing the domain. This establishes the SHA used for future dispatches.
3. Attach `toit.io` to the public Cloudflare Pages project through its **Custom
   domains** settings, then apply the DNS records Cloudflare requests. Move `www`
   too if it is currently used. Verify HTTPS before retiring the former host.
4. Preserve DNS records for `docs.toit.io`, `libs.toit.io`, `pkg.toit.io`, the blog,
   and any Artemis endpoints. Changing the apex website must not move these services.
5. Set up a domain redirect for `toitlang.org` and its `www` hostname to `toit.io`,
   preserving paths and query strings, using Cloudflare Redirect Rules/Bulk
   Redirects or the existing domain redirect provider. DNS by itself is not a redirect.
6. Disable the former `web-toit.io` publishing workflow so a later release there
   cannot republish the retired site. Keep its repository for history.
7. Trigger a `new-release` dispatch and verify that the public page changes while
   its recorded source SHA remains the same as the website release.

Use Cloudflare's deployment rollback to return to the previous public deployment.
Keep the old hosting available until the migration has been checked.

## URL compatibility

- `/schemas/artemis/pod-specification/v1.json` is copied byte-for-byte from
  `web-toit.io`. Its `$id` is unchanged. The build verifies it survives static
  export. Check the deployed content as JSON, not just an HTTP 200 response.
- `_headers` supplies a JSON-schema content type and public CORS for schema URLs.
- `_redirects` maps device software to Embedded, and About/Pricing to Project.
- `/product/fleet-management/` is an unlisted Artemis status page.
- The old policy URLs retain their text as explicitly labeled historical archives.
  Review any current policy requirements separately before the domain cutover.
- `/auth/` preserves the previous fragment-based authentication status callback.
  It does not transmit or display the token and clears the fragment after reading it.
- `/sw.js` retires Gatsby's former offline worker and its Gatsby/Workbox caches.
  Keep this endpoint available for returning visitors after migration.
- `404.html` gives missing pages a real 404; there is no SPA catch-all rewrite.
- Preview builds receive `X-Robots-Tag: noindex, nofollow` and a disallowing robots file.

Verify redirects, headers, unknown URLs, schema contents, authentication status,
and a returning visitor with the old worker at the Cloudflare preview/public
deployment. The local static server does not interpret Cloudflare configuration.

References: [Direct Upload CI](https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/),
[redirects](https://developers.cloudflare.com/pages/configuration/redirects/),
[serving static pages and 404s](https://developers.cloudflare.com/pages/configuration/serving-pages/).
