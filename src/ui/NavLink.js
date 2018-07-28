import styled from 'styled-components'
import { NavLink as Nl } from 'react-router-dom'

import { selectColor } from 'styles/helpers'

export const NavLink = styled(Nl)`
  text-align: center;
  &:hover {
    color: inherit;
  }
  &.active {
    ${props => `border-color: ${selectColor('accent')(props)};`};
  }
`
