import { Record } from '../models/record.js'
import { Collection } from '../models/collection.js'

export {
    newRecord as new,
    create,
    show,
    deleteRecord as delete,
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
    .populate("collection owner")
    
    .then(record => {
        res.render("records/show", {
        record,
        title: record.name
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