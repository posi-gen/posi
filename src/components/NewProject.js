import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'ui'

export class NewProjectComponent extends Component {
  onClick = evt => {
    this.props.createNewProject()
  }

  render() {
    const { createNewProject, ...props } = this.props
    return (
      <Button
        children="Create a new project"
        onClick={this.onClick}
        buttonStyle="primary"
        {...props}
      />
    )
  }
}

const mapDispatch = dispatch => ({
  createNewProject: dispatch.database.createNewProject
})

export const NewProject = connect(
  null,
  mapDispatch
)(NewProjectComponent)
