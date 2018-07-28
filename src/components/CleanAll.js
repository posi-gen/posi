import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'ui'

export class _CleanAll extends Component {
  onClick = evt => {
    this.props.cleanAll()
  }

  render() {
    const { cleanAll, ...props } = this.props
    return (
      <Button
        buttonStyle="accent"
        children="Clean all"
        onClick={this.onClick}
        {...props}
      />
    )
  }
}

const mapDispatch = dispatch => ({
  cleanAll: dispatch.database.cleanAll
})

export const CleanAll = connect(
  null,
  mapDispatch
)(_CleanAll)
