const { snakeCase } = require('change-case')

module.exports = tables => {
  const tablesArray = tables ? Object.values(tables) : []
  return (
    tablesArray.reduce((acc, table) => {
      if (table.fkeys) {
        const fkeysArray = Object.values(table.fkeys)
        return (
          acc +
          fkeysArray.reduce(
            (acc, fkey, ind) =>
              acc +
              (ind === 0 ? '' : '\n\n') +
              'ALTER TABLE ' +
              snakeCase(table.key) +
              '\n' +
              '\tADD CONSTRAINT ' +
              snakeCase(fkey.key) +
              ' FOREIGN KEY (' +
              snakeCase(fkey.column) +
              ')\n' +
              '\tREFERENCES ' +
              snakeCase(fkey.reference) +
              ' MATCH SIMPLE' +
              '\n' +
              '\tON UPDATE NO ACTION ON DELETE NO ACTION;',
            ''
          )
        )
      } else {
        return acc
      }
    }, '') + '\n\n'
  )
}
