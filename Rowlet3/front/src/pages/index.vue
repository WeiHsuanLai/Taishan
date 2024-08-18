<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">首頁</h1>
      </v-col>
        <Carousel></Carousel>
        <Map></Map>
        <Footer></Footer>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { definePage } from 'vue-router/auto'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
// import ProductCard from '@/components/ProductCard.vue'
// 輪播圖
import Carousel from './index/carousel.vue'
import Map from './index/map.vue'
import Footer from './index/footer.vue'

definePage({
  meta: {
    title: '木木梟飯店首頁',
    login: false,
    admin: false
  }
})

const { api } = useApi()
const createSnackbar = useSnackbar()

const page = ref(1)
const pages = ref(1)
const ITEMS_PER_PAGE = 4 // 完全不會動的變數就會用大寫(老師的習慣) 這邊是一頁顯示多少商品

// const products = ref([]) // 取商品的清單
// const loadProducts = async () => { // 取得商品的function
//   try {
//     const { data } = await api.get('/product', {
//       params: {
//         itemsPerPage: ITEMS_PER_PAGE, // 讓後端知道我們一頁有多少個
//         page: page.value
//       }
//     })
//     pages.value = Math.ceil(data.result.total / ITEMS_PER_PAGE) // 計算總頁數
//     products.value.splice(0, products.value.length, ...data.result.data) // 替換產品陣列
//   } catch (error) {
//     console.log(error)
//     createSnackbar({
//       text: error?.response?.data?.message || '發生錯誤',
//       snackbarProps: {
//         color: 'red'
//       }
//     })
//   }
// }
// loadProducts()
</script>
