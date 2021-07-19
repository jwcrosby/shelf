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
                title: "Add Record",
                records: records,
                collection
            })
        })
    })
}

function create(req, res) {
    Collection.findById(req.params.collectionId, function(err, collection) {
        //Set the collectionParent relationship
        req.body.collectionParent = collection
        //Add the newly created record to the collection's record array
        collection.records.push(req.body.recordId)
        //Save the parent collection
        collection.save(function(err) {
            //Then redirect
            res.redirect(`/collections/${collection._id}`)
        })
    })
}
//req.params.collectionId

function show(req, res) {
    console.log("show record")
}