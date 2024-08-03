// 引入 dotenv 庫，並且啟動它以從 .env 文件讀取環境變量。
import 'dotenv/config'
// 引入 express 框架
import express from 'express'
// 使用 mongoose 套件
import mongoose from 'mongoose'
import cors from 'cors'
import { StatusCodes } from 'http-status-codes'
// 消毒套件
import mongoSanitize from 'express-mongo-sanitize'
// 設定限制請求套件
import rateLimit from 'express-rate-limit'
// 使用者路由
import routerUser from './router/router_user.js'

// 建立網頁伺服器
// 創建一個 Express 應用程序實例，app 對象將用於定義路由和中間件。
// express 一定要先寫在前面不然會有影響
const app = express()

// 15分鐘超過100個請求會被拒絕
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
  // orign = 請求的來源
  // callback(錯誤,是否允許)
  // origin參數：這是一個函數，它接受兩個參數：origin（請求的來源）和callback（一個回調函數，用於通知cors中間件是否允許請求）。
  // if條件：您檢查了請求的來源是否為undefined，或者是否在允許的來源列表中。如果是，您通過調用callback函數並傳入null和true來允許請求；
  // 否則，您通過傳入一個新的Error物件和false來拒絕請求。
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
// 處理 middlewares 的錯誤一定要有這四個參數
app.use((_, req, res, next) => {
  res.status(StatusCodes.BAD_REQUEST).json({
    success: false,
    message: '資料格式錯誤'
  })
})

// mongoSanitize 中間件的語句。mongoSanitize 是一種安全性工具，用於防止 MongoDB 注入攻擊。
// 透過 app.use() 方法將 mongoSanitize 中間件加到應用上，這意味著它會對所有路由和請求生效，不需要對每個路由單獨設定。
// 一定要放在 req.body 之後，不然會沒有作用
app.use(mongoSanitize())

// 使用路由
app.use('/user', routerUser)

app.all('*', (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: '找不到'
  })
})

// app.listen(...) 是啟動 Express 伺服器的方法，監聽指定的端口，process.env.PORT 從 .env 文件裡面讀取環境變量，如果未設定則默認其 4000 端口
// 這裡使用 async 異步函數，當伺服器成功啟動並開始監聽請求時，這個函數將被調用。
app.listen(process.env.PORT || 4000, async () => {
  console.log('伺服器啟動')
  // mongoose.connect(process.env.DB_URL) 是使用 Mongoose 連接到 MongoDB 數據庫，process.env.XXXXX 是從 .env 文件裡面讀取環境變量
  // await 關鍵字用於等待 mongoose.connect 完成連接操作。這裡使用 await 確保數據庫連接在伺服器啟動後立即完成。
  await mongoose.connect(process.env.DB_URL)
  // 命令啟用 Mongoose 的 sanitization 功能。這意味著 Mongoose 在將數據寫入 MongoDB 時，會自動清理（sanitize）輸入數據，移除潛在的 SQL 注入攻擊或 XSS 攻擊的風險。
  // sanitizeFilter 是 Mongoose 的一個配置選項，當設置為 true 時，Mongoose 會對所有的輸入數據進行 sanitization。
  mongoose.set('sanitizeFilter', true)
  console.log('資料庫連線成功')
})
