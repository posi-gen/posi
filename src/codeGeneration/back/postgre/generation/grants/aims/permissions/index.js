const grant2str = require('./grant')

module.exports = (role, type, key, permissions) => {
  const permissionsArray = permissions ? permissions : []
  return permissionsArray.reduce((acc, permission, ind) => {
    return (
      acc + (ind === 0 ? '' : '\n') + grant2str(role, type, key, permission)
    )
  }, '')
}
