# [Toitlang.org](https://toitlang.org)

This is the official site for the open source programming language **Toit**.

It is built with [SvelteKit](https://kit.svelte.dev).

## Node version

This project doesn't compile anymore with recent node versions. Use,
for example, `nvm` to install an older version of node. The repository
contains a `.nvmrc` file that specifies the node version that works.

If you have nvm installed, but not automatically activated in your
.bashrc, you will need to do

```bash
source /usr/share/nvm/init-nvm.sh
```

Then run `nvm install` to install the correct version of node.

## Developing

```bash
npm install
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

### CSS

This project is using only valid CSS but with two preprocessors (via postcss)
that allow to use future CSS spec:

- [`postcss-nesting`](https://www.npmjs.com/package/postcss-nesting) that allows
  to use the new [css nesting](https://drafts.csswg.org/css-nesting-1/) spec
  (beware that this behaves differently to the way SASS nesting works)
- [`postcssLabFunction`](https://www.npmjs.com/package/postcss-lab-function)
  that allows to use the new `lab` and `lch` [CSS color
  spec](https://drafts.csswg.org/css-color/#specifying-lab-lch)

In addition to these preprocessors, we added the `linearClamp` function which
is defined in `./tool/postcss-linear-clamp.cjs`. See the docs there on how to
use it.

Where it makes sense, the [SUIT](https://suitcss.github.io) naming convention is
used. If it's a simple component with a few elements then they can be styled
directly. But if it's a reusable component (like `.Button`) then a SUIT
component should be created.

### Icons

All icons are imported via
[unplugin-icons](https://github.com/antfu/unplugin-icons). If possible, the
[feather icon pack](https://icones.js.org/collection/feather) should be used
(careful: there are two feather packs).

## Building

This page is built with the static [svelte kit
adapter](https://www.npmjs.com/package/@sveltejs/adapter-static), so all pages
are prebuilt as static html pages and then served by GitHub Pages.

Run this command to build the site:

```bash
npm run build
```

> You can preview the built app with `npm run preview`.

## Testing

Tests are written with cypress.

```bash
npx cypress run # Simply runs the test
npx cypress open # Opens the cypress test runner
```

## License

See [LICENSE](./LICENSE) file.
