import { Record } from '../models/record.js'
import { Collection } from '../models/collection.js'

export {
    newRecord as new,
    create,
    show
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
//req.params.collectionId

function show(req, res) {
    console.log("show record")
}