import React from 'react'
import { connect } from 'react-redux'
import { Provider } from 'rebass'
import { withRouter } from 'react-router-dom'
import './globalStyles'

const mapState = ({ theme, router }) => ({ theme: theme[theme.active], router })

export const withTheme = App =>
  withRouter(
    connect(mapState)(({ theme, ...props }) => (
      <Provider theme={theme}>
        <App />
      </Provider>
    ))
  )
