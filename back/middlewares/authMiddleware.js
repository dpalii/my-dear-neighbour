const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = async function authorize(req, res, next) {
    const header = req.headers.authorization;

    if (!header) {
        res.status(401).json({ message: "No authorization header provided" });
        return;
    }

    const [, token] = header.split(' ');
    const secret = process.env.SECRET;

    try {
        jwtUser = jwt.verify(token, secret);

        const user = await User.findById(jwtUser._id).exec();

        if (!user) {
            throw("JWT is invalid");
        }
        else {
            req.user = user;
            next();
        }

    }
    catch(err) {
        res.status(401).json({ message: "JWT is invalid" });
    }
}