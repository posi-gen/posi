import React, { Component } from 'react'

import { Box, Flex, Fixed, Hide, Button, Tabs, Tab, NavLink } from 'ui'
import { SignLinks } from './sign'

const Links = ({ isOpen, onClick }) => (
  <Hide
    onClick={onClick}
    hidden={!isOpen && [true, false]}
    flexDirection={['column', 'row']}
    w={1}
    alignItems={['flex-start', 'center']}
  >
    <Box mx="auto" />
    <Box mx="auto" />
    <SignLinks />
  </Hide>
)

export class Navbar extends Component {
  state = { isOpen: false }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  handleOnClick = event => {
    if (this.state.isOpen) {
      this.toggle()
    }
  }
  render() {
    const { isOpen } = this.state
    return (
      <Fixed top={0} left={0} right={0}>
        <Flex
          color="bg"
          bg="base"
          align="center"
          flexDirection={['column', 'row']}
          alignItems={['stretch', 'center']}
          px={[0, 3]}
          py={2}
        >
          <Tabs borderBottom={0}>
            <Tab is={NavLink} mx={0} exact to={'/'} onClick={this.toggle}>
              PROJECT
            </Tab>
            <Box mx="auto" />
            <Hide hidden={[false, true]} alignItems="center">
              <Button buttonStyle="dark" onClick={this.toggle}>
                MENU
              </Button>
            </Hide>
          </Tabs>
          <Box mx="auto" />
          <Links isOpen={isOpen} onClick={this.handleOnClick} />
        </Flex>
      </Fixed>
    )
  }
}
