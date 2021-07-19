import { Record } from '../models/record.js'
import { Collection } from '../models/collection.js'

export {
    newRecord as new,
    create,
    show,
    deleteRecord as delete,
    edit,
    update
}

function newRecord(req, res) {
    Collection.findById(req.params.collectionId)
    .populate("owner")
    .then(collection => {
        Record.find({}, function(err, records) {
            res.render("records/new", {
                title: "Add a New Record",
                records: records,
                collection
            })
        })
    })
}

function create(req, res) {
    Collection.findById(req.params.collectionId, function(err, collection) {
        //Set the record.collectionParent equal to the incoming Collection
        req.body.collectionParent = collection
        //Create the new "Record" with the req.body
        Record.create(req.body)
        .then(record => {
            //Add the newly created record to the collection's record array
            collection.records.push(record._id)
            console.log(req.body)
            //Save the parent collection
            collection.save(function(err) {
                console.log(collection)
                //Then redirect
                res.redirect(`/collections/${collection._id}`)
            })
        })
    })
}

function show(req, res) {
    Record.findById(req.params.recordId)
    .populate("collectionParent")
    
    .then(record => {
        res.render("records/show", {
        record,
        title: record.title
        })
    })
    .catch(err => {
        console.log(err)
        res.redirect('/error')
    })
}

function deleteRecord(req, res) {
    //Use the recordsId (defined in the route) to find the record
    Record.findById(req.params.recordId)
    .populate("collectionParent")
    .then(record => {

        //Make sure that the current user is the owner of the record
        if(record.collectionParent.owner.equals(req.user.profile._id)) {

            //If so, delete the record and redirect them back to their profile
            record.delete()
            
        .then(() => {
            res.redirect(`/collections/${req.params.collectionId}`)
        })

        } else {
            //If not, prevent the request 
        throw new Error("NOT AUTHORIZED")
        }
    })
    .catch(err => {
        console.log(err)
        res.redirect(`/collections/${req.params.collectionId}`)
    })
}

function edit(req, res) {

    Record.findById(req.params.recordId)
    .populate("collectionParent")
    
    .then(record => {
        res.render("records/edit", {
        record,
        title: `Edit: ${record.title}`,
        autofillEditForm: function() { 

            // document.getElementById("title-input").value =  "TEST";
        }
        })
    })
    .catch(err => {
        console.log(err)
        res.redirect('/error')
    })
}

function update(req, res) {

    //Use the recordId (defined in the route) to find the record
    Record.findById(req.params.recordId)
    .populate("collectionParent")
    .then(record => {

        console.log(record.title)
        console.log(req.body.title)

        //The update the record based on the values input on the form
        //The if statements prevent an update from occurring if there is no change
        if(record.title !== req.body.title) {
            record.title = req.body.title
        }

        if(record.author !== req.body.author) {
            record.author = req.body.author
        }

        if(record.releaseDate !== req.body.releaseDate) {
            record.releaseDate = req.body.releaseDate
        }

        if(record.notes !== req.body.notes) {
            record.notes = req.body.notes
        }

        if(record.imageUrl !== req.body.imageUrl) {
            record.imageUrl = req.body.imageUrl
        }

        record.save()
        .then(() => {
            res.redirect(`/collections/${req.params.collectionId}/records/${req.params.recordId}`)
        })
    })
    .catch(err => {
        console.log(err)
        res.redirect('/error')
    })
}