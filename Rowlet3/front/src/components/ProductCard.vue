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
        <v-date-input
          v-model="model"
          label="Select range"
          max-width="368"
          multiple="range"
        ></v-date-input>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" prepend-icon="mdi-cart" @click="addCart" :loading="loading">加入購物車</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { useUserStore } from '@/stores/user' // 引入用於存儲用戶信息的 Vuex store
import { useRouter } from 'vue-router' // 引入 vue-router 用於路由導航
import { useSnackbar } from 'vuetify-use-dialog' // 引入一個自定義的 Snackbar 功能
import { ref, shallowRef } from 'vue' // 引入 Vue 的 ref 函數，用于創建響應式引用
import { VDateInput } from 'vuetify/labs/VDateInput'

const user = useUserStore() // 使用 Vuex store 中的 user store
const router = useRouter() // 使用 vue-router 的 useRouter 來獲得路由器實例
const createSnackbar = useSnackbar() // 使用自定義的 Snackbar 功能
const model = shallowRef(null)

const props = defineProps(['_id', 'category', 'description', 'image', 'name', 'price', 'sell', 'date']) // 定義組件的 props，包括產品的各項屬性
const loading = ref(false) // 創建一個響應式引用來追蹤按鈕的載入狀態

const addCart = async () => { // 定義一個方法來處理加入購物車的邏輯
  if (!user.isLogin) { // 檢查用戶是否登錄
    router.push('/login') // 如果未登錄，則重定向到登錄頁面
    return
  }
  try {
    loading.value = true // 設置按鈕的載入狀態為 true
    // console.log('model', model)
    // console.log('model.value', model.value)
    // console.log('props._id', props._id)
    const result = await user.addCart(props._id, 1, model.value)
    // console.log(result)

    // 調用 Vuex store 中的 addCart 方法來加入產品到購物車
    createSnackbar({ // 使用 Snackbar 顯示結果信息
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

</script>
