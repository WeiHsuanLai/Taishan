<template>
  <v-navigation-drawer v-if="mobile" :model-value="drawer" @update:model-value="updateDrawer">
    <v-list nav>
      <v-list-item
        v-for="item in navItems" :key="item.to"
        :prepend-icon="item.icon" :to="item.to"
        :title="item.text"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { inject } from 'vue'
import { defineProps, defineEmits } from 'vue'

const mobile = inject('mobile')
const props = defineProps({
  drawer: Boolean,
})

const emit = defineEmits(['update:drawer'])

const updateDrawer = (value) => {
  emit('update:drawer', value)
}

const navItems = [
  { to: '/register', text: '註冊', icon: 'mdi-account-plus' },
  { to: '/login', text: '登入', icon: 'mdi-account-arrow-left' },
  { to: '/cart', text: '購物車', icon: 'mdi-cart' },
  { to: '/orders', text: '訂單', icon: 'mdi-list-box' },
  { to: '/admin', text: '管理', icon: 'mdi-cog' }
]
</script>
