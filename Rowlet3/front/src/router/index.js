/**
 * router/index.ts
 *自動路由配置，適用於 `./src/pages/*.vue` 路徑下的所有頁面
 * Automatic routes for `./src/pages/*.vue`
 */
// Composables
import { createRouter, createWebHashHistory, START_LOCATION } from 'vue-router/auto' // 從 vue-router 的自動化功能中引入創建路由器、創建 Web Hash History 和開始位置常量
import { setupLayouts } from 'virtual:generated-layouts' // 從虛擬生成的布局中引入設置布局的函數
import { useUserStore } from '@/stores/user' // 從用戶存儲模塊中引入獲取用戶信息的方法

// 創建路由器實例，並配置歷史模式和擴展路由
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL), // 使用 Web Hash History 模式，基於當前環境的 BASE_URL
  extendRoutes: setupLayouts // 擴展路由，以支持自動生成的布局
})

// 在每次路由跳轉之前執行的守衛
router.beforeEach(async (to, from, next) => {
  const user = useUserStore() // 獲取用戶信息

  // 如果是從開始位置來的，則加載用戶個人資料
  if (from === START_LOCATION) {
    await user.profile()
  }

  // 根據用戶狀態和目標路徑進行重定向
  if (user.isLogin && ['/register', '/login'].includes(to.path)) {
    next('/') // 如果已登錄且嘗試訪問註冊或登錄頁面，則重定向到首頁
  } else if (to.meta.login && !user.isLogin) {
    next('/login') // 如果目標路徑需要登錄但用戶未登錄，則重定向到登錄頁面
  } else if (to.meta.admin && !user.isAdmin) {
    next('/') // 如果目標路徑需要管理員權限但用戶不是管理員，則重定向到首頁
  } else {
    next() // 其他情況正常繼續
  }
})

// 在每次路由跳轉後更新文檔標題
router.afterEach((to, from) => {
  document.title = to.meta.title // 設置文檔標題為目標路徑的 meta.title 屬性值
})

// 導出路由器實例
export default router
