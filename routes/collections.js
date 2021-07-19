import { Router } from 'express'
import * as collectionsCtrl from "../controllers/collections.js"
import { isLoggedIn } from '../middleware/middleware.js'

export {
    router
}

const router = Router()

router.get('/new', isLoggedIn, collectionsCtrl.new)

router.post("/", isLoggedIn, collectionsCtrl.create)

router.get("/:collectionId", collectionsCtrl.show)

router.delete("/:collectionId", collectionsCtrl.delete)