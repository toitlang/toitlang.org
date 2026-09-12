import 'codemirror/addon/runmode/runmode.node.js'
import 'codemirror/mode/meta.js'
import CodeMirror from 'codemirror'
import './toit.js'

const fileRegex = /\.(toit)$/

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toitPlugin = () => {
  return {
    name: 'transform-file',

    transform(src, id) {
      if (fileRegex.test(id)) {
        const highlighted = highlight(src)
        return {
          code: `export default ${JSON.stringify(highlighted)};`,
          map: null, // provide source map if available
        }
      }
    },
  }
}

function highlight(code) {
  let highlighted = ''
  CodeMirror.runMode(code, 'text/x-toit', (token, style) => {
    const escaped = token.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    highlighted += style ? `<span class="cm-${style}">${escaped}</span>` : escaped
  })
  return highlighted
}

export default toitPlugin
