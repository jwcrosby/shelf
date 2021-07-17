import { Router } from 'express'
import * as recordsCtrl from "../controllers/records.js"
import { isLoggedIn } from '../middleware/middleware.js'

export {
    router
}

const router = Router()