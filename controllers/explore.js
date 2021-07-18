import { Collection } from '../models/collection.js'
import { Profile } from "../models/profile.js"

export {
    index
}

function index(req, res) {
    Collection.find({})
    .then(collections => {

        res.render("explore/index", {
            collections,
            title: "Explore"
        })
    })
    .catch(err => {
        console.log(err)
        res.redirect(`/`)
    })
}