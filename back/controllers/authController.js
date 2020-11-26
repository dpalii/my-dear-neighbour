const Credentials = require('../models/credentials');
const User = require('../models/user');
const Group = require('../models/group');
const getHash = require('../auxiliary/hasher');

const jwt = require('jsonwebtoken');

class AuthController {
    static async register(req, res) {
        
        const nameRegEx = new RegExp(/^[а-яА-ЯёЁіїІЇєЄ0-9a-zA-Z\-\s]+$/);
        const phoneRegEx = new RegExp(/^\+[0-9]{10,12}$/);

        try {
            const { phone, fullname, password, address } = req.body;

            if (!phone || !phoneRegEx.test(phone)) {
                res.status(400).json({ message: "Invalid phone" });
                return;
            }
    
            if (!fullname || !nameRegEx.test(fullname)) {
                res.status(400).json({ message: "Invalid name" });
                return;
            }

            if (await Credentials.findOne({ phone: phone }).exec()) {
                res.status(400).json({
                    message: "Phone is not unique"
                });
                return;
            }
    
            if (!password) {
                res.status(400).json({ message: "Password not specified" });
                return;
            }
            
            if (!address || 
                !address.country || !nameRegEx.test(address.country) ||
                !address.city || !nameRegEx.test(address.city) ||
                !address.street || !nameRegEx.test(address.street) ||
                !address.house_number || !Number.isInteger(address.house_number) ||
                !address.entrance || !Number.isInteger(address.entrance) || 
                !address.floor || !Number.isInteger(address.floor) || 
                !address.flat || !Number.isInteger(address.flat)) {
                res.status(400).json({ message: "Invalid address" });
                return;
            }
    
            const passHash = getHash(password);
    
            const credentials = new Credentials({
                phone: phone,
                password: passHash
            });
            const user = new User({
                phone: phone,
                fullname: fullname,
                created_date: new Date(),
                ...address
            });
    
            try {
                await Promise.all([
                    credentials.save(),
                    user.save()
                ]);

                const houseAddress = [address.country, address.city, address.street, address.house_number].join(', ');
                const entranceAddress = [houseAddress, address.entrance].join(', ');
                const floorAddress = [entranceAddress, address.floor].join(', ');
                const flatAddress = [floorAddress, address.flat].join(', ');

                const newGroups = [
                    {name: houseAddress},
                    {name: entranceAddress},
                    {name: floorAddress},
                    {name: flatAddress}
                ]

                const existingGroups = await Group.find({
                    $or: newGroups
                }).exec();

                await Group.insertMany(newGroups.slice(existingGroups.length));

                res.status(200).json({
                    message: 'Success'
                });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ message: "Server error" });
            }
        }
        catch(e) {
            console.log(e);
            res.status(400).json({ message: "Missing credentials" });
            return;
        }
        
    }

    static async login(req, res) {
        try {
            const { phone, password } = req.body;
            if (!phone) {
                res.status(400).json({ message: "Phone not specified" });
                return;
            }
    
            if (!password) {
                res.status(400).json({ message: "Password not specified" });
                return;
            }
    
            const passHash = getHash(password);
    
            try {
                const data = await Credentials.findOne({
                    phone: phone,
                    password: passHash
                });
                if (data) {
                    const secret = process.env.SECRET;
                    const user = await User.findOne({ phone: phone }).exec();
                    const token = jwt.sign(JSON.stringify(user), secret);
    
                    res.status(200).json({ jwt_token: token });
                }
                else {
                    res.status(400).json({ message: "Username or password is incorrect" });
                }
            }
            catch(err) {
                console.log(err);
                res.status(500).json({ message: "Server error" });
            }
        }
        catch(e) {
            console.log(e);
            res.status(400).json({ message: "Missing credentials" });
            return;
        }
    }
}

module.exports = AuthController;