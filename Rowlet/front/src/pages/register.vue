<!-- 這裡不需要 v-app 也不需要 v-main，因為 v-main 已經在 layout 了 -->
<template>
  <v-responsive class="mx-auto" max-width="300">
        <h1 class="text-center">註冊</h1>
      <v-divider></v-divider>
      <v-form @submit.prevent="submit" :disabled="isSubmitting">
          <v-text-field
            label="帳號"
            minlength="4" maxlength="20" counter
            v-model="account.value.value"
            :error-messages="account.errorMessage.value"
          ></v-text-field>
          <v-text-field
            label="密碼" type="password"
            minlength="4" maxlength="20" counter
            v-model="password.value.value"
            :error-messages="password.errorMessage.value"
          ></v-text-field>
          <v-text-field
            label="確認密碼" type="password"
            minlength="4" maxlength="20" counter
            v-model="passwordConfirm.value.value"
            :error-messages="passwordConfirm.errorMessage.value"
          ></v-text-field>
          <v-text-field
            label="信箱" type="email"
            v-model="email.value.value"
            :error-messages="email.errorMessage.value"
          ></v-text-field>
          <v-btn type="submit" color="green" :loading="isSubmitting">註冊</v-btn>
        </v-form>
  </v-responsive>
</template>

<script setup>
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import validator from 'validator'
import { useApi } from '@/composables/axios'
import { useRouter } from 'vue-router'

const { api } = useApi()
const router = useRouter()

// 定義 schema 1變數為物件的型態
const schema = yup.object({
  // 帳號
  account: yup
    .string()
    .required('使用者帳號必填')
    .min(4, '使用者帳長度必須大於等於4')
    .max(20, '使用者帳號長度不得超過20')
    .test(
      // .test(自訂驗證名稱, 錯誤訊息, 驗證 function)
      'isAlphanumeric', '帳號需使用英文或數字',
      (value) => {
        return validator.isAlphanumeric(value)
      }
  ),
    // 信箱
  email: yup
    .string()
    .required('使用者信箱必填')
    .test(
      'isEmail', '使用者信箱格式錯誤',
      (value) => {
        return validator.isEmail(value)
      }
  ),
    // 密碼
  password: yup
    .string()
    .required('使用者密碼必填')
    .min(4, '使用者密碼長度不符')
    .max(20, '使用者密碼長度不符')
    .test(
      // .test(自訂驗證名稱, 錯誤訊息, 驗證 function)
      'isAlphanumeric', '密碼需使用英文或數字',
      (value) => {
        return validator.isAlphanumeric(value)
      })
  ,
  passwordConfirm: yup
    .string()
    // .oneOf(陣列, 錯誤訊息) 只允許符合陣列內其中一個值
    // .ref('password')     代表這個 schema 的 password 的欄位值
    .oneOf([yup.ref('password')], '密碼不一致')
})

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema
})
const account = useField('account')
const email = useField('email')
const password = useField('password')
const passwordConfirm = useField('passwordConfirm')

const submit = handleSubmit(async (values) => {
  try {
    await api.post('/user', {
      account: values.account,
      email: values.email,
      password: values.password
    })
    router.push('/login')
  } catch (error) {
    console.log(error)
    alert(error?.response?.data?.message || '發生錯誤')
  }
})
</script>
