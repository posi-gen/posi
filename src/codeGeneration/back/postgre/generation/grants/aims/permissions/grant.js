const snakeCase = require('change-case').snakeCase

module.exports = (role, type, objectName, permission) => {
  return (
    `GRANT ${permission}\n` +
    `\tON ${type} ${snakeCase(objectName)}\n` +
    `\tTO ${snakeCase(role)};`
  )
}
