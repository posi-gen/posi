const snakeCase = require('change-case').snakeCase

module.exports = item => {
  const options = item.options ? Object.values(item.options) : []
  return (
    'CREATE TYPE ' +
    snakeCase(item.key) +
    ' AS ENUM (\n' +
    options.reduce(
      (acc, option, ind) =>
        acc + (ind === 0 ? '' : ',\n') + `\t'${option.key}'`,
      ''
    ) +
    '\n);'
  )
}
