const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
        unique: true
    },
    fullname: {
        type: String,
        required: true,
        unique: false
    },
    createdDate: {
        type: Date,
        required: true,
        unique: false
    },
    isAtHome: {
        type: Boolean,
        required: false,
        unique: false
    },
    lastStatusChange: {
        type: Date,
        required: false,
        unique: false
    },
    country: {
        type: String,
        required: true,
        unique: false
    }, 
    city: {
        type: String,
        required: true,
        unique: false
    },
    street: {
        type: String,
        required: true,
        unique: false
    },
    houseNumber: {
        type: Number,
        required: true,
        min: 1,
        unique: false
    },
    entrance: {
        type: Number,
        required: true,
        min: 1,
        unique: false
    },
    floor: {        
        type: Number,
        required: true,
        min: 1,
        unique: false
    },
    flat: {        
        type: Number,
        required: true,
        min: 1,
        unique: false
    }
})

module.exports = mongoose.model('user', schema);