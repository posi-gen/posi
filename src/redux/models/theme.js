import { themes, defaultTheme } from 'styles'

export const theme = {
  state: { active: defaultTheme, ...themes }, // initial state
  reducers: {
    // handle state changes with pure functions
    change(state, value) {
      return { active: value ? 'light' : 'dark', ...themes }
    }
  }
}
