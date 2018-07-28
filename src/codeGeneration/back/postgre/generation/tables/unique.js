module.exports = unique => {
  const uniqueArray = unique ? Object.values(unique) : []
  return uniqueArray.reduce((acc, cons, ind) => {
    let uniqueString = ''
    if (cons.columns) {
      const columns = Object.values(cons.columns)
      uniqueString = columns.reduce(
        (acc, item, ind, arr) => {
          return acc + (ind === 0 ? '' : ',') + item.key
        },
        '\tCONSTRAINT ' + cons.key + ' UNIQUE ('
        // acc +

        // `${acc}${ind === 0 ? '' : ','}${item.key}`,
        // `,\n\t\tCONSTRAINT ${cons.key} UNIQUE (`
      )
      uniqueString = uniqueString + ')'
    }
    return `${acc}${uniqueString}`
  }, '')
}
