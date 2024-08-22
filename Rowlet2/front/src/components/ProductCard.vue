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
import { computed, ref, watch, onMounted } from 'vue'
import { useApi } from '@/composables/axios'
import Products from '@/pages/admin/products.vue'

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
      // console.log('dateString1=====', dateString)
      // console.log('dateString2=====', dateString2)
      const dateObj = new Date(dateString)
      dateObj.setHours(dateObj.getHours() + 8)
      const finaldate = dateObj.toISOString() // 更新 finaldate 為 ISO 8601 格式的字符串
      // 呼叫 loadItems 來更新 finalQuantity
      await loadItems(finaldate)
    } else {
      createSnackbar({
      text: '要選範圍',
      snackbarProps: {
        color: 'red'
      }
      })
    }
  }

const loadItems = async (finaldate) => {
  try {
    const { data } = await apiAuth.get('/order/all')
    data.result.forEach(order => {
      order.cart.forEach(date => {
        console.log('date', date)
        if (date.p_id._id === props._id) {
          console.log(date.p_id._id)
          console.log(props._id)
          date.date.forEach(date2 => {
            const date3 = new Date(date2)
            date3.setHours(date3.getHours() - 8)
            console.log('new Date(date2)', date3)
            console.log('model.value[0]', model.value[0])
            if (model.value.some(a => a.getTime() === date3.getTime())) {
              console.log(456)
              finalQuantity.value--
            }
          })
        }
      }
      )
      console.log('finaldate', finaldate)
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
</script>
