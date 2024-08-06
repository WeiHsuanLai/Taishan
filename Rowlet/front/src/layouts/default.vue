<template>
  <!-- 手機板側欄 -->
  <v-navigation-drawer v-if="mobile" v-model="drawer">
    <v-list nav>
      <template v-for="item in navItems" :key="item.to">
        <!-- 如果 item.show 有登入 才顯示 -->
        <v-list-item
          :prepend-icon="item.icon" :to="item.to"
          :title="item.text"
          v-if="item.show"
        >
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
    <v-container class="d-flex align-center">
      <!-- 標題 -->
      <v-btn to="/" :active="false">購物網</v-btn>
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
        <!-- 有登入才會顯示登出 -->
        <v-btn prepend-icon="mdi-account-arrow-right" v-if="user.isLogin" @click="logout">登出</v-btn>
      </template>
    </v-container>
  </v-app-bar>
  <!-- 主要內容 -->
  <v-main>
    <router-view>

    </router-view>
  </v-main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDisplay } from 'vuetify'
import { useUserStore } from '@/stores/user'
import { useSnackbar } from 'vuetify-use-dialog'

// 使用 Vuetify 的 useDisplay 獲取手機模式狀態
const { mobile } = useDisplay()
// 使用自定義的useUserStore獲取用戶資訊
const user = useUserStore()
// 使用vuetify-use-dialog的useSnackbar創建彈出的提示框
const createSnackbar = useSnackbar()
// 定義一個響應式變量來控制側邊欄的顯示與隱藏
const drawer = ref(false)

// 導覽列
// 計算導航項目，根據用戶登錄狀態和權限顯示不同的菜單
const navItems = computed(() => {
  return [
    { to: '/about', text: '關於我們', icon: 'mdi-alpha-a-box-outline', show: !user.isLogin || user.isLogin }, // 如果用戶未登錄，顯示「關於我們」按鈕
    { to: '/register', text: '註冊', icon: 'mdi-account-plus', show: !user.isLogin }, // 如果用戶未登錄，顯示「註冊」按鈕
    { to: '/login', text: '登入', icon: 'mdi-account-arrow-left', show: !user.isLogin }, // 如果用戶未登錄，顯示「登入」按鈕
    { to: '/cart', text: '購物車', icon: 'mdi-cart', show: user.isLogin }, // 如果用戶已登錄，顯示「購物車」按鈕
    { to: '/orders', text: '訂單', icon: 'mdi-list-box', show: user.isLogin }, // 如果用戶已登錄，顯示「訂單」按鈕
    { to: '/admin', text: '管理', icon: 'mdi-cog', show: user.isLogin && user.isAdmin }// 如果用戶是管理員，顯示「管理」按鈕
  ]
})

// 登出 function
const logout = async () => {
  await user.logout()
  // 登出時跳出視窗顯示
  createSnackbar({
    text: '登出成功',
    snackbarProps: {
      color: 'green',
    }
  })
}
</script>
