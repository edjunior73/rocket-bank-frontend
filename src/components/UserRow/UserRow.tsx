/* eslint-disable import/no-duplicates */
import React from 'react'
import format from 'date-fns/format'
import { ptBR } from 'date-fns/locale'
import { upperFirst } from 'utils'
import differenceInYears from 'date-fns/differenceInYears'
import { Grid, Tooltip } from '@mui/material'
import { UserColumn } from './components/UserColumn'
import * as S from './UserRow.style'

export interface UserRowProps {
  user: {
    id: string | number
    name: string
    birthday: Date
    city: string
    /**
     * state abbreviation
     */
    state: string
  }
  onEdit: () => void
  onDelete: () => void
}

export const UserRow = ({ user, onEdit, onDelete }: UserRowProps) => {
  const birthday = upperFirst(format(new Date(user.birthday), 'MMM dd, yyyy', { locale: ptBR }))
  const age = differenceInYears(Date.now(), new Date(user.birthday))
  return (
    <S.Container>
      <Grid container spacing={2} columns={24}>
        <UserColumn xs={24} md={2} lg={2} columnName="ID" value={user.id} />
        <UserColumn xs={24} md={4} lg={4} primary columnName="Nome" value={user.name} />
        <UserColumn xs={24} md={5} lg={3} columnName="Data de Nascimento" value={birthday} />
        <UserColumn xs={24} md={4} lg={2} columnName="Idade" value={age} />
        <UserColumn xs={24} md={4} lg={3} columnName="Cidade/UF" value={`${user.city}/${user.state}`} />
        {/* @ts-ignore */}
        <Grid item xs={24} md container justifyContent={{ lg: 'flex-end', xs: 'center' }} spacing={3}>
          <Grid item>
            <Tooltip title="Editar" placement="top" arrow>
              <S.EditButton onClick={onEdit}>
                <S.EditIcon />
              </S.EditButton>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip title="Deletar" placement="top" arrow>
              <S.DeleteButton onClick={onDelete}>
                <S.DeleteIcon />
              </S.DeleteButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
    </S.Container>
  )
}
