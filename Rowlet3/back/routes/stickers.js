import { Router } from 'express'
import * as auth from '../middlewares/auth.js'
import upload from '../middlewares/upload.js'
import admin from '../middlewares/admin.js'
import { create, getAll, edit, get, getId } from '../controllers/stickers'


const router = Router()

router.post('/', auth.jwt, admin, upload, create)
router.get('/', auth.jwt, admin, get)
// 不需要登入也不需要管理員就不用 jwt 和 admin
router.get('/all', getAll)
router.get('/all', getId)
router.patch('/:id', auth.jwt, admin, upload, edit)

export default router
