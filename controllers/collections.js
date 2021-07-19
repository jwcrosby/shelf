import { Collection } from '../models/collection.js'

export {
    newCollection as new,
    create,
    show,
    deleteCollection as delete,
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
        res.redirect('/profiles/me')
    })
    .catch(err => {
        console.log(err)
        res.redirect('/profiles/me')
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

function deleteCollection(req, res) {
    //Use the collectionId (defined in the route) to find the collection
    Collection.findById(req.params.collectionId)
    .then(collection => {

        //Make sure that the current user is the owner of the collection
        if(collection.owner.equals(req.user.profile._id)) {
            //If so, delete the collection and redirect them back to their profile
        collection.delete()
        .then(() => {
            res.redirect("/profiles/me")
        })
        } else {
            //If not, prevent the request 
        throw new Error("NOT AUTHORIZED")
        }
    })
    .catch(err => {
        console.log(err)
        res.redirect('/explore')
    })
}