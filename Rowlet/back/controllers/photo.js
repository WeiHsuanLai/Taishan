import { StatusCodes } from 'http-status-codes' // 從 http-status-codes 庫導入 StatusCodes 常量

export const create = async (req, res) => {     // 定義一個異步函數 create，接收 req 和 res 作為參數
  try {                                         // 嘗試執行代碼塊
    req.user.image = req.file.path              // 定義一個異步函數 create，接收 req 和 res 作為參數
    await req.user.save()                       // 等待 req.user.save() 完成
    res.status(StatusCodes.OK).json({           // 將 HTTP 狀態碼設置為 OK，並以 JSON 格式回應用戶端
      success: true,
      message: '',
      result :req.file.path
    })
  } catch (error) {
    console.log(error);
    
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
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