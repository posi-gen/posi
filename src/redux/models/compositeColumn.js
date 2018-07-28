import { reducers } from './dependentTable'
import { getEffEdit, getAddAndGo } from '../helpers'

export const branchName = 'compositeColumn'

export const compositeColumn = {
  state: {},
  reducers: { ...reducers },
  effects: dispatch => ({
    addAndGo: getAddAndGo(branchName, dispatch),
    effEdit: getEffEdit(branchName, dispatch)
  })
}
