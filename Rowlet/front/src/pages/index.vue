<template>
      <v-container class="d-flex text-center">
        <v-row>
          <v-col>
            <h1>我是首頁</h1>
            <abc></abc>
          </v-col>
        </v-row>
      </v-container>
</template>

<script setup>
//
import abc from '../components/ABC.vue'
import { definePage } from 'vue-router/auto'
definePage({
  meta: {
    title: '首頁'
  }
})
</script>
