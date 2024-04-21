const mongoose = require('mongoose')

const TokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '7d'
    }
})

module.exports = mongoose.model('Token', TokenSchema)