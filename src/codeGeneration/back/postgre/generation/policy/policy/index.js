const snakeCase = require('change-case').snakeCase
const policyOperations2str = require('./policyOperations')

module.exports = (table, tables) => {
  if (table.key && table.policy) {
    return (
      'ALTER TABLE ' +
      snakeCase(table.key) +
      ' ENABLE ROW LEVEL SECURITY;' +
      '\n' +
      policyOperations2str(table.key, table.policy, tables)
    )
  } else return ''
}
