import React, { Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'

import { Flex, NavLink, Tabs, Tab, Text, Heading } from 'ui'
import {
  NewProject,
  CleanAll,
  SaveFrontend,
  SaveBackend,
  SaveAll,
  EditDatabaseName,
  EditDefaultAdminLogin,
  EditDefaultAdminPassword,
  SelectRoleForLogin,
  MainTables,
  CommandContainer,
  MainContainer
} from 'components'

const routes = [
  {
    key: 'role',
    path: '/roles',
    title: 'Roles'
  },
  {
    key: 'table',
    path: '/tables',
    title: 'Tables'
  },
  {
    key: 'composite',
    path: '/composites',
    title: 'Composites'
  }
]

const TabLink = ({ path, title, match, exact }) => (
  <Tab is={NavLink} to={match.path + path} exact={exact}>
    <Text textAlign="left">{title}</Text>
  </Tab>
)

export const Home = ({ match }) => (
  <Fragment>
    <Heading my={1}>Home</Heading>
    <Flex mx={2} px={1}>
      <Tabs
        flexDirection="column"
        alignItems="stretch"
        borderBottom={0}
        borderRight={1}
      >
        <TabLink path={''} match={match} exact={true} title="Main" />
        {routes.map(el => <TabLink {...el} match={match} />)}
      </Tabs>
      <Switch>
        <Route
          path={match.path}
          exact
          render={props => (
            <MainContainer w={1}>
              <CommandContainer>
                <NewProject /> <CleanAll />
              </CommandContainer>
              <EditDatabaseName />
              <SelectRoleForLogin />
              <EditDefaultAdminLogin />
              <EditDefaultAdminPassword />
              <CommandContainer flexDirection={['column', 'row']} mt={4}>
                <SaveFrontend />
                <SaveBackend />
                <SaveAll />
              </CommandContainer>
            </MainContainer>
          )}
        />
        {routes.map(({ key, path }, i) => (
          <Route
            key={key}
            path={match.path + path}
            render={props => <MainTables branch={key} {...props} path={path} />}
          />
        ))}
      </Switch>
    </Flex>
  </Fragment>
)
