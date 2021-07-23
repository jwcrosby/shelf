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

    if(req.user) {
            Profile.findById(req.user.profile._id)
            .then(self => {
                console.log(self._id)
                console.log("test")
                console.log(req.params.profileId)
                console.log("test")
    
                const isSelf = self._id.equals(req.params.profileId) ? req.params.profileId : null

                console.log()
                Collection.findById(req.params.collectionId)
                .populate("records")
                .populate("owner")
                
                .then(collection => {
                    res.render('explore/show', {
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

    } else {

        const isSelf = null

        Collection.findById(req.params.collectionId)
        .populate("records")
        .populate("owner")
        

        .then(collection => {
            res.render('explore/show', {
            collection,
            title: `${collection.name} | Shelf`,
            self: null,
            isSelf
            })
        })
        .catch(err => {
            console.log(err)
            res.redirect('/error')
        })
    }
}
