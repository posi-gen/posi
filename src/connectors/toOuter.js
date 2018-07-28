import { outerRoleKey, getType } from './service'

export const toOuter = ({
  database: innerDatabase,
  schema = {},
  extension = {},
  role = {},
  grantRoles: innerGrantRoles = {},
  grants: innerGrants = {},
  policy: innerPolicy = {},
  composite = {},
  compositeColumn = {},
  table = {},
  column = {}
}) => {
  // database
  const {
    key: dbName,
    roleForLogin,
    roleForAdmin,
    roleForAuthorized,
    roleForAnonymous,
    ...restDbData
  } = innerDatabase.data
  const database = {
    key: dbName,
    roleForLogin: outerRoleKey({ dbName, key: roleForLogin }),
    roleForAdmin: outerRoleKey({ dbName, key: roleForAdmin }),
    roleForAuthorized: outerRoleKey({ dbName, key: roleForAuthorized }),
    roleForAnonymous: outerRoleKey({ dbName, key: roleForAnonymous }),
    ...restDbData
  }

  // schemas
  const schemas = Object.keys(schema).reduce((acc, key) => {
    const data = schema[key].data || { key: key }
    return { ...acc, [key]: data }
  }, {})

  // extensions
  const extensions = Object.keys(extension).reduce((acc, key) => {
    const data = extension[key].data || { key: key }
    return { ...acc, [key]: data }
  }, {})

  // roles
  const roles = Object.keys(role).reduce((acc, key) => {
    // role
    const outerKey = outerRoleKey({ dbName, key })
    const data = role[key].data || { key: key }

    // grantRoles
    const grantRoles = innerGrantRoles[key]
      ? {
          grantRoles: Object.keys(innerGrantRoles[key]).reduce(
            (acc, grantRoleKey) => {
              const grantRoleData = innerGrantRoles[key][grantRoleKey].data || {
                key: grantRoleKey
              }
              const grantRoleOuterKey = outerRoleKey({
                dbName,
                key: grantRoleKey
              })
              return {
                ...acc,
                [grantRoleOuterKey]: {
                  ...grantRoleData,
                  key: grantRoleOuterKey
                }
              }
            },
            {}
          )
        }
      : {}

    // grants
    const grants = innerGrants[key]
      ? {
          grants: Object.keys(innerGrants[key]).reduce((acc, grantKey) => {
            const grantData = innerGrants[key][grantKey].data
            return grantData ? { ...acc, [grantKey]: grantData } : acc
          }, {})
        }
      : {}

    return {
      ...acc,
      [outerKey]: { ...data, ...grantRoles, ...grants, key: outerKey }
    }
  }, {})

  // composites
  const composites = Object.keys(composite).reduce((acc, tableKey) => {
    // table
    const tableData = composite[tableKey].data || { key: tableKey }

    // columns
    const _columns = compositeColumn[tableKey] || {}
    const columns = Object.keys(_columns).reduce((acc, columnKey) => {
      const columnData = _columns[columnKey].data || { key: columnKey }
      const { key = columnKey, type: innerType = {} } = columnData
      const { typeGroup, type } = innerType
      const fkeyColumns = compositeColumn[type] || {}
      const realType =
        typeGroup === 'baseTypes'
          ? type
          : Object.keys(fkeyColumns).reduce((acc, column) => {
              const fkeyColumn = fkeyColumns[column].data || { type: {} }
              return fkeyColumn.pkey ? fkeyColumn.type.type : acc
            }, null)
      return { ...acc, [columnKey]: { key, type: getType(realType) } }
    }, {})

    // out
    return { ...acc, [tableKey]: { ...tableData, columns } }
  }, {})

  // tables
  const tables = Object.keys(table).reduce((acc, tableKey) => {
    // table
    const tableData = table[tableKey].data || { key: tableKey }

    // columns
    const _columns = column[tableKey] || {}
    const columns = Object.keys(_columns).reduce((acc, columnKey) => {
      const columnData = _columns[columnKey].data || { key: columnKey }
      const { key = columnKey, type: innerType = {} } = columnData
      const { typeGroup, type } = innerType
      const notNull = columnData.notNull ? { notNull: true } : {}
      const comment = columnData.comment ? { comment: columnData.comment } : {}
      const fkeyColumns = column[type] || {}
      const realType =
        typeGroup === 'baseTypes'
          ? type
          : Object.keys(fkeyColumns).reduce((acc, column) => {
              const fkeyColumn = fkeyColumns[column].data || { type: {} }
              return fkeyColumn.pkey ? getType(fkeyColumn.type.type) : acc
            }, null)
      return {
        ...acc,
        [columnKey]: { key, type: realType, ...notNull, ...comment }
      }
    }, {})

    // pkey
    const pkey = Object.keys(_columns).reduce((acc, columnKey) => {
      const columnData = _columns[columnKey].data || {}
      return columnData.pkey ? { ...acc, [columnKey]: { key: columnKey } } : acc
    }, {})

    // fkeys
    const fkeys = Object.keys(_columns).reduce((acc, columnKey) => {
      const columnData = _columns[columnKey].data || {}
      const { typeGroup, type } = columnData.type || {}
      return typeGroup === 'tables'
        ? {
            ...acc,
            ['fkey_' + tableKey + '_' + columnKey]: {
              key: 'fkey_' + tableKey + '_' + columnKey,
              column: columnKey,
              reference: type
            }
          }
        : acc
    }, {})

    //indexes
    const indexes = Object.keys(_columns).reduce((acc, columnKey) => {
      const columnData = _columns[columnKey].data || { key: columnKey }
      const { key, index, unique } = columnData
      if (index || unique) {
        const indexName = tableKey + '_' + key + '_idx'
        const uniqueObject = columnData.unique ? { unique: true } : {}
        return {
          ...acc,
          [indexName]: {
            key: indexName,
            method: 'btree',
            ...uniqueObject,
            parts: { [key]: { key, column: key } }
          }
        }
      }

      return acc
    }, {})

    // policy
    const policy = getPolicy({
      table: tableKey,
      policy: normalizePolicy(innerPolicy),
      dbName
    })

    // out
    return {
      ...acc,
      [tableKey]: {
        ...tableData,
        columns,
        ...(Object.keys(pkey).length > 0 ? { pkey } : {}),
        ...(Object.keys(fkeys).length > 0 ? { fkeys } : {}),
        ...(Object.keys(indexes).length > 0 ? { indexes } : {}),
        ...(Object.keys(policy).length > 0 ? { policy } : {})
      }
    }
  }, {})
  return { database, schemas, extensions, roles, composites, tables }
}

const normalizePolicy = policy =>
  Object.keys(policy).reduce((acc, userKey) => {
    const userData = policy[userKey]
    const newData = Object.keys(userData).reduce(
      (acc, key) => ({
        ...acc,
        [userKey + '_' + key]: { ...(userData[key].data || {}) }
      }),
      {}
    )
    return { ...acc, ...newData }
  }, {})

const getPolicy = ({ table, policy: allPolicy = {}, dbName }) => {
  const policy = Object.values(allPolicy).filter(item => item.table === table)
  const grants = policy
    .map(item => item.grantType)
    .filter((item, index, self) => self.indexOf(item) === index)
  return grants.reduce((acc, grantType) => {
    const grant = policy.filter(item => item.grantType === grantType)
    const _users = grant
      .map(item => item.user)
      .filter((item, index, self) => self.indexOf(item) === index)
    const users = _users.reduce((acc, userKey) => {
      const user = grant.filter(item => item.user === userKey)
      const _conditions = user
        .map(item => item.policyKey)
        .filter((item, index, self) => self.indexOf(item) === index)
      const conditions = _conditions.reduce((acc, policyKey) => {
        const policies = user.filter(item => item.policyKey === policyKey)
        const conditions = Object.values(policies).reduce((acc, item) => {
          const check = item.check ? { check: item.check } : {}
          const using = item.using ? { using: item.using } : {}
          return { ...acc, ...check, ...using }
        }, {})
        return {
          ...acc,
          [policyKey]: {
            key: policyKey,
            type: 'PERMISSIVE',
            ...conditions
          }
        }
      }, {})
      const outerUserKey = outerRoleKey({ dbName, key: userKey })
      return { ...acc, [outerUserKey]: { key: outerUserKey, conditions } }
    }, {})
    return { ...acc, [grantType]: { key: grantType, users } }
  }, {})
}
