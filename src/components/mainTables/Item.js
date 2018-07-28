import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Flex, ButtonOutline, Tab, NavLink } from 'ui'

class _Item extends Component {
  onDelete = evt => {
    const { item, deleteItem, additionDelete } = this.props
    deleteItem(item)
    Object.values(additionDelete).map(({ key }) => this.props[key](item))
  }

  render() {
    const { item, path } = this.props
    return (
      <Flex ml={1} my={1} justifyContent="space-between" alignItems="center">
        <Tab is={NavLink} to={`${path}/${item}`}>
          {item}
        </Tab>
        <ButtonOutline
          buttonStyle="accent"
          onClick={this.onDelete}
          children="Delete"
        />
      </Flex>
    )
  }
}

const mapDispatch = (dispatch, { branch, additionDelete = {} }) => ({
  deleteItem: dispatch[branch].delete,
  ...Object.values(additionDelete).reduce(
    (acc, { key, branch, action }) => ({
      ...acc,
      [key]: dispatch[branch][action]
    }),
    {}
  )
})

export const Item = connect(
  null,
  mapDispatch
)(_Item)
