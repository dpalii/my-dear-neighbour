const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        unique: false,
        required: true,
        ref: 'user'
    },
    post: {
        type: Schema.Types.ObjectId,
        unique: false,
        required: true,
        ref: 'post'
    },
    option: {
        type: String,
        unique: false,
        required: true
    }
});

module.exports = mongoose.model('vote', voteSchema);