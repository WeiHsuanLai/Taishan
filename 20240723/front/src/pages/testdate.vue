<template>
  <ProductCard2></ProductCard2>
</template>

<script setup>
import ProductCard2 from '@/components/ProductCard2.vue'
import { definePage } from 'vue-router/auto'

definePage({
  meta: {
    title: '購物網 | 購物車',
    login: true,
    admin: false
  }
})
</script>
