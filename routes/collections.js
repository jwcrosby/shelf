import { Router } from 'express'
import * as collectionsCtrl from "../controllers/collections.js"
import { isLoggedIn } from '../middleware/middleware.js'

export {
    router
}

const router = Router()