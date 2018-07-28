const policyItems2str = require('./policyItems')

module.exports = (tableName, policy, tables) => {
  const operationName = policy.key
  const policyArray = policy.users ? Object.values(policy.users) : []
  return policyArray.reduce(
    (acc, item, index) =>
      acc +
      (index === 0 ? '' : '\n') +
      policyItems2str(tableName, operationName, item, tables),
    ''
  )
}
