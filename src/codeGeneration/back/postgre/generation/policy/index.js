const policy2str = require('./policy')
const snakeCase = require('change-case').snakeCase

exports.policy2str = tables => {
  const tablesArray = tables ? Object.values(tables) : []
  return tablesArray.reduce(
    (acc, table) =>
      acc +
      '--' +
      snakeCase(table.key) +
      '\n' +
      (policy2str(table, tables) + '\n'),

    ''
  )
}
