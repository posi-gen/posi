import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { getPersistor } from '@rematch/persist'
import { PersistGate } from 'redux-persist/es/integration/react'
import registerServiceWorker from './registerServiceWorker'

import App from './App'
import configureStore from './redux'
const store = configureStore()
const Loading = () => <div>Loading...</div>

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={getPersistor()}>
      <ConnectedRouter history={store.browserHistory}>
        <App />
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
