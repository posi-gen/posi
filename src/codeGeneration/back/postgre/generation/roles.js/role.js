const snakeCase = require('change-case').snakeCase

module.exports = ({ key, login, password }) => {
  return (
    'CREATE ROLE ' +
    snakeCase(key) +
    (login ? ' LOGIN ' : '') +
    (password ? " PASSWORD '" + password + "'" : '') +
    ';'
  )
}
