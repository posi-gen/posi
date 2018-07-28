const getPKey = table => {
  const { pkey = {} } = table
  const pkeyNames = Object.keys(pkey)
  if (pkeyNames.length === 1) {
    return pkey[pkeyNames[0]].key
  } else return undefined
}

const getNewColumnsWithPFkeys = table => {
  const newColumns = table.columns
  const { fkeys = {}, pkey = {} } = table
  const pkeyKeys = Object.keys(pkey)
  pkeyKeys.forEach(el => {
    newColumns[pkey[el].key].pkey = true
  })
  const fkeyKeys = Object.keys(fkeys)

  let newFkeys = undefined
  if (fkeyKeys.length > 0) {
    newFkeys = {}
    fkeyKeys.forEach(el => {
      newColumns[fkeys[el].column].fkey = fkeys[el].reference
      newFkeys[newColumns[fkeys[el].column].key] =
        newColumns[fkeys[el].column].fkey
    })
  }

  return { newColumns, fkeys: newFkeys }
}

const transformTable = table => {
  const pkey = getPKey(table)
  const { key, comment } = table
  const { newColumns, fkeys } = getNewColumnsWithPFkeys(table)
  const columnNames = Object.keys(newColumns)
  const display = columnNames[1] ? columnNames[1] : columnNames[0]
  return { key, comment, columns: newColumns, pkey, display, fkeys }
}

const transformTables = tables => {
  const tableKeys = Object.keys(tables)
  return tableKeys.reduce(
    (acc, tableName) => ({
      ...acc,
      [tableName]: transformTable(tables[tableName])
    }),
    {}
  )
}

const getDependentTables = (tables, tableName) =>
  Object.keys(tables).filter(_tableName => {
    const table = tables[_tableName]
    const columns = Object.keys(table.columns)
    return columns.reduce(
      (acc, el) => acc || table.columns[el].fkey === tableName,
      false
    )
  })

module.exports = { transformTables, getDependentTables }
