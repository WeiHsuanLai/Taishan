import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import User from './user.js'
import { StatusCodes } from 'http-status-codes'
import validator from 'validator'

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

// express 會自動根據你的 function 來決定要做什麼處裡
// 有 next 就叫做 middlewares ，處理完後去下一步
// 如果是要處理上一個 middlewares 的錯誤，必須在前面加上 error 或是 _
// 如果沒有 error 就會被略過 所以這邊是處理錯誤的 middlewares，app.use((error, req, res, next)
// _底線代表不使用第一個參數
// 處理 express.json 的錯誤
// 處理 middlewares 的錯誤一定要有四個參數
app.use((_, req, res, next) => {
	// res.status(400) 的 400 通常是指使用者的錯誤
	res.status(StatusCodes.BAD_REQUEST).json({
		success: false,
		message: '資料格式錯誤'
	})
})

// 新增
// 用 post 因為是第一個參數所以用 '/'
// app.請求方式(路徑,處理 function) 這裡的
// **重要** req 代表進來的資料，res 代表回傳出去的東西
// 因為伺服器通常會有延遲所以用 async
app.post('/', async (req, res) => {
	try {
		console.log(req.body)
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

		// res.send({ aaa: 123, bbb: 456 }) 這是第一種
		// res.json({}) 這是第二種

		// 建立成功回應狀態碼 200，success代表有沒有成功，message 代表錯誤訊息，result 代表做完的結果 這是第三種
		res.status(StatusCodes.OK).json({
			success: true,
			message: '成功建立帳號',
			result: user
		})

		// 第二種寫法用物件導向的寫法 建立一個 new 的實例再保存
		// new User() 建立一個新的 User 實例，但不會自動儲存。 user.save() 方法將實例儲存到資料庫中。 可以在建立實例後進行更多操作，然後再儲存
		// const user = new User()
		// user.save
	} catch (error) {
		console.log(error)
		console.error()

		if (error.name === 'MongoServerError' && error.code === 11000) {
			// 資料重複 unique 錯誤會回傳給使用者
			res.status(StatusCodes.CONFLICT).json({
				success: false,
				message: '帳號或是信箱重複'
			})
		} else if (error.name === 'ValidationError') {
			// 驗證錯誤
			// 第一個驗證失敗欄位名稱
			//  Object.keys() 把物件的 key 變成一個陣列 然後取 error.errors 的第一個欄位
			const key = Object.keys(error.errors)[0]
			// 再來取錯誤訊息
			const message = error.errors[key].message
			res.status(StatusCodes.BAD_REQUEST).json({
				success: false,
				message
			})
		} else {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				success: false,
				message: '未知錯誤'
			})
		}
	}
})

// 查詢用 get 查詢全部
app.get('/', async (req, res) => {
	try {
		// .find() 裡面放查詢條件，會把所有符合的都查尋出來，然後變成陣列回傳
		const result = await User.find()
		res.status(StatusCodes.OK).json({
			success: true,
			message: '',
			result
		})
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			success: false,
			message: '未知錯誤'
		})
	}
})

// 查詢單個
// :代表斜線後的文字給他一個變數叫做 id
app.get('/:id', async (req, res) => {
	console.log('id', req.params.id)
	console.log('query', req.quuery)
	try {
		// 如果 ID 不正確，拋出錯誤
		if (!validator.isMongoId(req.params.id)) throw new Error('ID')
		// const user = await User.find({_id:req.params.id})
		// const user = await User.findOne({ _id: req.params.id })
		const user = await User.findById(req.params.id)
		if (!user) throw new Error('NO FOUND')
		res.status(StatusCodes.OK).json({
			success: true,
			message: '',
			result: user
		})
	} catch (error) {
		console.log(error)
		if (error.name === 'CastError' || error.message === 'ID') {
			res.status(StatusCodes.BAD_REQUEST).json({
				success: false,
				message: '格式錯誤'
			})
		} else if (error.message === 'NO FOUND') {
			res.status(StatusCodes.NOT_FOUND).json({ success: false, message: '查無資料' })
		} else {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				success: false,
				message: '未知錯誤'
			})
		}
	}
})

// 刪除
app.delete('/:id', async (req, res) => {
	try {
		if (!validator.isMongoId(req.params.id)) throw new Error('ID')
		const user = await User.findByIdAndDelete(req.params.id)
		if (!user) throw new Error('NO FOUND')
		res.status(StatusCodes.OK).json({
			success: true,
			message: '刪除成功'
			// 不用加上 result: user 因為都刪掉了不用回傳
		})
	} catch (error) {
		if (error.name === 'CastError' || error.message === 'ID') {
			res.status(StatusCodes.BAD_REQUEST).json({
				success: false,
				message: '格式錯誤'
			})
		} else if (error.message === 'NO FOUND') {
			res.status(StatusCodes.NOT_FOUND).json({ success: false, message: '查無資料' })
		} else {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				success: false,
				message: '未知錯誤'
			})
		}
	}
})

// 編輯 patch 部分東西換掉
app.patch('/:id', async (req, res) => {
	try {
		if (!validator.isMongoId(req.params.id)) throw new Error('ID')
		// 這邊的是 mongoogse 的語法 findByIdAndUpdate
		// 第一個參數 req.params.id 是 id，第二個參數是你要更新的東西，第三個參數是替換的東西
		// new:true 回傳更新後的資料，runValidators:true 是執行 schema 定義的驗證
		const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
		if (!user) throw new Error('NO FOUND')
		res.status(StatusCodes.BAD_REQUEST).json({
			success: true,
			message: '更新成功',
			result: user
		})
	} catch (error) {
		if (error.name === 'CastError' || error.message === 'ID') {
			res.status(StatusCodes.BAD_REQUEST).json({
				success: false,
				message: '格式錯誤'
			})
		} else if (error.name === 'MongoServerError' && error.code === 11000) {
			// 資料重複 unique 錯誤會回傳給使用者
			res.status(StatusCodes.CONFLICT).json({
				success: false,
				message: '帳號或是信箱重複'
			})
		} else if (error.name === 'ValidationError') {
			// 驗證錯誤
			// 第一個驗證失敗欄位名稱
			//  Object.keys() 把物件的 key 變成一個陣列 然後取 error.errors 的第一個欄位
			const key = Object.keys(error.errors)[0]
			// 再來取錯誤訊息
			const message = error.errors[key].message
			res.status(StatusCodes.BAD_REQUEST).json({
				success: false,
				message
			})
		} else if (error.message === 'NO FOUND') {
			res.status(StatusCodes.NOT_FOUND).json({ success: false, message: '查無資料' })
		} else {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				success: false,
				message: '未知錯誤'
			})
		}
	}
})

// 啟動 Express 伺服器，監聽指定的端口，process.env.PORT 從 .env 文件裡面讀取環境變量，如果未設定則默認其 4000 端口
app.listen(process.env.PORT || 4000, () => {
	console.log('木木梟啟動')
})
