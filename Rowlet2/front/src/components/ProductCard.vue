<template>
  <v-card class="d-flex align-center text-center h-100">
    <v-col cols="3">
      <v-img :src="image" cover height="500"></v-img>
    </v-col>
    <v-col col="1">
      <router-link :to="'/products/' + _id">{{ name }}</router-link>
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
        <v-btn color="primary" type="submit" prepend-icon="mdi-cart" @click="addCart">加入購物車</v-btn>
    </v-col>
  </v-card>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { useSnackbar } from 'vuetify-use-dialog'
import { VDateInput } from 'vuetify/labs/VDateInput'
import { computed, ref } from 'vue'
import { useApi } from '@/composables/axios'

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
    console.log('data.result', data.result)
    data.result.forEach(order => {
      order.cart.forEach(date => {
        if (date.p_id._id === props._id) {
          // console.log('date.date[2]', date.date[2])
          // console.log('date.quantity', date.quantity)
          date.date.forEach(date2 => {
            // const date3 = new Date(date2)
            //  date3.setHours(date3.getHours() - 8)
            // console.log('model.value[0]', model.value[0])
            console.log('order.cart[0].quantity', order.cart[0].quantity)
            // console.log('date2', date2)
            // model.value.some(a => a.getTime() === date3.getTime())
            // if (model.value.some(a => a.getTime() === date3.getTime())) {
              console.log('-------------')
              console.log('finaldate', finaldate)
              // const thisDate = []
            if (finaldate === date2) {
                finalQuantity.value -= order.cart[0].quantity // 只有當條件成立時才減少數量
                console.log('finalQuantity.value', finalQuantity.value)
              // }
            }
          })
        }
      }
      )
      // console.log('finaldate', finaldate)
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
