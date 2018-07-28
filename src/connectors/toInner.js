import { innerRoleKey } from './service'

export const toInner = ({
  database: outerDatabase,
  schemas = {},
  extensions = {},
  roles = {},
  composites = {},
  tables = {}
}) => {
  // database
  const {
    key: dbName,
    roleForLogin,
    roleForAdmin,
    roleForAuthorized,
    roleForAnonymous,
    ...restDbData
  } = outerDatabase
  const database = {
    data: {
      key: dbName,
      roleForLogin: innerRoleKey({ dbName, key: roleForLogin }),
      roleForAdmin: innerRoleKey({ dbName, key: roleForAdmin }),
      roleForAuthorized: innerRoleKey({ dbName, key: roleForAuthorized }),
      roleForAnonymous: innerRoleKey({ dbName, key: roleForAnonymous }),
      ...restDbData
    }
  }

  // composite
  const schema = Object.values(schemas).reduce(
    (acc, item) => ({ ...acc, [item.key]: { data: { ...item } } }),
    {}
  )

  // extension
  const extension = Object.values(extensions).reduce(
    (acc, item) => ({ ...acc, [item.key]: { data: { ...item } } }),
    {}
  )

  // roles
  const role = Object.values(roles).reduce((acc, item) => {
    const { key, grantRoles, grants, ...itemData } = item
    const innerKey = innerRoleKey({ dbName, key })
    return { ...acc, [innerKey]: { data: { key: innerKey, ...itemData } } }
  }, {})

  // grantRoles
  const grantRoles = Object.keys(roles).reduce((acc, roleKey) => {
    const _grantRoles = roles[roleKey].grantRoles || {}
    const grantRoles = Object.values(_grantRoles).reduce(
      (acc, { key, ...rest }) => ({
        ...acc,
        [innerRoleKey({ dbName, key })]: {
          data: { ...rest, key: innerRoleKey({ dbName, key }) }
        }
      }),
      {}
    )
    const innerKey = innerRoleKey({ dbName, key: roleKey })
    return roles[roleKey].grantRoles ? { ...acc, [innerKey]: grantRoles } : acc
  }, {})

  // grants
  const grants = Object.keys(roles).reduce((acc, roleKey) => {
    const _grants = roles[roleKey].grants || {}
    const grants = Object.values(_grants).reduce(
      (acc, item) => ({ ...acc, [item.key + '_' + item.type]: { data: item } }),
      {}
    )
    const innerKey = innerRoleKey({ dbName, key: roleKey })
    return roles[roleKey].grants ? { ...acc, [innerKey]: grants } : acc
  }, {})

  // policy
  const policy = Object.values(tables).reduce((acc, table) => {
    const { key: tableKey, policy = {} } = table
    const typesData = Object.values(policy).reduce((acc, type) => {
      const { key: typeKey, users = {} } = type
      const usersData = Object.values(users).reduce((acc, user) => {
        const { key: userKey, conditions = {} } = user
        const _conditions = Object.values(conditions)
        if (_conditions.length === 0) return acc
        else {
          const condition = _conditions[0]
          const { check, using, type: policyType, key: policyKey } = condition
          const commonKey = tableKey + '_' + typeKey + '_'
          const innerUserKey = innerRoleKey({ dbName, key: userKey })
          const commonData = {
            table: tableKey,
            grantType: typeKey,
            user: innerUserKey
          }
          const checkData = check
            ? {
                [commonKey + 'check']: {
                  data: {
                    key: commonKey + 'check',
                    type: typeKey + '_check',
                    ...commonData,
                    policyType,
                    policyKey,
                    conditionType: 'check',
                    check
                  }
                }
              }
            : {}
          const usingData = using
            ? {
                [commonKey + 'using']: {
                  data: {
                    key: commonKey + 'using',
                    type: typeKey + '_using',
                    ...commonData,
                    policyType,
                    policyKey,
                    conditionType: 'using',
                    using
                  }
                }
              }
            : {}
          return {
            ...acc,
            [innerUserKey]: {
              ...(acc[innerUserKey] || {}),
              ...checkData,
              ...usingData
            }
          }
        }
      }, {})
      return Object.keys(usersData).reduce(
        (a, userKey) => ({
          ...a,
          [userKey]: { ...(a[userKey] || {}), ...usersData[userKey] }
        }),
        acc
      )
    }, {})
    return Object.keys(typesData).reduce(
      (a, userKey) => ({
        ...a,
        [userKey]: { ...(a[userKey] || {}), ...typesData[userKey] }
      }),
      acc
    )
  }, {})

  // composite
  const composite = Object.values(composites).reduce(
    (acc, item) => ({ ...acc, [item.key]: { data: { ...item } } }),
    {}
  )

  // composite columns
  const compositeColumn = getColumns(composites)

  // table
  const table = Object.values(tables).reduce(
    (acc, item) => ({ ...acc, [item.key]: { data: { ...item } } }),
    {}
  )

  // table columns
  const column = getColumns(tables)

  return {
    database,
    schema,
    extension,
    role,
    grantRoles,
    grants,
    policy,
    composite,
    compositeColumn,
    table,
    column
  }
}

const getColumns = data =>
  Object.values(data).reduce(
    (acc, table) => ({
      ...acc,
      [table.key]: Object.values(table.columns).reduce((acc, column) => {
        const fkeys = data[table.key].fkeys || {}
        const { typeGroup, type } = Object.values(fkeys).reduce(
          (acc, fkey) =>
            fkey.column === column.key
              ? { typeGroup: 'tables', type: fkey.reference }
              : acc,
          { typeGroup: 'baseTypes', type: column.type }
        )
        const pkey =
          table.pkey &&
          Object.keys(table.pkey).reduce(
            (acc, item) => acc || item === column.key,
            false
          )
        const { index, unique } = Object.values(table.indexes || {}).reduce(
          (acc, index) => {
            const isIndex = Object.values(index.parts).reduce(
              (acc, part) => acc || part.key === column.key,
              false
            )
            return {
              index: acc.index || isIndex,
              unique: acc.unique || (isIndex && index.unique)
            }
          },
          { index: false, unique: false }
        )
        return {
          ...acc,
          [column.key]: {
            data: {
              ...column,
              type: {
                typeGroup,
                type
              },
              oldKey: column.key,
              pkey,
              index,
              unique
            }
          }
        }
      }, {})
    }),
    {}
  )
