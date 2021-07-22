import { Router } from 'express'
import * as homeCtrl from "../controllers/home.js"

export {
    router
}

const router = Router()

router.get('/', homeCtrl.index)