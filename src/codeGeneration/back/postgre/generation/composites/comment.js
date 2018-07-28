const snakeCase = require('change-case').snakeCase

module.exports = (key, comment) => {
  return `COMMENT ON TYPE ${snakeCase(key)} IS '${comment}';`
}
