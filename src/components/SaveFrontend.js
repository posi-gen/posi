import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ButtonOutline } from 'ui'
import JSZip from 'jszip'
import fileSaver from 'file-saver'
import { toOuter } from 'connectors'
import { createFront } from 'codeGeneration'

const createZip = (zip, obj) => {
  const fileNames = Object.keys(obj)
  fileNames.forEach(fileName => {
    const data = obj[fileName]
    if (typeof data !== 'object') {
      zip.file(fileName, data)
    } else {
      createZip(zip.folder(fileName), data)
    }
  })
}

export class _SaveFrontend extends Component {
  onClick = async () => {
    const outerData = toOuter(this.props.state)
    const fproject = createFront(outerData)
    const zip = new JSZip()
    createZip(zip, fproject.client)
    const zipArchive = await zip.generateAsync({ type: 'blob' })
    fileSaver.saveAs(zipArchive, 'posiProject.zip')
  }

  render() {
    const { state, dispatch, ...props } = this.props
    return (
      <ButtonOutline
        children="Save frontend"
        onClick={this.onClick}
        {...props}
      />
    )
  }
}

const mapState = state => ({
  state
})

export const SaveFrontend = connect(mapState)(_SaveFrontend)
