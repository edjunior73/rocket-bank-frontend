import React from 'react'
import type { InputBaseProps } from '@mui/material'
import * as S from './SearchInput.style'

export interface SearchInputProps extends Omit<InputBaseProps, 'ref'> {
  /**
   * a prop to provide custom style on the parent container
   */
  containerStyle?: React.CSSProperties
}

export const SearchInput = React.forwardRef(({ containerStyle, ...props }: SearchInputProps, ref) => {
  return (
    <S.Container style={containerStyle}>
      <S.SearchIcon />
      <S.Input {...props} ref={ref} />
    </S.Container>
  )
})
