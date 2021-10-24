import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:4000'
})

export const viacepApi = axios.create({
  baseURL: 'https://viacep.com.br/ws'
})
