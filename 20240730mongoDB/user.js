// 建立 Schema, model 和 ERROR 物所以要用 {  }，而 validator 不是物件而是導入模塊所以不用
import { Schema, model } from 'mongoose'
import { ERROR } from './code.js'
import validator from 'validator'
const schema = new Schema({
	// 資料欄位名稱
	account: {
		// 設定資料型態
		type: String,
		// required 是用來設定是否為必填 true 為必填
		required: [true, ERROR.ACCOUNT_REQUIRED],
		// unique: true 表示這個值必須為唯一
		unique: true,
		// 限制文字長度
		minLength: [4, ERROR.ACCOUNT_MINLENGTH],
		maxLength: [20, ERROR.ACCOUNT_MAXLENGTH],
		// 設定正則表達式 Regex
		match: [/^[a-zA-Z0-9]+$/, ERROR.ACCOUNT_MATCH],
		// 自動使用 文字.trim() 去除前後空白
		trim: true
	},
	email: {
		// 設定資料型態
		type: String,
		// required 是用來設定是否為必填 true 為必填
		required: [],
		unique: true,
		validator: {
			// 自訂驗證 function
			// Validator(value) 是 mongoose 的設定, return validator.isEmail(value) 是我們引用的套件
			Validator(value) {
				return validator.isEmail(value)
			},
			// 自訂驗證錯誤訊息
			message: ERROR.ACCOUNT_MAIL
		}
	}
})

// 創建一個名為 'user' 的模型，該模型根據提供的 schema 定義來操作 MongoDB 集合，並將這個模型導出，以便在其他模塊中使用。這樣做的好處是，
// 你可以在不同的文件中重用相同的模型定義，而不需要在每個文件中都重新定義。
// 導出模型
// model(collection 名稱 ,schema)
export default model('users', schema)
