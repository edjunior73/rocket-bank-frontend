import styled from 'styled-components'
import { Paper, InputBase, InputBaseProps } from '@mui/material'

export const Container = styled(Paper)`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px 20px;
  border-radius: 14px;
  background-color: white;
  color: ${props => props.theme.text.description};
  box-shadow: 0px 6px 58px rgba(196, 203, 214, 0.103611);
  font-size: 12px;
`

export const SearchIcon = styled.i.attrs({
  className: 'isax isax-search-normal-1'
})`
  color: inherit;
  font-size: 24px;
`

export const Input = styled(InputBase).attrs<InputBaseProps>({
  fullWidth: true
})`
  margin-left: 16px;
  font-size: 14px;
  color: inherit;
`
