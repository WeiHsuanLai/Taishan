<template>
  <v-cnotainer class="d-flex text-center">
    <v-row>
      <v-col>
        <h1>關於我們</h1>
        <v-container class="d-flex">
          <v-row>
            <v-col>
              <p>123</p>
              <abc></abc>
              <efg></efg>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-cnotainer>
</template>
<script setup>
//
import { definePage } from 'vue-router/auto'
import abc from '../components/ABC.vue'
import efg from '../components/EFG.vue'
definePage({
  meta: {
    title: '關於我們',
    login: false,
    admin: false
  }
})
</script>
