const aims2str = require('./aims')
const { snakeCase } = require('change-case')

module.exports = roles => {
  const rolesArray = roles ? Object.values(roles) : []

  const grantToMain = `GRANT USAGE ON SCHEMA main TO ${Object.values(roles)
    .filter(item => !item.login)
    .reduce(
      (acc, item, index) =>
        acc + (index === 0 ? '' : ', ') + snakeCase(item.key),
      ''
    )};\n`

  return rolesArray
    .filter(item => item.grants)
    .reduce((acc, role, ind, self) => {
      const { key, grants } = role
      return acc + (ind === 0 ? '' : '\n\n') + aims2str(key, grants)
    }, grantToMain)
}
