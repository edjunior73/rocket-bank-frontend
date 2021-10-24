/* eslint-disable indent */
import React from 'react'
import {
  Button,
  ButtonProps,
  Dialog,
  DialogProps,
  BackdropProps,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Box,
  IconButton
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { LoadingButton, LoadingButtonProps } from '@mui/lab'
import { useTheme } from 'styled-components'
import { Colors } from 'utils'
import * as S from './Modal.style'

interface FooterProps {
  /**
   * if `true` a finish button will be rendered inside the footer
   */
  finishButton?: boolean
  /**
   * if `true` a cancel button will be rendered inside the footer
   */
  cancelButton?: boolean
}

export type ModalProps = {
  /**
   * defines the open state of the component
   */
  open: boolean
  /**
   * callback fired when backdrop and close button is clicked
   */
  onClose: () => void
  /**
   * defines the title of the modal
   */
  title?: React.ReactNode
  /**
   * defines the body of the modal
   */
  body?: string
  children?: React.ReactNode
  /**
   * optional prop to change the ok button text
   */
  okText?: string
  /**
   * optional prop to change the cancel button text
   */
  cancelText?: string
  /**
   * defines the disabled state of the ok button
   */
  onOkDisabled?: boolean
  /**
   * callback fired when ok button is clicked
   */
  onOk?: LoadingButtonProps['onClick']
  /**
   * callback fired when cancel button is clicked
   */
  onCancel?: ButtonProps['onClick']
  /**
   * defines the button styles
   */
  buttonStyle?: Colors
  /**
   * defines the size of the modal
   */
  size?: 'normal' | 'big'
  /**
   * if `true` the modal will be closed when cancel button is clicked
   */
  closeOnCancel?: boolean
  /**
   * if `true` the modal will be closed when ok button is clicked
   */
  closeOnOk?: boolean
  /**
   * if `true` it will fire the custom callback function provided for ok button
   */
  customOnOk?: boolean
  /**
   * if `true` it will fire the custom callback function provided for cancel button
   */
  customOnCancel?: boolean
  /**
   * if `true` the ok button will show a loading graphic
   */
  okLoading?: boolean
  /**
   * if `true` it will render the footer modal, has an option to provide footer props
   */
  footer?: boolean | FooterProps
  /**
   * defines the max width of the modal
   */
  maxWidth?: DialogProps['maxWidth']
  /**
   * defines dialog props
   */
  dialogProps?: Partial<DialogProps>
  /**
   * defines button props
   */
  buttonProps?: ButtonProps
  /**
   * defines ok button props
   */
  okButtonProps?: LoadingButtonProps
  /**
   * defines cancel button props
   */
  cancelButtonProps?: ButtonProps
  /**
   * if `true` it will render close button
   */
  showCloseButton?: boolean
  /**
   * if `true` it will only render the content
   */
  onlyContent?: boolean
}

const notFromLabels = ['primary', 'secondary']

export const Modal = ({
  open,
  onClose,
  title,
  okText = 'ok',
  cancelText = 'Cancel',
  buttonStyle = 'red',
  size = 'normal',
  onOk,
  onCancel,
  closeOnCancel = true,
  closeOnOk = true,
  body,
  footer = true,
  dialogProps,
  children,
  customOnCancel = false,
  customOnOk = false,
  showCloseButton = false,
  okLoading,
  buttonProps,
  maxWidth = 'sm',
  cancelButtonProps,
  okButtonProps,
  onOkDisabled,
  onlyContent = false
}: ModalProps) => {
  const theme = useTheme()
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      PaperComponent={S.Wrapper}
      PaperProps={{ elevation: 7 }}
      scroll={onlyContent ? 'body' : 'paper'}
      {...dialogProps}
    >
      {!onlyContent && (
        <DialogTitle style={{ paddingTop: showCloseButton ? 30 : undefined }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            {size === 'big' ? (
              <Typography variant="h3" fontWeight={500}>
                {title}
              </Typography>
            ) : (
              <Typography variant="h4" fontWeight={500}>
                {title}
              </Typography>
            )}
            {showCloseButton && (
              <IconButton size="small" onClick={onClose}>
                <CloseIcon />
              </IconButton>
            )}
          </Box>
        </DialogTitle>
      )}
      {(children && (
        <S.ModalContent
          size={size}
          onlyContent={onlyContent}
          showCloseButton={showCloseButton}
          className="custom-scrollbar"
        >
          {children}
        </S.ModalContent>
      )) ||
        (body && (
          <DialogContent>
            <DialogContentText variant="body1" color="textPrimary">
              {body}
            </DialogContentText>
          </DialogContent>
        ))}
      {footer && !onlyContent && (
        <DialogActions>
          {(typeof footer === 'boolean' || (footer as FooterProps).cancelButton) && (
            <Button
              fullWidth
              onClick={
                onCancel
                  ? customOnCancel
                    ? onCancel
                    : e => {
                        onCancel(e)
                        if (closeOnCancel) onClose()
                      }
                  : onClose
              }
              disabled={okLoading}
              variant="contained"
              color="secondary"
              {...buttonProps}
              {...cancelButtonProps}
              style={{
                minWidth: 100,
                width: 'fit-content',
                ...buttonProps?.style,
                ...cancelButtonProps?.style
              }}
            >
              {cancelText}
            </Button>
          )}
          {(typeof footer === 'boolean' || (footer as FooterProps).finishButton) && (
            // @ts-ignore
            <LoadingButton
              disabled={onOkDisabled}
              onClick={
                onOk
                  ? customOnOk
                    ? onOk
                    : e => {
                        // @ts-ignore
                        onOk(e)
                        if (closeOnOk) onClose()
                      }
                  : onClose
              }
              pending={okLoading}
              fullWidth
              variant="contained"
              {...buttonProps}
              {...okButtonProps}
              color={
                notFromLabels.indexOf(buttonStyle) !== -1
                  ? (buttonStyle as 'primary' | 'secondary')
                  : undefined
              }
              style={{
                backgroundColor:
                  !onOkDisabled && notFromLabels.indexOf(buttonStyle) === -1
                    ? theme.tags[buttonStyle]
                    : undefined,
                minWidth: 100,
                width: 'fit-content',
                ...buttonProps?.style,
                ...okButtonProps?.style
              }}
            >
              {okText}
            </LoadingButton>
          )}
        </DialogActions>
      )}
    </Dialog>
  )
}
