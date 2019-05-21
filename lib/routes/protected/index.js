import express from 'express'
import requiresAuthorization from '../middleware/requiresAuthorization'

import { Protected } from './controllers'

const router = express.Router()

router.get('/', requiresAuthorization, Protected)

export default router
