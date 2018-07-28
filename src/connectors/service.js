import { pascalCase, camelCase } from 'change-case'
import { types } from '../constants'

export const innerRoleKey = ({ dbName, key }) =>
  camelCase(key.substring(dbName.length, key.length))

export const outerRoleKey = ({ dbName, key }) => dbName + pascalCase(key)

export const getType = type =>
  types.groups.baseTypes.types[type] && types.groups.baseTypes.types[type].real
    ? types.groups.baseTypes.types[type].real
    : type
