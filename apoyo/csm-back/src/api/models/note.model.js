const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NoteSchema = new Schema({    
    noteDate: {
        type: Date,
        default: new Date()
    },
    performer: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Performer'
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    noteType: {
        type: String,
        required: true
    },
    comments: {
        type: String,
        trim: true,
        default: ""
    }
}, {
    timestamps: true
})

const Note = mongoose.model('Note', NoteSchema)

module.exports = Note