import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import User from './user'

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
// express 一定要先寫在前面不然會有影響
const app = express()

// 將傳入的 body 解析為 json
app.use(express.json())

// 新增用 post 因為是第一個參數所以用 '/' 
// app.請求方式(路徑,處理 function) 這裡的 
// **重要** req 代表進來的資料，res 代表回傳出去的東西
// 因為伺服器通常會有延遲所以用 async
app.post('/',async(req,res)=>{
	try {
		console.log(req.body);
		// 第一種是使用 model 的 create 語法建立一筆資料
		// User.create() 是一個靜態方法，它不僅建立一個新的 User 實例，還直接將其儲存到資料庫中。 這是一個一步完成的操作：建立並儲存。

		// const user = await User.create({
		// 	account:req.body.account,
		// 	email:req.body.email
		// })

		// 也可以直接把 req.body 丟進去 mongoose 會自動幫忙做資料驗證
		// 如果有除了自己定義的欄位外都會自動刪除
		const user = await User.create(req.body)
		// status 回傳狀態
		res.status()

		// 傳文字
		// res.send('aaa')

		// 傳 json
		// 以下三種寫法都可，建議用最後一種
		// 注意一個請求都只能使用一次，所以同樣的程式碼不能出現兩次

		// res.send({ aaa: 123, bbb: 456 }) 第一種
		// res.json({}) 第二種

		// 建立成功回應狀態碼 200，success代表有沒有成功，message 代表錯誤訊息，result 代表做完的結果 第三種
		res.status(200).json({
			success: true,
			message: '',
			result:user
		})

		// 第二種寫法用物件導向的寫法 建立一個 new 的實例再保存
		// new User() 建立一個新的 User 實例，但不會自動儲存。 user.save() 方法將實例儲存到資料庫中。 可以在建立實例後進行更多操作，然後再儲存
		// const user = new User()
		// user.save
	}catch(error){
		console.log(error);
		console.error();
	}
})

// 啟動 Express 伺服器，監聽指定的端口，process.env.PORT 從 .env 文件裡面讀取環境變量，如果未設定則默認其 4000 端口
app.listen(process.env.PORT || 4000, () => {
	console.log('木木梟啟動')
})
