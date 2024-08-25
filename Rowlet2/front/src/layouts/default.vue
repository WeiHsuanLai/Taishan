<template>
  <!-- 手機板側欄 -->
  <v-navigation-drawer v-if="mobile" v-model="drawer">
    <v-list nav>
      <v-list-item :prepend-avatar="user.image" :title="user.name[0]" @click="openDialog(null)"></v-list-item>
      <template v-for="item in navItems" :key="item.to">
        <!-- 如果 item.show 有登入 才顯示 -->
        <v-list-item :prepend-icon="item.icon" :to="item.to" :title="item.text" v-if="item.show">
          <template #append>
            <!-- v-badge 使用者購物車顯示數量 -->
            <v-badge color="error" :content="user.cart" v-if="item.to === '/cart' && user.cart > 0" inline></v-badge>
          </template>
        </v-list-item>
      </template>
      <v-list-item prepend-icon="mdi-account-arrow-right" v-if="user.isLogin" title="登出" @click="logout"></v-list-item>
    </v-list>
  </v-navigation-drawer>

  <!-- 導覽列 -->
  <v-app-bar>
    <v-container class="d-flex align-center" prominent>
      <!-- 標題 -->

      <router-link to="/" style="width: 70px">
        <v-img src="../assets/rowlet.png" class="logorowelt"></v-img>
      </router-link>

      <v-spacer />

      <!-- 手機板漢堡按鈕 -->
      <template v-if="mobile">
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      </template>

      <template v-else>
        <!-- 電腦版選單 -->
        <template v-for="item in navItems" :key="item.to">
          <!-- 如果 v-if="item.show" 登入 會顯示 -->
          <v-btn v-if="item.show" :prepend-icon="item.icon" :to="item.to">
            {{ item.text }}
            <!-- v-badge 使用者購物車顯示數量 floating 讓數字右上角 -->
            <v-badge color="red" :content="user.cart" v-if="item.to === '/cart' && user.cart > 0" floating></v-badge>
          </v-btn>
        </template>
        <v-list-item :prepend-avatar="user.image" :title="user.name[0]" @click="openDialog(null)" v-if="user.isLogin"></v-list-item>
        <!-- 有登入才會顯示登出 -->
        <v-btn prepend-icon="mdi-account-arrow-right" v-if="user.isLogin" @click="logout">登出</v-btn>
      </template>
    </v-container>
  </v-app-bar>
  <!-- 更換大頭貼 -->
  <template>
    <v-dialog v-model="dialog.open" persistent width="500" >
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
              :error-text="{
                type: '檔案格式不支援',
                size: '檔案大小不能超過 1MB'
              }"
              ref="fileAgent"></vue-file-agent>
          </v-card-text>
          <v-card-actions>
            <v-btn color="red" :loading="isSubmitting" @click="closeDialog">取消</v-btn>
            <v-btn color="green" type="submit" :loading="isSubmitting">送出</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </template>
  <!-- 主要內容 -->
  <v-main class="page-background">
    <router-view></router-view>
  </v-main>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import { useDisplay } from 'vuetify'
  import { useUserStore } from '@/stores/user'
  import { useSnackbar } from 'vuetify-use-dialog'
  import { useApi } from '@/composables/axios'
  import { useForm } from 'vee-validate'
  // 使用 Vuetify 的 useDisplay 獲取手機模式狀態
  const { mobile } = useDisplay()
  // 使用自定義的useUserStore獲取用戶資訊
  const user = useUserStore()
  // 使用vuetify-use-dialog的useSnackbar創建彈出的提示框
  const createSnackbar = useSnackbar()
  // 定義一個響應式變量來控制側邊欄的顯示與隱藏
  const drawer = ref(false)
  const { apiAuth } = useApi()

  const fileAgent = ref(null)
  const dialog = ref({
    open: false
  })

  const openDialog = item => {
    dialog.value.open = true
  }
  const { isSubmitting, handleSubmit } = useForm({
    initialValues: {
      quantity: 1
    }
  })
  const closeDialog = () => {
    dialog.value.open = false
    fileAgent.value.deleteFileRecord()
  }

  const fileRecords = ref([])
  const rawFileRecords = ref([])

  const submit = handleSubmit(async values => {
    if (fileRecords.value[0]?.error) return
    if (fileRecords.value.length < 1) return
    try {
      const fd = new FormData()
      if (fileRecords.value.length > 0) {
        fd.append('image', fileRecords.value[0].file)
      }
      const { data } = await apiAuth.post('/photo', fd)
      console.log(fd)
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
  })

  // 導覽列
  // 計算導航項目，根據用戶登錄狀態和權限顯示不同的菜單
  const navItems = computed(() => {
    return [
      {
        to: '/aboutroom',
        text: '客房介紹',
        icon: 'mdi-seat-individual-suite',
        show: !user.isLogin || user.isLogin
      }, // 如果用戶未登錄，顯示「客房介紹」按鈕
      {
        to: '/register',
        text: '註冊',
        icon: 'mdi-account-plus',
        show: !user.isLogin
      }, // 如果用戶未登錄，顯示「註冊」按鈕
      {
        to: '/login',
        text: '登入',
        icon: 'mdi-account-arrow-left',
        show: !user.isLogin
      }, // 如果用戶未登錄，顯示「關於我們」按鈕
      {
        to: '/about',
        text: '關於我們',
        icon: 'mdi-alpha-a-box-outline',
        show: !user.isLogin || user.isLogin
      }, // 如果用戶未登錄，顯示「登入」按鈕
      { to: '/cart', text: '購物車', icon: 'mdi-cart', show: !user.isLogin || user.isLogin }, // 如果用戶已登錄，顯示「購物車」按鈕
      { to: '/orders', text: '訂單', icon: 'mdi-list-box', show: user.isLogin }, // 如果用戶已登錄，顯示「訂單」按鈕
      {
        to: '/admin',
        text: '管理',
        icon: 'mdi-cog',
        show: user.isLogin && user.isAdmin
      } // 如果用戶是管理員，顯示「管理」按鈕
    ]
  })

  // 登出 function
  const logout = async () => {
    await user.logout()
    // 登出時跳出視窗顯示
    createSnackbar({
      text: '登出成功',
      snackbarProps: {
        color: 'green'
      }
    })
  }

  const avatar = computed(() => {
    return `https://api.multiavatar.com/${user.account}.png`
  })
</script>
<style scoped>
  .v-app-bar {
    height: 70px;
    background: black;
    color: rgb(193, 193, 193);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .page-background {
  background-color: #f0f0f0;
}
</style>
