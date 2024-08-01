import User from '../models/models_user'
import { StatusCodes } from 'http-status-codes'
export const create = async (req, res) => {
  try {
    await User.create('req.body')
    res.status(StatusCodes.OK).json({
      success: true,
      message: '成功建立帳號'
    })
  } catch (error) {
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
}
