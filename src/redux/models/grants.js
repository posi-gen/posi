export const grants = {
  state: {},
  reducers: {
    edit(state, { role, type, object, newData }) {
      const key = object + '_' + type
      const { [role]: roleState, ...restState } = state
      const { [key]: objectState, ...restRoleState } = roleState
      const data =
        roleState[key] && roleState[key].data
          ? { data: roleState[key].data }
          : {}
      return {
        ...restState,
        [role]: { ...restRoleState, [key]: { ...data, newData } }
      }
    },
    save(state, { parent, newParent }) {
      const { [parent]: roleStateOld = {}, ...restState } = state
      const roleState = Object.keys(roleStateOld).reduce((acc, item) => {
        const data = roleStateOld[item].newData
          ? roleStateOld[item].newData
          : roleStateOld[item].data
        return { ...acc, [item]: { data } }
      }, {})
      return { ...restState, [newParent]: roleState }
    },
    load(state, loadingData) {
      return { ...loadingData }
    },
    clean(state) {
      return {}
    }
  },
  selectors: {
    getAll: (state, { role, type }) => {
      return Object.values(state[role] || {}).filter(item => item.type === type)
    },
    getItem: (state, { role, type, object }) => {
      const key = object + '_' + type
      const editedData =
        state[role] && state[role][key] ? state[role][key] : { data: {} }
      const currentData = editedData.newData
        ? editedData.newData
        : editedData.data
      return currentData.permissions || []
    }
  }
}

export const branchName = 'grants'
