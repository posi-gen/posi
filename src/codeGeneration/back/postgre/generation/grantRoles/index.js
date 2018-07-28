const grantRole2str = require('./grantRole')

module.exports = roles => {
  const rolesArray = roles ? Object.values(roles) : []
  return rolesArray.reduce((acc, role) => {
    const { key, grantRoles } = role
    const grantRolesArray = grantRoles ? Object.values(grantRoles) : []
    return (
      acc +
      (acc === '' ? '' : '\n') +
      grantRolesArray.reduce(
        (acc, grantRole) => acc + grantRole2str({ key, grantRole }) + '\n',
        ''
      )
    )
  }, '')
}
