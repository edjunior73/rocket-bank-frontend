import React from 'react'
import iziToast from 'izitoast'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DateFnsUtils from '@mui/lab/AdapterDateFns'
import { ptBR } from 'date-fns/locale'
import { useRoutes } from 'react-router-dom'
import mainRoutes from 'routes'
import 'izitoast/dist/css/iziToast.min.css'
import { ThemeProvider } from 'styles'

iziToast.settings({
  position: 'bottomLeft',
  maxWidth: 400
})

const App = () => {
  const routes = useRoutes(mainRoutes)
  return (
    <LocalizationProvider locale={ptBR} dateAdapter={DateFnsUtils}>
      <ThemeProvider>{routes}</ThemeProvider>
    </LocalizationProvider>
  )
}

export default App
