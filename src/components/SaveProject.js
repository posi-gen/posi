import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'ui'
import JSZip from 'jszip'
import fileSaver from 'file-saver'
import { toOuter } from 'connectors'

import { Box } from 'ui'

export class _SaveProject extends Component {
  onClick = async evt => {
    const outerData = toOuter(this.props.state)
    const zip = new JSZip()
    zip.file('settings.json', JSON.stringify(outerData, null, 2))
    const zipArchive = await zip.generateAsync({ type: 'blob' })
    fileSaver.saveAs(zipArchive, 'posiProject.zip')
  }

  render() {
    const { state, dispatch, ...props } = this.props
    return (
      <Box>
        <Button
          children="Save current project"
          onClick={this.onClick}
          {...props}
        />
      </Box>
    )
  }
}

const mapState = state => ({
  state
})

export const SaveProject = connect(mapState)(_SaveProject)
