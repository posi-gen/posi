import styled from 'styled-components'
import { space, fontSize, fontFamily, width } from 'styled-system'
import { selectColor } from 'styles/helpers'

const Input = styled.input`
  ${space}
  ${fontSize}
  ${fontFamily}
  ${width}
  color: inherit;
  display: flex;
  flex-grow: 2;
  border-radius: 4px;
  border: 1px solid ${selectColor('bg1')};
`

Input.defaultProps = {
  p: 2,
  m: 1,
  fontSize: 1,
  fontFamily: 'sans'
}

export { Input }
