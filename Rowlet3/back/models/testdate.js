import { Schema, model } from 'mongoose'
const schema = new Schema({
  checkin: {
    type: [Date],
    required: [true, '開始日期必填']
  },
  checkout: {
    type: [Date],
    required: [true, '結束日期必填']
  }
}, {
  timestamps: true,
  versionKey: false
})

export default model('date', schema)
