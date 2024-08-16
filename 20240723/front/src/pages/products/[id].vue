<template>
  <v-container>
    <v-col cols="12">
      <h1 class="text-center">{{ product.name }}</h1> <!-- 顯示產品名稱 -->
    </v-col>
    <v-col cols="12">
      <v-img :src="product.image" height="200"></v-img> <!-- 顯示產品圖片 -->
    </v-col>
    <v-col cols="12">
      <!-- <p>剩餘數量:{{ product.quantity }}</p> --> <!-- 註釋掉的顯示剩餘數量 -->
      <p>${{ product.price }}</p> <!-- 顯示產品價格 -->
      <p>{{ product.description }}</p> <!-- 顯示產品描述 -->
      <v-form :disabled="isSubmitting" @submit.prevent="submit"> <!-- 表單提交時禁用並執行submit函式 -->
        <v-text-field type="number" v-model.number="quantity.value.value" :error-messages="quantity.errorMessage.value"></v-text-field> <!-- 數字輸入框，綁定數量值，並顯示錯誤訊息 -->
        <v-btn type="submit" prepend-icon="mdi-cart" :loading="isSubmitting" to="/cart">加入購物車</v-btn> <!-- 提交按鈕，當提交中時顯示加載狀態 -->
      </v-form>
    </v-col>
  </v-container>
  <v-overlay class="align-center justify-center text-center" :model-value="!product.sell" persistent> <!-- 當產品不在售時顯示覆蓋層 -->
    <h1 class="text-center text-red">已下架</h1> <!-- 顯示“已下架”文字 -->
    <v-btn to="/">回首頁</v-btn> <!-- 返回首頁按鈕 -->
  </v-overlay>
</template>

<script setup>
import { ref } from 'vue' // 引入Vue的ref函數，用於創建響應式參考
import { definePage } from 'vue-router/auto' // 引入自動路由定義
import { useRoute, useRouter } from 'vue-router' // 引入路由相關hook
import { useApi } from '@/composables/axios' // 引入API使用的hook
import { useSnackbar } from 'vuetify-use-dialog' // 引入Snackbar通知的hook
import { useForm, useField } from 'vee-validate' // 引入表單驗證的hook和函數
import * as yup from 'yup' // 引入Yup，用於定義驗證規則
import { useUserStore } from '@/stores/user' // 引入用戶存儲的hook

definePage({ // 定義頁面元數據
  meta: {
    title: '購物網 | 商品', // 頁面標題
    login: false, // 是否需要登錄
    admin: false // 是否需要管理員權限
  }
})

const { api } = useApi() // 使用API hook
const route = useRoute() // 獲取當前路由
const router = useRouter() // 使用路由器
const createSnackbar = useSnackbar() // 創建Snackbar通知
const user = useUserStore() // 使用用戶存儲

const product = ref({ // 定義產品響應式參考
  _id: '',
  name: '',
  price: 0,
  description: '',
  image: '',
  quantity: 0,
  sell: true,
  category: ''
})

const load = async () => { // 載入產品資訊的異步函數
  try {
    const { data } = await api.get('/product/' + route.params.id) // 發送GET請求獲取產品資訊
    product.value._id = data.result._id // 更新產品_id
    product.value.name = data.result.name // 更新產品名稱
    product.value.price = data.result.price // 更新產品價格
    product.value.description = data.result.description // 更新產品描述
    product.value.image = data.result.image // 更新產品圖片
    product.value.quantity = data.result.quantity // 更新產品數量
    product.value.sell = data.result.sell // 更新產品銷售狀態
    product.value.category = data.result.category // 更新產品類別
    document.title = '購物網 | ' + product.value.name // 更新頁面標題
  } catch (error) {
    console.log(error) // 錯誤處理
    createSnackbar({ // 顯示錯誤訊息的Snackbar
      text: error?.response?.data?.message || '發生錯誤', // 訊息內容
      snackbarProps: { color: 'red' } // 設定Snackbar顏色為紅色
    })
  }
}
load() // 調用載入函數

const schema = yup.object({ // 定義表單驗證規則
  quantity: yup.number().typeError('數量必填').required('數量必填').min(1, '最少為 1') // 數量必須是數字，且至少為1
})
const { isSubmitting, handleSubmit } = useForm({ // 使用vee-validate的useForm hook
  validationSchema: schema, // 驗證規則
  initialValues: { quantity: 1 } // 初始值
})
const quantity = useField('quantity') // 為數量字段創建一個響應式參考

const submit = handleSubmit(async (values) => { // 提交表單的異步函數
  if (!user.isLogin) { // 如果用戶未登錄
    router.push('/login') // 跳轉到登錄頁面
    return // 結束函數執行
  }
  const result = await user.addCart(product.value._id, values.quantity) // 將產品加入購物車
  createSnackbar({ // 顯示結果通知的Snackbar
    text: result.text, // 訊息內容
    snackbarProps: { color: result.color } // 設定Snackbar顏色
  })
})
</script>
