// 引入dotenv/config模組，讓程式能夠讀取.env檔案中的環境變數。
import 'dotenv/config'
// 引入express框架，用於創建Web伺服器。
import express from 'express'
// 引入mongoose模組，用於與MongoDB資料庫進行交互。
import mongoose from 'mongoose'
// 引入cors模組，用於處理跨源資源請求。
import cors from 'cors'
// 引入http-status-codes模組，提供HTTP狀態碼的常量。
import { StatusCodes } from 'http-status-codes'
// 引入express-mongo-sanitize中間件，用於防止MongoDB注入攻擊。
import mongoSanitize from 'express-mongo-sanitize'
// 引入express-rate-limit中間件，用於限制請求頻率。
import rateLimit from 'express-rate-limit'
// 引入自定義的用戶路由模組。
import routeUser from './routes/router_user.js'
// 引入Passport相關設定，但不直接執行任何操作，只是為了確保Passport配置被加載。
import './passport/passport.js'

// 創建一個 Express 應用程序實例，app 對象將用於定義路由和中間件。
// express 一定要先寫在前面不然會有影響
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

// 將傳入的 body 解析為 json
app.use(express.json())
// express 會自動根據你的 function 來決定要做什麼處裡
// 有 next 就叫做 middlewares ，處理完後去下一步
// 如果是要處理上一個 middlewares 的錯誤，必須在前面加上 error 或是 _
// 如果沒有 error 就會被略過 所以這邊是處理錯誤的 middlewares，app.use((error, req, res, next)
// _底線代表不使用第一個參數
// 處理 express.json 的錯誤
// 處理 middlewares 的錯誤一定要有四個參數
app.use((_, req, res, next) => {
  res.status(StatusCodes.BAD_REQUEST).json({
    success: false,
    message: '資料格式錯誤'
  })
})
// 使用mongoSanitize中間件防止MongoDB注入攻擊。
app.use(mongoSanitize())
// 將用戶相關路由掛載到/user路徑下。
app.use('/user', routeUser)
// 為所有未匹配的路徑設置404錯誤處理器。
app.all('*', (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: '找不到'
  })
})
// 啟動伺服器並連接到MongoDB資料庫。
app.listen(process.env.PORT || 4000, async () => {
  console.log('伺服器啟動')
  await mongoose.connect(process.env.DB_URL)
  mongoose.set('sanitizeFilter', true)
  console.log('資料庫連線成功')
})
