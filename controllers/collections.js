import { Collection } from '../models/collection.js'

export {
    newCollection as new,
    create,
    show,
    deleteCollection as delete,
    edit,
    update
}

function newCollection(req, res) {
    // Render 'collection/new'
    res.render('collections/new', {
        title: "Add a New Collection | Shelf"
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
    .populate("records")
    .populate("owner")
    
    .then(collection => {
        res.render('collections/show', {
        collection,
        title: `${collection.name} | Shelf`
        })
    })
    .catch(err => {
        console.log(err)
        res.redirect('/error')
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

function edit(req, res) {

    Collection.findById(req.params.collectionId)
    .populate("owner")
    
    .then(collection => {
        res.render("collections/edit", {
        collection,
        title: `Edit: ${collection.name} | Shelf`
        })
    })
    .catch(err => {
        console.log(err)
        res.redirect('/error')
    })
}

function update(req, res) {

    //Use the collectionId (defined in the route) to find the collection
    Collection.findById(req.params.collectionId)
    .populate("collectionParent")
    .then(collection => {

        //The update the collection based on the values input on the form
        //The if statements prevent an update from occurring if there is no change
        if(collection.name !== req.body.name) {
            collection.name = req.body.name
        }

        collection.save()
        .then(() => {
            res.redirect(`/collections/${req.params.collectionId}`)
        })
    })
    .catch(err => {
        console.log(err)
        res.redirect('/error')
    })
}