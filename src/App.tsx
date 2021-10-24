import React from 'react'
import iziToast from 'izitoast'
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
	return <ThemeProvider>{routes}</ThemeProvider>
}

export default App
