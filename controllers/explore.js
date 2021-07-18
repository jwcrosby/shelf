import { Collection } from '../models/collection.js'

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