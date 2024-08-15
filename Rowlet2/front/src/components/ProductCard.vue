<template>
  <v-card>
    <v-img :src="image" cover height="200"></v-img>
    <v-card-title>
      <router-link :to="'/products/' + _id">{{ name }}</router-link>
    </v-card-title>
    <v-card-subtitle>${{ price }}</v-card-subtitle>
    <v-card-text>
      {{ description }}
    </v-card-text>
    <v-date-input v-model="model" label="訂房日期" :min="Today" multiple="range"></v-date-input>
    <v-text-field type="number" v-model.number="quantity.value.value" :error-messages="quantity.errorMessage.value"></v-text-field>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" prepend-icon="mdi-cart" @click="addCart" :loading="isSubmitting">加入購物車</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
  import { useUserStore } from '@/stores/user' // 引入用於存儲用戶信息的 Vuex store
  import { useRouter } from 'vue-router' // 引入 vue-router 用於路由導航
  import { useSnackbar } from 'vuetify-use-dialog' // 引入一個自定義的 Snackbar 功能
  import { ref, shallowRef, computed } from 'vue' // 引入 Vue 的 ref 函數，用于創建響應式引用
  import { VDateInput } from 'vuetify/labs/VDateInput'
  import * as yup from 'yup'
  import { useForm, useField } from 'vee-validate'

  const user = useUserStore() // 使用 Vuex store 中的 user store
  const router = useRouter() // 使用 vue-router 的 useRouter 來獲得路由器實例
  const createSnackbar = useSnackbar() // 使用自定義的 Snackbar 功能
  const model = shallowRef(null)
  const quantity = useField('quantity')
  const product = ref({
    _id: '',
    name: '',
    price: 0,
    description: '',
    image: '',
    sell: true,
    category: ''
  })
  const schema = yup.object({
    quantity: yup.number().typeError('數量必填').required('數量必填').min(1, '最少為 1')
  })
  const { isSubmitting, handleSubmit } = useForm({
    validationSchema: schema,
    initialValues: {
      quantity: 1
    }
  })
  const submit = handleSubmit(async values => {
    if (!user.isLogin) {
      router.push('/login')
      return
    }
    const result = await user.addCart(product.value._id, values.quantity)
    createSnackbar({
      text: result.text,
      snackbarProps: {
        color: result.color
      }
    })
  })
  const props = defineProps(['_id', 'category', 'description', 'image', 'name', 'price', 'sell', 'date']) // 定義組件的 props，包括產品的各項屬性
  const loading = ref(false)

  const addCart = async () => {
    if (!user.isLogin) {
      router.push('/login')
      return
    }
    try {
      loading.value = true
      const result = await user.addCart(props._id, 1, model.value)
      createSnackbar({
        text: result.text,
        snackbarProps: {
          color: result.color
        }
      })
    } catch (error) {
      createSnackbar({
        text: '加入購物車失敗',
        snackbarProps: { color: 'red' }
      })
    } finally {
      loading.value = false // 設置按鈕的載入狀態為 false
    }
  }
  const Today = computed(() => new Date().toISOString().split('T')[0])
</script>
