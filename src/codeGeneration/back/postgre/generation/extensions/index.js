const extension2str = require('./extension')

module.exports = extensions => {
  const extensionsArray = extensions ? Object.values(extensions) : []
  return (
    extensionsArray.reduce(
      (acc, extension, ind) => acc + extension2str(extension) + '\n',
      ''
    ) + '\n'
  )
}
