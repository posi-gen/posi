import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Button } from 'ui'
import { bindActionCreators } from 'redux'
import { CommandContainer } from 'components'

class _CommandPanel extends Component {
  addTable = evt => {
    const { add, push, branch } = this.props
    add()
    push('/' + branch + 's/*')
  }

  cleanAll = evt => {
    const { clean } = this.props
    clean()
  }

  render() {
    const { branch } = this.props
    return (
      <CommandContainer>
        <Button
          buttonStyle="primary"
          onClick={this.addTable}
          children={`Add ${branch}`}
        />
        <Button
          buttonStyle="accent"
          ml={1}
          onClick={this.cleanAll}
          children="Clean all"
        />
      </CommandContainer>
    )
  }
}

const mapDispatch = (dispatch, { branch }) => ({
  add: dispatch[branch].add,
  clean: dispatch[branch].clean,
  push: bindActionCreators(push, dispatch)
})

export const CommandPanel = connect(
  null,
  mapDispatch
)(_CommandPanel)
