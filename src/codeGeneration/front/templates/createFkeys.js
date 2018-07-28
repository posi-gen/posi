const { camelCase } = require('change-case')

const changeObjCase = (obj = {}) => {
  const keys = Object.keys(obj)
  if (keys.length === 0) return undefined
  return keys.reduce(
    (acc, key) => ({ ...acc, [camelCase(key)]: camelCase(obj[key]) }),
    {}
  )
}

const createFkeys = tables => {
  const tableNames = Object.keys(tables)
  return JSON.stringify(
    tableNames.reduce(
      (acc, tableName) => ({
        ...acc,
        [tableName]: changeObjCase(tables[tableName].fkeys)
      }),
      {}
    ),
    null,
    2
  )
}

module.exports = { createFkeys }
