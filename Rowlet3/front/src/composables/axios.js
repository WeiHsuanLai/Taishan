import axios from 'axios'

// baseURL = http://localhost:4000
// axios.post('/user')
// baseURL = x
// axios.post('http://localhost:4000/user')

// 建立自己的 axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API
})

export const useApi = () => {
  return { api }
}
