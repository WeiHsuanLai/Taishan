<template>
  <v-container>
    <v-col cols="12">
      <h1 class="text-center">{{ product.name }}</h1>
    </v-col>
    <v-col cols="12">
      <v-img :src="product.image" height="200"></v-img>
    </v-col>
    <v-col cols="12">
      <p>${{ product.price }}</p>
      <p>{{ product.description }}</p>
      <v-form :disabled="isSubmitting" @submit.prevent="submit">
        <v-text-field type="number" v-model.number="quantity.value.value" :error-messages="quantity.errorMessage.value"></v-text-field>
        <v-date-input v-model="model" label="訂房日期" multiple="range" :min="Today" max-weight="365" @update:modelValue="inputdate"></v-date-input>
        <v-btn type="submit" prepend-icon="mdi-cart" :loading="isSubmitting">加入購物車</v-btn>
      </v-form>
    </v-col>
  </v-container>
  <v-overlay class="align-center justify-center text-center" :model-value="!product.sell" persistent>
    <h1 class="text-center text-red">已下架</h1>
    <v-btn to="/">回首頁</v-btn>
  </v-overlay>
</template>

<script setup>
import { ref, computed } from 'vue'
import { definePage } from 'vue-router/auto'
import { useRoute, useRouter } from 'vue-router'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useForm, useField } from 'vee-validate'
import { VDateInput } from 'vuetify/labs/VDateInput'
import * as yup from 'yup'
import { useUserStore } from '@/stores/user'

definePage({
  meta: {
    title: '購物網 | 商品',
    login: false,
    admin: false
  }
})
const { apiAuth } = useApi()
const { api } = useApi()
const route = useRoute()
const router = useRouter()
const createSnackbar = useSnackbar()
const user = useUserStore()
const model = ref(null)
const quantity = useField('quantity')
const product = ref({
  _id: '',
  name: '',
  price: 0,
  description: '',
  image: '',
  sell: true,
  category: '',
  date: ''
})
const Today = computed(() => new Date().toISOString().split('T')[0])
const finalQuantity = ref(0) // 使用 ref 來定義 finalQuantity
const props = defineProps(['_id', 'category', 'description', 'quantity', 'image', 'name', 'price', 'sell'])
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

  const loadItems = async (finaldate) => {
  try {
    const { data } = await apiAuth.get('/order/all')
    console.log('data.result', data.result)

    // 提取 cart 物件中的所有符合條件的 date2
    const relevantDates = data.result.flatMap(order =>
      order.cart.flatMap(cartItem =>
        cartItem.date
          .filter(date2 => date2 === finaldate) // 過濾符合 finaldate 的日期
          .map(() => ({
            quantity: cartItem.quantity, // 提取相關數量
          }))
      )
    )

    // 迭代並計算最終數量
    if (relevantDates.length > 0) {
      finalQuantity.value -= relevantDates.reduce((sum, { quantity }) => sum + quantity, 0)
    }

    console.log('finalQuantity.value', finalQuantity.value)
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error?.response?.data?.message || '發生錯誤',
      snackbarProps: {
        color: 'red',
      },
    })
  }
}

const load = async () => {
  try {
    const { data } = await api.get('/product/' + route.params.id)
    product.value._id = data.result._id
    product.value.name = data.result.name
    product.value.price = data.result.price
    product.value.description = data.result.description
    product.value.image = data.result.image
    product.value.sell = data.result.sell
    product.value.category = data.result.category
    product.value.date = data.result.date
    document.title = '購物網 | ' + product.value.name
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
load()

const schema = yup.object({
  quantity: yup.number().typeError('數量必填').required('數量必填').min(1, '最少為 1')
})
const { isSubmitting, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    quantity: 1
  }
})

const submit = handleSubmit(async (values) => {
  if (!user.isLogin) {
    router.push('/login')
    return
  }
  const result = await user.addCart(product.value._id, quantity.value.value, model.value)
  createSnackbar({
    text: result.text,
    snackbarProps: {
      color: result.color
    }
  })
})
</script>
