import { Router } from 'express'
import * as collectionsCtrl from "../controllers/collections.js"
import * as recordsCtrl from "../controllers/records.js"
import { isLoggedIn } from '../middleware/middleware.js'

export {
    router
}

const router = Router()

router.get('/new', isLoggedIn, collectionsCtrl.new)

router.post("/", isLoggedIn, collectionsCtrl.create)

router.get("/:collectionId", isLoggedIn, collectionsCtrl.show)

router.delete("/:collectionId", isLoggedIn, collectionsCtrl.delete)

// records routes

router.get('/:collectionId/records/new', recordsCtrl.new)

router.post("/:collectionId/records", recordsCtrl.create)

router.delete("/:collectionId/records/:recordId", recordsCtrl.delete)