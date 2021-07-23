import { Router } from 'express'
import * as exploreCtrl from "../controllers/explore.js"
import * as collectionsCtrl from "../controllers/collections.js"

export {
    router
}

const router = Router()

router.get('/', exploreCtrl.index)

router.get("/:profileId/:collectionId", exploreCtrl.show)
