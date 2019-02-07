const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const stringifyObject = require('stringify-object')

// Loads markdown files with front matter and renders them into a layout.
// Layout can be set using the `layout` key in the front matter, and will map
// to a file name in the pages/layouts directory.
module.exports = function hashicorpLayoutLoader(src: string) {
  const { content, data } = matter(src)

  // TODO: make layout optional, add good error message for incorrect layout path
  return `import layout from '${path.resolve(
    __dirname,
    '../pages/layouts',
    data.layout
  )}'

export const frontMatter = ${stringifyObject(data)}

export default layout({ ...frontMatter })

${content}
  `
}
