const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Please provide company name'],
        maxlength: 50
    },
    position: {
        type: String,
        required: [true, 'Please provide the position'],
        maxlength: 100
    },
    status: {
        type: String,
        enum: ['interview', 'pending', 'declined'],
        default: 'pending'
    },
    // Here very important connecting two models
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

module.exports = mongoose.model('Job', JobSchema)