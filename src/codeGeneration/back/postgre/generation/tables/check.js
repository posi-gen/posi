const snakeCase = require('change-case').snakeCase

module.exports = check => {
  const checkArray = check ? Object.values(check) : []
  const checkString = checkArray.reduce((acc, item, ind, arr) => {
    const itemIsLast = ind === arr.length - 1
    const params = item.params ? Object.values(item.params) : []
    const condition = params.reduce((acc, param) => {
      const regex = new RegExp(`%%${param.key}%%`, 'g')
      return acc.replace(regex, snakeCase(param.key))
    }, item.condition)
    return (
      acc +
      '\tCONSTRAINT ' +
      snakeCase(item.key) +
      ' CHECK (' +
      condition +
      ')' +
      (itemIsLast ? '' : ',')
    )
  }, '')
  return checkString
}
