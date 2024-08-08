<!-- 這裡不需要 v-app 也不需要 v-main，因為 v-main 已經在 layout 了 -->
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">登入</h1>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12">
        <!-- :disabled="isSubmitting"是loading 狀態  @submit.prevent="submit" 為送出 -->
        <v-form :disabled="isSubmitting" @submit.prevent="submit">
          <v-text-field
            label="帳號"
            minlength="4" maxlength="20" counter
            v-model="account.value.value"
            :error-messages="account.errorMessage.value"
          ></v-text-field>
          <v-text-field
            label="密碼"
            minlength="4" maxlength="20" counter
            type="password"
            v-model="password.value.value"
            :error-messages="password.errorMessage.value"
          ></v-text-field>
          <div class="text-center">
            <!-- :loding="isSubmitting" 轉圓圈效果  -->
            <v-btn type="submit" color="green" :loading="isSubmitting">登入</v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useRouter } from 'vue-router'
import validator from 'validator'
import { definePage } from 'vue-router/auto'
import { useUserStore } from '@/stores/user'
import { useSnackbar } from 'vuetify-use-dialog'

definePage({
  meta: {
    // 設定頁面標題
    title: '登入',
    login: false,
    admin: false
  }
})
// 初始化路由
const router = useRouter()
// 獲取用戶狀態管理實例
const user = useUserStore()
// // 初始化 Snackbar 通知功能
const createSnackbar = useSnackbar()

const schema = yup.object({
  account: yup
    .string()
    .required('使用者帳號必填')
    .min(4, '使用者帳號長度不符')
    .max(20, '使用者帳號長度不符')
    .test(
      // .test(自訂驗證名稱, 錯誤訊息, 驗證 function)
      'isAlphanumeric', '使用者帳號格式錯誤',
      (value) => {
        return validator.isAlphanumeric(value)
      }
    ),
  password: yup
    .string()
    .required('使用者密碼必填')
    .min(4, '使用者密碼長度不符')
    .max(20, '使用者密碼長度不符')
})

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema
})
const account = useField('account')
const password = useField('password')

const submit = handleSubmit(async (values) => {
    // 使用用戶狀態管理實例的 login 方法進行登入操作，傳入表單提交的值
  const result = await user.login(values)
    // 檢查登入結果是否為 "登入成功"
  if (result === '登入成功') {
      // 如果登入成功，則使用 createSnackbar 函數顯示綠色提示條，帶有登入成功的消息
    createSnackbar({
      text: result,
      snackbarProps: {
        color: 'blue',
      }
    })
        // 將用戶重定向到主頁面
    router.push('/')
  } else {
     // 如果登入失敗，則使用 createSnackbar 函數顯示紅色提示條，帶有登入失敗的消息
    createSnackbar({
      text: result,
      snackbarProps: {
        color: 'red',
      }
    })
  }
})

</script>
