<template>
  <v-container>
    <v-col cols="12">
      <h1 class="text-center">關於我們</h1>
    </v-col>
    <v-divider></v-divider>
    <!-- <cardtest></cardtest> -->
    <cardtest2></cardtest2>
  </v-container>

</template>
<script setup>
//
import { definePage } from 'vue-router/auto'

definePage({
  meta: {
    title: '關於我們',
    login: false,
    admin: false
  }
})

</script>
