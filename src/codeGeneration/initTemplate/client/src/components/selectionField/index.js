import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import Autocomplete from 'react-autocomplete'

import { DataList, Option, Input, Flex, Label } from 'ui'

import * as queries from './queries'

class SelectionFieldComponent extends Component {
  state = {
    value: '',
    label: '',
    options: [],
    prevValue: ''
  }
  static getDerivedStateFromProps(
    { value: { value, label } = {} },
    { prevValue }
  ) {
    if (value !== prevValue) {
      return { value, label, prevValue: value }
    } else return null
  }

  async componentDidMount() {
    const { value, label } = this.state
    if (value && !label) {
      const { client, fkey = '' } = this.props
      try {
        const result = await client.query({
          query: queries['SELECT_' + fkey.toUpperCase()],
          variables: {
            value
          }
        })
        const item = result.data.item
        this.handleSelect(null, item)
      } catch (e) {
        console.error(e)
      }
    }
  }

  loadOptions = async input => {
    if (input === '') {
      this.setState({ options: [] })
      return undefined
    }
    const { client, fkey = '' } = this.props
    try {
      const result = await client.query({
        query: queries['SELECT_LIST_' + fkey.toUpperCase()],
        variables: {
          first: 8,
          after: null,
          searchValue: input
        }
      })
      const options = result.data.list.nodes
      this.setState({ options })
    } catch (e) {
      console.error(e)
    }
  }
  handleInput = (event, label) => {
    this.setState({ label })
    this.loadOptions(label)
  }

  handleSelect = (value, item) => {
    this.setState({ ...item, options: [] })
    this.props.onChange(item)
  }

  render() {
    const { options, label } = this.state
    const { id, placeholder } = this.props
    return (
      <Autocomplete
        inputProps={{ id: id, name: id, placeholder }}
        wrapperStyle={{ position: 'relative' }}
        value={label}
        items={options}
        getItemValue={this.getItemValue}
        onSelect={this.handleSelect}
        onChange={this.handleInput}
        renderMenu={this.renderMenu}
        renderItem={this.renderItem}
        renderInput={this.renderInput}
      />
    )
  }
  getItemValue = item => item.label
  renderItem = ({ value, label }, isHighlighted) => (
    <Option key={value} isHighlighted={isHighlighted}>
      {label}
    </Option>
  )
  renderMenu = children => (
    <DataList>
      {this.state.options.length === 0 && <Option>Type to search</Option>}
      {children}
    </DataList>
  )
  renderInput = ({ ref, ...props }) => (
    <Flex flexDirection="column">
      <Label>{this.props.label}</Label>
      <Input innerRef={ref} {...props} />
    </Flex>
  )
}

export const SelectionField = withApollo(SelectionFieldComponent)
