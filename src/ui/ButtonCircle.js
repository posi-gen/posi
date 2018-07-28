import styled from 'styled-components'
import { ButtonCircle as Base } from 'rebass'

export const ButtonCircle = styled(Base)`
  color: ${({ theme }) => theme.colors.button.color};
  background-color: ${({ theme }) => theme.colors.button.backgroundColor};
  &:hover {
    background-color: ${({ theme }) => theme.colors.button.hover};
  }
`
