import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
// cors 是一個中間件，用於處理跨源資源共享（CORS）的問題。
// 當你的網頁應用需要從不同的域名、協議或端口發送請求到你的後端服務器時，就會遇到跨源請求問題。
// CORS是一種W3C標準，通過添加特殊的HTTP響應頭來告訴瀏覽器允許哪些源可以讀取後端服務器上的資源。
import cors from 'cors'
import { StatusCodes } from 'http-status-codes'
import mongoSanitize from 'express-mongo-sanitize'
import rateLimit from 'express-rate-limit'
import routeUser from './routes/user.js'
import './passport/passport.js'

const app = express()

app.use(rateLimit({
  windowMs: 1000 * 60 * 15,
  max: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  statusCode: StatusCodes.TOO_MANY_REQUESTS,
  message: '太多請求',
  handler (req, res, next, options) {
    res.status(options.statusCode).json({
      success: false,
      message: options.message
    })
  }
}))

app.use(cors({
  // origin = 請求的來源
  // callback(錯誤, 是否允許)
  origin (origin, callback) {
    if (origin === undefined ||
      origin.includes('github.io') || origin.includes('localhost') || origin.includes('127.0.0.1')
    ) {
      callback(null, true)
    } else {
      callback(new Error('CORS'), false)
    }
  }
}))

app.use(express.json())
app.use((_, req, res, next) => {
  res.status(StatusCodes.BAD_REQUEST).json({
    success: false,
    message: '資料格式錯誤'
  })
})

app.use(mongoSanitize())

app.use('/user', routeUser)

app.all('*', (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: '找不到'
  })
})

app.listen(process.env.PORT || 4000, async () => {
  console.log('伺服器啟動')
  await mongoose.connect(process.env.DB_URL)
  mongoose.set('sanitizeFilter', true)
  console.log('資料庫連線成功')
})
