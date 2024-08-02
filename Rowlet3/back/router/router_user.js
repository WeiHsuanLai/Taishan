import { Router } from 'express'
import { create } from '../controllers/controllers_user.js'
const router = Router()
router.post('/', create)
export default router
