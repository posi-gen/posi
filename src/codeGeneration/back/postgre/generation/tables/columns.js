const snakeCase = require('change-case').snakeCase

module.exports = columns => {
  const columnsArray = Object.values(columns)
  return columnsArray.reduce(
    (acc, item, ind, arr) =>
      acc +
      (ind === 0 ? '' : '\n') +
      '\t' +
      snakeCase(item.key) +
      ' ' +
      item.type +
      (item.notNull ? ' NOT NULL' : '') +
      (ind === arr.length - 1 ? '' : ','),
    ''
  )
}
