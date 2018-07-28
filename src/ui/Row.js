import styled from 'styled-components'
import { Row as Base } from 'rebass'
import { selectColor } from 'styles/helpers'

export const Row = styled(Base)`
  padding-top: 4px;
  padding-bottom: 4px;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  color: ${props =>
    props.settings && props.settings.selected
      ? selectColor('primary')(props)
      : selectColor('base')(props)};
  background-color: ${props =>
    props.settings && props.settings.selected
      ? selectColor('secondary')(props)
      : selectColor('base')(props)};
  border-bottom-color: ${props => selectColor('secondary')(props)};
  &:hover {
    color: ${props =>
      props.settings && props.settings.header
        ? null
        : selectColor('accent')(props)};
    background-color: ${props =>
      props.settings && props.settings.header
        ? null
        : selectColor('secondary')(props)};
  }
`
