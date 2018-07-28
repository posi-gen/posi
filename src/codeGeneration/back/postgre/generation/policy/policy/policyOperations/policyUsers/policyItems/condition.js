const snakeCase = require('change-case').snakeCase
const conditionTypes = require('../../../../../../constants/policyConstraintTypes')
const policyTypes = require('../../../../../../constants/policyTypes')
const composition = require('./composition')

const condition2str = ({
  conditionObject,
  operationName,
  userName,
  tables,
  typeOfConstraint
}) => {
  const { type = conditionTypes.BOOLEAN, ...condition } = conditionObject
  const { column, operator = 'IN', table, tableColumn, procedure } =
    condition || {}
  switch (type) {
    case conditionTypes.BOOLEAN:
      return condition.condition ? condition.condition : 'true'
    case conditionTypes.TABLE:
      const parentPolicyArray =
        tables[table].policy &&
        tables[table].policy[operationName] &&
        tables[table].policy[operationName].users &&
        tables[table].policy[operationName].users[userName] &&
        tables[table].policy[operationName].users[userName].conditions
          ? Object.values(
              tables[table].policy[operationName].users[userName].conditions
            )
          : []
      // group by policy type (PERMISSIVE or RESTRICTIVE)
      const parentPolicyGrouped = parentPolicyArray.reduce(
        (acc, item) => ({
          ...acc,
          [item.type]: { ...acc[item.type], [item.key]: { ...item } }
        }),
        {}
      )
      return `${snakeCase(column)} ${operator} (SELECT ${snakeCase(
        tableColumn
      )} FROM ${snakeCase(table)}${
        tables[table].policy
          ? parentPolicyGrouped[policyTypes.PERMISSIVE]
            ? ' WHERE ' +
              composition(
                Object.values(parentPolicyGrouped[policyTypes.PERMISSIVE])
                  .map(
                    item =>
                      !item[typeOfConstraint] ||
                      condition2str({
                        conditionObject: item[typeOfConstraint],
                        operationName,
                        userName,
                        tables,
                        typeOfConstraint
                      })
                  )
                  .filter(item => !!item),
                policyTypes.PERMISSIVE
              ) +
              (parentPolicyGrouped[policyTypes.RESTRICTIVE]
                ? composition(
                    Object.values(parentPolicyGrouped[policyTypes.RESTRICTIVE])
                      .map(
                        item =>
                          !item[typeOfConstraint] ||
                          condition2str({
                            conditionObject: item[typeOfConstraint],
                            operationName,
                            userName,
                            tables,
                            typeOfConstraint
                          })
                      )
                      .filter(item => !!item),
                    policyTypes.RESTRICTIVE
                  )
                : '')
            : // condition2str(
              //   parentPolicy,
              //   table,
              //   operationName,
              //   userName,
              //   tables,
              //   typeOfConstraint
              // )
              'false'
          : ''
      })`
    case conditionTypes.FUNCTION:
      return `${snakeCase(column)} = ${snakeCase(procedure)}()`
    default:
      return 'true'
  }
}

module.exports = condition2str
