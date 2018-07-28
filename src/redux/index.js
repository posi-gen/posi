import { init } from '@rematch/core'
import selectorsPlugin from '@rematch/select'
import createRematchPersist from '@rematch/persist'
import * as models from './models'

import { createReactRouterPlugin } from './reactRouterPlugin'
export default (initialState = {}) => {
  const persistPlugin = createRematchPersist({
    // blackList: ['router'],
    // throttle: 5000,
    version: 1
  })
  return init({
    models,
    redux: {
      initialState,
      // reducers,
      // middlewares
      devtoolOptions: {
        disabled: process.env.NODE_ENV !== 'development'
      }
    },
    plugins: [createReactRouterPlugin(), persistPlugin, selectorsPlugin()]
  })
}
