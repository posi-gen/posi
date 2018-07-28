const snakeCase = require('change-case').snakeCase

module.exports = (key, comment) => {
  return `COMMENT ON TABLE ${snakeCase(key)} IS '${comment}';`
}
