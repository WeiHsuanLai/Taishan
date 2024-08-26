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
          <v-btn variant="text" color="red" @click="addCart(item.p_id._id, -1, item.date)">-</v-btn>
          <span>{{ item.quantity }}</span>
          <v-btn variant="text" color="green" @click="addCart(item.p_id._id, 1, item.date)">+</v-btn>
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

const startRoom = ref(0)

const addCartcc = async (product, quantity, date) => {
  try {
    const { data } = await apiAuth.get('/order/all')
    const lastOrder = data.result[data.result.length - 1]
    const lastCartItem = lastOrder.cart[0]
    startRoom.value = lastCartItem.p_id.quantity // 更新 startRoom 的值
    console.log('Initial startroom value:', startRoom.value)

    data.result.forEach(order => {
      order.cart.forEach(dateItem => {
        const idid = lastCartItem.p_id._id
        if (dateItem.p_id._id === idid) {
          const middlroom = dateItem.quantity
          startRoom.value -= middlroom
          console.log('Updated startroom:', startRoom.value)
        }
      })
    })
  } catch (error) {
    console.error('Error:', error)
  }
}

const addCart = async (product, quantity, date) => {
  const result = await user.addCart(product, quantity, date)
     console.log('result', result)
    createSnackbar({
      text: result.text,
      snackbarProps: {
        color: result.color
      }
    })
  if (result.color === 'green') {
    const idx = items.value.findIndex(item => item.p_id._id === product)
    console.log('Date parameter:', date) // 確認 date 參數的值
    items.value[idx].quantity += quantity
    if (items.value[idx].quantity <= 0) {
      items.value.splice(idx, 1)
    }
  }
  const { data } = await apiAuth.get('/order/all')
  data.result.forEach(order => {
    let startroom = data.result[data.result.length - 1].cart[0].p_id.quantity
    order.cart.forEach(dateItem => {
      const idid = data.result[data.result.length - 1].cart[0].p_id._id
      if (dateItem.p_id._id === idid) {
        const middlroom = dateItem.quantity
        startroom -= middlroom
        console.log(startroom)
      }
    })
    }
  )
}

// const addCart = async (product, quantity, date) => {
//   try {
//     // 發送請求以獲取最新的訂單數據
//     const { data } = await apiAuth.get('/order/all')
//     const lastOrder = data.result[data.result.length - 1]
//     const lastCartItem = lastOrder.cart[0]
//     let startRoom = lastCartItem.p_id.quantity // 初始化 startRoom 的值

//     // 更新 startRoom 的值
//     data.result.forEach(order => {
//       order.cart.forEach(dateItem => {
//         if (dateItem.p_id._id === lastCartItem.p_id._id) {
//           startRoom -= dateItem.quantity
//         }
//       })
//     })
//     console.log('Updated startRoom:', startRoom)

//     // 更新購物車
//     const result = await user.addCart(product, quantity, date)
//     console.log('AddCart result:', result)
//     createSnackbar({
//       text: result.text,
//       snackbarProps: {
//         color: result.color
//       }
//     })

//     if (result.color === 'green') {
//       const idx = items.value.findIndex(item => item.p_id._id === product)
//       console.log('Date parameter:', date)

//       if (idx !== -1) {
//         items.value[idx].quantity += quantity

//         if (items.value[idx].quantity <= 0) {
//           items.value.splice(idx, 1)
//         }
//       }
//     }
//   } catch (error) {
//     console.error('Error:', error)
//   }
// }

// const addCart = async (product, quantity, date) => {
//   try {
//     // 獲取最新的訂單數據
//     const { data } = await apiAuth.get('/order/all')

//     // 確保 data.result 不為空
//     if (!data.result || data.result.length !== 0) {
//       throw new Error('訂單數據無效')
//     }

//     const lastOrder = data.result[data.result.length - 1]

//     // 確保 lastOrder.cart 存在
//     if (!lastOrder.cart) {
//       throw new Error('訂單中沒有購物車數據')
//     }

//     let startRoom = lastOrder.cart[0]?.p_id?.quantity || 0

//     // 計算現有房間數量
//     for (const order of data.result) {
//       if (!order.cart) continue
//       for (const dateItem of order.cart) {
//         const idid = lastOrder.cart[0]?.p_id?._id
//         if (dateItem.p_id._id === idid) {
//           const middlRoom = dateItem.quantity
//           startRoom -= middlRoom
//         }
//       }
//     }

//     // 確認是否可以添加更多項目
//     const currentItem = items.value.find(item => item.p_id._id === product)
//     const currentQuantity = currentItem ? currentItem.quantity : 0
//     const newQuantity = currentQuantity + quantity

//     if (newQuantity > startRoom) {
//       createSnackbar({
//         text: '無法添加更多，超過可用房間數量',
//         snackbarProps: {
//           color: 'red'
//         }
//       })
//       return
//     }

//     // 添加或更新購物車中的項目
//     const result = await user.addCart(product, quantity, date)
//     console.log('result', result)
//     createSnackbar({
//       text: result.text,
//       snackbarProps: {
//         color: result.color
//       }
//     })

//     if (result.color === 'green') {
//       // 更新 items 的狀態
//       const idx = items.value.findIndex(item => item.p_id._id === product)
//       console.log('Date parameter:', date) // 確認 date 參數的值
//       if (idx !== -1) {
//         items.value[idx].quantity += quantity
//         if (items.value[idx].quantity <= 0) {
//           items.value.splice(idx, 1)
//         }
//       } else {
//         items.value.push({
//           p_id: { _id: product },
//           quantity,
//           date
//         })
//       }
//     }
//   } catch (error) {
//     console.error('Error:', error.message || error)
//   }
// }

</script>
