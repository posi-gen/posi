const columns2str = require('./columns')
const pkey2str = require('./pkey')
const check2str = require('./check')
const unique2str = require('./unique')
const indexes2str = require('./indexes')
const comments2str = require('./comments')

const snakeCase = require('change-case').snakeCase

module.exports = tables => {
  const tablesArray = tables ? Object.values(tables) : []
  return tablesArray.reduce((acc, table) => {
    const { key, columns, pkey, check, unique } = table
    return (
      acc +
      'CREATE TABLE ' +
      snakeCase(key) +
      ' (\n' +
      (columns2str(columns) + (pkey || check || unique ? ',\n' : '')) +
      (pkey2str(pkey) + (check || unique ? ',\n' : '')) +
      (check2str(check) + (unique ? ',\n' : '')) +
      (unique2str(unique) + '\n);\n') +
      (indexes2str(table) + '\n') +
      (comments2str(table) + '\n\n')
    )
  }, '')
}
