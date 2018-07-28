import React from 'react'

import { Input, InputContainer } from 'ui'

export const InputWithLabel = ({ label, ...input }) => (
  <InputContainer label={label}>
    <Input {...input} />
  </InputContainer>
)
