const { camelCase, pascalCase } = require('change-case')
const { queryName, mutationName } = require('./names')

const createCRUD = (tables, tableName) => {
  const TableName = pascalCase(tableName)
  const queryName_ = queryName(tableName)
  const FRAGMENT_NAME = queryName_('fragment')
  const mutationName_ = mutationName(tableName)
  const pkey = tables[tableName].pkey
  const pKey = camelCase(pkey)
  const tableByPkey = camelCase(tableName + ' by ' + pkey)

  return `export const ${queryName_('create')} = gql\`
  mutation ${mutationName_(
    'create'
  )}($${tableName}Patch: ${TableName}Input!, $isList: Boolean = false) {
    ${mutationName_('create')}(input: { ${tableName}: $${tableName}Patch }) {
      ${tableName} {
        ...${TableName}
      }
    }
  }
  \${${FRAGMENT_NAME}}
\`

export const ${queryName_('update')} = gql\`
  mutation ${mutationName_('update')}(
    $nodeId: ID!
    $${tableName}Patch: ${TableName}Patch!
    $isList: Boolean = false
  ) {
    ${mutationName_(
      'update'
    )}(input: { nodeId: $nodeId, ${tableName}Patch: $${tableName}Patch }) {
      clientMutationId
      ${tableName} {
        ...${TableName}
      }
    }
  }
  \${${FRAGMENT_NAME}}
\`

export const ${queryName_('delete')} = gql\`
  mutation ${mutationName_('delete')}($nodeId: ID!) {
    ${mutationName_('delete')}(input: { nodeId: $nodeId }) {
      clientMutationId
    }
  }
\`

export const ${queryName_('read')} = gql\`
  query ${mutationName_('read')}($id: ${
    pkey ? 'Int!' : 'ID!'
  }, $isList: Boolean!) {
    ${tableName}: ${pkey ? tableByPkey : tableName}(${
    pkey ? `${pKey}: $id` : 'nodeId: $id'
  }) {
      ...${TableName}
    }
  }
  \${${FRAGMENT_NAME}}
\`

export const ${queryName_('select')} = gql\`
  query Item($value: ${pkey ? 'Int!' : 'ID!'}) {
    item: ${pkey ? tableByPkey : tableName}(${
    pkey ? `${pKey}: $value` : 'nodeId: $value'
  }) {
      ...Select${TableName}
    }
  }
  \${${queryName_('fragmentSelect')}}
\`
`
}

module.exports = { createCRUD }
