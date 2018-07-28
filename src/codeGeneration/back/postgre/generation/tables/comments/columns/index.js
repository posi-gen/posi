const column2Str = require('./column')

module.exports = (tableName, columns) => {
  const columnsArray = Object.values(columns)
  return columnsArray.reduce((acc, item, ind) => {
    const comment = item.comment
    if (comment) {
      return (
        acc + (ind === 0 ? '' : '\n') + column2Str(tableName, item.key, comment)
      )
    } else {
      return acc
    }
  }, '')
}
