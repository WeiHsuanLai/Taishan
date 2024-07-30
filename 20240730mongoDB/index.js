import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'

// 連線到資料庫
await mongoose
	.connect(process.env.DB_URL)
	.then(() => {
		console.log('木木梟啟動成功')
	})
	.catch((error) => {
		console.log('木木梟啟動失敗')
		console.log(error)
	})
// mongoose.connect(process.env.DB_URL) 是使用 Mongoose 連接到 MongoDB 數據庫，process.env.XXXXX 是從 .env 文件裡面讀取環境變量
mongoose.connect(process.env.DB_URL)

// 建立網頁伺服器
// 創建一個 Express 應用程序實例，app 對象將用於定義路由和中間件。
const app = express()

// 啟動 Express 伺服器，監聽指定的端口，process.env.PORT 從 .env 文件裡面讀取環境變量，如果未設定則默認其 4000 端口
app.listen(process.env.PORT || 4000, () => {
	console.log('木木梟啟動')
})
