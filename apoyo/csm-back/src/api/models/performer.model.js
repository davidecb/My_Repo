const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PerformerSchema = new Schema({    
    realName: {
        type: String,
        trim: true,
        required: true
    },
    modelName: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },    
    platformNames: {
        type: Array,
        default: []
    },
    location: {
        type: String,
        required: true
    },
    modelShift: {
        type: String,
        required: true
    },
    ID: {
        type: String,
        required: true
    },
    accountType: {
        type: String,
        required: true
    },
    bank: {
        type: String,
        required: true
    },
    accountID: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    retention: {
        type: Number,
        required: true
    },    
    status: {
        type: Boolean,
        default: true
    },
    lastDateOnline: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
})

PerformerSchema.virtual('notes', {
    ref: 'Note',
    localField: '_id',
    foreignField: 'performer',

})/* .get(async function() {
    const usr = await this.populate('notes')
    console.log('notes virtual', usr.notes)
    return usr.notes
}) */

PerformerSchema.methods.toJSON = function () {
    const performer = this
    
    const performerObject = performer.toObject({ virtuals: true })
    
    delete performerObject.createdAt
    delete performerObject.updatedAt
    delete performerObject.__v

    return performerObject
} 



const Performer = mongoose.model('Performer', PerformerSchema)

module.exports = Performer