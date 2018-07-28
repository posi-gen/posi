const { camelCase, pascalCase } = require('change-case')

const { queryName } = require('./names')
const { getRefAndSimple } = require('../../helpers')

const getValue = (tables, tableName) =>
  camelCase(tables[tableName].pkey || 'nodeId')
const getLabel = (tables, tableName) => camelCase(tables[tableName].display)

const createFragment = (tables, tableName) => {
  const TableName = pascalCase(tableName)
  const queryName_ = queryName(tableName)
  return `import gql from 'graphql-tag.macro'

export const ${queryName_('fragment')} = gql\`
  fragment ${TableName} on ${TableName} {
    nodeId
    ${createFragmentBody(tables, tableName)}
  }
\`

const ${queryName_('fragmentSelect')} = gql\`
  fragment Select${TableName} on ${TableName} {
    value: ${getValue(tables, tableName)}
    label: ${getLabel(tables, tableName)}
  }
\`
`
}

const needColumns = (tables, tableName) => {
  const { simpleTypes, refTypes } = getRefAndSimple(tables, tableName)
  const isBaseColumn = key =>
    key === tables[tableName].pkey || key === tables[tableName].display

  const toSimpleType = ({ key }) => ({
    key,
    fkey: false,
    base: isBaseColumn(key)
  })
  const toRefType = ({ key, fkey }) => ({ key, fkey, base: true })

  return [...simpleTypes.map(toSimpleType), ...refTypes.map(toRefType)]
}

const createFragmentBody = (tables, tableName) => {
  const columns = needColumns(tables, tableName)
  const toGqlField = (acc, el, i) =>
    (i === 0 ? acc : acc + '\n    ') +
    (el.fkey ? refFieldToGqlField(el) : fieldToGqlField(el))

  const fieldToGqlField = ({ key, base }) =>
    camelCase(key) + (base ? '' : ' @skip(if: $isList)')

  const refFieldToGqlField = ({ key, fkey, base }) => `${camelCase(
    key
  )}: ${camelCase(fkey + ' by ' + key)} ${base ? '' : '@skip(if: $isList) '}{
      value: ${getValue(tables, fkey)}
      label: ${getLabel(tables, fkey)}
    }`
  // const pkey = tables[tableName].pkey
  // const fkeys = tables[tableName].fkeys || {}
  // const pkeyField = fkeys[pkey] ? '\n    ' + camelCase(pkey) : ''
  return (
    columns.reduce(toGqlField, '') +
    '\n    serviceSuehsr: ' +
    camelCase(columns[0].key) +
    ' @skip(if: $isList)'
  )
}

module.exports = { createFragment, needColumns }
