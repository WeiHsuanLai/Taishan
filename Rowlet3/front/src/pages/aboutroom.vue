<template>
  <v-cnotainer>
    <v-row>
    <v-col cols="12">
      <h1 class="text-center">客房介紹</h1>
    </v-col>
    <!-- 商品的卡片 -->
      <!-- 使用 v-for 指令遍歷 products 陣列中的每個產品，cols、md、lg 屬性的設定同上，v-bind="product" 将 product 物件的屬性綁定到 ProductCard 組件 -->
      <v-col
        cols="12" md="6" lg="3"
        v-for="product in products" :key="product._id"
      >
        <ProductCard v-bind="product"></ProductCard>
      </v-col>

      <v-col cols="12">
        <v-pagination v-model="page" :length="pages" rounded="circle" @update:model-value="loadProducts"></v-pagination>
      </v-col>
    <v-divider></v-divider>
  </v-row>
  </v-cnotainer>
</template>
<script setup>
//
import { ref } from 'vue'
import { definePage } from 'vue-router/auto'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import ProductCard from '@/components/ProductCard.vue'

definePage({
  meta: {
    title: '客房介紹',
    login: false,
    admin: false
  }
})

const { api } = useApi()
const createSnackbar = useSnackbar()

const page = ref(1)
const pages = ref(1)
const ITEMS_PER_PAGE = 4 // 完全不會動的變數就會用大寫(老師的習慣) 這邊是一頁顯示多少商品

const products = ref([]) // 取商品的清單
const loadProducts = async () => { // 取得商品的function
  try {
    const { data } = await api.get('/product', {
      params: {
        itemsPerPage: ITEMS_PER_PAGE, // 讓後端知道我們一頁有多少個
        page: page.value
      }
    })
    pages.value = Math.ceil(data.result.total / ITEMS_PER_PAGE) // 計算總頁數
    products.value.splice(0, products.value.length, ...data.result.data) // 替換產品陣列
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
loadProducts()
</script>
