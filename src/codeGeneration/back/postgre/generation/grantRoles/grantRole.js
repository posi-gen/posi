const snakeCase = require('change-case').snakeCase

module.exports = ({ key, grantRole }) => {
  return 'GRANT ' + snakeCase(grantRole.key) + ' TO ' + snakeCase(key) + ';'
}
