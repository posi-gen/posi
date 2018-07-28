const snakeCase = require('change-case').snakeCase

module.exports = table => {
  const indexes = table.indexes ? Object.values(table.indexes) : []
  return indexes.reduce((acc, index, ind) => {
    if (!index.parts) return ''
    const parts = Object.values(index.parts)
    return (
      acc +
      '\n' +
      'CREATE' +
      (index.unique ? ' UNIQUE' : '') +
      ' INDEX ' +
      snakeCase(index.key) +
      ' ON ' +
      snakeCase(table.key) +
      ' USING ' +
      (index.method ? index.method : 'btree') +
      ' (' +
      parts.reduce((acc, part, ind) => {
        const params = part.params ? Object.values(part.params) : []
        const expression = params.reduce((acc, param) => {
          const regex = new RegExp(`%%${param.key}%%`, 'g')
          return acc.replace(regex, snakeCase(param.key))
        }, part.expression)
        return (
          acc +
          (ind === 0 ? '' : ', ') +
          (part.column ? snakeCase(part.column) : `(${expression})`) +
          (part.desc ? ' DESC' : ' ASC') +
          (part.nullsFirst ? ' NULLS FIRST' : ' NULLS LAST')
        )
      }, '') +
      ');'
    )
  }, '')
}
