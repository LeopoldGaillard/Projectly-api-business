const bcrypt = require('bcryptjs')
require('dotenv').config()

/**
 * Function that reduces a json with one of its columns
 * @param {JSON} json json we want to reduce
 * @param {number} column key column to reduce
 * @returns reduced json
 */
function reduceJson(json, column) {
    const jsonReduced = json.reduce((acc, content) => {
        const line = content[column];
        if (!acc[line]) {
            acc[line] = [];
        }
        acc[line].push(content);
        return acc;
    }, {});
    return jsonReduced
}

/**
 * Password hash
 * @param {string} password password to hash
 * @returns hashed password if successful, else returns ""
 */
function hashPassword(password) {
    const hashedPass = ""

    bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND))
    .then(hash => {
        hashedPass = hash
    })
    .catch(err => res.status(500).json({message: 'Hash Process Error', error : err}))

    return hashedPass
}

module.exports = {
    reduceJson,
    hashPassword
}