/**
導入了createRouter、createWebHashHistory和START_LOCATION，這些都是Vue Router的API。createRouter用於創建路由實例
，createWebHashHistory用於設置歷史模式（使用哈希路由），START_LOCATION是一個特殊的路由位置，用於標記路由的起始點。
導入了setupLayouts，這是虛擬模塊的一部分，用於設置路由的佈局。
導入了useUserStore，這是 Vuex store 的一部分，用於管理用戶相關的狀態。
 */

// Composables
import { createRouter, createWebHashHistory, START_LOCATION } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { useUserStore } from '@/stores/user'
// 創建了一個路由實例，設置了歷史模式和路由佈局。
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  extendRoutes: setupLayouts
})
// 在每次路由切換前執行的守護函數，檢查是否是從路由的起始點開始的路由轉換，如果是，則呼叫user.profile()方法來獲取或更新用戶的個人資料。
router.beforeEach(async (to, from, next) => {
  const user = useUserStore()

  // from === START_LOCATION 進頁面的初次導航
  if (from === START_LOCATION) {
    await user.profile()
  }
  if (user.isLogin && ['/register', '/login'].includes(to.path)) {
    next('/')
  } else if (to.meta.login && !user.isLogin) {
    next('/login')
  } else if (to.meta.admin && !user.isAdmin) {
    next('/')
  } else {
    // 必須使用 next() 才能去下一步
    next()
  }
})
// 在每次路由切換後執行的回調函數，將頁面標題設置為當前路由的元數據中的title。
router.afterEach((to, from) => {
  document.title = to.meta.title
})
// 將路由實例導出，以供其他模塊使用。
export default router
