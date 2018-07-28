import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ButtonOutline } from 'ui'
import JSZip from 'jszip'
import fileSaver from 'file-saver'
import { toOuter } from 'connectors'
import { JSON2SQL } from 'codeGeneration'

export class _SaveBackend extends Component {
  onClick = async evt => {
    const outerData = toOuter(this.props.state)
    const zip = new JSZip()
    zip.file('generated.sql', JSON2SQL(outerData), { binary: false })
    const zipArchive = await zip.generateAsync({ type: 'blob' })
    fileSaver.saveAs(zipArchive, 'posiPostgres.zip')
  }

  render() {
    const { state, dispatch, ...props } = this.props
    return (
      <ButtonOutline
        children="Save backend"
        onClick={this.onClick}
        {...props}
      />
    )
  }
}

const mapState = state => ({
  state
})

export const SaveBackend = connect(mapState)(_SaveBackend)
