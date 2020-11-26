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
    created_date: {
        type: Date,
        required: true,
        unique: false
    },
    is_at_home: {
        type: Boolean,
        required: false,
        unique: false
    },
    last_status_change: {
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
    house_number: {
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