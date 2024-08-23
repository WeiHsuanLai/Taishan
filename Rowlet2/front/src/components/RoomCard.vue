<template>
  <v-card class="text-center w-100">
    <v-col cols="12">
      <v-img :src="image" cover height="500"></v-img>
    </v-col>
    <v-col cols="12">
      <v-row>
        <v-col cols="6">{{ category }}</v-col>
        <v-col cols="6"><h3>價格${{ price }}</h3></v-col>
        <v-col>
          <router-link :to="'/products/' + _id">立即訂房</router-link>
        </v-col>
        <v-col>
          <router-link :to="'/aboutroom'">{{ category }}</router-link>
        </v-col>
      </v-row>
    </v-col>
  </v-card>

</template>

<script setup>
const props = defineProps(['_id', 'category', 'description', 'quantity', 'image', 'name', 'price', 'sell'])
</script>
