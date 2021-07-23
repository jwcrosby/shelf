import { Collection } from '../models/collection.js'
import { Profile } from "../models/profile.js"

export {
    index,
    show
}

function index(req, res) {
    Collection.find({})
    .populate("records")
    .populate("owner")
    .then(collections => {

        res.render("explore/index", {
            collections,
            title: "Explore | Shelf"
        })
    })
    .catch(err => {
        console.log(err)
        res.redirect(`/error.ejs`)
    })
}

function show(req, res) {
    Profile.findById(req.params.id)
    .then(profile => {
        Profile.findById(req.user.profile._id)
        .then(self => {

            const isSelf = self._id.equals(profile._id)

            Collection.findById(req.params.collectionId)
            .populate("records")
            .populate("owner")
            
            .then(collection => {
                res.render('collections/show', {
                collection,
                title: `${collection.name} | Shelf`,
                self,
                isSelf
                })
            })
            .catch(err => {
                console.log(err)
                res.redirect('/error')
            })
        })
    })
}
