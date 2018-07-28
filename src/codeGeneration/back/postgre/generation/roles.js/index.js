const role2str = require('./role')
const comment2str = require('./comment')

module.exports = roles => {
  const rolesArray = roles ? Object.values(roles) : []
  return rolesArray.reduce((acc, role) => {
    const { key, login, password, comment } = role
    return (
      acc +
      role2str({ key, login, password }) +
      '\n' +
      comment2str({ key, comment }) +
      '\n\n'
    )
  }, '')
}
