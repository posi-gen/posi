const table2str = require('./table')
const columns2str = require('./columns')

module.exports = ({ key, comment, columns }) => {
  const tableComment = comment ? table2str(key, comment) + '\n' : ''
  const columnsComments = columns2str(key, columns)
  return tableComment + columnsComments
}
