import { reducers, selectors } from './mainTable'

export const composite = {
  state: {},
  reducers: { ...reducers },
  selectors: { ...selectors }
}

export const branchName = 'composite'
