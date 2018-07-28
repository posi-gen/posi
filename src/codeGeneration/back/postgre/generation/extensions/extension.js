const snakeCase = require('change-case').snakeCase

module.exports = extension => {
  const { key, schema } = extension
  const normName = snakeCase(key)
  const normSchema = snakeCase(schema)
  return `CREATE EXTENSION IF NOT EXISTS "${normName}" SCHEMA ${normSchema};`
}
