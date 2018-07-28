const { snakeCase } = require('change-case')

exports.grantsSequence = ({ tables, roles }) => {
  const rolesArray = roles ? Object.values(roles) : []
  const tablesArray = tables ? Object.values(tables) : []

  const allColumns = tablesArray
    .reduce((acc, table) => {
      const columnsArray = Object.values(tables[table.key].columns || {})
      return [
        ...acc,
        ...columnsArray.map(item => ({ ...item, table: table.key }))
      ]
    }, [])
    .filter(
      ({ type }) =>
        type === 'SMALLSERIAL' || type === 'SERIAL' || type === 'BIGSERIAL'
    )

  return allColumns.reduce((acc, { key, table }, index) => {
    const sequenceName = snakeCase(table) + '_' + snakeCase(key) + '_seq'
    const delimiter = index === 0 ? '' : '\n'
    const availableRolesArray = rolesArray.filter(item => {
      const permissions =
        item.grants &&
        item.grants[table + '_TABLE'] &&
        item.grants[table + '_TABLE'].permissions
          ? item.grants[table + '_TABLE'].permissions
          : []
      return (
        permissions.indexOf('INSERT') !== -1 ||
        permissions.indexOf('UPDATE') !== -1 ||
        permissions.indexOf('DELETE') !== -1
      )
    })
    const availableRoles = availableRolesArray.reduce(
      (acc, item, ind) => acc + (ind === 0 ? '' : ', ') + snakeCase(item.key),
      ''
    )
    return availableRolesArray.length > 0
      ? acc +
          delimiter +
          `GRANT ALL ON SEQUENCE ${sequenceName}
  TO ${availableRoles};`
      : acc
  }, '')
}
