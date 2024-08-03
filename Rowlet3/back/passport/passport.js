// 引入passport模組，用於身份驗證。
import passport from 'passport'

// 引入passport-local模組，用於實現本地身份驗證策略。
import passportLocal from 'passport-local'

// 引入passport-jwt模組，用於實現基於JWT的身份驗證策略。
import passportJWT from 'passport-jwt'

// 引入 bcrypt 模組，用於密碼的哈希和比較。
import bcrypt from 'bcrypt'

// 引入自己定義的 User 模型，用於與資料庫中的用戶數據進行交互。
import User from '../models/models_user.js'

// 建立 login 驗證方式，使用 passport.use 方法建立 passportLocal 的策略
passport.use('login', new passportLocal.Strategy({
  // 設定帳號欄位
  usernameField: 'account',
  // 設定密碼欄位
  passwordField: 'password'
},
// 因為是異步處裡使用 async(帳號,密碼,完成)
async (account, password, done) => {
  try {
    // 找到一個帳號用 findone
    const user = await User.findOne({ account })
    // 如果沒有找到，拋出錯誤
    if (!user) {
      throw new Error('ACCOUNT')
    }
    // 如果找到帳號但密碼不同，拋出密碼錯誤
    if (!bcrypt.compareSync(password, user.password)) {
      throw new Error('PASSWORD')
    }
    return done(null, user, null)
  }
  // 錯誤訊息
  catch (error) {
    console.log(error)
    if (error.message === 'ACCOUNT') {
      return done(null, null, { message: '使用者帳號不存在' })
    } else if (error.message === 'PASSWORD') {
      return done(null, null, { message: '使用者密碼錯誤' })
    } else {
      return done(null, null, { message: '未知錯誤' })
    }
  }
}))

passport.use('jwt', new passportJWT.Strategy({
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  passReqToCallback: true,
  ignoreExpiration: true
}, async (req, payload, done) => {
  try {
    const expired = payload.exp * 1000 < new Date().getTime()

    /*
      http://localhost:4000/user/test?aaa=111&bbb=222
      req.originUrl = /user/test?aaa=111&bbb=222
      req.baseUrl = /user
      req.path = /test
      req.query = { aaa: 111, bbb: 222 }
    */
    const url = req.baseUrl + req.path
    if (expired && url !== '/user/extend' && url !== '/user/logout') {
      throw new Error('EXPIRED')
    }

    const token = passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken()(req)
    const user = await User.findOne({ _id: payload._id, tokens: token })
    if (!user) {
      throw new Error('JWT')
    }

    return done(null, { user, token }, null)
  } catch (error) {
    console.log(error)
    if (error.message === 'EXPIRED') {
      return done(null, null, { message: '登入過期' })
    } else if (error.message === 'JWT') {
      return done(null, null, { message: '登入無效' })
    } else {
      return done(null, null, { message: '未知錯誤' })
    }
  }
}))
