const columns2str = require('./columns')
const comment2str = require('./comment')

const snakeCase = require('change-case').snakeCase

module.exports = types => {
  const typesArray = types ? Object.values(types) : []
  return typesArray.reduce((acc, type) => {
    const { key, columns, comment } = type
    return (
      acc +
      ('CREATE TYPE ' + snakeCase(key) + ' AS (\n') +
      columns2str(columns) +
      '\n);\n' +
      (comment2str(key, comment) + '\n\n')
    )
  }, '')
}
