const policyUsers2str = require('./policyUsers')

module.exports = (tableName, policy, tables) => {
  const policyArray = Object.values(policy)
  return policyArray.reduce(
    (acc, item, index) =>
      acc +
      (index === 0 ? '' : '\n') +
      policyUsers2str(tableName, item, tables),
    ''
  )
}
