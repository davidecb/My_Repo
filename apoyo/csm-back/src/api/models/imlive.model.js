const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImLiveSchema = new Schema({    
    performerNickname: {
        type: String,
        require: true
    },
    endTime: {
        type: String,
        require: true
    },    
    totalTime: {
        type: String,
        require: true
    },
    payedTime: {
        type: String,
        require: true
    },
    freeTime: {
        type: String,
        require: true
    },
    pauseTime: {
        type: String,
        require: true
    },
    performerEarned: {
        type: String,
        require: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('imLive', ImLiveSchema);