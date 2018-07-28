import { createSelector } from 'reselect'

const getAll = branch => (state, parent) => {
  const parentState = state[branch][getKey(parent)] || {}
  return Object.keys(parentState, parent)
    .filter(key => !(parentState[key].deleted === true))
    .sort((a, b) => ('' ? true : a > b))
}

const getItem = branch => (state, { parent, key }) => {
  const parentState = state[branch][getKey(parent)] || {}
  const itemKey = getKey(key)
  const { data, newData } = parentState[itemKey] || {}
  return { ...(data || {}), ...(newData || {}) }
}

const getKey = key => (key === '*' ? '' : key)

export const reducers = {
  add(state, parent) {
    const parentKey = getKey(parent)
    const parentState = state[parentKey] || {}
    return {
      ...state,
      [parentKey]: {
        ...parentState,
        _new: { newData: { key: '_new' } }
      }
    }
  },
  edit(state, { parent, data }) {
    const parentKey = getKey(parent)
    const oldKey = getKey(data.oldKey || '')
    const key = getKey(data.key || '')
    const { [oldKey]: oldData, ...parentState } = state[parentKey] || {}
    return {
      ...state,
      [parentKey]: {
        ...parentState,
        [key]: { data: oldData.data, newData: data }
      }
    }
  },
  delete(state, { parent, key }) {
    const parentKey = getKey(parent)
    const parentState = state[parentKey] || {}
    const itemKey = getKey(key)
    const itemState = parentState[itemKey] || {}
    return {
      ...state,
      [parentKey]: {
        ...parentState,
        [itemKey]: { ...itemState, deleted: true }
      }
    }
  },
  deleteAll(state, parent) {
    const { [getKey(parent)]: removedItem, ...newState } = state
    return newState
  },
  clean(state) {
    return {}
  },
  save(state, { parent, newParent }) {
    const parentKey = getKey(parent)
    const newParentKey = getKey(newParent)
    // const parentState = state[parentKey] || {}
    const { [parentKey]: parentState = {}, ...restState } = state
    const newParentState = Object.values(parentState)
      .filter(item => !item.deleted === true)
      .map(item => {
        const { data, newData } = item
        return newData || data
      })
      .reduce((acc, item) => ({ ...acc, [item.key]: { data: item } }), {})
    return { ...restState, [newParentKey]: newParentState }
  },
  cancel(state, parent) {
    const parentKey = getKey(parent)
    const parentState = state[parentKey] || {}
    const newParentState = Object.keys(parentState)
      .map(key => {
        const item = parentState[key] || {}
        return item.data
      })
      .filter(item => item)
      .reduce((acc, item) => ({ ...acc, [item.key]: { data: item } }), {})
    return { ...state, [parent]: newParentState }
  },
  load(state, loadingData) {
    return { ...state, ...loadingData }
  }
}

export const selectors = {
  getAll: (state, parent) => {
    const parentState = state[getKey(parent)] || {}
    return Object.keys(parentState)
      .filter(key => !(parentState[key].deleted === true))
      .sort((a, b) => ('' ? true : a > b))
  },
  getItem: (state, { parent, key }) => {
    const parentState = state[getKey(parent)] || {}
    const itemKey = getKey(key)
    const { data, newData } = parentState[itemKey] || {}
    return { ...(data || {}), ...(newData || {}) }
  }
}

export const makeGetAllForBranch = branch => () =>
  createSelector(getAll(branch), a => a)
export const makeGetItemForBranch = branch => () =>
  createSelector(getItem(branch), a => a)
