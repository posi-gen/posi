const schema2str = require('./schema')
const { snakeCase } = require('change-case')

module.exports = (schemas, database) => {
  const schemasArray = schemas ? Object.values(schemas) : []
  const { key, mainSchema } = database
  return (
    'DROP SCHEMA IF EXISTS public CASCADE; -- unsafe \n' +
    schemasArray.reduce((acc, schema) => acc + schema2str(schema) + '\n', '') +
    `ALTER DATABASE ${snakeCase(key)} SET search_path TO ${snakeCase(
      mainSchema
    )};` +
    '\n' +
    `SET search_path TO ${snakeCase(mainSchema)};` +
    '\n\n'
  )
}
