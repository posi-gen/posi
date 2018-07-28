const snakeCase = require('change-case').snakeCase

module.exports = (tableName, columnName, comment) => {
  return `COMMENT ON COLUMN ${snakeCase(tableName)}.${snakeCase(
    columnName
  )} IS '${comment}';`
}
