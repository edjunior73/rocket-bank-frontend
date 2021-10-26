import React from 'react'
import { IconButton, InputAdornment, TextFieldProps } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import * as S from './SearchInput.style'

export type SearchInputProps = Omit<TextFieldProps, 'ref'>

export const SearchInput = (props: SearchInputProps) => {
  const { value, onChange } = props
  return (
    <S.Input
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <S.SearchIcon />
          </InputAdornment>
        ),
        endAdornment: value ? (
          <IconButton
            onClick={() => {
              onChange?.({
                // @ts-ignore
                target: { value: '' }
              })
            }}
            size="small"
          >
            <ClearIcon fontSize="small" />
          </IconButton>
        ) : null
      }}
      {...props}
    />
  )
}
