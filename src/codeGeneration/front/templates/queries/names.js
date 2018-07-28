const { constantCase, camelCase } = require('change-case')
const pluralize = require('pluralize')

const queryName = tableName => type => {
  switch (type) {
    case 'fragment':
      return constantCase('fragment ' + tableName)
    case 'fragmentSelect':
      return constantCase('fragment select ' + tableName)
    case 'list':
      return constantCase('list ' + pluralizeName(tableName))
    case 'listSelect':
      return constantCase('select list ' + tableName)
    case 'create':
      return constantCase('create ' + tableName)
    case 'update':
      return constantCase('update ' + tableName)
    case 'read':
      return constantCase('read ' + tableName)
    case 'delete':
      return constantCase('delete ' + tableName)
    case 'select':
      return constantCase('select ' + tableName)
    default:
      return ''
  }
}

const mutationName = tableName => query => camelCase(query + ' ' + tableName)
const pluralizeName = tableName => pluralize(tableName)

module.exports = { queryName, mutationName, pluralizeName }
