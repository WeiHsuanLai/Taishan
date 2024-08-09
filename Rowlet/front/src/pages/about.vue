<template>
  <v-cnotainer class="d-flex text-center">
    <v-row>
      <v-col>
        <h1>關於我們</h1>
        <v-container class="d-flex">
          <v-row>
            <v-col>
              <chat></chat>
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
definePage({
  meta: {
    title: '關於我們',
    login: false,
    admin: false
  }
})
</script>
