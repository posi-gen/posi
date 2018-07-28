import {
  routerReducer,
  push,
  replace,
  go,
  goBack,
  goForward
} from 'react-router-redux'

export const router = {
  baseReducer: routerReducer,
  effects: {
    push,
    replace,
    go,
    goBack,
    goForward
  }
}
