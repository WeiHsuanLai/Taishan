// 建立 Schema, model是物件所以要用 {  }，而 validator 不是物件而是導入模塊所以不用
import { Schema, model } from 'mongoose'
// ERROR 是默認導出 (export default)  不需要花括號
import  ERROR  from './code.js'
import validator from 'validator'

// 應用程式中的 Schema（例如 Mongoose） 
// 在一些程式框架和函式庫中，Schema 用於定義應用程式中資料模型的結構。這種用法在 NoSQL 資料庫（如 MongoDB）和 ORM（物件關聯映射）庫中非常常見。 
// Mongoose 中的 Schema Mongoose 是一個用於 MongoDB 的 Node.js ORM 函式庫，它使用 Schema 來定義文件的結構。
// 功能： 模型定義：描述 MongoDB 集合中的文件結構，包括欄位及其類型。
// 驗證：在儲存到資料庫之前驗證資料的正確性。
// 中間件：在執行某些操作（如儲存、更新）之前或之後執行一些函數。
// 虛擬屬性：定義一些不直接儲存在資料庫中的屬性，可以透過計算得到。
// 方法與靜態方法：定義模型實例方法和靜態方法。


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
