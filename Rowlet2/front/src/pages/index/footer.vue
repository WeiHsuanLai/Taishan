<template>
  <v-footer class="bg-black text-center d-flex flex-column w-100">
    <div>
      <v-btn
        v-for="icon in icons"
        :key="icon"
        :icon="icon"
        class="mx-4"
        variant="text"
      ></v-btn>
    </div>

    <v-divider></v-divider>

    <div>
      <h7>{{ formattedDate }}</h7>
    </div>
  </v-footer>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const icons = ref([
  'mdi-facebook',
  'mdi-twitter',
  'mdi-linkedin',
  'mdi-instagram',
])

const formattedDate = ref('')

onMounted(() => {
  const currentDate = new Date()
  formattedDate.value = `${currentDate.getFullYear()}/${currentDate.getDate()}/${currentDate.getMonth() + 1}` // 日期格式為 "dd/mm/yyyy"
})
</script>
