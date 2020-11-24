const mongoose = require('mongoose');
const { stringify } = require('querystring');

const schema = new mongoose.Schema({
    phone: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: false,
        required: true
    }
});

module.exports = mongoose.model('credentials', schema);