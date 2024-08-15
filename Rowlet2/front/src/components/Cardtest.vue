<template>
  <V2DatePicker v-model="date"  :min-date="Today">
    <template #default="{ inputValue, inputEvents }">
      <v-text-field :value="inputValue" v-on="inputEvents" />
    </template>
  </V2DatePicker>
  <V2DatePicker v-model="date2"  :min-date="Tomorrow">
    <template #default="{ inputValue, inputEvents }">
      <v-text-field :value="inputValue" v-on="inputEvents" />
    </template>
  </V2DatePicker>
  <!-- <V2DatePicker v-model.range.number="range" /> -->
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'

// 計算今天的日期
const Today = computed(() => new Date().toISOString().split('T')[0])

// 計算明天的日期
const Tomorrow = computed(() => {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 2)
  tomorrow.setHours(0, 0, 0, 0)
  return tomorrow.toISOString().split('T')[0]
})

const date = ref(new Date())
const date2 = ref(new Date(Tomorrow.value))
watchEffect(() => {
  date2.value = new Date(Tomorrow.value)
})
</script>
