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

## Preprocessors

This project uses a few preprocessors:

- Sass (only for nested CSS definitions and building BEM/SUIT class names)
- `linearClamp` which is written by us and you can find in
  `postcss-linear-clamp.js`. This allows us to simply use the syntax:
  `linearClamp(tiny, medium, 1.5, 3);` anywhere in our svelte files CSS, which
  will create a linear interpolation between the two values.

## Building

Before creating a production version of your app, install an [adapter](https://kit.svelte.dev/docs#adapters) for your target environment. Then:

```bash
npm run build
```

> You can preview the built app with `npm run preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.
