import express from 'express'

import { Login } from './controllers'

const router = express.Router()

router.post('/', Login)

export default router
