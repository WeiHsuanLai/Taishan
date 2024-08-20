// Utilities
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import UserRole from '@/enums/UserRole.js'
import { useApi } from '@/composables/axios'

export const useUserStore = defineStore(
  'user',
  () => {
    const { api, apiAuth } = useApi()

    const token = ref('')
    const account = ref('')
    const role = ref(UserRole.USER)
    const cart = ref(0)
    const image = ref('')
    const name = ref('')
    const isLogin = computed(() => {
      return token.value.length > 0
    })
    const isAdmin = computed(() => {
      return role.value === UserRole.ADMIN
    })

    const login = async values => {
      try {
        const { data } = await api.post('/user/login', values)
        token.value = data.result.token
        account.value = data.result.account
        name.value = data.result.name
        role.value = data.result.role
        cart.value = data.result.cart
        image.value = data.result.image
        return '登入成功'
      } catch (error) {
        console.log(error)
        return error?.response?.data?.message || '發生錯誤，請稍後再試'
      }
    }

    const profile = async () => {
      if (!isLogin.value) return

      try {
        const { data } = await apiAuth.get('/user/profile')
        account.value = data.result.account
        name.value = data.result.name
        role.value = data.result.role
        cart.value = data.result.cart
        image.value = data.result.image
      } catch (error) {
        token.value = ''
        account.value = ''
        name.value = ''
        role.value = UserRole.USER
        cart.value = 0
        image.value = ''
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
      name.value = ''
      role.value = UserRole.USER
      cart.value = 0
      image.value = ''
    }

    const addCart = async (product, quantity, date) => {
      console.log(date)
      try {
        const { data } = await apiAuth.patch('/user/cart', {
          product,
          quantity,
          date
        })
        cart.value = data.result

        return {
          color: 'green',
          text: '成功'
        }
      } catch (error) {
        return {
          color: 'red',
          text: error?.response?.data?.message || '發生錯誤，請稍後再試'
        }
      }
    }

    const checkout = async () => {
      try {
        await apiAuth.post('/order')

        cart.value = 0
        return {
          color: 'green',
          text: '成功'
        }
      } catch (error) {
        return {
          color: 'red',
          text: error?.response?.data?.message || '發生錯誤，請稍後再試'
        }
      }
    }

    return {
      token,
      account,
      name,
      role,
      cart,
      isLogin,
      isAdmin,
      login,
      profile,
      logout,
      addCart,
      checkout,
      image
    }
  },
  {
    persist: {
      key: 'shop',
      paths: ['token']
    }
  }
)
