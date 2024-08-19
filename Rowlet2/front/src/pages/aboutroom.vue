<template>
  <v-container>
    <v-row>
      <!-- 顯示標題 -->
      <v-col cols="12">
        <h1 class="text-center">客房介紹</h1>
      </v-col>

      <!-- 遍歷產品列表並顯示每個產品的卡片 -->
      <v-col
        cols="12" v-for="product in products" :key="product._id"
      >
        <ProductCard v-bind="product"></ProductCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useApi } from '@/composables/axios'
import ProductCard from '@/components/ProductCard.vue'

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
