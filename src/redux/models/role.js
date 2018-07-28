import { reducers, selectors } from './mainTable'

export const role = {
  state: {},
  reducers: { ...reducers },
  selectors: {
    ...selectors,
    getAllWithLogin: state =>
      Object.keys(state).filter(
        item => item !== '' && state[item].data && state[item].data.login
      )
  }
}

export const branchName = 'role'
