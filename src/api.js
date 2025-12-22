import axios from 'axios'

const api = axios.create({
  baseURL: 'https://lottery-api.kawdai.org/',
  withCredentials: true,
})

export default api
