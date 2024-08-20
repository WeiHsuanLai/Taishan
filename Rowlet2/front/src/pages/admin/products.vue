<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">商品管理</h1>
      </v-col>
      <v-col cols="12">
        <v-btn color="green" @click="openDialog(null)">新增商品</v-btn>
      </v-col>
      <v-col cols="12">
        <v-data-table-server
          v-model:items-per-page="tableItemsPerPage"
          v-model:sort-by="tableSortBy"
          v-model:page="tablePage"
          :items="tableItems"
          :headers="tableHeaders"
          :loading="tableLoading"
          :items-length="tableItemsLength"
          :search="tableSearch"
          @update:items-per-page="tableLoadItems(false)"
          @update:sort-by="tableLoadItems(false)"
          @update:page="tableLoadItems(false)"
          hover
        >
          <template #top>
            <v-text-field
              label="搜尋"
              v-model="tableSearch"
              append-icon="mdi-magnify"
              @click-append="tableLoadItems(true)"
              @keydown.enter="tableLoadItems(true)"
            ></v-text-field>
          </template>
          <template #[`item.image`]="{ value }">
            <v-img :src="value" height="50px"></v-img>
          </template>
          <template #[`item.sell`]="{ value }">
            <v-icon icon="mdi-check" v-if="value"></v-icon>
          </template>
          <template #[`item.date`]="{ value }">
            <v-icon icon="mdi-check" v-if="value"></v-icon>
          </template>
          <template #[`item.action`]="{ item }">
            <v-btn icon="mdi-pencil" variant="text" color="blue" @click="openDialog(item)"></v-btn>
          </template>
        </v-data-table-server>
      </v-col>
    </v-row>
  </v-container>

  <!-- 彈出新增商品對話框 -->
  <v-dialog v-model="dialog.open" persistent width="500">
    <v-form @submit.prevent="submit" :disabled="isSubmitting">
      <v-card>
        <!-- 如果沒有商品就是新增商品，有就是編輯商品 -->
        <v-card-title>{{ dialog.id ? '編輯商品' : '新增商品' }}</v-card-title>
        <v-card-text>
          <v-text-field
            label="名稱"
            v-model="name.value.value"
            :error-messages="name.errorMessage.value"
          ></v-text-field>
          <v-text-field
            label="價格"
            type="number" min="0"
            v-model="price.value.value"
            :error-messages="price.errorMessage.value"
          ></v-text-field>
          <v-select
            label="分類"
            :items="categories"
            v-model="category.value.value"
            :error-messages="category.errorMessage.value"
          ></v-select>
          <v-text-field
            label="房間數量"
            type="number" min="1"
            v-model="quantity.value.value"
            :error-messages="quantity.errorMessage.value"
          ></v-text-field>
          <v-checkbox
            label="上架"
            v-model="sell.value.value"
            :error-messages="sell.errorMessage.value"
          ></v-checkbox>
          <v-textarea
            label="說明"
            v-model="description.value.value"
            :error-messages="description.errorMessage.value"
          ></v-textarea>
                      <!--vue-file-agentx 裡面的 deletable 打X按鈕 -->
          <vue-file-agent
            v-model="fileRecords"
            v-model:raw-model-value="rawFileRecords"
            accept="image/jpeg,image/png"
            deletable
            max-size="1MB"
            help-text="選擇檔案或拖曳到這裡"
            :error-text="{ type: '檔案格式不支援', size: '檔案大小不能超過 1MB' }"
            ref="fileAgent"
          ></vue-file-agent>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red" :loading="isSubmitting" @click="closeDialog">取消</v-btn>
          <v-btn color="green" type="submit" :loading="isSubmitting">送出</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup>
import { definePage } from 'vue-router/auto'
import { ref } from 'vue'
import * as yup from 'yup'
import { useForm, useField } from 'vee-validate'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
// import { VDateInput } from 'vuetify/labs/VDateInput'

const { apiAuth } = useApi()
const createSnackbar = useSnackbar()
const fileAgent = ref(null)
// const selectedDate = ref(null) // 假設你需要跟踪所選日期
// 表單開關
const dialog = ref({
  // 編輯對話框的狀態
  open: false,
  // 紀錄編輯中的 id，沒有就是新增，有就是編輯
  id: ''
})

// 新增或編輯
const openDialog = (item) => {
  // 如果是要編輯的話， openDialog 會把要編輯的商品傳進來
  if (item) {
    dialog.value.id = item._id
    name.value.value = item.name
    price.value.value = item.price
    description.value.value = item.description
    quantity.value.value = item.quantity
    category.value.value = item.category
    sell.value.value = item.sell
    // 如果值是 null 沒有就是新增的模式
  } else {
    dialog.value.id = ''
  }
  // 然後再打開
  dialog.value.open = true
}

const closeDialog = () => {
  dialog.value.open = false
  resetForm()
  fileAgent.value.deleteFileRecord()
}
// 商品分類
const categories = ['單人房', '雙人房', '四人房']

// 定義欄位格式，建立表單驗證
const schema = yup.object({
  name: yup
    .string()
    .required('商品名稱必填'),
  price: yup
    .number()
    .typeError('商品價格格式錯誤')
    .required('商品價格必填')
    .min(0, '商品價格不能小於 0'),
  description: yup
    .string()
    .required('商品說明必填'),
  category: yup
    .string()
    .required('商品分類必填')
    .test('isCategory', '商品分類錯誤', value => {
      return categories.includes(value)
    }),
  quantity: yup
  .number()
    .typeError('商品數量格式錯誤')
    .required('商品數量必填')
    .min(0, '商品數量不能小於 0'),
  sell: yup
    .boolean()
})

// useForm 函數，這是一個自 React Hook Form 庫提供的函數，用於創建和管理表單。它返回一個物件，其中包含多個方法和狀態變量，幫助我們處理表單的提交、驗證等。
const { handleSubmit, isSubmitting, resetForm } = useForm({
  // 這行代碼指定了一個驗證模式（或稱為驗證規範），這是一個對應到表單欄位的驗證規則集。schema 變量需要在此之前定義，並且通常會根據你的表單需求來設定。
  validationSchema: schema,
  initialValues: {
    name: '',
    price: 0,
    description: '',
    category: '',
    quantity: 0,
    sell: true, // 預設上架
  }
})
// 上面設定完，下面就要 useFied
const name = useField('name')
const price = useField('price')
const description = useField('description')
const category = useField('category')
const sell = useField('sell')
const quantity = useField('quantity')
const fileRecords = ref([])
const rawFileRecords = ref([])

const submit = handleSubmit(async (values) => {
  if (fileRecords.value[0]?.error) return
  if (dialog.value.id.length === 0 && fileRecords.value.length < 1) return

  try {
    const fd = new FormData()
    // fd.append(key, value)
    fd.append('name', values.name)
    fd.append('price', values.price)
    fd.append('description', values.description)
    fd.append('category', values.category)
    fd.append('sell', values.sell)
    fd.append('quantity', values.quantity)
    fd.append('date', values.date)

    if (fileRecords.value.length > 0) {
      fd.append('image', fileRecords.value[0].file)
    }

    if (dialog.value.id === '') {
      await apiAuth.post('/product', fd)
    } else {
      await apiAuth.patch('/product/' + dialog.value.id, fd)
    }

    createSnackbar({
      text: dialog.value.id === '' ? '新增成功' : '編輯成功',
      snackbarProps: {
        color: 'green'
      }
    })
    closeDialog()
    tableLoadItems(true)
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error?.response?.data?.message || '發生錯誤',
      snackbarProps: {
        color: 'red'
      }
    })
  }
})

const tableItemsPerPage = ref(10)
const tableSortBy = ref([
  { key: 'createdAt', order: 'desc' }
])
const tablePage = ref(1)
const tableItems = ref([])
const tableHeaders = [
  { title: '圖片', align: 'center', sortable: false, key: 'image' },
  { title: '名稱', align: 'center', sortable: true, key: 'name' },
  { title: '價格', align: 'center', sortable: true, key: 'price' },
  { title: '分類', align: 'center', sortable: true, key: 'category' },
  { title: '房間數量', align: 'center', sortable: true, key: 'quantity' },
  { title: '上架', align: 'center', sortable: true, key: 'sell' },
  { title: '操作', align: 'center', sortable: false, key: 'action' }
]
const tableLoading = ref(true)
const tableItemsLength = ref(0)
const tableSearch = ref('')
const tableLoadItems = async (reset) => {
  if (reset) tablePage.value = 1
  tableLoading.value = true
  try {
    const { data } = await apiAuth.get('/product/all', {
      params: {
        page: tablePage.value,
        itemsPerPage: tableItemsPerPage.value,
        sortBy: tableSortBy.value[0]?.key || 'createdAt',
        sortOrder: tableSortBy.value[0]?.order || 'desc',
        search: tableSearch.value
      }
    })
    tableItems.value.splice(0, tableItems.value.length, ...data.result.data)
    tableItemsLength.value = data.result.total
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error?.response?.data?.message || '發生錯誤',
      snackbarProps: {
        color: 'red'
      }
    })
  }
  tableLoading.value = false
}
tableLoadItems()

// 標題
definePage({
  meta: {
    title: '商品管理',
    login: true,
    admin: true
  }
})
</script>

<!-- 只有管理員才能進入 -->
<route lang="yaml">
meta:
  layout: admin
</route>
