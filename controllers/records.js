import { Record } from '../models/record.js'

export {
    newRecord as new,
    show
}

function newRecord(req, res) {

    Record.find({}, function(err, records) {
        res.render("records/new", {
            title: "Add Record",
            records: records,
        })
    })
}

function show(req, res) {
    console.log("show record")
}