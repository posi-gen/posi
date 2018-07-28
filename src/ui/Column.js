import styled from 'styled-components'
import { Column as Base } from 'rebass'

export const Column = styled(Base)`
  margin-bottom: 0;
  color: ${({ theme, selected }) =>
    !selected ? null : theme.colors.row.hover};
  background-color: ${({ theme, selected }) =>
    !selected ? null : theme.colors.row.hoverBackground};
  &:hover {
    color: ${({ theme }) => theme.colors.row.hover};
    background-color: ${({ theme }) => theme.colors.row.hoverBackground};
  }
`
