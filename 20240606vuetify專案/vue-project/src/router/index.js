import { createRouter, createWebHashHistory } from 'vue-router'
// import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// 路由導向方式
// 使用 Hash 模式去配對網址
const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			// 這邊是進網頁不管是哪一頁都會讀取
			component: HomeView
		},
		{
			path: '/yangminshan',
			name: 'yangminshan'
		}
	]
})

export default router
