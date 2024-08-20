import { Schema, model } from 'mongoose'
const schema = new Schema({
  name: {
    type: String,
    required: [true, '商品名稱必填']
  },
  price: {
    type: Number,
    required: [true, '商品價格必填'],
    min: [0, '商品價格不能小於 0']
  },
  image: {
    type: String,
    required: [true, '商品圖片必填']
  },
  description: {
    type: String,
    required: [true, '商品說明必填']
  },
  category: {
    type: String,
    required: [true, '商品分類必填'],
    enum: {
      values: ['單人房', '雙人房', '四人房'],
      message: '商品分類錯誤'
    }
  },
  sell: {
    type: Boolean,
    required: [true, '商品上架狀態必填']
  },
  quantity: {
    type: Number,
    required: [true, '商品數量必填'],
    min: [1, '商品數量不能小於 1']
  }
}, {
  timestamps: true,
  versionKey: false
})

export default model('products', schema)