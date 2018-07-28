const permissions2str = require('./permissions')

module.exports = (role, aims) => {
  const aimsArray = aims ? Object.values(aims) : []
  return aimsArray.reduce((acc, aim, ind) => {
    const { key, type, permissions } = aim
    return (
      acc +
      (ind === 0 ? '' : '\n') +
      permissions2str(role, type, key, permissions)
    )
  }, '')
}
