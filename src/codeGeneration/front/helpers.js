const getRefAndSimple = (tables, tableName) => {
  const columns = tables[tableName].columns
  const columnsArray = Object.values(columns)

  const simpleTypes = columnsArray.filter(el => !el.fkey)
  const refTypes = columnsArray.filter(el => !!el.fkey)
  return { simpleTypes, refTypes }
}

module.exports = { getRefAndSimple }
