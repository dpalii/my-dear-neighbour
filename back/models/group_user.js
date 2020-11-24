const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupUserSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        unique: false,
        required: true,
        ref: 'user'
    },
    is_admin: {
        type: Boolean,
        unique: false,
        required: true
    },
    group: {
        type: Schema.Types.ObjectId,
        unique: false,
        required: true,
        ref: 'group'
    },
    confirmed: {
        type: Boolean,
        unique: false,
        required: true
    }
});

module.exports = mongoose.model('group_user', groupUserSchema);