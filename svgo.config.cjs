const SEED = 5381
function djb2a(str) {
  let hash = SEED

  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i)
  }

  // Cast to 32-bit uint
  return hash >>> 0
}

// Converts string input to a 32-bit base36 string (0-9, a-z)
// '_' prefix to prevent invalid first chars for CSS class names
const getShortKey = (node, extra) => "_" + djb2a(extra.path).toString(36)

module.exports = {
  multipass: true,
  plugins: [
    {
      name: "preset-default",
      params: {
        cleanupIDs: {
          minify: false
        },
        removeUselessStrokeAndFill: {
          stroke: false
        },
        removeViewBox: false
      }
    },
    {
      name: "prefixIds",
      params: {
        prefix: getShortKey
      }
    }
  ]
}
