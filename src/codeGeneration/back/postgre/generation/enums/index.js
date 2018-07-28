const enum2str = require('./item')

module.exports = enums => {
  const enumsArray = enums ? Object.values(enums) : []
  return (
    enumsArray.reduce(
      (acc, item, ind) => acc + (ind === 0 ? '' : '\n') + enum2str(item) + '\n',
      ''
    ) + '\n'
  )
}
