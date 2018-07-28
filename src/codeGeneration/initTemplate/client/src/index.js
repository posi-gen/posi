import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as RebassProvider } from 'rebass'

import registerServiceWorker from './registerServiceWorker'

import { App } from './App'
import { theme } from 'styles'
import 'styles/globalStyles'

ReactDOM.render(
  <RebassProvider theme={theme}>
    <App />
  </RebassProvider>,
  document.getElementById('root')
)

registerServiceWorker()
