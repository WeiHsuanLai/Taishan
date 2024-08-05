import axios from 'axios'
import { useUserStore } from '@/stores/user'

// baseURL = http://localhost:4000
// axios.post('/user')
// baseURL = x
// axios.post('http://localhost:4000/user')

// 建立自己的 axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API
})

const apiAuth = axios.create({
  baseURL: import.meta.env.VITE_API
})

// axios 攔截器
// 1. axios.get / axios.post ...
// 2. interceptors.request
// 3. 送出
// 4. interceptors.response
// 5. .then() .catch()
// config 代表你這次請求的設定 (網址、資料等等)
apiAuth.interceptors.request.use(config => {
  const user = useUserStore()
  // Bearer 後面有空白
  config.headers.Authorization = 'Bearer ' + user.token
  // 將修改後的設定 return 出去
  return config
})

export const useApi = () => {
  return { api, apiAuth }
}
