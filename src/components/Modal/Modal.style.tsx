import styled, { css } from 'styled-components'
import { Paper, DialogContent, IconButton } from '@mui/material'
import type { ModalProps } from './Modal'

export const Wrapper = styled(Paper)`
  @media only screen and (max-width: 600px) {
    .MuiDialogTitle-root,
    .MuiDialogContent-root,
    .MuiDialogActions-root {
      padding-left: 24px;
      padding-right: 24px;
    }

    .MuiDialogContent-root,
    .MuiDialogActions-root {
      padding-bottom: 24px;
    }
  }
`

type ModalContentProps = Pick<ModalProps, 'onlyContent' | 'size' | 'showCloseButton'>

export const ModalContent = styled(DialogContent).withConfig<ModalContentProps>({
  shouldForwardProp: prop => !['onlyContent', 'size', 'showCloseButton'].includes(prop)
})`
  padding: 8px 24px;
  ${props =>
    props.showCloseButton &&
    css`
      padding-bottom: 32px;
    `}
  ${props =>
    props.onlyContent
      ? css`
          @media only screen and (max-width: 960px) {
            padding: 24px;
          }
        `
      : props.size === 'big' &&
        css`
          padding-top: 20px;
        `};
`

export const CloseButton = styled(IconButton)`
  background-color: ${props => props.theme.grey.third};
  border-radius: 14px;
  color: ${props => props.theme.text.main};
`
