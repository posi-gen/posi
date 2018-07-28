export const getTableColumns = (data, settings) => {
  const dataColumns = data.reduce((acc, item) => {
    const columns = Object.keys(item)
    return columns.reduce(
      (acc, column) =>
        acc[column] ? acc : { ...acc, [column]: { name: column } },
      acc
    )
  }, {})
  if (settings && settings.columns)
    return Object.values(dataColumns).reduce((acc, item) => {
      const settingsItem = settings.columns[item.name] || {}
      return { ...acc, [item.name]: { ...settingsItem, name: item.name } }
    }, {})
  else return dataColumns
}
