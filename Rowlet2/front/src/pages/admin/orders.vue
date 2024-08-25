<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">訂單管理</h1>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12">
        <v-data-table :items="items" :headers="headers">
          <template #[`item.cart`]="data">
            <ul>
              <li v-for="item in data.item.cart" :key="item._id">{{ item.p_id.name }} * {{ item.quantity }}</li>
            </ul>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'
  import { useApi } from '@/composables/axios'
  import { useSnackbar } from 'vuetify-use-dialog'
  import { definePage } from 'vue-router/auto'

  definePage({
    meta: {
      title: '購物網 | 訂單管理',
      login: true,
      admin: true
    }
  })

  const { apiAuth } = useApi()
  const createSnackbar = useSnackbar()

  const items = ref([])
  const headers = [
    { title: '編號', key: '_id' },
    { title: '帳號', key: 'user.account' },
    { title: '訂購日期', key: 'createdAt', value: item => new Date(item.createdAt).toLocaleString() },
    {
      title: '訂房時間',
      key: 'date',
      value: item => {
        return item.cart.map(c => {
          if (c.date || c.date.length > 0) {
          const startDate = new Date(c.date[0]).toISOString().split('T')[0]
          let endDay = ''
          if (c.date.length === 1) {
            // 正確地創建新日期對象並轉換成字符串
            const endDate = new Date(new Date(startDate).setDate(new Date(startDate).getDate() + 1))
            endDay = endDate.toISOString().split('T')[0]
          } else if (c.date.length > 1) {
            const lastDate = new Date(c.date[c.date.length - 1])
            lastDate.setDate(lastDate.getDate()) // 增加一天
            endDay = lastDate.toISOString().split('T')[0]
          }
            return `${startDate}入住 至 ${endDay} 退房`
        }
          return '無日期'
        }).join(', ')
      }
},
    { title: '商品', key: 'cart', sortable: false },
    {
      title: '金額',
      key: 'price',
      value: item => {
        return item.cart.reduce((total, current) => {
          return total + current.quantity * current.p_id.price
        }, 0)
      }
    }
  ]

  const loadItems = async () => {
    try {
      const { data } = await apiAuth.get('/order/all')
      items.value.push(...data.result)
    } catch (error) {
      console.log(error)
      createSnackbar({
        text: error?.response?.data?.message || '發生錯誤',
        snackbarProps: {
          color: 'red'
        }
      })
    }
  }
  loadItems()
</script>

<route lang="yaml">
meta:
  layout: admin
</route>
