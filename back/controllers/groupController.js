const Group = require('../models/group');

const ObjectId = require('mongoose').Types.ObjectId;

class GroupController {
    static async getGroups(req, res) {
        const user = req.user;
        
        try {
            const houseAddress = [user.country, user.city, user.street, user.houseNumber].join(', ');
            const entranceAddress = [houseAddress, user.entrance].join(', ');
            const floorAddress = [entranceAddress, user.floor].join(', ');
            const flatAddress = [floorAddress, user.flat].join(', ');

            const groups = [
                {name: houseAddress},
                {name: entranceAddress},
                {name: floorAddress},
                {name: flatAddress}
            ];

            const userGroups = await Group.find({
                $or: groups
            }).exec();

            res.status(200).json({groups: userGroups});
        }
        catch(e) {
            console.log(e);
            res.status(500).json({message: 'Server error'});
        }
    }
}

module.exports = GroupController;