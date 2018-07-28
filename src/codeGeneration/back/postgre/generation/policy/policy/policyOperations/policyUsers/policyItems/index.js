const policyItem2str = require('./policyItem')

module.exports = (tableName, operationName, policy, tables) => {
  const userName = policy.key
  const policyArray = policy.conditions ? Object.values(policy.conditions) : []
  return policyArray.reduce(
    (acc, item, index) =>
      acc +
      (index === 0 ? '' : '\n') +
      policyItem2str(tableName, operationName, userName, item, tables),
    ''
  )
}
