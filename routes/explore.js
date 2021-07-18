import { Router } from 'express'
import * as exploreCtrl from "../controllers/explore.js"
import { isLoggedIn } from '../middleware/middleware.js'

export {
    router
}

const router = Router()

router.get('/', exploreCtrl.index)