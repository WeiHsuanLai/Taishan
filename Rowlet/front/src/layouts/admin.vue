<template>
  <!-- 側邊導覽列 -->
   <!-- permanent 是永久固定的側邊攔 -->
  <v-navigation-drawer permanent>
    <!-- 大頭貼 -->
    <v-list>
      <v-list-item prepend-avatar="https://avatars.githubusercontent.com/u/142381318?v=4" :title="user.account" @click="openDialog(null)"></v-list-item>
    </v-list>
    <v-divider></v-divider>

 <!-- 彈出新增商品對話框 -->
 <v-dialog v-model="dialog.open" persistent width="500">
    <v-form @submit.prevent="submit" :disabled="isSubmitting">
      <v-card>
        <!-- 如果沒有商品就是新增商品，有就是編輯商品 -->
        <v-card-title>{{ dialog.id ? '編輯大頭貼' : '新增大頭貼' }}</v-card-title>
        <v-card-text>
          <vue-file-agent
            v-model="fileRecords"
            v-model:raw-model-value="rawFileRecords"
            accept="image/jpeg,image/png"
            deletable
            max-size="1MB"
            help-text="選擇檔案或拖曳到這裡"
            :error-text="{ type: '檔案格式不支援', size: '檔案大小不能超過 1MB' }"
            ref="fileAgent"
          ></vue-file-agent>

        </v-card-text>
        <v-card-actions>
          <v-btn color="red" :loading="isSubmitting" @click="closeDialog">取消</v-btn>
          <v-btn color="green" type="submit" :loading="isSubmitting">送出</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
    <!-- 左側清單陣列 -->
    <v-list>
      <v-list-item
        v-for="item in navItems" :key="item.to"
        :to="item.to" :title="item.text" :prepend-icon="item.icon"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-main>
    <router-view></router-view>
  </v-main>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { computed, ref } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'

const { apiAuth } = useApi()
const user = useUserStore()
const createSnackbar = useSnackbar()
const fileAgent = ref(null)

const navItems = [
  { to: '/admin/products', text: '商品管理', icon: 'mdi-shopping' },
  { to: '/admin/roomoders', text: '房間訂單管理', icon: 'mdi-shopping' },
  { to: '/admin/orders', text: '訂單管理', icon: 'mdi-list-box' },
  { to: '/', text: '回首頁', icon: 'mdi-home' }
]

const dialog = ref({
  // 編輯對話框的狀態
  open: false,
  // 紀錄編輯中的 id，沒有就是新增，有就是編輯
  id: ''
})

const openDialog = (item) => {
  // 如果是要編輯的話， openDialog 會把要編輯的商品傳進來
  if (item) {
    dialog.value.id = item._id
    // 如果值是 null 沒有就是新增的模式
  } else {
    dialog.value.id = ''
  }
  // 然後再打開
  dialog.value.open = true
}
const closeDialog = () => {
  dialog.value.open = false
  resetForm()
  fileAgent.value.deleteFileRecord()
}

const schema = yup.object({
})

const { handleSubmit, isSubmitting, resetForm } = useForm({
  // 這行代碼指定了一個驗證模式（或稱為驗證規範），這是一個對應到表單欄位的驗證規則集。schema 變量需要在此之前定義，並且通常會根據你的表單需求來設定。
  validationSchema: schema,
})
const fileRecords = ref([])

const submit = handleSubmit(async (values) => {
  if (fileRecords.value[0]?.error) return
  if (dialog.value.id.length === 0 && fileRecords.value.length < 1) return

  try {
    const fd = new FormData()
    if (fileRecords.value.length > 0) {
      fd.append('image', fileRecords.value[0].file)
    }
    if (dialog.value.id === '') {
      await apiAuth.post('/stickers', fd)
    } else {
      await apiAuth.patch('/stickers/' + dialog.value.id, fd)
    }
    createSnackbar({
      text: dialog.value.id === '' ? '新增成功' : '編輯成功',
      snackbarProps: {
        color: 'green'
      }
    })
    closeDialog()
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error?.response?.data?.message || '發生錯誤',
      snackbarProps: {
        color: 'red'
      }
    })
  }
})
</script>
