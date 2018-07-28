export const extension = {
  state: {},
  reducers: {
    edit(state, newData) {
      return { ...state, ...newData }
    },
    load(state, loadingData) {
      return { ...loadingData }
    },
    clean(state) {
      return {}
    }
  }
}

export const branchName = 'extension'
