import mongoose from "mongoose"

export {
    Record
}

const Schema = mongoose.Schema

const recordSchema = new Schema({
    title: {
        type: String
    },
    artist: {
        type: String
    },
    releaseDate: {
        type: Date
    },
    pressingNotes: {
        type: String
    },
    imageUrl: {
        type: String
    },
}, {
    timestamps: true
})

const Record = mongoose.model('Record', recordSchema)