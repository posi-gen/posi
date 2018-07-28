const { snakeCase } = require('change-case')

module.exports = schema => {
  const { key, comment } = schema
  const normName = snakeCase(key)
  return (
    `CREATE SCHEMA ${normName};` +
    (comment ? `\nCOMMENT ON SCHEMA ${normName} IS '${comment}';` : '')
  )
}
