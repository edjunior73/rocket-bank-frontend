import React from 'react'
import { Typography, Grid } from '@mui/material'
import { Modal, ModalProps } from '../Modal'
import * as S from './DeleteModal.style'

export interface DeleteModalProps extends Pick<ModalProps, 'open' | 'onClose'> {
  /**
   * defines the size of the modal component
   */
  size?: 'normal' | 'big'
  /**
   * defines the loading state of the component
   * @default false
   */
  loading?: boolean
  /**
   * defines the title of the item to be deleted
   */
  title: string
  /**
   * defines a custom description
   */
  body?: React.ReactNode
  /**
   * callback fired when the ok button is clicked
   */
  onDelete: (id: number) => void
  /**
   * defines the unique id of the item to be deleted
   */
  id: number
}

export const DeleteModal = ({
  open,
  onClose,
  title,
  onDelete,
  body,
  id,
  loading = false,
  size = 'normal'
}: DeleteModalProps) => {
  const handleDelete = () => {
    onDelete(id)
  }

  return (
    <Modal
      open={open}
      size={size}
      onClose={onClose}
      onOk={handleDelete}
      okLoading={loading}
      closeOnOk={false}
      okText="Deletar"
      maxWidth="xs"
      title={title}
      dialogProps={{
        PaperComponent: S.Container
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="body1">{body}</Typography>
        </Grid>
      </Grid>
    </Modal>
  )
}
