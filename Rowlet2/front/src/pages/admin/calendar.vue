<template>
  <v-row>
    <v-col>
      <v-sheet>
        <v-calendar
          color="primary"
          :events="events"
          :headers="headers"
        >
          <template v-slot:event="data">
            <v-btn
              class="event-button"
              :class="getButtonClass(data.event.title)"
              @click="handleEventClick(data.event)"
              style="min-width: 100px; text-align: left;"
            >
              {{ data.event.title }}
            </v-btn>
          </template>
        </v-calendar>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script setup>
import { definePage } from 'vue-router/auto'
import { ref } from 'vue'
import { VCalendar } from 'vuetify/labs/VCalendar'
import { useSnackbar } from 'vuetify-use-dialog'
import { useApi } from '@/composables/axios'

definePage({
  meta: {
    title: '管理',
    login: true,
    admin: true
  }
})

const { apiAuth } = useApi()
const createSnackbar = useSnackbar()
const events = ref([])
const eventDetails = ref({}) // 用于存储从后端获取的事件详细信息

const handleEventClick = (event) => {
  const eventId = event.title
  const details = eventDetails.value[eventId]
  const allorder = event.order
  if (details) {
    alert(`訂購人 : ${details.title}\n房間名稱: ${details.info} \n 房間數量:${allorder}`)
  } else {
    alert('沒有訂單')
  }
}

const loadItems = async () => {
  try {
    const { data } = await apiAuth.get('/order/all')
    events.value = []
    eventDetails.value = {}
    data.result.forEach(order => {
      order.cart.forEach(cartItem => {
        cartItem.date.forEach(date => {
          const eventId = order.user.account
          const orderquantity = cartItem.quantity
          const event = {
            title: eventId,
            start: new Date(date),
            end: new Date(new Date(date).getTime() + 60 * 60 * 1000),
            order: orderquantity
          }

          events.value.push(event)
          eventDetails.value[eventId] = {
            title: order.user.account,
            info: cartItem.p_id.name,
            quantity: cartItem.quantity
          }
        })
      })
    })
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error?.response?.data?.message || '发生错误',
      snackbarProps: {
        color: 'red'
      }
    })
  }
}

// Generate a unique class name based on the event title
const getButtonClass = (eventTitle) => {
  // Here you can define your own logic to generate class names
  const baseClass = 'event-button'
  const classMap = {
    user1: 'aaaa',
    user2: 'bbbb',
    // Add more mappings as needed
  }

  return `${baseClass} ${classMap[eventTitle] || 'default-style'}`
}

// Initial load
loadItems()
</script>

<style scoped>
.event-button {
  border-radius: 4px;
  padding: 8px;
  font-size: 12px;
  margin-bottom: 4px;
  text-transform: none; /* Prevents uppercase transformation */
}

.user1-style {
  background-color: hsl(120, 78%, 42%);
}

.user2-style {
  background-color: hsl(0, 78%, 42%);
}

.default-style {
  background-color: hsl(212, 78%, 42%);
}

.event-button:hover {
  background-color: #ff3a17;
}
</style>
<route lang="yaml">
  meta:
    layout: admin
  </route>
