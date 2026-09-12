# Toit website

The consolidated Toit project site: scripting, embedded development, project
information, and automatically refreshed language release notes. Built with
SvelteKit and exported as static HTML. The main pages do not require JavaScript.

## Develop

Use the Node version in `.nvmrc`. This repository still uses an older SvelteKit
toolchain that does not build with recent Node versions. Migrating that toolchain
is separate from the site consolidation; a scoped source-map override keeps
Svelte's diagnostics working with the supported build environment.

```sh
nvm install
nvm use
npm ci
npm run dev
```

## Check and preview

```sh
npm run check
npm test
npm run build
node tool/check-build.mjs
npm run preview -- --host 127.0.0.1 --port 3000
```

With Chrome installed and the preview server running,
`npx cypress run --browser chrome --headless` checks navigation, release notes,
mobile layout, and the preserved authentication callback. Add `--env screenshots=true`
to capture desktop/mobile screenshots in `cypress/screenshots/`.

Restart the preview server after rebuilding; this version caches static-file
metadata at startup. Use `npm run dev` while editing for automatic updates.

The Markdown and deployment-selection tests use Node's built-in test runner.
The build check verifies prerendered pages, internal links, canonical URLs, and
schema preservation. To check source formatting and lint:

```sh
npx prettier --check 'src/**/*.{svelte,ts,js,css}' 'tool/*.mjs' 'tests/*.mjs'
npx eslint src tool tests --ext .js,.ts,.svelte,.mjs
```

## Content

- Pages live in `src/routes/`; shared components in `src/lib/`.
- `src/lib/toit-examples/` contains the actual Toit programs shown on the pages.
- `src/style/app.css` defines the shared layout and visual style.
- `static/schemas/` preserves published JSON-schema URLs independently of the UI.
- `npm run releases:fetch` refreshes the checked-in local release snapshot. Set
  `GITHUB_TOKEN` if the unauthenticated GitHub API is rate-limited. CI always fetches
  current data before building, using its built-in token.

## Publish

Pushing to `main` updates the Cloudflare preview at `www-dev.toitlang.org`
(after the one-time custom-domain setup). Public deployment is disabled by default;
the existing `toitlang.org` hosting and DNS stay in place.

After explicitly enabling `CLOUDFLARE_PUBLIC_ENABLED=true`, publishing a website
release updates the public site. A Toit `new-release` dispatch automatically refreshes
the **public** release notes using the publicly deployed website source, even
when `main` contains unfinished changes.

See [DEPLOYMENT.md](DEPLOYMENT.md) for project setup, credentials, migration,
redirects, and the initial public deployment required before release-note refreshes.

## License

See [LICENSE](LICENSE).
