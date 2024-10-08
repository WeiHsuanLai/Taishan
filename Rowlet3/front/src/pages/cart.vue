<template>
  <v-container>
    <v-col cols="12">
      <h1 class="text-center">購物車</h1>
    </v-col>
    <v-divider></v-divider>
    <v-col cols="12">
      <v-data-table :items="items" :headers="headers"></v-data-table>
    </v-col>
    <v-col cols="12" class="text-center">
      <p>總金額: {{ total }}</p>
      <v-btn color="green" :disabled="!canCheckout" @click="checkout">結帳</v-btn>
    </v-col>
  </v-container>
</template>

<script setup>
import { definePage } from 'vue-router/auto'
import { useApi } from '@/composables/axios'
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import { useSnackbar } from 'vuetify-use-dialog'
import { useUserStore } from '@/stores/user'

definePage({
  meta: {
    title: '購物網 | 購物車',
    login: true,
    admin: false
  }
})

const { apiAuth } = useApi()
const router = useRouter()
const createSnackbar = useSnackbar()
const user = useUserStore()

const items = ref([])
const headers = [
  { title: '品名', key: 'p_id.name' },
  { title: '單價', key: 'p_id.price' },
  { title: '數量', key: 'quantity' },
  { title: '總價', key: 'total', value: item => item.p_id.price * item.quantity },
  { title: '日期', key: 'p_id.model', value: item => item.p_id.data },
  { title: '操作', key: 'action' },
]

const loadItems = async () => {
  try {
    const { data } = await apiAuth.get('/user/cart')
    items.value = data.result
    console.log(data.result)
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error?.response?.data?.message || '發生錯誤',
      snackbarProps: {
        color: 'red'
      }
    })
  }
}
loadItems()

const total = computed(() => {
  return items.value.reduce((total, current) => {
    return total + current.quantity * current.p_id.price
  }, 0)
})

const canCheckout = computed(() => {
  return items.value.length > 0 && !items.value.some(item => !item.p_id.sell)
})

const loading = ref(false)
const checkout = async () => {
  loading.value = true

  const result = await user.checkout()
  createSnackbar({
    text: result.text,
    snackbarProps: {
      color: result.color
    }
  })

  if (result.color === 'green') {
    router.push('/orders')
  }

  loading.value = false
}
</script>
