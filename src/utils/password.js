const crypto = require('crypto');

/**
 * @param {string} password 
 */
module.exports.hashPassword = (password) => {
    return crypto.createHash('sha256').update(password).digest('base64');
}

module.exports.comparePasswords = (password, hashedPass) => {
    return (this.hashPassword(password) === hashedPass);
}