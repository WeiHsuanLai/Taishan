<template>
  <!-- 側邊導覽列 -->
   <!-- permanent 是永久固定的側邊攔 -->
  <v-navigation-drawer permanent>
    <!-- 大頭貼 -->
    <v-list>
      <v-list-item prepend-avatar="https://avatars.githubusercontent.com/u/142381318?v=4" :title="user.account"></v-list-item>
    </v-list>
    <v-divider></v-divider>

    <!-- 左側清單陣列 -->
    <v-list>
      <v-list-item
        v-for="item in navItems" :key="item.to"
        :to="item.to" :title="item.text" :prepend-icon="item.icon"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-main>
    <router-view></router-view>
  </v-main>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { computed } from 'vue'

const user = useUserStore()

const navItems = [
  { to: '/admin/products', text: '商品管理', icon: 'mdi-shopping' },
  { to: '/admin/mainpage', text: '商品管理2', icon: 'mdi-shopping' },
  { to: '/admin/orders', text: '訂單管理', icon: 'mdi-list-box' },
  { to: '/', text: '回首頁', icon: 'mdi-home' }
]

</script>
