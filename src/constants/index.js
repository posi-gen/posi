import { pgBaseTypes } from './pgBaseTypes'

export const types = {
  default: 'baseTypes',
  groups: {
    baseTypes: {
      key: 'baseTypes',
      display: 'Base types',
      types: pgBaseTypes,
      default: pgBaseTypes.NUMERIC.key
    },
    tables: {
      key: 'tables',
      display: 'Tables',
      typesInReduxKey: 'tables'
    },
    userTypes: {
      key: 'userTypes',
      display: 'User types',
      typesInReduxKey: 'userTypes'
    }
  }
}

export const policyTypes = {
  default: 'BOOLEAN',
  types: {
    BOOLEAN: {
      key: 'BOOLEAN',
      defaultField: 'condition',
      default: false
    },
    FUNCTION: {
      key: 'FUNCTION',
      defaultField: 'procedure',
      default: 'current_person_id',
      options: ['current_person_id']
    },
    TABLE: {
      key: 'TABLE'
    }
  }
}
