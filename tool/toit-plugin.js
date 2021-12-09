import hljs from 'highlight.js'

const fileRegex = /\.(toit)$/

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toitPlugin = () => {
  return {
    name: 'transform-file',

    transform(src, id) {
      if (fileRegex.test(id)) {
        const highlighted = hljs.highlightAuto(src).value
        return {
          code: `export default \`${highlighted}\`;`,
          map: null, // provide source map if available
        }
      }
    },
  }
}

export default toitPlugin
