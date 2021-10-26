import React, { useEffect } from 'react'
import { Controller } from 'react-hook-form'
import { Modal, ModalProps } from 'components/Modal'
import { Stack, TextField } from '@mui/material'
import { DatePicker } from '@mui/lab'
import InputMask from 'react-input-mask'
import { User } from 'types'
import { useUpsertUserForm, UpsertUserInputForm } from './useUpsertUserForm'

export interface UpsertUserModalProps extends Pick<ModalProps, 'open' | 'onClose'> {
  formAction: 'CREATE' | 'UPDATE'
  onCreate(data: UpsertUserInputForm): void
  onEdit(data: UpsertUserInputForm): void
  user?: User
}

export const UpsertUserModal = ({
  open,
  onClose,
  formAction,
  onCreate,
  onEdit,
  user
}: UpsertUserModalProps) => {
  const [{ errors, formState, control, setValue, reset }, { onSubmit, searchZipCode }] =
    useUpsertUserForm()

  const { isDirty, isValid } = formState

  useEffect(() => {
    reset()
    // eslint-disable-next-line
  }, [formAction])

  useEffect(() => {
    if (user) {
      setValue('name', user.name)
      setValue('birthday', `${user.birthday}`)
      setValue('city', user.city)
      setValue('state', user.state)
      setValue('zipCode', user.zipCode)
    }
    // eslint-disable-next-line
  }, [user])

  const handleSubmit = async (data: UpsertUserInputForm) => {
    const onData = formAction === 'CREATE' ? onCreate : onEdit
    onData(data)
  }

  return (
    <Modal
      open={open}
      size="big"
      customOnOk
      maxWidth="sm"
      buttonStyle="primary"
      onOkDisabled={!isDirty || !isValid}
      onOk={onSubmit(handleSubmit)}
      okText={formAction === 'CREATE' ? 'Criar' : 'Editar'}
      title={formAction === 'CREATE' ? 'Criar Usuário' : `Editar Usuário ${user?.name.split(' ')[0]}`}
      onClose={onClose}
    >
      <form
        onSubmit={onSubmit(handleSubmit)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            onSubmit(handleSubmit)
          }
        }}
      >
        <Stack spacing={3}>
          <Controller
            control={control}
            name="name"
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                label="Nome"
                autoFocus
                {...field}
                error={!!errors?.name?.message}
                helperText={errors?.name?.message}
                required
              />
            )}
          />
          <Controller
            control={control}
            name="birthday"
            rules={{ required: true }}
            defaultValue={null}
            render={({ field }) => (
              <DatePicker
                disableFuture
                label="Data de Nascimento"
                renderInput={params => (
                  <TextField
                    {...params}
                    error={!!errors?.birthday?.message}
                    helperText={errors?.birthday?.message}
                    required
                  />
                )}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="zipCode"
            rules={{ required: true, maxLength: 9, minLength: 9 }}
            render={({ field }) => (
              // @ts-ignore
              <InputMask mask="99999-999" {...field} onBlur={searchZipCode}>
                {() => (
                  <TextField
                    label="CEP"
                    error={!!errors?.zipCode?.message}
                    helperText={errors?.zipCode?.message}
                    required
                  />
                )}
              </InputMask>
            )}
          />
          <Controller
            control={control}
            name="city"
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                label="Cidade"
                {...field}
                error={!!errors?.city?.message}
                required
                helperText={errors?.city?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="state"
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                label="Estado"
                {...field}
                error={!!errors?.state?.message}
                helperText={errors?.state?.message}
                required
              />
            )}
          />
        </Stack>
      </form>
    </Modal>
  )
}
