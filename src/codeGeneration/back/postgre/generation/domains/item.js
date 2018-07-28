const snakeCase = require('change-case').snakeCase

module.exports = item => {
  const { key, type, check } = item
  const _key = snakeCase(key)
  const _default = item.default ? `\n\tDEFAULT ${item.default}` : ''
  return `CREATE DOMAIN ${_key} AS ${type}` + _default + `\n\tCHECK (${check});`
}
