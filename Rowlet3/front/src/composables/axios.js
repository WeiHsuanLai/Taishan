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

// 出去的攔截器
apiAuth.interceptors.request.use(config => {
  const user = useUserStore()
  // Bearer 後面有空白
  config.headers.Authorization = 'Bearer ' + user.token
  // 將修改後的設定 return 出去
  return config
})

// 回來的攔截器
// 1. apiAuth.get(/user/profile)
// apiAuth.get 是使用 Axios 庫發送 HTTP GET 請求的一種方法。HTTP GET 請求用於從服務器請求指定的資源。
// 這些請求不包含任何有效載荷，即請求沒有任何內容。當您調用 apiAuth.get 時，
// 您實際上是在向指定的 URL 發送一個 GET 請求，以獲取該 URL 所代表的資源或數據。
// 2. apiAuth.interceptors.request  自動加上 JWT
// 3. 傳送出去
// 4. apiAuth.interceptors.response(成功處理, 失敗處理)
// 5. 如果成功，回傳收到的資料，結束
// 6. 如果失敗，且是登入過期，自動傳送舊換新
// 7. 舊換新成功，修改 apiAuth.get(/user/profile) 的 jwt 後重新送出
// 8. 舊換新失敗，回傳 apiAuth.get(/user/profile) 的錯誤

// apiAuth.interceptors.response.use 是 Axios 庫中用於註冊響應攔截器的方法。
// 響應攔截器允許你在 HTTP 響應被處理之前拦截並修改它們，或在發生錯誤時進行特殊處理。
// 這對於全局處理 HTTP 響應非常有用，比如錯誤處理、數據轉換或從響應中提取特定信息。
apiAuth.interceptors.response.use(res => {
  return res
}, async error => {
  // 如果失敗有回應才繼續 (網路斷線也算是失敗，網路斷線不會有回應)
  if (error.response) {
    // 如果得到登入過期的回應訊息，且不是舊換新
    if (error.response.data.message === '登入過期' && error.config.url !== '/user/extend') {
      const user = useUserStore()
      try {
        // 傳送舊換新請求
        const { data } = await apiAuth.patch('/user/extend')
        // 舊換新成功，更新 store 的 token
        user.token = data.result
        // 修改原本發生錯誤的請求的設定
        error.config.headers.Authorization = 'Bearer ' + user.token
        // 重新傳送一次原本的請求
        return axios(error.config)
      } catch (_) {
        // 舊換新錯誤，登出
        user.logout()
      }
    }
  }
  // 回傳原本請求的錯誤到呼叫 apiAuth 的地方
  return Promise.reject(error)
})

export const useApi = () => {
  return { api, apiAuth }
}
