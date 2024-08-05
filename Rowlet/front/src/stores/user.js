// Utilities
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import UserRole from '@/enums/UserRole.js'
import { useApi } from '@/composables/axios'

// 定義名為 'user' 的商店
export const useUserStore = defineStore('user', () => {
  // 使用 axios composable，獲得 api 和 apiAuth 實例
  const { api, apiAuth } = useApi()
  // 創建一個響應式引用，用於存儲用戶的令牌
  const token = ref('')
  // 創建一個響應式引用，用於存儲用戶的賬號
  const account = ref('')
  // 創建一個響應式引用，用於存儲用戶的角色，使用 UserRole 裡的 USER
  const role = ref(UserRole.USER)
  // 創建一個響應式引用，用於存儲用戶的購物車數量
  const cart = ref(0)

  // 創建一個計算屬性，用於判斷用戶是否已登入
  const isLogin = computed(() => {
    return token.value.length > 0
  })
  // 創建一個計算屬性，用於判斷用戶是否為管理員
  // 這邊用的是 ref 所以要加 .value
  const isAdmin = computed(() => {
    return role.value === UserRole.ADMIN
  })
  // 登入方法
  const login = async (values) => {
    try {
      // 使用 api 發送登入請求
      const { data } = await api.post('/user/login', values)
      // 更新令牌
      token.value = data.result.token
      account.value = data.result.account
      role.value = data.result.role
      cart.value = data.result.cart
      return '登入成功'
    } catch (error) {
      console.log(error)
      return error?.response?.data?.message || '發生錯誤，請稍後再試'
    }
  }

  const profile = async () => {
    // 如果沒有 login 不執行
    if (!isLogin.value) return
    try {
      // 因為我們 profile 的路由一定要帶 jwt 過去，所以必須要設定 get的請求 header 必須帶認證資訊過去
      // const { data } = await apiAuth.get('/user/profile',{
      // headers:{Authorization:'Bearer'+ token.value}
      //  })
      // 所以這邊就使用 apiAuth.get
      const { data } = await apiAuth.get('/user/profile')
      account.value = data.result.account
      role.value = data.result.role
      cart.value = data.result.cart
    } catch (error) {
      token.value = ''
      account.value = ''
      role.value = UserRole.USER
      cart.value = 0
    }
  }

  const logout = async () => {
    try {
      await apiAuth.delete('/user/logout')
    } catch (error) {
      console.log(error)
    }
    token.value = ''
    account.value = ''
    role.value = UserRole.USER
    cart.value = 0
  }

  return {
    token,
    account,
    role,
    cart,
    isLogin,
    isAdmin,
    login,
    profile,
    logout
  }
},
// 設定保存 localstorage 的 key 叫做 shop，然後只保存 token的資料
{
  persist: {
    key: 'shop',
    paths: ['token']
  }
})
