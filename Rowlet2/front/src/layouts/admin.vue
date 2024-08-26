<template>
  <v-navigation-drawer permanent>
    <v-list>
      <v-list-item :prepend-avatar="user.image" :title="user.name" @click="openDialog(null)"></v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list>
      <v-list-item v-for="item in navItems" :key="item.to" :to="item.to" :title="item.text" :prepend-icon="item.icon"></v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-dialog v-model="dialog.open" persistent width="500">
    <v-form @submit.prevent="submit" :disabled="isSubmitting">
      <v-card>
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
            ref="fileAgent"></vue-file-agent>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red" :loading="isSubmitting" @click="closeDialog">取消</v-btn>
          <v-btn color="green" type="submit" :loading="isSubmitting">送出</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
  <v-main class="page-background">
    <router-view></router-view>
  </v-main>
</template>

<script setup>
  import { useUserStore } from '@/stores/user'
  import { ref } from 'vue'
  import { useApi } from '@/composables/axios'
  import { useSnackbar } from 'vuetify-use-dialog'

  const { apiAuth } = useApi()
  const createSnackbar = useSnackbar()

  const fileAgent = ref(null)
  const dialog = ref({
    open: false
  })

  const openDialog = item => {
    dialog.value.open = true
  }

  const closeDialog = () => {
    dialog.value.open = false
    fileAgent.value.deleteFileRecord()
  }

  const fileRecords = ref([])
  const rawFileRecords = ref([])

  const submit = async values => {
    if (fileRecords.value[0]?.error) return
    if (fileRecords.value.length < 1) return
    try {
      const fd = new FormData()
      if (fileRecords.value.length > 0) {
        fd.append('image', fileRecords.value[0].file)
      }
      const { data } = await apiAuth.post('/photo', fd)
      user.image = data.result
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
  }

  const user = useUserStore()
const navItems = [
    { to: '/admin/calendar', text: '行事曆', icon: 'mdi-calendar-account' },
    { to: '/admin/products', text: '商品管理', icon: 'mdi-shopping' },
    { to: '/admin/orders', text: '訂單管理', icon: 'mdi-list-box' },
    { to: '/aboutroom', text: '立即訂房', icon: 'mdi-seat-individual-suite' },
    { to: '/', text: '回首頁', icon: 'mdi-home' }
  ]
</script>

<style scoped>
  .page-background {
  background-color: #f0f0f0;
}
</style>
