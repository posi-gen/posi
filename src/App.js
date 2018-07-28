import React, { Fragment } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { withTheme } from 'styles'
import {
  Auth,
  Home,
  Roles,
  Role,
  Tables,
  Table,
  Composites,
  Composite,
  Settings
} from 'screens'
import { Navbar } from 'components'
import { Container } from 'ui'

const App = () => (
  <Fragment>
    <Navbar />
    <Container color="base" bg="bg">
      <Switch>
        <Redirect exact from="/" to="/main" />
        <Route path="/main" component={Home} />
        <Route path="/settings" component={Settings} />
        <Route exact path="/auth" component={Auth} />
        <Route exact path="/roles" component={Roles} />
        <Route path="/roles/:key" component={Role} />
        <Route exact path="/tables" component={Tables} />
        <Route path="/tables/:key" component={Table} />
        <Route exact path="/composites" component={Composites} />
        <Route path="/composites/:key" component={Composite} />
      </Switch>
    </Container>
  </Fragment>
)

export default withTheme(App)
