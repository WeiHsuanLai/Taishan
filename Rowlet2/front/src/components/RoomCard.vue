<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card v-bind="props" class="text-center w-100" :elevation="isHovering ? 24 : 6">
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
            <v-dialog max-width="500">
              <template v-slot:activator="{ props: activatorProps }">
                <v-btn
                  v-bind="activatorProps"
                  color="surface-variant"
                  text="MORE"
                  variant="flat"
                ></v-btn>
              </template>

              <template v-slot:default="{ isActive }">
                <v-card>
                  <v-card-text>
                    <div
                      v-for="(line, index) in formattedDescription"
                      :key="index"
                      :class="getLineClass(index)">
                      {{ line }}
                    </div>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn
                      text="關閉介紹"
                      @click="isActive.value = false"
                      color="black" variant="flat"
                    ></v-btn>
                    <v-spacer></v-spacer>
                    <v-btn text="立即訂房" :to="'/aboutroom'" color="green" variant="flat"></v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </v-col>
        </v-row>
      </v-col>
    </v-card>
  </v-hover>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps(['_id', 'category', 'description', 'quantity', 'image', 'name', 'price', 'sell'])

// 將描述字段按換行符分割成數組
const formattedDescription = computed(() => {
  return props.description.split('\n')
})

// 根據索引應用不同的 CSS 樣式
const getLineClass = (index) => {
  if (index === 0 || index === 1) return 'title'
  if (index === 3) return 'red-text'
  return ''
}
</script>

<style>
.title {
  font-size: x-large;
  font-weight: bold;
}

.red-text {
  color: red;
}
</style>
