import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.h1k4ru.dev/',
  withCredentials: true,
})

export default api
