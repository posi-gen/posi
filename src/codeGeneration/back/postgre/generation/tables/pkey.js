const snakeCase = require('change-case').snakeCase

module.exports = pkey => {
  let pkeyString = ''
  if (pkey) {
    const pkeyColumns = Object.values(pkey)
    pkeyString = pkeyColumns.reduce((acc, item, ind) => {
      return acc + (ind === 0 ? '' : ',') + snakeCase(item.key)
    }, '\tPRIMARY KEY (')
    pkeyString = pkeyString + ')'
  }
  return pkeyString
}
