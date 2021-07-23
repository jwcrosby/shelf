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

router.get("/:collectionId/edit", isLoggedIn, collectionsCtrl.edit)

router.put("/:collectionId", isLoggedIn, collectionsCtrl.update)

router.delete("/:collectionId", isLoggedIn, collectionsCtrl.delete)

// records routes

router.get('/:collectionId/records/new', isLoggedIn, recordsCtrl.new)

router.post("/:collectionId/records", isLoggedIn, recordsCtrl.create)

router.get("/:collectionId/records/:recordId", isLoggedIn, recordsCtrl.show)

router.get("/:collectionId/records/:recordId/edit", isLoggedIn, recordsCtrl.edit)

router.put("/:collectionId/records/:recordId", isLoggedIn, recordsCtrl.update)

router.delete("/:collectionId/records/:recordId", isLoggedIn, recordsCtrl.delete)