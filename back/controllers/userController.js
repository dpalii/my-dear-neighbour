const User = require('../models/user');
const Credentials = require('../models/credentials');
const GroupUser = require('../models/group_user');
const getHash = require('../auxiliary/hasher');

class UserController {
    static async getMe(req, res) {
        const jwtUser = req.user;
        res.status(200).json({user: jwtUser});
    }

    static async getMyGroups(req, res) {
        const user = req.user;

        try {
            const groups = await GroupUser.find({
                user: user._id
            }).exec();

            res.status(200).json({ groups: groups });
        }
        catch(err) {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        }
    }

    static async deleteMe(req, res) {
        const user = req.user;

        try {
            const [deletedUser, deletedCredentials] = await Promise.all([
                User.findByIdAndDelete(user._id).exec(),
                Credentials.findOneAndDelete({ phone: user.phone }).exec()
            ]);

            if (!deletedUser || !deletedCredentials) {
                res.status(400).json({ message: "User not found" });
            }
            else {
                res.status(200).json({ message: "Success" });
            }
        }
        catch(err) {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        }
    }

    static async changePassword(req, res) {
        const user = req.user;

        try {
            const { oldPassword, newPassword } = req.body;
    
            if (!oldPassword) {
                res.status(400).json({ message: "Old password is missing" });
                return;
            }
            if (!newPassword) {
                res.status(400).json({ message: "New password is missing" });
                return;
            }

            try {
                const credentials = await Credentials.findOneAndUpdate({ 
                    username: user.username, 
                    password: getHash(oldPassword) 
                }, 
                { 
                    password: getHash(newPassword) 
                }).exec();
    
                if (!credentials) {
                    res.status(400).json({ message: "Old password is incorrect" });
                    return;
                }
                res.status(200).json({ message: "Success" });
            }
            catch(err) {
                console.log(err);
                res.status(500).json({ message: "Server error" });
            }

        }
        catch(e) {
            console.log(e);
            res.status(400).json({ message: "Missing credentials" });
        }
    }

    static async updateProfile(req, res) {

        const address = newUser.address;
        const user = req.user;

        const nameRegEx = new RegExp(/^[а-яА-ЯёЁіїІЇєЄ0-9a-zA-Z\-\s]+$/);

        try {
            const { newUser } = req.body;
    
            if (!newUser) {
                res.status(400).json({ message: "No updates provided" });
                return;
            }
            
            if (!fullname || !nameRegEx.test(fullname)) {
                res.status(400).json({ message: "Invalid name" });
                return;
            }
            
            if (!address || 
                !address.country || !nameRegEx.test(address.country) ||
                !address.city || !nameRegEx.test(address.city) ||
                !address.street || !nameRegEx.test(address.street) ||
                !address.houseNumber || !Number.isInteger(address.houseNumber) ||
                !address.entrance || !Number.isInteger(address.entrance) || 
                !address.floor || !Number.isInteger(address.floor) || 
                !address.flat || !Number.isInteger(address.flat)) {
                res.status(400).json({ message: "Invalid address" });
                return;
            }
    
            try {
                const oldUser = await User.findById(user._id).exec();

                if (!oldUser) {
                    res.status(400).json({ message: "User not found" });
                    return;
                }

                if (oldUser.isAtHome != newUser.isAtHome && typeof(newUser.isAtHome) === Boolean) {
                    newUser.isAtHome = newUser.isAtHome;
                    newUser.lastStatusChange = new Date();
                }

                const updatedUser = await User.findByIdAndUpdate(user._id, { 
                    fullname: newUser.fullname,
                    ...newUser.address
                }).exec();
    
                if (!updatedUser) {
                    res.status(400).json({ message: "User not found" });
                    return;
                }

                const houseAddress = [address.country, address.city, address.street, address.houseNumber].join(', ');
                const entranceAddress = [houseAddress, address.entrance].join(', ');
                const floorAddress = [entranceAddress, address.floor].join(', ');
                const flatAddress = [floorAddress, address.flat].join(', ');

                const newGroups = [
                    {name: houseAddress},
                    {name: entranceAddress},
                    {name: floorAddress},
                    {name: flatAddress}
                ];

                const existingGroups = await Group.find({
                    $or: newGroups
                }).exec();

                await Group.insertMany(newGroups.slice(existingGroups.length));

                res.status(200).json({ message: "Success" });
            }
            catch(err) {
                console.log(err);
                res.status(500).json({ message: "Server error" });
            }

        }
        catch(e) {
            console.log(e);
            res.status(400).json({ message: "Missing credentials" });
        }
    }
}


module.exports = UserController;