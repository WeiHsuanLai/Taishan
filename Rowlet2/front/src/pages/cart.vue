<template>
  <v-container>
    <v-col cols="12">
      <h1 class="text-center">購物車</h1>
    </v-col>
    <v-divider></v-divider>
    <v-col cols="12">
      <v-data-table :items="items" :headers="headers">
        <template #[`item.p_id.name`]="{item}">
          <span v-if="item.p_id.sell">{{ item.p_id.name }}</span>
          <span v-else class="text-red">{{ item.p_id.name }} (已下架)</span>
        </template>

        <!-- 增加和減少房間數量 -->
        <template #[`item.quantity`]="{item}">
          <v-btn variant="text" color="red" @click="addCart(item.p_id._id, -1,item.date)">-</v-btn>
          <span>{{ item.quantity }}</span>
          <v-btn variant="text" color="green" @click="addCart(item.p_id._id,1,item.date)">+</v-btn>
        </template>

        <template #[`item.action`]="{item}">
          <v-btn variant="text" color="red" icon="mdi-delete" @click="addCart(item.p_id._id, item.quantity * -1,item.date*1)"></v-btn>
        </template>
      </v-data-table>
    </v-col>
    <!-- 訂單結帳按鈕 -->
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
    title: '購物車',
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
  { title: '房間價格', key: 'p_id.price' },
  { title: '房間數量', key: 'quantity' },
  {
    title: '日期',
    key: 'date',
    value: item => {
      const dates = item.date
      if (dates && dates.length > 0) {
        const startDate = new Date(dates[0]).toISOString().split('T')[0]
        let endDay = ''
        if (dates.length === 1) {
          // 正確地創建新日期對象並轉換成字符串
          const endDate = new Date(new Date(startDate).setDate(new Date(startDate).getDate() + 1))
          endDay = endDate.toISOString().split('T')[0]
        } else if (dates.length > 1) {
          console.log('dates.length', dates.length)
          const lastDate = new Date(dates[dates.length - 1])
          lastDate.setDate(lastDate.getDate() + 1) // 增加一天
          endDay = lastDate.toISOString().split('T')[0]
        }
        return `${startDate}日入住 至 ${endDay} 日退房`
      }
      return '無日期'
    }
  },
  { title: '天數', key: 'days', value: item => item.date ? item.date.length : 0 },
  { title: '總價', key: 'total', value: item => item.p_id.price * item.quantity * (item.date ? item.date.length : 0) },
  { title: '操作', key: 'action' }
]
const props = defineProps(['_id', 'category', 'description', 'quantity', 'image', 'name', 'price', 'sell', 'room'])
const loadItems = async () => {
  try {
    const { data } = await apiAuth.get('/user/cart')
    items.value = data.result
    const quantities = items.value.map(item => item.quantity)
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
    return total + current.quantity * current.p_id.price * current.date.length
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

const addCart = async (product, quantity, date) => {
  const { data } = await apiAuth.get('/order/all')
  const lastOrder = data.result[data.result.length - 1]
  const lastCartItem = lastOrder.cart[0]
  console.log('aaaaaa', data.result[data.result.length - 1].cart[0].p_id.quantity)
  let startroom = data.result[data.result.length - 1].cart[0].p_id.quantity
  data.result.forEach(order => {
    order.cart.forEach(date => {
      // console.log('date', date)
      // console.log('...data.result', data.result[data.result.length - 1]._id)
      const idid = data.result[data.result.length - 1].cart[0].p_id._id
      console.log('idid--------', idid)
      console.log('date---------', date)
      console.log('date.quantity---------', date.quantity)
      // console.log('bbbb', data.result[data.result.length - 1].cart[0].quantity)
      if (date.p_id._id === idid) {
        const middlroom = date.quantity
        startroom -= middlroom
          console.log(startroom)
        }
      }
      )
  })

  const result = await user.addCart(product, quantity, date)
  createSnackbar({
    text: result.text,
    snackbarProps: {
      color: result.color
    }
  })
  loadItems()
  if (result.color === 'green') {
    const idx = items.value.findIndex(item => item.p_id._id === product)
    console.log('Date parameter:', date) // 確認 date 參數的值
    items.value[idx].quantity += quantity
    if (items.value[idx].quantity <= 0) {
      items.value.splice(idx, 1)
    }
  }
}

</script>
