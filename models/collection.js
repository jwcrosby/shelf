import mongoose from 'mongoose'
const Schema = mongoose.Schema

export {
    Collection
}

const collectionSchema = new Schema({
    name: {
        type: String,
        required: true,
    } ,
    type: {
        type: String,
        enum: ["Comics", "CDs", "Movies", "Tapes", "Video Games", "Vinyl Records", "Other"],
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Profile", 
        required: true
    },
    records: [{type: Schema.Types.ObjectId, ref: 'Record'}]
}, {
    timestamps: true
})

const Collection = mongoose.model("Collection", collectionSchema)