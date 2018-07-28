const domain2str = require('./item')

module.exports = domains => {
  const array = domains ? Object.values(domains) : []
  return (
    array.reduce(
      (acc, item, ind) =>
        acc + (ind === 0 ? '' : '\n') + domain2str(item) + '\n',
      ''
    ) + '\n'
  )
}
