import { Collection } from '../models/collection.js'

export {
    newCollection as new,
    create,
    show,
}

function newCollection(req, res) {
    // Render 'collection/new'
    res.render('collections/new', {
        title: "Add a New Collection"
    })
}

function create(req, res) {
    req.body.owner = req.user.profile
    Collection.create(req.body)
    .then(collection => {
        res.redirect('/')
    })
    .catch(err => {
        console.log(err)
        res.redirect('/explore')
    })
}

function show(req, res) {
    Collection.findById(req.params.collectionId)
    //?Why again?
    .populate("owner")
    .then(collection => {
        res.render('collections/show', {
        collection,
        title: "🌮 show"
        })
    })
    .catch(err => {
        console.log(err)
        res.redirect('/explore')
    })
}