import React, { Component } from 'react'
import { connect } from 'react-redux'

import { MainContainer } from 'components'
import { ButtonOutline, Flex } from 'ui'
import { makeGetItemForBranch } from 'redux/models/dependentTable'

class RowComponent extends Component {
  constructor(props) {
    super(props)
    const { rowStructure = {}, item = {}, oldKey = '' } = this.props
    const defaults = Object.values(rowStructure).reduce(
      (acc, item) => ({ ...acc, [item.key]: item.default }),
      {}
    )
    this.state = { ...defaults, ...item, oldKey }
    this.defaultFocus = React.createRef()
  }

  componentDidMount() {
    if (this.state.key === '' && this.defaultFocus.current)
      this.defaultFocus.current.focus()
  }

  onDelete = evt => {
    const { deleteItem, parent } = this.props
    deleteItem({ parent, key: this.state.key })
  }

  onChange = field => value => {
    if (value.target) {
      this.setState({ [field]: value.target.value })
    } else {
      this.setState({ [field]: value })
    }
  }

  onBlur = evt => {
    const { edit, parent } = this.props
    edit({ parent, data: this.state })
  }

  onFocus = evt => {}

  render() {
    const { parent, rowStructure } = this.props
    return (
      <MainContainer onBlur={this.onBlur} onFocus={this.onFocus}>
        {Object.values(rowStructure).map(({ key, Component, focus }) => (
          <Component
            key={key}
            label={key}
            value={this.state[key]}
            onChange={this.onChange(key)}
            innerRef={focus ? this.defaultFocus : null}
            parent={parent}
          />
        ))}
        <Flex>
          <ButtonOutline
            buttonStyle="accent"
            mt={3}
            onClick={this.onDelete}
            children="Delete"
          />
        </Flex>
      </MainContainer>
    )
  }
}

const makeMapState = (state, { branch }) => {
  const getItemState = makeGetItemForBranch(branch)()
  const mapState = (state, props) => {
    const { parent, oldKey } = props
    return {
      item: getItemState(state, { parent, key: oldKey })
    }
  }
  return mapState
}

const mapDispatch = (dispatch, { branch }) => ({
  deleteItem: dispatch[branch].delete,
  edit: dispatch[branch].effEdit
})

export const Row = connect(
  makeMapState,
  mapDispatch
)(RowComponent)
