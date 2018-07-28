const { camelCase, pascalCase } = require('change-case')

const { queryName, pluralizeName } = require('./names')

const crateList = (tables, tableName) => {
  const TableName = pascalCase(tableName)
  const allItemsQuery = camelCase('all ' + pluralizeName(tableName))
  const queryName_ = queryName(tableName)
  const display = tables[tableName].display
  return `
export const ${queryName_('list')} = gql\`
  query ${queryName_('list')}(
    $first: Int!,
    $after: Cursor,
    $condition: ${pascalCase(tableName + ' condition')},
    $isList: Boolean = true
  ) {
    mainQuery: ${allItemsQuery}(
      first: $first,
      after: $after,
      condition: $condition
    ) {
      nodes {
        ...${TableName}
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  \${${queryName_('fragment')}}
\`

export const ${queryName_('listSelect')} = gql\`
  query List($first: Int!, $after: Cursor, $searchValue: String) {
    list: ${allItemsQuery}(
      first: $first
      after: $after
      filter: { ${display}: { includesInsensitive: $searchValue } }
    ) {
      nodes {
        ...Select${TableName}
      }
    }
  }
  \${${queryName_('fragmentSelect')}}
\`
`
}

module.exports = { crateList }
