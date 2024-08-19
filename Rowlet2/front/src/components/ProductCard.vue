<template>
  <v-card class="d-flex">
    <v-col cols="2">
      <v-img :src="image" cover height="200"></v-img>
    </v-col>
    <v-card-title>
      <router-link :to="'/products/' + _id">{{ name }}</router-link>
    </v-card-title>
    <v-card-subtitle>剩餘數量:{{ quantity }}</v-card-subtitle>
    <v-card-subtitle>${{ price }}</v-card-subtitle>
    <v-col cols="3">
      <v-card-text>
        <v-date-input v-model="model" label="訂房日期"  multiple="range" :min="Today" max-height="300"></v-date-input>
        {{ description }}
      </v-card-text>
    </v-col>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" type="submit" prepend-icon="mdi-cart" @click="addCart">加入購物車</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { useSnackbar } from 'vuetify-use-dialog'
import { VDateInput } from 'vuetify/labs/VDateInput'
import { computed, ref } from 'vue'
const user = useUserStore()
const router = useRouter()
const createSnackbar = useSnackbar()

const props = defineProps(['_id', 'category', 'description', 'quantity', 'image', 'name', 'price', 'sell'])

const addCart = async () => {
  if (!user.isLogin) {
    router.push('/login')
    return
  }
    console.log(model.value)
    const result = await user.addCart(props._id, 1, model.value)
    createSnackbar({
      text: result.text,
      snackbarProps: {
        color: result.color
      }
    })
}
const model = ref(null)
const Today = computed(() => new Date().toISOString().split('T')[0])
// console.log(Today)

</script>
