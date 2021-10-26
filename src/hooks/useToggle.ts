import { useState } from 'react'

export type IuseToggle = ReturnType<typeof useToggle>

export const useToggle = (initial?: boolean) => {
  const [open, setOpen] = useState(initial || false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleToggle = () => setOpen(!open)

  const models = { open }
  const operations = { handleOpen, handleClose, handleToggle }

  return [models, operations] as [typeof models, typeof operations]
}
