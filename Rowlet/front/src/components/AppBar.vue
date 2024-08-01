<template>
  <v-app-bar>
    <v-container class="d-flex align-center">
      <v-btn to="/" :active="false">購物網</v-btn>
      <v-spacer />
      <template v-if="mobile">
        <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
      </template>
      <template v-else>
        <v-btn v-for="item in navItems" :key="item.to" :prepend-icon="item.icon" :to="item.to">{{ item.text }}</v-btn>
      </template>
    </v-container>
  </v-app-bar>
</template>

<script setup>
import { inject } from 'vue'
import { defineEmits } from 'vue'

const mobile = inject('mobile')
const emit = defineEmits(['toggle-drawer'])

const navItems = [
  { to: '/register', text: '註冊', icon: 'mdi-account-plus' },
  { to: '/login', text: '登入', icon: 'mdi-account-arrow-left' },
  { to: '/cart', text: '購物車', icon: 'mdi-cart' },
  { to: '/orders', text: '訂單', icon: 'mdi-list-box' },
  { to: '/admin', text: '管理', icon: 'mdi-cog' }
]

const toggleDrawer = () => {
  emit('toggle-drawer')
}
</script>
