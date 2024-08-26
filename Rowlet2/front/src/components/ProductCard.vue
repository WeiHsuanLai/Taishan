<template>
  <v-card class="d-flex align-center text-center h-100">
    <v-col cols="3">
      <v-img :src="image" cover height="500"></v-img>
    </v-col>
    <v-col col="1">
      <router-link :to="'/products/' + _id">{{ category }}</router-link>
    </v-col>
    <v-col>
      <h3 v-if="model">剩餘數量: {{ finalQuantity }}</h3>
      <h3 v-else>請選擇日期</h3>
    </v-col>
    <v-col>
      <h3>價格${{ price }}</h3>
    </v-col>
    <v-col cols="2">
        <v-date-input v-model="model" label="訂房日期" multiple="range" :min="Today" max-weight="365" @update:modelValue="inputdate"></v-date-input>
    </v-col>
    <v-col cols="3">
      <v-btn
  color="primary"
  type="submit"
  prepend-icon="mdi-cart"
  @click="addCart"
  :disabled="model === null || finalQuantity <= 0">
  {{ model === null ? '請先選擇日期' : (finalQuantity > 0 ? '加入購物車' : '已售完') }}
</v-btn>
    </v-col>
  </v-card>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { useSnackbar } from 'vuetify-use-dialog'
import { computed, ref } from 'vue'
import { definePage } from 'vue-router/auto'
import { useApi } from '@/composables/axios'
import { VDateInput } from 'vuetify/labs/VDateInput'

definePage({
  meta: {
    title: '商品卡',
    login: true,
    admin: false
  }
})

const user = useUserStore()
const router = useRouter()
const createSnackbar = useSnackbar()
const { apiAuth } = useApi()
const props = defineProps(['_id', 'category', 'description', 'quantity', 'image', 'name', 'price', 'sell'])
const model = ref(null)
const Today = computed(() => new Date().toISOString().split('T')[0])
const finalQuantity = ref(0) // 使用 ref 來定義 finalQuantity

const addCart = async () => {
  if (!user.isLogin) {
    router.push('/login')
    return
  } else if (model.value === null) {
    createSnackbar({
      text: '沒有選擇日期',
      snackbarProps: {
        color: 'red'
      }
    })
    return
  } else if (model.value[1] === Today.value) {
    createSnackbar({
      text: '結束日期不能為今天',
      snackbarProps: {
        color: 'red'
      }
    })
    return
  }
  const result = await user.addCart(props._id, 1, model.value)
  createSnackbar({
    text: result.text,
    snackbarProps: {
      color: result.color
    }
  })
}

 const inputdate = async(newVal) => {
    if (newVal !== null) {
      const dateString = newVal[0]
      finalQuantity.value = props.quantity
      const dateObj = new Date(dateString)
      dateObj.setHours(dateObj.getHours() + 8)
      const finaldate = dateObj.toISOString() // 更新 finaldate 為 ISO 8601 格式的字符串
      await loadItems(finaldate)
      console.log('finaldate', finaldate)
    } else {
      createSnackbar({
      text: '要選範圍',
      snackbarProps: {
        color: 'red'
      }
      })
    }
  }

  // 這邊是原本的程式碼
const loadItems = async (finaldate) => {
  try {
    const { data } = await apiAuth.get('/order/all')
    // console.log('data.result', data.result)
    // console.log('data.result[0].p_id.quantity', data.result[0].p_id.quantity)
    data.result.forEach(order => {
      order.cart.forEach(date => {
        if (date.p_id._id === props._id) {
          date.date.forEach(date2 => {
            if (finaldate === date2) {
                finalQuantity.value -= order.cart[0].quantity
            }
          })
        }
      }
      )
    })
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

// const loadItems = async (finaldate) => {
//   try {
//     const { data } = await apiAuth.get('/order/all')
//     console.log('data.result', data.result)

//     // 提取 cart 物件中的所有符合條件的 date2
//     const relevantDates = data.result.flatMap(order =>
//       order.cart.flatMap(cartItem =>
//         cartItem.date
//           .filter(date2 => date2 === finaldate) // 過濾符合 finaldate 的日期
//           .map(() => ({
//             quantity: cartItem.quantity, // 提取相關數量
//           }))
//       )
//     )

//     // 迭代並計算最終數量
//     if (relevantDates.length >= 0) {
//       finalQuantity.value -= relevantDates.reduce((sum, { quantity }) => sum + quantity, 0)
//     }

//     console.log('finalQuantity.value', finalQuantity.value)
//   } catch (error) {
//     console.log(error)
//     createSnackbar({
//       text: error?.response?.data?.message || '數量不符',
//       snackbarProps: {
//         color: 'red',
//       },
//     })
//   }
// }

</script>
