const getAll = state => Object.keys(state).filter(item => item !== '')

const getItem = (state, key) => {
  const itemState = state[key] || {}
  const { data, newData } = itemState
  return newData ? newData : data
}

const getKey = key => (key === '*' ? '' : key)

export const reducers = {
  add(state) {
    return { ...state, '': { data: { key: '' } } }
  },
  edit(state, data) {
    const { originalKey: key, ...newData } = data
    return {
      ...state,
      [getKey(key)]: { data: state[getKey(key)].data, newData }
    }
  },
  editCancel(state, key) {
    return { ...state, [getKey(key)]: { data: state[getKey(key)].data } }
  },
  save(state, key) {
    const oldKey = getKey(key)
    const { data, newData } = state[oldKey]
    const newKey = newData && newData.key ? newData.key : getKey(key)
    const { [oldKey]: deletedItem, ...rest } = state
    return { ...rest, [newKey]: { data: newData ? newData : data } }
  },
  delete(state, key) {
    const { [getKey(key)]: removedItem, ...newState } = state
    return newState
  },
  clean() {
    return {}
  },
  load(state, loadingData) {
    return { ...state, ...loadingData }
  }
}

export const selectors = {
  getAll,
  getItem
}
