const { pluralizeName, queryName } = require('./queries')

const tableToExport = (acc, tableName) =>
  acc +
  `export { ${queryName(tableName)('select')}, ${queryName(tableName)(
    'listSelect'
  )} } from 'tables/${pluralizeName(tableName)}/queries'
`

const createSelect = tables => {
  const tableNames = Object.keys(tables)
  return tableNames.reduce(tableToExport, '')
}

module.exports = { createSelect }
