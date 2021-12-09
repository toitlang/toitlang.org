import adapter from '@sveltejs/adapter-static'
import postcssFunctions from 'postcss-functions'
import preprocess from 'svelte-preprocess'
import linearClamp from './postcss-linear-clamp.js'
import toitPlugin from './tool/toit-plugin.js'
import Icons from 'unplugin-icons/vite'
import svg from '@poppanator/sveltekit-svg'

const dev = process.env.NODE_ENV === 'development'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess({
    postcss: {
      plugins: [
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
    paths: {
      base: dev ? '' : '/toitlang.org',
    },

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
