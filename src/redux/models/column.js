import { reducers, selectors } from './dependentTable'
import { getEffEdit, getAddAndGo } from '../helpers'

export const branchName = 'column'

export const column = {
  state: {},
  reducers,
  selectors,
  effects: dispatch => ({
    addAndGo: getAddAndGo(branchName, dispatch),
    effEdit: getEffEdit(branchName, dispatch)
  })
}
