const { createFragment, needColumns } = require('./fragment')
const { crateList } = require('./list')
const { createCRUD } = require('./crud')
const { queryName, mutationName, pluralizeName } = require('./names')

const createQueries = (tables, tableName) => {
  const fragment = createFragment(tables, tableName)
  const list = crateList(tables, tableName)
  const crud = createCRUD(tables, tableName)
  return fragment + list + crud
}

module.exports = {
  createQueries,
  queryName,
  mutationName,
  pluralizeName,
  needColumns
}
