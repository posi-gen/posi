import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ButtonOutline } from 'ui'
import JSZip from 'jszip'
import fileSaver from 'file-saver'
import { toOuter } from 'connectors'
import { createFront, JSON2SQL } from 'codeGeneration'
import { snakeCase } from 'change-case'

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

export class _SaveAll extends Component {
  onClick = async () => {
    const outerData = toOuter(this.props.state)
    // front
    const project = createFront(outerData)

    // server
    let creditional = project['server']['creditional.json']
    const { key, roleForAnonymous, roleForLogin } = outerData.database
    const dbName = snakeCase(key)
    creditional = creditional.replace('#LOGIN#', snakeCase(roleForLogin))
    creditional = creditional.replace(
      '#PASSWORD#',
      outerData.roles[roleForLogin].password
    )
    project['server']['creditional.json'] = creditional
    let server = project['server']['server.js']
    server = server.replace('#DB#', dbName)
    server = server.replace('#DB_DEFAULT_ROLE#', snakeCase(roleForAnonymous))
    server = server.replace(
      '#JWT_SECRET#',
      Math.random()
        .toString(36)
        .substring(2)
    )
    project['server']['server.js'] = server

    //postgresql
    project['postgresql']['0_create_db.sql'] = `CREATE DATABASE ${dbName};`
    project['postgresql']['1_create_sheme.sql'] = await JSON2SQL(outerData)

    const zip = new JSZip()
    createZip(zip, project)
    const zipArchive = await zip.generateAsync({ type: 'blob' })
    fileSaver.saveAs(zipArchive, 'posiProject.zip')
  }

  render() {
    const { state, dispatch, ...props } = this.props
    return (
      <ButtonOutline children="Save all" onClick={this.onClick} {...props} />
    )
  }
}

const mapState = state => ({
  state
})

export const SaveAll = connect(mapState)(_SaveAll)
