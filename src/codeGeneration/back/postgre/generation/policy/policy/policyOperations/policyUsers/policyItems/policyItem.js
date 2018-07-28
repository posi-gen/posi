const snakeCase = require('change-case').snakeCase
const condition2str = require('./condition')

module.exports = (tableName, operationName, userName, condition, tables) => {
  const { name = '', type = 'PERMISSIVE', using, check } = condition
  return using || check
    ? 'CREATE POLICY ' +
        snakeCase(operationName) +
        '_on_' +
        snakeCase(tableName) +
        '_for_' +
        snakeCase(userName) +
        (name && name !== '' ? '_as_' + snakeCase(name) : '') +
        ' ON ' +
        snakeCase(tableName) +
        ('\n\tAS ' + type) +
        ('\n\tFOR ' + operationName) +
        ('\n\tTO ' + snakeCase(userName)) +
        (using
          ? '\n\tUSING (' +
            condition2str({
              conditionObject: using,
              tableName,
              operationName,
              userName,
              tables,
              typeOfConstraint: 'using'
            }) +
            ')'
          : '') +
        (check
          ? '\n\tWITH CHECK (' +
            condition2str({
              conditionObject: check,
              tableName,
              operationName,
              userName,
              tables,
              typeOfConstraint: 'check'
            }) +
            ')'
          : '') +
        ';'
    : ''
}
