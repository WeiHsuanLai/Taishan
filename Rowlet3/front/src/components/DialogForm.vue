<!-- DialogForm.vue -->
<template>
  <v-dialog v-model="isActive" max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" color="surface-variant" text="註冊" variant="flat"></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <v-card-title class="headline">註冊</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="submit" :disabled="isSubmitting">
            <v-text-field
              label="帳號"
              minlength="4"
              maxlength="20"
              counter
              v-model="account.value.value"
              :error-messages="account.errorMessage.value"
            ></v-text-field>
            <v-text-field
              label="密碼"
              type="password"
              minlength="4"
              maxlength="20"
              counter
              v-model="password.value.value"
              :error-messages="password.errorMessage.value"
            ></v-text-field>
            <v-text-field
              label="確認密碼"
              type="password"
              minlength="4"
              maxlength="20"
              counter
              v-model="passwordConfirm.value.value"
              :error-messages="passwordConfirm.errorMessage.value"
            ></v-text-field>
            <v-text-field
              label="信箱"
              type="email"
              v-model="email.value.value"
              :error-messages="email.errorMessage.value"
            ></v-text-field>
            <div class="d-flex justify-space-between mb-6">
              <v-btn type="submit" color="green" :loading="isSubmitting">註冊</v-btn>
              <v-btn color="red" text @click="isActive.value = false">取消</v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import validator from 'validator';
import { useApi } from '@/composables/axios';
import { useRouter } from 'vue-router';

// 因為是照 use 的風格去走，要再呼叫一次
const { api } = useApi();
const router = useRouter();
const isActive = ref(false);

// 定義 schema 變數為物件的型態
const schema = yup.object({
  account: yup
    .string()
    .required('使用者帳號必填')
    .min(4, '使用者帳長度必須大於等於4')
    .max(20, '使用者帳號長度不得超過20')
    .test(
      'isAlphanumeric', '帳號需使用英文或數字',
      (value) => validator.isAlphanumeric(value)
    ),
  email: yup
    .string()
    .required('使用者信箱必填')
    .test(
      'isEmail', '使用者信箱格式錯誤',
      (value) => validator.isEmail(value)
    ),
  password: yup
    .string()
    .required('使用者密碼必填')
    .min(4, '使用者密碼長度不符')
    .max(20, '使用者密碼長度不符')
    .test(
      'isAlphanumeric', '密碼需使用英文或數字',
      (value) => validator.isAlphanumeric(value)
    ),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], '密碼不一致')
});

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema
});
const account = useField('account');
const email = useField('email');
const password = useField('password');
const passwordConfirm = useField('passwordConfirm');

// 這個 handleSubmit 是從 usefrom 裡面拉出來的
const submit = handleSubmit(async (values) => {
  try {
    await api.post('/user', {
      account: values.account,
      email: values.email,
      password: values.password
    });
    router.push('/login');
  } catch (error) {
    console.log(error);
    alert(error?.response?.data?.message || '發生錯誤');
  }
});
</script>
