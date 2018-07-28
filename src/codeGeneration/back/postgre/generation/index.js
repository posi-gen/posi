const roles2str = require('./roles.js')
const grantRoles2str = require('./grantRoles')
const tables2str = require('./tables')
const fkeys2str = require('./fkeys')
const grants2str = require('./grants')
const enums2str = require('./enums')
const domains2str = require('./domains')
const composites2str = require('./composites')
const schemas2str = require('./schemas')
// const { functions } = require('./functions')
const extensions2str = require('./extensions')
const { auth2str } = require('./auth')
const { policy2str } = require('./policy')
const { initialFilling } = require('./initialFilling')
const { grantsSequence } = require('./grantsSequence')

export const JSON2SQL = async settings => {
  const {
    database,
    roles,
    schemas,
    extensions,
    enums,
    domains,
    composites,
    tables
  } = settings
  const _roles = '--ROLES\n' + roles2str(roles)
  const _grantRoles = '--GRANTS\n' + grantRoles2str(roles)
  const _schemas = '--SCHEMAS\n' + schemas2str(schemas, database)
  const _extensions = '--EXTENSIONS\n' + extensions2str(extensions)
  const _enums = '--ENUMS\n' + enums2str(enums)
  const _domains = '--DOMAINS\n' + domains2str(domains)
  const _composites = '--COMPOSITES\n' + composites2str(composites)
  const _tables = '--TABLES\n' + tables2str(tables)
  const _fkeys = '\n--FOREIGN KEYS\n' + fkeys2str(tables)
  // const _functions = '--FUNCTIONS\n' + functions()
  const _grants = '--GRANTS\n' + grants2str(roles)
  const _grantsSequence = '\n\n' + grantsSequence({ tables, roles })
  const _addition = '\n\n--AUTH\n' + auth2str({ database, roles })
  const _policy = '\n\n--POLICY\n' + policy2str(tables)
  const _initialFilling = '\n--INITIAL FILLING\n' + initialFilling({ database })

  return (
    'BEGIN;\n\n' +
    _roles +
    _schemas +
    _extensions +
    _enums +
    _domains +
    _composites +
    _grantRoles +
    _tables +
    // _functions +
    _fkeys +
    _grants +
    _grantsSequence +
    _addition +
    _policy +
    _initialFilling +
    '\n\nCOMMIT;'
  )
}

// exports const = JSON2SQL
