import adapter from '@sveltejs/adapter-static'
import postcssFunctions from 'postcss-functions'
import preprocess from 'svelte-preprocess'
import linearClamp from './tool/postcss-linear-clamp.cjs'
import toitPlugin from './tool/toit-plugin.js'
import Icons from 'unplugin-icons/vite'
import svg from '@poppanator/sveltekit-svg'
import postcssNesting from 'postcss-nesting'
import postcssLabFunction from 'postcss-lab-function'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess({
    postcss: {
      plugins: [
        // * * * WARNING * * *
        // Every plugin here needs to be added in postcss.config.cjs as well!
        postcssNesting(),
        // I'd love to use `preserve: true` just for Safari here, but that
        // doesn't work with css variables.
        postcssLabFunction({ preserve: false }),
        postcssFunctions({
          functions: { linearClamp },
        }),
      ],
    },
  }),

  kit: {
    adapter: adapter({
      // default options are shown
      pages: 'build',
      assets: 'build',
      fallback: null,
    }),

    // Make sure this plays nice with GitHub Pages.
    trailingSlash: 'always',
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    vite: {
      plugins: [
        toitPlugin(),
        Icons({
          compiler: 'svelte',
          // scale: 1,
        }),
        svg({
          // https://github.com/svg/svgo#configuration
          svgoOptions: {
            plugins: [
              {
                name: 'preset-default',
                params: {
                  overrides: {
                    removeViewBox: false,
                  },
                },
              },
            ],
          },
        }),
      ],
    },
  },
}

export default config
