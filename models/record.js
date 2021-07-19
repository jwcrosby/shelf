import mongoose from "mongoose"

export {
    Record
}

const Schema = mongoose.Schema

const recordSchema = new Schema({
    title: {
        type: String
    },
    author: {
        type: String
    },
    releaseDate: {
        type: Date
    },
    notes: {
        type: String
    },
    imageUrl: {
        type: String
    },
    collectionParent: {type: mongoose.Schema.Types.ObjectId, ref: "Collection", 
    // required: true
}
}, {
    timestamps: true
})

const Record = mongoose.model('Record', recordSchema)