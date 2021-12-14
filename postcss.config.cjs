module.exports = {
  map: false,
  plugins: {
    // * * * WARNING * * *
    // Every plugin here needs to be added in svelte.config.js as well!
    'postcss-nesting': {},
    'postcss-lab-function': { preserve: false },
    'postcss-functions': { functions: { linearClamp: require('./tool/postcss-linear-clamp.cjs') } },
  },
}
