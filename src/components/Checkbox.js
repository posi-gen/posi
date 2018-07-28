import React, { PureComponent } from 'react'
import { Checkbox as CheckboxUi, InputContainer } from 'ui'

export class Checkbox extends PureComponent {
  onChange = evt => {
    const { value = false, onChange } = this.props
    const checked = !value
    return onChange(checked)
  }

  render() {
    const { value = false, onChange, label, ...rest } = this.props
    const checked = !!value
    return (
      <InputContainer label={label} flexDirection="row" alignItems="center">
        <CheckboxUi checked={checked} onChange={this.onChange} {...rest} />
      </InputContainer>
    )
  }
}
