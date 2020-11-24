const crypto = require('crypto');

module.exports = function(str) {
    const salt = process.env.SECRET;

    const hash = crypto.createHmac('sha256', salt);
    hash.update(str);
    return hash.digest('hex');
}