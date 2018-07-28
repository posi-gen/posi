import transform from 'lodash/transform'
import isEqual from 'lodash/isEqual'
import isObject from 'lodash/isObject'

import fkeys from './fkeys.json'

export const objectDifference = (object, base) => {
  return transform(object, (result, value, key) => {
    if (!isEqual(value, base[key])) {
      result[key] =
        isObject(value) && isObject(base[key])
          ? objectDifference(value, base[key])
          : value
    }
  })
}

export const getPatch = diff => {
  const keys = Object.keys(diff)
  return keys.reduce(
    (acc, key) =>
      typeof diff[key] === 'object'
        ? {
            ...acc,
            [key]: diff[key].value
          }
        : {
            ...acc,
            [key]: diff[key]
          },
    {}
  )
}

const getTransformKeys = (obj, key) => {
  return transform(
    obj[key],
    (result, value, key) => {
      ;(result[value] || (result[value] = [])).push(key)
    },
    {}
  )
}

const arrToObj = (arr, value) =>
  arr.reduce((acc, el) => ({ ...acc, [el]: { value } }), {})

const trObj = (obj, transformKeys) => {
  const keys = Object.keys(obj)
  return keys.reduce(
    (acc, key) => ({
      ...acc,
      ...arrToObj(transformKeys[key], obj[key])
    }),
    {}
  )
}

export const getInitValues = tableName => ({ location, ...rest }) => {
  const { nodeId, ...initValues } = rest[tableName] || {}
  const createValues = trObj(
    location.query || {},
    getTransformKeys(fkeys, tableName)
  )
  const initialValues = { ...initValues, ...createValues }
  return { initialValues }
}

export const required = value => (value ? undefined : 'Required')

export const subscription = { submitting: true, pristine: true }
