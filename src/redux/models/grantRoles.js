import { reducers, selectors } from './dependentTable'
import { getEffEdit, getAddAndGo } from '../helpers'

export const branchName = 'grantRoles'

export const grantRoles = {
  state: {},
  reducers: {
    ...reducers,
    check: (state, { parent, key }) => {
      const parentState = state[parent] || {}
      const { [key]: grant, ...rest } = parentState
      return { ...state, [parent]: { ...rest, [key]: { data: { key } } } }
    }
  },
  selectors,
  effects: dispatch => ({
    addAndGo: getAddAndGo(branchName, dispatch),
    effEdit: getEffEdit(branchName, dispatch)
  })
}
