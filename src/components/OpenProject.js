import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Flex, Text } from 'ui'
import Dropzone from 'react-dropzone'
import JSZip from 'jszip'

export class _OpenProject extends Component {
  state = {
    fileName: ''
  }

  onDropFiles = async files => {
    const fileData = await files.reduce(async (acc, item) => {
      const zip = await JSZip.loadAsync(item)
      const fileNames = Object.keys(zip.files).filter(
        item => item === 'settings.json'
      )
      const data = fileNames.reduce((acc, file) => {
        try {
          const parsedData = JSON.parse(
            new TextDecoder('utf-8').decode(
              zip.files[file]._data.compressedContent
            )
          )
          return {
            ...acc,
            ...parsedData
          }
        } catch (e) {
          console.log(`${file} is not a json file`)
          return acc
        }
      }, {})
      return { ...acc, ...data }
    }, {})
    this.props.loadProject(fileData)
  }

  render() {
    return (
      <Flex mt={1}>
        <Dropzone
          onDrop={this.onDropFiles}
          accept="application/x-zip-compressed"
          value={this.state.fileName}
        >
          <Flex p={2}>
            <Text>Select an archive with an existing project</Text>
          </Flex>
        </Dropzone>
      </Flex>
    )
  }
}

const mapDispatch = dispatch => ({
  loadProject: dispatch.database.loadProject
})

export const OpenProject = connect(
  null,
  mapDispatch
)(_OpenProject)
