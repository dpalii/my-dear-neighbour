const GroupUser = require('../models/group_user');

const ObjectId = require('mongoose').Types.ObjectId;

module.exports = async function checkGroupAdmin(req, res, next) {
    const groupId = req.params.groupId;
    const user = req.user;

    if (!ObjectId.isValid(groupId)) {
        res.status(400).json('Invalid ID');
        return;
    }

    try {
        const groupUser = await GroupUser.findOne({
            group: groupId,
            user: user._id
        }).exec();

        if (groupUser && groupUser.confirmed) {
            req.groupUser = groupUser;
            next();
        }
        else {
            res.status(401).json({message: 'User has no access to this resource'});
        }
    }
    catch(e) {
        console.log(e);
        res.status(500).json({message: 'Server error'});
    }
}