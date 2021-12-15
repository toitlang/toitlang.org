# [Toitlang.org](https://toitlang.org)

This is the official site for the open source programming language **Toit**.

It is built with [SvelteKit](https://kit.svelte.dev).

## Developing

```bash
npm install
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## CSS

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

No SASS is used in this project.

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
