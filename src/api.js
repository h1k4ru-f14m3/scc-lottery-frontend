import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.h1k4ru.dev/',
  // baseURL: 'http://localhost:5000',
  withCredentials: true,
})

export default api
