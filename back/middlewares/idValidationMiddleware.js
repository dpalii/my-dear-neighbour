const ObjectId = require('mongoose').Types.ObjectId;

module.exports = function validateId(req, res, next) {
    if (ObjectId.isValid(req.params.id)) next();
    else res.status(400).json({message: 'Invalid resource ID'});
}