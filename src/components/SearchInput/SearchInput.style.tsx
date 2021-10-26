import styled from 'styled-components'
import { TextField } from '@mui/material'

export const SearchIcon = styled.i.attrs({
  className: 'isax isax-search-normal-1'
})`
  color: inherit;
  font-size: 20px;
`

export const Input = styled(TextField)`
  font-size: 16px;
  color: inherit;
  & .MuiInput-root {
    padding: 6px 20px;
    border-color: transparent;
    border-radius: 14px;
    background-color: white;
    color: ${props => props.theme.text.description};
    box-shadow: 0px 6px 58px rgba(196, 203, 214, 0.103611);
    &.Mui-focused {
      border-color: ${props => props.theme.colors.primary};
    }
  }
`
