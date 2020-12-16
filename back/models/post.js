const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    created_date: {
        type: Date,
        required: true,
        unique: false
    },
    creator: {
        type: mongoose.Types.ObjectId,
        required: true,
        unique: false,
        ref: 'user'
    },
    group: {
        type: mongoose.Types.ObjectId,
        required: true,
        unique: false,
        ref: 'group'
    },
    confirmed: {
        type: Boolean,
        unique: false,
        required: true
    },
    title: {
        type: String,
        unique: false,
        required: true
    },
    content: {
        type: String,
        unique: false,
        required: true
    },
    is_poll: {
        type: Boolean,
        unique: false,
        required: true
    },
    options: [
        {
            name: {
                type: String,
                unique: false,
                required: true
            }
        }
    ]
});

module.exports = mongoose.model('post', postSchema);