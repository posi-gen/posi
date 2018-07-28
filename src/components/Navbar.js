import React, { Component } from 'react'
import {
  Hide,
  Box,
  Toolbar,
  Container,
  Flex,
  Fixed,
  Button,
  NavLink,
  Tabs,
  Tab
} from 'ui'

export class Navbar extends Component {
  state = { isOpen: false }
  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    const { isOpen } = this.state
    return (
      <Fixed top={0} left={0} right={0}>
        <Toolbar>
          <Container
            is={Flex}
            w={1}
            flexDirection={['column', 'row']}
            alignItems={['stretch', 'center']}
            my={2}
            color="bg"
            bg="base"
          >
            <Flex px={1}>
              <Tab is={NavLink} mx={2} to={'/main'}>
                Posi
              </Tab>
              <Box mx="auto" />
              <Hide hidden={[false, true]} alignItems="center">
                <Button buttonStyle="dark" onClick={this.toggle} m={0}>
                  Menu
                </Button>
              </Hide>
            </Flex>
            <Hide
              hidden={!isOpen && [true, false]}
              flexDirection={['column', 'row']}
              w={1}
              alignItems="flex-start"
              onClick={isOpen ? this.toggle : null}
            >
              <Box mx={'auto'} />
              <Tabs
                flexDirection={['column', 'row']}
                borderBottom={null}
                alignItems="flex-start"
                mr={2}
              >
                <Tab is={NavLink} mx={2} to={'/settings'}>
                  Settings
                </Tab>
                {/* <Tab is={NavLink} mx={[0, 2]} to={'/auth'}>
                  Auth
                </Tab>
                <Tab is={NavLink} mx={[0, 2]} to={'/roles'}>
                  Roles
                </Tab>
                <Tab is={NavLink} mx={[0, 2]} to={'/tables'}>
                  Tables
                </Tab>
                <Tab is={NavLink} mx={[0, 2]} to={'/composites'}>
                  Composites
                </Tab> */}
              </Tabs>
            </Hide>
          </Container>
        </Toolbar>
      </Fixed>
    )
  }
}
