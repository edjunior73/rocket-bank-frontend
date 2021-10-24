import styled from 'styled-components'
import { IconButton } from '@mui/material'

export const Container = styled.div`
  padding: 24px 28px;
  background-color: white;
  box-shadow: 0px 6px 58px rgba(196, 203, 214, 0.103611);
  border-radius: 24px;
`

export const EditIcon = styled.i.attrs({
  className: 'isax isax-edit-2'
})`
  font-size: 18px;
`

export const EditButton = styled(IconButton).attrs({
  color: 'primary'
})`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  width: 40px;
  height: 40px;
  box-shadow: 0px 6px 12px rgba(63, 140, 255, 0.263686);
  transition: all 0.2s linear;
  &:hover {
    background-color: ${props => props.theme.button.hover};
  }
`

export const DeleteIcon = styled.i.attrs({
  className: 'isax isax-trash'
})`
  font-size: 18px;
`

export const DeleteButton = styled(IconButton).attrs({
  color: 'primary'
})`
  background-color: ${props => props.theme.tags.red};
  color: white;
  width: 40px;
  height: 40px;
  box-shadow: 0px 6px 12px rgba(255, 63, 63, 0.264);
  transition: all 0.2s linear;
  &:hover {
    background-color: #ca372c;
  }
`
