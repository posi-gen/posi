import styled from 'styled-components'
import { Close as Base } from 'rebass'

export const Close = styled(Base)`
  color: ${({ theme }) => theme.colors.button.color};
  &:hover {
    background-color: ${({ theme }) => theme.colors.button.hover};
  }
`
