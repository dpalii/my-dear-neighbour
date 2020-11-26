const Group = require('../models/group');
const User = require('../models/user');
const GroupUser = require('../models/group_user');

const ObjectId = require('mongoose').Types.ObjectId;

class GroupUserController {
    static async createGroupUser(req, res) {
        const groupId = req.params.groupId;
        const user = req.user;

        if (!ObjectId.isValid(groupId)) {
            res.status(400).json('Invalid ID');
            return;
        }
        
        try {
            const [anyGroupUser, currentGroupUser] = await Promise.all([
                GroupUser.findOne({group: groupId}).exec(),
                GroupUser.findOne({group: groupId, user: user._id}).exec()
            ]);

            if (!currentGroupUser) {
                const newGroupUser = new GroupUser({
                    user: user._id,
                    group: groupId,
                    confirmed: !anyGroupUser,
                    is_admin: !anyGroupUser
                });

                await newGroupUser.save();

                res.status(200).json({message: 'Success'});
            }
            else {
                res.status(400).json({message: 'User is already in that group'});
            }
        }
        catch(e) {
            console.log(e);
            res.status(500).json({message: 'Server error'});
        }
    }

    static async getGroupUsers(req, res) {
        const groupId = req.params.groupId;
        const groupUser = req.groupUser;
        const showRequests = req.query.show_requests === 'true' ? true : false;
        
        const confirmed = !(showRequests && groupUser.is_admin);

        if (showRequests && !groupUser.is_admin) {
            res.status(401).json("You're not authorized to view request to join group");
            return;
        }

        try {
            const users = await GroupUser.find({
                group: groupId,
                confirmed: confirmed
            })
                .populate('user')
                .populate('group')
                .exec();
            res.status(200).json({'users': users});
        }
        catch(e) {
            console.log(e);
            res.status(500).json({message: 'Server error'});
        }
    }

    static async getGroupUserById(req, res) {
        const groupId = req.params.groupId;
        const userId = req.params.userId;

        try {
            const user = await GroupUser.findOne({group: groupId, user: userId})
                .populate('user')
                .populate('group')
                .exec();
            res.status(200).json({'user': user});
        }
        catch(e) {
            console.log(e);
            res.status(500).json({message: 'Server error'});
        }
    }

    static async updateUserAccess(req, res) {
        const groupId = req.params.groupId;
        const userId = req.params.userId;
        const user = req.user;
        const { confirmed, is_admin } = req.body;

        if (userId === user._id) {
            res.status(400).json("You can't change your own access rights");
            return;
        }
        
        try {
            const updatedUser = await GroupUser.findOneAndUpdate({
                group: groupId,
                user: userId
            }, {
                confirmed: confirmed ? true : false,
                is_admin: is_admin ? true : false
            }).exec();

            if (!updatedUser) {
                res.status(400).json({message: 'User not found'});
                return;
            }
            res.status(200).json({message: 'Success'});
        }
        catch(e) {
            console.log(e);
            res.status(500).json({message: 'Server error'});
        }

    }
}

module.exports = GroupUserController;