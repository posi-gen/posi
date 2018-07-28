const { titleCase } = require('change-case')
const { pluralizeName } = require('./queries')

const createSidebar = tables => {
  const tableNames = Object.keys(tables)
  const tableToButton = (acc, tableName) =>
    acc +
    `
          <Tab is={NavLink} mx={[0, 2]} to={'/${pluralizeName(tableName)}'}>
            <Text textAlign="left">${titleCase(pluralizeName(tableName))}</Text>
          </Tab>`

  return `
  import React, { Component } from 'react'
  
  import { NavLink, Tabs, Tab, Text } from 'ui'
  
  export class SideBar extends Component {

    render() {
      return (
        <Tabs
          flexDirection="column"
          borderRight={1}
          borderBottom={0}
          alignItems="stretch"
      >${tableNames.reduce(tableToButton, '')}
        </Tabs>
      )
    }
  }  
  `
}

module.exports = { createSidebar }
