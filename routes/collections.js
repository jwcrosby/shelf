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

router.get("/:collectionId/edit", collectionsCtrl.edit)

router.put("/:collectionId", collectionsCtrl.update)

router.delete("/:collectionId", isLoggedIn, collectionsCtrl.delete)

// records routes

router.get('/:collectionId/records/new', recordsCtrl.new)

router.post("/:collectionId/records", recordsCtrl.create)

router.get("/:collectionId/records/:recordId", recordsCtrl.show)

router.get("/:collectionId/records/:recordId/edit", recordsCtrl.edit)

router.put("/:collectionId/records/:recordId", recordsCtrl.update)

router.delete("/:collectionId/records/:recordId", recordsCtrl.delete)