import { Collection } from '../models/collection.js'

export {
    newCollection as new,
    show,
}

function newCollection(req, res) {
    // Render 'collection/new'
    res.render('collection/new', {
        title: "Add a New Collection"
    })
}

function show(req, res) {
    console.log("show collection")
}