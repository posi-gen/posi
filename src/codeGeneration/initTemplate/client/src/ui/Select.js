import styled from 'styled-components'
import { space } from 'styled-system'
import { selectColor } from 'styles/helpers'

export const DataList = styled.div([], props => ({
  zIndex: 1,
  borderRadius: '3px',
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
  background: selectColor('bg')(props),
  padding: '4px 0',
  position: 'absolute',
  overflow: 'auto',
  maxHeight: '300px'
}))

export const Option = styled.div`
  cursor: default;
  ${space};
  ${({ isHighlighted, ...props }) =>
    isHighlighted &&
    `color: ${selectColor('bg')(props)};
    background-color: ${selectColor('primary')(props)};`};
`

Option.defaultProps = {
  px: 2,
  py: 1
}
