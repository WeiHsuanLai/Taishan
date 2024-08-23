<template>
<!-- 輪播圖 -->
<Carousel></Carousel>
  <v-container>
    <v-row>
      <!-- 地圖 -->
      <Map></Map>
    </v-row>
  </v-container>
  <v-container>
    <v-row>
      <!-- 遍歷產品列表並顯示每個產品的卡片 -->
      <v-col cols="3"
         v-for="product in products" :key="product._id"
      >
        <RoomCard v-bind="product"></RoomCard>
      </v-col>
    </v-row>
  </v-container>
<Footer></Footer>
</template>

<script setup>
import { ref } from 'vue'
import { definePage } from 'vue-router/auto'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
// 輪播圖
import Carousel from './index/carousel.vue'
import Map from './index/map.vue'
import Footer from './index/footer.vue'
import RoomCard from '../components/RoomCard.vue'

definePage({
  meta: {
    title: '木木梟飯店首頁',
    login: false,
    admin: false
  }
})

const { api } = useApi()
const products = ref([])
const loadProducts = async () => {
  try {
    const { data } = await api.get('/product', {
      params: {
        itemsPerPage: 100 // 假設你想一次取出所有產品
      }
    })
    products.value = data.result.data // 直接賦值所有產品
  } catch (error) {
    console.error(error)
  }
}

loadProducts()
</script>
