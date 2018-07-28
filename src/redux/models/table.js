import { reducers, selectors } from './mainTable'
// import { Object } from 'core-js'

export const table = {
  state: {},
  reducers: { ...reducers },
  selectors: { ...selectors }
}

export const branchName = 'table'
