import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Flex, Label, Switch } from 'ui'

class _ThemeChanger extends Component {
  state = {}

  static getDerivedStateFromProps({ activeTheme }) {
    return { checked: activeTheme === 'light' }
  }

  onSwitchClick = () => {
    const { changeTheme } = this.props
    changeTheme(!this.state.checked)
    this.setState({ checked: !this.state.checked })
  }

  render() {
    const { checked } = this.state
    return (
      <Flex flexDirection={'row'}>
        <Label children="Theme: " mr={2} />
        <Label children="Gray" />
        <Switch mx={2} checked={checked} onClick={this.onSwitchClick} />
        <Label children="Brown" />
      </Flex>
    )
  }
}

const mapState = ({ theme }) => ({ activeTheme: theme.active })

const mapDispatch = dispatch => ({
  changeTheme: dispatch.theme.change
})

export const ThemeChanger = connect(
  mapState,
  mapDispatch
)(_ThemeChanger)
