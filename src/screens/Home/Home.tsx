import React, { useState, useEffect, useMemo } from 'react'
import { Button, Grid, Theme, Typography, useMediaQuery } from '@mui/material'
import { matchSorter } from 'match-sorter'
import { compareAsc } from 'date-fns'
import iziToast from 'izitoast'
import { api } from 'constants/axios'
import { SearchInput } from 'components/SearchInput'
import { UserRow } from 'components/UserRow'
import { User } from 'types'
import { DeleteModal } from 'components/DeleteModal'
import { UpsertUserModal, UpsertUserInputForm } from 'components/UpsertUserModal'
import { useToggle } from 'hooks'
import { getFirstName } from 'utils'
import * as S from './Home.style'

interface ModalDeleteProps {
  show: boolean
  user: User | null
}

export interface HomeProps {}

export const Home = (props: HomeProps) => {
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
  const [formAction, setFormAction] = useState<'CREATE' | 'UPDATE'>('CREATE')
  const [{ open: openModal }, { handleClose, handleOpen }] = useToggle(false)
  const [users, setUsers] = useState<User[]>([])
  const [deleteModal, setDeleteModal] = useState<ModalDeleteProps>({ show: false, user: null })
  const [selectedUser, setSelectedUser] = useState<User>()
  const [search, setSearch] = useState('')
  const filteredUsers = useMemo(() => {
    return matchSorter(users, search, {
      keys: ['name'],
      sorter: rankedItems =>
        [...rankedItems].sort((a, b) => compareAsc(new Date(a.item.birthday), new Date(b.item.birthday)))
    })
  }, [search, users])

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleSubmitCreate = async (input: UpsertUserInputForm) => {
    try {
      const { data } = await api.post<User>('/users', input)
      setUsers(prevUsers => [...prevUsers, data])
      iziToast.success({ message: 'Usuário criado com sucesso' })
      handleClose()
    } catch {
      iziToast.error({ message: 'Erro ao criar o usuário' })
    }
  }
  const handleSubmitEdit = async (input: UpsertUserInputForm) => {
    try {
      const { data } = await api.patch<User>(`/users/${selectedUser?.id}`, input, {})
      setUsers(prevUsers =>
        prevUsers.map(user => {
          if (user.id === data.id) {
            return data
          }
          return user
        })
      )
      iziToast.success({ message: 'Usuário editado com sucesso' })
      handleClose()
    } catch {
      iziToast.error({ message: 'Erro ao editar o usuário' })
    }
  }
  const handleSubmitDelete = async (id: number) => {
    try {
      const { data } = await api.delete<User>(`/users/${id}`)

      setUsers(prevUsers => prevUsers.filter(user => user.id !== data.id))
      iziToast.success({ message: 'Usuário deletado com sucesso' })
      setDeleteModal({ show: false, user: null })
    } catch {
      iziToast.error({ message: 'Erro ao deletar o usuário' })
    }
  }

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await api.get<User[]>('/users')
        setUsers(data)
      } catch {
        iziToast.error({ message: 'Erro ao consultar os usuário' })
      }
    })()
  }, [])

  return (
    <>
      <S.Container>
        <Grid container spacing={6}>
          <Grid item container spacing={3}>
            <Grid item container spacing={0.5}>
              <Grid item xs={12}>
                <Typography variant="display2">Usuários</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h4" color="text.secondary">
                  Total: <strong>{users.length}</strong>
                </Typography>
              </Grid>
            </Grid>
            <Grid item container spacing={3} justifyContent="space-between">
              <Grid item xs={12} md={6}>
                <SearchInput placeholder="Pesquisar..." onChange={handleChangeSearch} value={search} />
              </Grid>
              <Grid item container justifyContent="flex-end" xs={12} md={4}>
                <Button
                  fullWidth={mdDown}
                  size="large"
                  startIcon={<S.PlusIcon />}
                  onClick={() => {
                    setFormAction('CREATE')
                    handleOpen()
                  }}
                >
                  Criar usuário
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container spacing={3}>
            {filteredUsers.map(user => (
              <Grid item key={user.id} xs={12}>
                <UserRow
                  user={user}
                  onDelete={() => {
                    setDeleteModal({ show: true, user: user })
                  }}
                  onEdit={() => {
                    setFormAction('UPDATE')
                    setSelectedUser(user)
                    handleOpen()
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </S.Container>
      <UpsertUserModal
        formAction={formAction}
        open={openModal}
        onCreate={handleSubmitCreate}
        onEdit={handleSubmitEdit}
        onClose={handleClose}
        user={selectedUser}
        key={selectedUser?.id}
      />
      {deleteModal.user && (
        <DeleteModal
          title={`Deletar Usuário ${getFirstName(deleteModal.user?.name || '')}`}
          onClose={() => setDeleteModal({ show: false, user: null })}
          open={deleteModal.show}
          size="big"
          body={`Tem certeza que deseja deletar ${getFirstName(
            deleteModal.user?.name || ''
          )}? Essa ação não pode ser desfeita`}
          id={deleteModal.user?.id as number}
          onDelete={handleSubmitDelete}
        />
      )}
    </>
  )
}
