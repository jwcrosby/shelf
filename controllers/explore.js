import { Collection } from '../models/collection.js'
import { Profile } from "../models/profile.js"

export {
    index
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