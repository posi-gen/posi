const snakeCase = require('change-case').snakeCase

module.exports = ({ key, comment }) => {
  return 'COMMENT ON ROLE ' + snakeCase(key) + " IS '" + comment + "';"
}
