import axios from 'axios'

// baseURL = http://localhost:4000
// axios.post('/user')
// baseURL = x
// axios.post('http://localhost:4000/user')

const api = axios.create({
  baseURL: import.meta.VITE_API
})

export const useApi = () => {
  return { api }
}
